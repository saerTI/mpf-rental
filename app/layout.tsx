// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MPF Rental - Arriendo de Maquinaria para Construcción de Caminos',
  description: 'Arriendo de maquinaria especializada para construcción y reparación de caminos. Equipos de pavimentación, compactación y más. Servicio profesional en Valdivia, Chile.',
  keywords: 'arriendo maquinaria, construcción caminos, pavimentación, compactación, maquinaria pesada, Valdivia',
  
  // Open Graph
  openGraph: {
    title: 'MPF Rental - Arriendo de Maquinaria para Construcción',
    description: 'Arriendo de maquinaria especializada para construcción y reparación de caminos en Valdivia, Chile.',
    url: 'https://mpfrental.cl', // Cambia por tu dominio
    siteName: 'MPF Rental',
    locale: 'es_CL',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'MPF Rental - Arriendo de Maquinaria',
    description: 'Arriendo de maquinaria especializada para construcción de caminos en Valdivia, Chile.',
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
        {/* Meta adicionales que RealFaviconGenerator puede generar */}
        <meta name="theme-color" content="#3d4e7c" />
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