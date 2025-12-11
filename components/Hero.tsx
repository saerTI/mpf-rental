// components/Hero.tsx
'use client';

import Image from 'next/image';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-start bg-gradient-to-br from-[#3d4e7c] via-[#4a5d8f] to-[#5169a0] scroll-mt-0"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/maquina1.jpg"
          alt="Maquinaria de construcción"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a233a]/90 via-[#1a233a]/80 to-[#1a233a]/40"></div>
      </div>

      {/* Curva inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-20 pb-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-block mb-6 animate-fade-in">
            <span className="bg-[#ff7d6c] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              Soluciones Profesionales en Construcción
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Arriendo de Maquinaria para{' '}
            <span className="text-[#ff7d6c]">
              Construcción de Caminos
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed animate-slide-up delay-200">
            Equipos especializados para movimiento de tierra y compactación de terreno.
            Servicio en Chillán, Los Ángeles, Temuco, Valdivia, Osorno y Puerto Montt.
          </p>

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
            <button
              onClick={() => scrollToSection('maquinaria')}
              className="bg-[#ff7d6c] text-white px-8 py-4 rounded-lg hover:bg-[#ff6b5a] transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Ver Maquinaria
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold text-lg border-2 border-white/30 shadow-xl"
            >
              Contactar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}