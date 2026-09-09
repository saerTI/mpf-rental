// lib/site.ts
// Configuración central del sitio, usada por metadata, sitemap, robots y JSON-LD.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mpfrental.cl'
).replace(/\/$/, '');

export const SITE_NAME = 'MPF Rental';

// Teléfono comercial (mismo número del botón de WhatsApp).
export const PHONE_E164 = '+56978089545';
export const WHATSAPP_NUMBER = '56978089545';

// Ciudades donde se presta servicio (zona sur de Chile).
export const SERVICE_CITIES = [
  'Chillán',
  'Los Ángeles',
  'Temuco',
  'Valdivia',
  'Osorno',
  'Puerto Montt',
];
