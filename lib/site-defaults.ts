// lib/site-defaults.ts
//
// Contenido por defecto del sitio (= el contenido actual de MPF Rental).
// Sirve de fallback cuando Firestore no tiene el campo, para que el render
// nunca quede vacío. SIN imports de firebase → usable también en cliente.

import type { SiteContent } from '@/types';

export const DEFAULT_SITE: SiteContent = {
  brand: {
    name: 'MPF Rental',
    description:
      'Arriendo de maquinaria pesada para construcción y reparación de caminos',
    logo: {
      full: '/logo/mpf_rental_morado.png',
      iso: '/logo/isotipo_morado.png',
      dark: '/logo/mpf_rental_blanco.png',
    },
    colors: {
      primary: '#3C2F7C',
      primaryHover: '#2d2360',
      accent: '#FFB800',
      accentHover: '#e6a600',
      secondary: '#7D6BD5',
      navy: '#3d4e7c',
    },
    social: {
      facebook: 'https://www.facebook.com/profile.php?id=61583881635723',
      instagram: 'https://www.instagram.com/mpfrental/',
      google: 'https://share.google/1f0SU3sfa3ADXglo4',
    },
    contact: {
      phoneE164: '+56978089545',
      whatsapp: '56978089545',
      salesPhone: '+56975372435',
      email: 'ventas@mpfrental.cl',
      address: { locality: 'Valdivia', region: 'Los Ríos', country: 'CL' },
      areaServed: [
        'Chillán',
        'Los Ángeles',
        'Temuco',
        'Valdivia',
        'Osorno',
        'Puerto Montt',
      ],
      openingHours: [
        { days: ['Mon', 'Tue', 'Wed', 'Thu'], opens: '08:30', closes: '18:00' },
        { days: ['Fri'], opens: '08:30', closes: '17:00' },
      ],
    },
  },
  hero: {
    badge: 'Soluciones Profesionales en Construcción',
    title: 'Arriendo de Maquinaria para',
    titleHighlight: 'Construcción de Caminos',
    subtitle:
      'Equipos especializados para movimiento de tierra y compactación de terreno. Servicio en Chillán, Los Ángeles, Temuco, Valdivia, Osorno y Puerto Montt.',
    image: '/images/maquina1.jpg',
    cta: { label: 'Ver Maquinaria', href: '#maquinaria' },
    ctaSecondary: { label: 'Contactar', href: '#contacto' },
  },
  sections: [
    {
      id: 'about',
      type: 'about',
      order: 1,
      visible: true,
      title: 'Sobre MPF Rental',
      paragraphs: [
        'Somos una empresa especializada en el arriendo de maquinaria para construcción y reparación de caminos. Contamos con equipos de última tecnología y un equipo profesional comprometido con la excelencia.',
        'Nuestra experiencia en el sector nos permite ofrecer soluciones integrales para proyectos de pavimentación, compactación y mantenimiento de vías.',
      ],
      stats: [
        { value: '15+', label: 'Años de Experiencia' },
        { value: '50+', label: 'Proyectos Completados' },
        { value: '100%', label: 'Satisfacción' },
      ],
      features: [
        { icon: '🛡️', title: 'Confiabilidad', text: 'Equipos certificados y en perfectas condiciones' },
        { icon: '⏰', title: 'Disponibilidad', text: 'Servicio 24/7 para emergencias' },
        { icon: '👥', title: 'Experiencia', text: 'Equipo técnico especializado' },
        { icon: '⚡', title: 'Innovación', text: 'Tecnología de última generación' },
      ],
    },
  ],
  catalog: { showPrice: false },
  seo: {
    title:
      'MPF Rental - Arriendo de Maquinaria Pesada | Chillán, Temuco, Valdivia, Osorno',
    description:
      'Arriendo de maquinaria pesada para construcción y reparación de caminos. Excavadoras, palas cargadoras, motoniveladoras y más. Servicio en Chillán, Los Ángeles, Temuco, Valdivia, Osorno y Puerto Montt.',
    keywords: [
      'arriendo maquinaria',
      'maquinaria pesada',
      'construcción caminos',
      'excavadora',
      'pala cargadora',
      'Chillán',
      'Temuco',
      'Valdivia',
      'Osorno',
      'Puerto Montt',
    ],
    ogImage: '/logo/mpf_rental_morado.png',
    siteUrl: 'https://mpfrental.cl',
  },
};

// Un valor "vacío" de Firestore NO debe pisar el default (evita textos en
// blanco o logos rotos cuando el cliente aún no llenó un campo).
function isEmpty(v: unknown): boolean {
  return (
    v === undefined ||
    v === null ||
    (typeof v === 'string' && v.trim() === '') ||
    (Array.isArray(v) && v.length === 0)
  );
}

// Merge profundo: Firestore gana donde tenga un valor no vacío; el resto
// cae al default. Los objetos se combinan campo a campo; arrays y primitivos
// se reemplazan (si no están vacíos).
function deepMerge<T>(def: T, remote: unknown): T {
  if (remote === undefined || remote === null) return def;
  if (Array.isArray(def)) return (isEmpty(remote) ? def : remote) as T;
  if (def !== null && typeof def === 'object') {
    const out: Record<string, unknown> = { ...(def as object) };
    const r = remote as Record<string, unknown>;
    for (const k of Object.keys(def as object)) {
      if (k in r) out[k] = deepMerge((def as Record<string, unknown>)[k], r[k]);
    }
    // Claves presentes solo en Firestore (ej. secciones extra).
    for (const k of Object.keys(r)) {
      if (!(k in (def as object)) && !isEmpty(r[k])) out[k] = r[k];
    }
    return out as T;
  }
  return (isEmpty(remote) ? def : remote) as T;
}

// Merge defensivo: lo de Firestore gana donde exista (no vacío); si falta,
// cae al default de DEFAULT_SITE.
export function mergeSite(remote: SiteContent | null): SiteContent {
  return deepMerge(DEFAULT_SITE, remote);
}

// Convierte un hex (#RGB, #RRGGBB o #RRGGBBAA) a canales "r g b" para las
// variables CSS de color. Devuelve null si no es válido.
export function hexToRgbChannels(hex: string | undefined): string | null {
  if (!hex) return null;
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length !== 6 && h.length !== 8) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return `${r} ${g} ${b}`;
}

// Mapea códigos de día (Mon..Sun) a etiquetas ES y arma "Lun - Jue".
const DAY_ES: Record<string, string> = {
  Mon: 'Lun', Tue: 'Mar', Wed: 'Mié', Thu: 'Jue', Fri: 'Vie', Sat: 'Sáb', Sun: 'Dom',
};
export function formatDays(days: string[]): string {
  if (!days.length) return '';
  if (days.length === 1) return DAY_ES[days[0]] ?? days[0];
  return `${DAY_ES[days[0]] ?? days[0]} - ${DAY_ES[days[days.length - 1]] ?? days[days.length - 1]}`;
}
