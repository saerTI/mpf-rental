// app/not-found.tsx
// 404 global con el chrome del sitio (header/footer/WhatsApp) y CTAs para
// volver, en vez de un callejón sin salida. Envuelve en SiteProvider para que
// Header/Footer tengan el contenido del tenant.
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { SiteProvider } from '@/components/SiteProvider';
import ThemeStyle from '@/components/ThemeStyle';
import { getSiteContent } from '@/lib/content';

export default async function NotFound() {
  const site = await getSiteContent();

  return (
    <SiteProvider value={site}>
      <ThemeStyle colors={site.brand.colors} />
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <p className="text-7xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
          Página no encontrada
        </h1>
        <p className="mt-3 text-gray-600 max-w-md">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition"
          >
            Volver al inicio
          </Link>
          <Link
            href="/#maquinaria"
            className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Ver maquinaria
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </SiteProvider>
  );
}
