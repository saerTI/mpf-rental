// app/contacto/page.tsx
import Contact from '@/components/Contact';

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-300">
            Estamos aquí para ayudarte con tu proyecto
          </p>
        </div>
      </div>

      <Contact />
    </div>
  );
}