// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MPF Ingeniería - Arriendo de Maquinaria para Construcción de Caminos',
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
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}