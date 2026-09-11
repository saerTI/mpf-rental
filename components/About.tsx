// components/About.tsx
'use client';

import { useSite } from '@/components/SiteProvider';

// Estilos cíclicos para las tarjetas de features (mantiene la variedad visual).
const CARD_STYLES = [
  { border: 'border-t-navy', icon: 'bg-primary/10' },
  { border: 'border-t-accent', icon: 'bg-accent/10' },
  { border: 'border-t-lightBlue', icon: 'bg-lightBlue/10' },
];

export default function About() {
  const about = useSite().sections.find((s) => s.type === 'about');
  if (!about || about.type !== 'about') return null;

  return (
    <section
      id="nosotros"
      className="min-h-screen flex items-center bg-white scroll-mt-0 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenido */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {about.title}
            </h2>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-lg text-gray-600 mb-6 last:mb-8 leading-relaxed"
              >
                {p}
              </p>
            ))}

            {/* Estadísticas */}
            {about.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-6 mb-8">
                {about.stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-bold text-navy mb-2">{s.value}</div>
                    <div className="text-sm text-gray-600">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {about.features.map((f, i) => {
              const style = CARD_STYLES[i % CARD_STYLES.length];
              return (
                <div
                  key={i}
                  className={`bg-white p-8 rounded-2xl border-t-4 ${style.border} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-x border-b border-gray-100`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl ${style.icon} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-3xl">{f.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{f.title}</h3>
                  <p className="text-gray-600">{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
