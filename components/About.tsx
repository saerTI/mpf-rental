// components/About.tsx
'use client';

export default function About() {
  return (
    <section
      id="nosotros"
      className="min-h-screen flex items-center bg-white scroll-mt-0 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenido */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sobre MPF Rental
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Somos una empresa especializada en el arriendo de maquinaria para construcción y reparación de caminos.
              Contamos con equipos de última tecnología y un equipo profesional comprometido con la excelencia.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nuestra experiencia en el sector nos permite ofrecer soluciones integrales para proyectos de
              pavimentación, compactación y mantenimiento de vías.
            </p>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#3d4e7c] mb-2">15+</div>
                <div className="text-sm text-gray-600">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#3d4e7c] mb-2">50+</div>
                <div className="text-sm text-gray-600">Proyectos Completados</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#3d4e7c] mb-2">100%</div>
                <div className="text-sm text-gray-600">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Confiabilidad - Blue Accent */}
            <div className="bg-white p-8 rounded-2xl border-t-4 border-t-[#3d4e7c] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-x border-b border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">🛡️</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Confiabilidad</h3>
              <p className="text-gray-600">
                Equipos certificados y en perfectas condiciones
              </p>
            </div>

            {/* Disponibilidad - Blue Accent */}
            <div className="bg-white p-8 rounded-2xl border-t-4 border-t-[#ff7d6c] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-x border-b border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-[#3d4e7c]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">⏰</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Disponibilidad</h3>
              <p className="text-gray-600">
                Servicio 24/7 para emergencias
              </p>
            </div>

            {/* Experiencia - Orange Accent */}
            <div className="bg-white p-8 rounded-2xl border-t-4 border-t-[#ff7d6c] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-x border-b border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-[#ff7d6c]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">👥</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Experiencia</h3>
              <p className="text-gray-600">
                Equipo técnico especializado
              </p>
            </div>

            {/* Innovación - Blue Accent */}
            <div className="bg-white p-8 rounded-2xl border-t-4 border-t-[#5169a0] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-x border-b border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-[#5169a0]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">⚡</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Innovación</h3>
              <p className="text-gray-600">
                Tecnología de última generación
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}