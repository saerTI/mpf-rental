// components/MachineryModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Machinery } from '@/types';

interface MachineryModalProps {
  machinery: Machinery;
  isOpen: boolean;
  onClose: () => void;
}

export default function MachineryModal({ machinery, isOpen, onClose }: MachineryModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Asegurar que estamos en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset selected image when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedImage(0);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Usar imágenes de la galería si están disponibles, sino usar la imagen principal
  const images = machinery.images || [machinery.image];

  // Traducir claves de especificaciones
  const specLabels: Record<string, string> = {
    weight: 'Peso',
    power: 'Potencia',
    capacity: 'Capacidad',
    width: 'Ancho',
    torque: 'Torque',
    maxSpeed: 'Velocidad Máx.',
    slope: 'Pendiente',
    maxLoad: 'Carga Máxima',
    grossWeight: 'Peso Bruto',
    dimensions: 'Dimensiones',
    length: 'Longitud',
    height: 'Altura',
    transmission: 'Transmisión',
    traction: 'Tracción',
    motor: 'Motor',
    emissions: 'Emisiones',
    drumDiameter: 'Diámetro Tambor',
    frequency: 'Frecuencia',
    amplitude: 'Amplitud',
    fuelTank: 'Tanque Combustible',
    configuration: 'Configuración',
    mobility: 'Movilidad',
    production: 'Producción', // Nueva traducción
    pumpFlow: 'Flujo de Bomba',
    sprayWidth: 'Ancho de Aspersión',
    platformLength: 'Largo Plataforma',
    platformWidth: 'Ancho Plataforma',
    loadingSystem: 'Sistema de Carga',
  };

  const handleWhatsApp = () => {
    const phoneNumber = '56978089545';
    const message = `¡Hola! Me interesa el arriendo de: ${machinery.name}. ¿Podrían darme más información sobre disponibilidad y tarifas?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Renderizar el modal usando portal para sacarlo del flujo del carousel
  const modalContent = (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full mx-auto overflow-hidden transform transition-all">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid md:grid-cols-2 gap-0 max-h-[90vh]">
            {/* Left: Image Gallery */}
            <div className="bg-gray-900 p-6 overflow-y-auto">
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden mb-4">
                <Image
                  src={images[selectedImage]}
                  alt={machinery.name}
                  fill
                  className="object-cover"
                  priority
                />

                {!machinery.available && (
                  <div className="absolute top-4 right-4 bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    No disponible
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition ${selectedImage === idx ? 'border-accent' : 'border-transparent hover:border-gray-500'
                        }`}
                    >
                      <Image
                        src={img}
                        alt={`${machinery.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details - Scrollable */}
            <div className="p-8 overflow-y-auto pb-24">
              {/* Category Badge */}
              <div className="inline-block bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-sm mb-4">
                {machinery.category}
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {machinery.name}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {machinery.description}
              </p>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Especificaciones Técnicas</h3>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(machinery.specs).map(([key, value]) => {
                    if (!value) return null;

                    return (
                      <div key={key} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600 font-medium">{specLabels[key] || key}</div>
                        <div className="font-semibold text-gray-900 text-right">{value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Mantenimiento certificado al día</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Operador certificado disponible</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Soporte técnico 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Transporte y logística incluidos</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition text-center flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </button>
                <a
                  href="tel:+56978089545"
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition text-center flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Llamar
                </a>
              </div>

              <div className="p-4 bg-accent/5 rounded-lg mb-8">
                <div className="flex items-center text-sm text-accent">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Tiempo de respuesta: Menos de 2 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Usar createPortal para renderizar el modal directamente en document.body
  return createPortal(modalContent, document.body);
}