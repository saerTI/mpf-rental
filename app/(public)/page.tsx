// app/(public)/page.tsx
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Machinery from '@/components/Machinery';
import About from '@/components/About';
import Contact from '@/components/Contact';
import { getMachinery, getSiteContent } from '@/lib/content';

// Contenido/maquinaria administrados en crm-leads; MPF Rental solo renderiza
// leyendo Firestore. ISR de 60s como red de seguridad; crm-leads puede
// invalidar al instante vía POST /api/revalidate.
export const revalidate = 60;

export default async function Home() {
  const machinery = await getMachinery();

  return (
    <>
      <Hero />
      <Machinery machinery={machinery} />
      <About />
      <Contact />
    </>
  );
}

// SEO dinámico desde el contenido del tenant (con defaults si falta).
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteContent();
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: { title: seo.title, description: seo.description },
  };
}
