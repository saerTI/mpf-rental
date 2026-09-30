// components/LegalPage.tsx
//
// Shell común de las páginas legales: cabecera con título y fecha de
// actualización, y cuerpo de texto con estilos de lectura. Sin plugin de
// tipografía: los estilos de los elementos se aplican aquí con selectores
// arbitrarios de Tailwind.

import { LEGAL } from '@/lib/legal';

export default function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50">
      {/* Cabecera (padding superior por el header fijo de 80px) */}
      <section className="bg-primary pt-32 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-white/80 text-lg">{intro}</p>
          <p className="text-white/60 text-sm mt-6">
            Última actualización: {LEGAL.updatedAt}
          </p>
        </div>
      </section>

      <article
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-gray-700 leading-relaxed
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-28 [&>h2:first-child]:mt-0
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:mb-4
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
          [&_a]:text-primary [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary-hover
          [&_strong]:text-gray-900"
      >
        {children}
      </article>
    </div>
  );
}
