// components/About.tsx
export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sobre MPF Rental
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Somos una empresa especializada en el arriendo de maquinaria para construcción y reparación de caminos. Contamos con equipos de última tecnología y un equipo profesional comprometido con la excelencia.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Nuestra experiencia en el sector nos permite ofrecer soluciones integrales para proyectos de pavimentación, compactación y mantenimiento de vías.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-sm text-gray-600">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-sm text-gray-600">Proyectos Completados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-sm text-gray-600">Satisfacción</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 text-white p-6 rounded-lg h-full">
              <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Equipos Certificados</h3>
              <p className="text-sm text-gray-300">Maquinaria con mantención al día</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg h-full">
              <svg className="w-12 h-12 mb-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Disponibilidad 24/7</h3>
              <p className="text-sm text-gray-600">Soporte técnico permanente</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg h-full">
              <svg className="w-12 h-12 mb-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Personal Calificado</h3>
              <p className="text-sm text-gray-600">Operadores experimentados</p>
            </div>
            <div className="bg-gray-900 text-white p-6 rounded-lg h-full">
              <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Entregas Rápidas</h3>
              <p className="text-sm text-gray-300">Logística eficiente</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}