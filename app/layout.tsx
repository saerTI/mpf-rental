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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}