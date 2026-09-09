// types/index.ts

// Estado operativo de una máquina (lo que administra el panel).
export type MachineryStatus = 'disponible' | 'arrendada' | 'mantencion';

export const MACHINERY_STATUS_LABELS: Record<MachineryStatus, string> = {
  disponible: 'Disponible',
  arrendada: 'Arrendada',
  mantencion: 'En mantención',
};

export interface Machinery {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: {
    weight?: string;
    power?: string;
    capacity?: string;
    width?: string;
    production?: string; // Nueva propiedad
    [key: string]: string | undefined;
  };
  image: string;
  images?: string[];
  available: boolean;
  // Estado operativo detallado. `available` se deriva de este campo
  // (disponible => true; arrendada/mantención => false).
  status?: MachineryStatus;
  pdfUrl?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  machinery?: string;
  message: string;
}

// ---------- Contenido del sitio (leído desde Firestore: sites/{tenant}.site) ----------
// Contrato con crm-leads. Ver firebase/content-model.md.

export interface SiteBrand {
  name: string;
  description: string;
  logo: { full: string; iso?: string; dark?: string };
  colors: {
    primary: string;
    primaryHover: string;
    accent: string;
    accentHover: string;
    secondary: string;
    navy: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    google?: string;
    linkedin?: string;
    tiktok?: string;
    youtube?: string;
  };
  contact: {
    phoneE164: string;
    whatsapp: string;
    salesPhone?: string;
    email: string;
    address: { street?: string; locality: string; region?: string; country: string };
    areaServed: string[];
    openingHours: { days: string[]; opens: string; closes: string }[];
  };
}

export interface SiteHero {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  image: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

interface SectionBase { id: string; order: number; visible: boolean }
export type SiteSection =
  | (SectionBase & { type: 'richtext'; title: string; body: string })
  | (SectionBase & { type: 'faq'; title: string; items: { q: string; a: string }[] })
  | (SectionBase & {
      type: 'about';
      title: string;
      paragraphs: string[];
      stats: { value: string; label: string }[];
      features: { icon: string; title: string; text: string }[];
    });

export interface SiteContent {
  brand: SiteBrand;
  hero: SiteHero;
  sections: SiteSection[];
  catalog: { showPrice: boolean };
  seo: { title: string; description: string; keywords?: string[]; ogImage?: string; siteUrl?: string };
}