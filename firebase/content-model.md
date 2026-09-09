# Content Model — CMS multi-tenant en crm-leads

**Contrato entre crm-leads (escribe) y los sitios de clientes (leen, p.ej. MPF Rental).**
Versión del esquema: `1` (campo `schemaVersion` en el doc `sites/{tenantId}`).

Hoy crm-leads solo maneja leads. Esto agrega una capa de **contenido de sitio** por
tenant: la marca, el hero, las secciones, el SEO y el catálogo de maquinaria que cada
web de cliente renderiza. El sitio de cliente **lee directo de Firestore** (mismo
proyecto); crm-leads es el **único lugar de edición** (backoffice, dominio aparte
tipo `app.mpfrental.cl`).

---

## 1. Layout en Firestore

> **CORRECCIÓN DE SEGURIDAD (aplicada):** el contenido público NO vive en
> `tenants/{id}.site`, porque el doc `tenants/{id}` guarda **secretos**
> (`whatsapp.accessToken`, etc.) y no puede tener lectura pública. El contenido
> público se separó a una colección `sites/{tenantId}`.

```
sites/{tenantId}                        ← doc: contenido PÚBLICO del sitio (lectura pública)
  │   schemaVersion: number
  │   status: 'active' | 'suspended'
  │   brand, hero, sections, catalog, seo   ← el SiteContent va al ROOT del doc
  │
  └─ machinery/{slug}                   ← subcolección PÚBLICA (NO array): catálogo

tenants/{tenantId}                      ← config del tenant CON SECRETOS → PRIVADO
  └─ leads/{leadId}                     ← CRM → PRIVADO
```

Reglas de diseño:
- `tenantId` = slug estable en kebab-case (`mpf-rental`). Misma clave en `sites/` y `tenants/`.
- **La web pública LEE de `sites/{tenantId}` (+ su subcolección `machinery`).** Nunca de `tenants/{id}`.
- La **maquinaria es subcolección**, nunca un array: crece, cada ítem tiene estado
  propio, galería y PDF, y un doc tope 1 MB no escala.
- `tenants/{id}` (secretos) y `leads` **jamás son de lectura pública** (ver reglas).

---

## 2. Esquema (TypeScript, fuente de verdad de tipos)

```ts
// ---------- sites/{tenantId} ----------  (contenido PÚBLICO; SiteContent en el root)
interface SiteDoc extends SiteContent {
  schemaVersion: number;              // 1
  status: 'active' | 'suspended';
  updatedAt: Timestamp;
}

interface SiteContent {
  brand: {
    name: string;
    description: string;              // tagline corto
    logo: {
      full: string;                   // URL Storage (logo horizontal)
      iso?: string;                   // isotipo/favicon
      dark?: string;                  // variante para fondos claros
    };
    colors: {                         // tokens que consume el theme del sitio
      primary: string;
      primaryHover: string;
      accent: string;
      accentHover: string;
      secondary: string;
      navy: string;
    };
    social: {                         // solo las que existan
      facebook?: string;
      instagram?: string;
      google?: string;                // ficha de Google Business
      linkedin?: string;
      tiktok?: string;
      youtube?: string;
    };
    contact: {
      phoneE164: string;              // "+56978089545" → tel: y JSON-LD
      whatsapp: string;               // "56978089545"  → wa.me
      salesPhone?: string;            // 2ª línea si aplica
      email: string;
      address: {                      // estructurado (JSON-LD lo exige)
        street?: string;
        locality: string;            // "Valdivia"
        region?: string;             // "Los Ríos"
        country: string;             // "CL"
      };
      areaServed: string[];           // ciudades → JSON-LD + metadata
      openingHours: {                 // fuente única (se muestra y va a JSON-LD)
        days: string[];               // ["Mon","Tue","Wed","Thu"]
        opens: string;                // "08:30"
        closes: string;               // "18:00"
      }[];
    };
  };

  hero: {
    badge?: string;
    title: string;
    titleHighlight?: string;          // parte del título resaltada
    subtitle?: string;
    image: string;                    // URL Storage (fondo)
    cta: { label: string; href: string };         // href: "#maquinaria" | "#contacto" | URL
    ctaSecondary?: { label: string; href: string };
  };

  // Secciones tipadas (discriminadas por `type`). NO texto libre suelto.
  sections: Array<SectionRichtext | SectionFaq | SectionAbout>;

  catalog: {
    showPrice: boolean;               // el cliente decide exhibir precioReferencia
  };

  seo: {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;                 // URL Storage
    siteUrl?: string;                 // canónico del tenant (https://mpfrental.cl)
  };
}

interface SectionBase { id: string; order: number; visible: boolean; }
interface SectionRichtext extends SectionBase { type: 'richtext'; title: string; body: string; }
interface SectionFaq extends SectionBase { type: 'faq'; title: string; items: { q: string; a: string }[]; }
interface SectionAbout extends SectionBase {
  type: 'about';
  title: string;
  paragraphs: string[];
  stats: { value: string; label: string }[];        // "15+", "Años de Experiencia"
  features: { icon: string; title: string; text: string }[];  // icon = emoji o key
}

// ---------- sites/{tenantId}/machinery/{slug} ----------
interface MachineryDoc {
  name: string;
  category: string;                   // "Maquinaria Pesada" | "Transporte" | "Plantas"
  description: string;
  image: string;                      // principal (URL Storage)
  images?: string[];                  // galería
  specs: Record<string, string>;      // pares libres, varían por máquina
  status: 'disponible' | 'arrendada' | 'mantencion';  // 'mantencion' NO se muestra en el sitio
  precioReferencia?: string;          // se exhibe solo si site.catalog.showPrice === true
  pdfUrl?: string;                    // ficha técnica
  order?: number;                     // orden manual
  destacado?: boolean;
  updatedAt: Timestamp;
}
```

> `available` (booleano) queda **derivado** de `status` en el lado que renderiza
> (`disponible` ⇒ true). No lo guardes duplicado si no quieres; si lo guardas,
> mantenlo sincronizado con `status`.

---

## 3. Reglas de seguridad (Firestore)

Contenido público en `sites/**` (lectura pública, escritura solo Admin SDK).
Secretos + leads bajo `tenants/**`, 100% privados.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Contenido público del sitio.
    match /sites/{tenantId} {
      allow read: if true;
      allow write: if false;                 // solo Admin SDK (backoffice)
      match /machinery/{id} {
        allow read: if true;
        allow write: if false;               // solo Admin SDK
      }
    }

    // Config del tenant (SECRETOS) + leads → privado.
    match /tenants/{tenantId}/{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Nota de auth:** como la edición de contenido es 100% Admin SDK (server-side),
`sites/**` no necesita claims para escribir. El custom claim `{ tenant }` sigue
siendo necesario para el resto del backoffice (saber a qué tenant pertenece cada
usuario admin y qué leads puede ver) — hoy `getSessionUser()` devuelve uid/email
sin mapeo a tenant; agregar ese mapeo + allowlist es el trabajo real.

---

## 4. Storage (imágenes)

Convención de rutas, todo público (lectura):
```
sites/{tenantId}/hero-*.jpg
sites/{tenantId}/logo-*.png
sites/{tenantId}/machinery/{slug}/*.jpg
```
Guarda en Firestore la **URL pública** (`https://storage.googleapis.com/<bucket>/<path>`),
no el path crudo. Los sitios ya permiten `storage.googleapis.com` en `next/image`.

---

## 5. Qué debe permitir editar el backoffice (crm-leads)

Formularios por bloque, todos scoped al tenant del usuario:
- **Marca:** nombre, descripción, subir logo(s), colores (color pickers), redes, contacto
  (teléfonos, email, dirección estructurada, ciudades `areaServed`, horarios).
- **Hero:** badge, título + resaltado, subtítulo, imagen, 2 CTAs.
- **Secciones:** CRUD de bloques `richtext`/`faq`/`about` con `order` y `visible`.
- **Catálogo:** CRUD de maquinaria (los campos de `MachineryDoc`) + subida de imágenes/PDF +
  toggle de estado (`disponible`/`arrendada`/`mantencion`) + toggle global `showPrice`.
- **SEO:** title, description, keywords, ogImage.

---

## 6. Versionado y compatibilidad (disciplina para no romper todos los sitios)

- `schemaVersion` en el doc de tenant. Cambios **aditivos** (campos nuevos opcionales)
  no suben versión. Cambios que rompen ⇒ suben versión + migración.
- El renderer del sitio debe **degradar con defaults** si falta un campo (nunca romper el
  build por contenido incompleto).

## 7. Integración de cache (opcional pero recomendado)

Al guardar contenido, crm-leads debería avisar al sitio para invalidar cache:
`POST https://mpfrental.cl/api/revalidate` con un secreto compartido → el sitio hace
`revalidateTag('content:{tenantId}')`. Evita leer Firestore en cada visita.

---

## 8. Índices sugeridos

- `machinery`: índice compuesto `order ASC, name ASC` (para listar ordenado).
- Resto se resuelve con lecturas por doc/colección directa; no requiere índices extra.

---

## 9. Seed inicial — tenant `mpf-rental`

Contenido real actual de la web (para poblar el primer tenant):

```jsonc
// sites/mpf-rental   (SiteContent en el root del doc)
{
  "schemaVersion": 1,
  "status": "active",
  "brand": {
      "name": "MPF Rental",
      "description": "Arriendo de maquinaria pesada para construcción y reparación de caminos",
      "logo": { "full": "/logo/mpf_rental_morado.png", "iso": "/logo/isotipo_morado.png", "dark": "/logo/mpf_rental_blanco.png" },
      "colors": {
        "primary": "#3C2F7C", "primaryHover": "#2d2360",
        "accent": "#FFB800", "accentHover": "#e6a600",
        "secondary": "#7D6BD5", "navy": "#3d4e7c"
      },
      "social": {
        "facebook": "https://www.facebook.com/profile.php?id=61583881635723",
        "instagram": "https://www.instagram.com/mpfrental/",
        "google": "https://share.google/1f0SU3sfa3ADXglo4"
      },
      "contact": {
        "phoneE164": "+56978089545",
        "whatsapp": "56978089545",
        "salesPhone": "+56975372435",   // ⚠️ RECONCILIAR: hoy aparecen 2 números distintos en la web
        "email": "ventas@mpfrental.cl",
        "address": { "locality": "Valdivia", "region": "Los Ríos", "country": "CL" },
        "areaServed": ["Chillán", "Los Ángeles", "Temuco", "Valdivia", "Osorno", "Puerto Montt"],
        "openingHours": [
          { "days": ["Mon","Tue","Wed","Thu"], "opens": "08:30", "closes": "18:00" },
          { "days": ["Fri"], "opens": "08:30", "closes": "17:00" }
        ]
      }
    },
    "hero": {
      "badge": "Soluciones Profesionales en Construcción",
      "title": "Arriendo de Maquinaria para",
      "titleHighlight": "Construcción de Caminos",
      "subtitle": "Equipos especializados para movimiento de tierra y compactación de terreno. Servicio en Chillán, Los Ángeles, Temuco, Valdivia, Osorno y Puerto Montt.",
      "image": "/images/maquina1.jpg",
      "cta": { "label": "Ver Maquinaria", "href": "#maquinaria" },
      "ctaSecondary": { "label": "Contactar", "href": "#contacto" }
    },
    "sections": [
      {
        "id": "about", "type": "about", "order": 1, "visible": true,
        "title": "Sobre MPF Rental",
        "paragraphs": [
          "Somos una empresa especializada en el arriendo de maquinaria para construcción y reparación de caminos. Contamos con equipos de última tecnología y un equipo profesional comprometido con la excelencia.",
          "Nuestra experiencia en el sector nos permite ofrecer soluciones integrales para proyectos de pavimentación, compactación y mantenimiento de vías."
        ],
        "stats": [
          { "value": "15+", "label": "Años de Experiencia" },
          { "value": "50+", "label": "Proyectos Completados" },
          { "value": "100%", "label": "Satisfacción" }
        ],
        "features": [
          { "icon": "🛡️", "title": "Confiabilidad", "text": "Equipos certificados y en perfectas condiciones" },
          { "icon": "⏰", "title": "Disponibilidad", "text": "Servicio 24/7 para emergencias" },
          { "icon": "👥", "title": "Experiencia", "text": "Equipo técnico especializado" },
          { "icon": "⚡", "title": "Innovación", "text": "Tecnología de última generación" }
        ]
      }
    ],
    "catalog": { "showPrice": false },
    "seo": {
      "title": "MPF Rental - Arriendo de Maquinaria Pesada | Chillán, Temuco, Valdivia, Osorno",
      "description": "Arriendo de maquinaria pesada para construcción y reparación de caminos. Excavadoras, palas cargadoras, motoniveladoras y más. Servicio en Chillán, Los Ángeles, Temuco, Valdivia, Osorno y Puerto Montt.",
      "keywords": ["arriendo maquinaria","maquinaria pesada","construcción caminos","excavadora","pala cargadora","Chillán","Temuco","Valdivia","Osorno","Puerto Montt"],
      "ogImage": "/logo/mpf_rental_morado.png",
      "siteUrl": "https://mpfrental.cl"
    }
}
```

Maquinaria (9 docs) — subir cada una a `sites/mpf-rental/machinery/{slug}`.
Los datos ya existen en `data/machinery.ts` del repo de MPF Rental; mapear
`available: true` → `status: "disponible"`. Slugs y campos:

| slug | name | category | status |
|------|------|----------|--------|
| cf-02 | Pala Cargadora XCMG LW180KV | Maquinaria Pesada | disponible |
| ct-01 | Camión Tolva Sitrak G7 400 | Transporte | disponible |
| ct-02 | Camión Tolva JAC | Transporte | disponible |
| ex-01 | Excavadora Shantui SE210-9 | Maquinaria Pesada | disponible |
| mn-01 | Motoniveladora John Deere 772G | Maquinaria Pesada | disponible |
| rt-01 | Rodillo Compactador Cummins T4F | Maquinaria Pesada | disponible |
| plantas | Planta de Áridos | Plantas | disponible |
| ca-01 | Camión Aljibe Sinotruk HOWO A7 | Transporte | disponible |
| cr-01 | Camión Cama Baja Mercedes-Benz L1634 | Transporte | disponible |

> Cada doc lleva además `description`, `specs` (mapa), `image`, `images[]` y `pdfUrl`
> tal cual están hoy en `data/machinery.ts`.
```
