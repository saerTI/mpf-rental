// components/Hero.tsx
'use client';

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
    <section id="inicio" className="relative bg-[#3d4e7c] text-white overflow-hidden pt-32 scroll-mt-[80px]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-block">
            <span className="bg-[#ff7d6c] text-white px-4 py-2 rounded-md text-sm font-medium">
              Soluciones Profesionales en Construcción
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Arriendo de Maquinaria para{' '}
            <span className="text-[#ff7d6c]">
              Construcción de Caminos
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Equipos especializados para pavimentación, compactación y reparación de asfalto y concreto en el sur de Chile.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection('maquinaria')}
              className="bg-[#ff7d6c] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#ff6b5a] transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Maquinaria
            </button>
            <button 
              onClick={() => scrollToSection('contacto')}
              className="border-2 border-white/80 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#3d4e7c] transition-all duration-300 text-center transform hover:scale-105"
            >
              Contactar
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 48h1440V0S1140 48 720 48 0 0 0 0v48z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  );
}