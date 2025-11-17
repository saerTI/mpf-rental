// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MPF Rental - Arriendo de Maquinaria Pesada | Chillán, Temuco, Valdivia, Osorno',
  description: 'Arriendo de maquinaria pesada para construcción y reparación de caminos. Excavadoras, palas cargadoras, motoniveladoras y más. Servicio en Chillán, Los Ángeles, Temuco, Valdivia, Osorno y Puerto Montt.',
  keywords: 'arriendo maquinaria, maquinaria pesada, construcción caminos, pavimentación, compactación, excavadora, pala cargadora, Chillán, Los Ángeles, Temuco, Valdivia, Osorno, Puerto Montt',
  
  // Open Graph
  openGraph: {
    title: 'MPF Rental - Arriendo de Maquinaria Pesada en la Zona Sur',
    description: 'Arriendo de maquinaria pesada para construcción de caminos. Servicio profesional en Chillán, Los Ángeles, Temuco, Valdivia, Osorno y Puerto Montt.',
    url: 'https://mpfrental.cl',
    siteName: 'MPF Rental',
    locale: 'es_CL',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'MPF Rental - Arriendo de Maquinaria Pesada',
    description: 'Arriendo de maquinaria para construcción de caminos en la zona sur de Chile.',
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

  // Theme color
  themeColor: '#3d4e7c',

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
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#3d4e7c" />
        {/* Schema.org structured data para SEO local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'MPF Rental',
              description: 'Arriendo de maquinaria pesada para construcción de caminos',
              url: 'https://mpfrental.cl',
              areaServed: [
                { '@type': 'City', name: 'Chillán' },
                { '@type': 'City', name: 'Los Ángeles' },
                { '@type': 'City', name: 'Temuco' },
                { '@type': 'City', name: 'Valdivia' },
                { '@type': 'City', name: 'Osorno' },
                { '@type': 'City', name: 'Puerto Montt' },
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Valdivia',
                addressCountry: 'CL',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}