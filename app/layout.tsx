// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#3d4e7c',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'MPF Rental - Arriendo de Maquinaria Pesada | Chillán, Temuco, Valdivia, Osorno',
  description: 'Arriendo de maquinaria pesada para construcción y reparación de caminos. Excavadoras, palas cargadoras, motoniveladoras y más. Servicio en Chillán, Los Ángeles, Temuco, Valdivia, Osorno y Puerto Montt.',
  keywords: 'arriendo maquinaria, maquinaria pesada, construcción caminos, pavimentación, compactación, excavadora, pala cargadora, Chillán, Los Ángeles, Temuco, Valdivia, Osorno, Puerto Montt',
  alternates: {
    canonical: '/',
  },

  // Open Graph
  openGraph: {
    title: 'MPF Rental - Arriendo de Maquinaria Pesada en la Zona Sur',
    description: 'Arriendo de maquinaria pesada para construcción de caminos. Servicio profesional en Chillán, Los Ángeles, Temuco, Valdivia, Osorno y Puerto Montt.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/logo/mpf_rental_morado.png',
        width: 1200,
        height: 630,
        alt: 'MPF Rental - Arriendo de Maquinaria Pesada',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'MPF Rental - Arriendo de Maquinaria Pesada',
    description: 'Arriendo de maquinaria para construcción de caminos en la zona sur de Chile.',
    images: ['/logo/mpf_rental_morado.png'],
  },

  // Favicons y App Icons
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        // @ts-ignore
        color: '#3d4e7c',
      },
    ],
  },

  // Manifest
  manifest: '/site.webmanifest',

  // MS Tiles
  other: {
    'msapplication-TileColor': '#3d4e7c',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // El JSON-LD LocalBusiness se genera dinámicamente desde el contenido del
  // tenant en app/(public)/layout.tsx.
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}