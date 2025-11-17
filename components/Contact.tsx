// components/Contact.tsx
'use client';

export default function Contact() {
  return (
    <section 
      id="contacto" 
      className="min-h-screen flex items-center bg-gradient-to-b from-gray-50 to-white scroll-mt-0 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contáctanos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos disponibles para atender tus consultas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Teléfono */}
          <a
            href="tel:+56975372435"
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-[#ff7d6c] group"
          >
            <div className="text-[#ff7d6c] mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Teléfono</h3>
            <p className="text-[#ff7d6c] font-semibold">+56 9 7537 2435</p>
          </a>

          {/* Email */}
          <a
            href="mailto:ventas@mpfrental.cl"
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-[#ff7d6c] group"
          >
            <div className="text-[#ff7d6c] mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-[#ff7d6c] font-semibold text-sm">ventas@mpfrental.cl</p>
          </a>

          {/* Ubicación */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-[#ff7d6c] mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ubicación</h3>
            <p className="text-gray-600">Valdivia, Los Ríos, Chile</p>
          </div>

          {/* Horario */}
          <div className="bg-[#3d4e7c] text-white p-8 rounded-2xl shadow-lg">
            <div className="mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">Horario</h3>
            <p className="text-blue-100">Lun - Vie:</p>
            <p className="font-semibold">8:00 - 18:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}