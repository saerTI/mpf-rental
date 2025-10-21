// components/MachineryModal.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Machinery } from '@/types';

interface MachineryModalProps {
  machinery: Machinery;
  isOpen: boolean;
  onClose: () => void;
}

export default function MachineryModal({ machinery, isOpen, onClose }: MachineryModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!isOpen) return null;

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
    mobility: 'Movilidad'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
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

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Image Gallery */}
            <div className="bg-gray-900 p-6">
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden mb-4">
                <Image
                  src={images[selectedImage]}
                  alt={machinery.name}
                  fill
                  className="object-cover"
                />
                
                {!machinery.available && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
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
                      className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === idx ? 'border-blue-500' : 'border-transparent hover:border-gray-500'
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

            {/* Right: Details */}
            <div className="p-8 max-h-[80vh] overflow-y-auto">
              {/* Category Badge */}
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
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
                    
                    // Traducir claves comunes
                    const labels: Record<string, string> = {
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
                      mobility: 'Movilidad'
                    };

                    return (
                      <div key={key} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600 font-medium">{labels[key] || key}</div>
                        <div className="font-semibold text-gray-900 text-right">{value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PDF Download Button */}
              {machinery.pdfUrl && (
                <div className="mb-8">
                  <a
                    href={machinery.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all border-2 border-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Descargar Ficha Técnica (PDF)
                  </a>
                </div>
              )}

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
              <div className="flex gap-3">
                <Link
                  href="/contacto"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition text-center"
                >
                  Solicitar Cotización
                </Link>
                <a
                  href="tel:+56912345678"
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
                >
                  Llamar Ahora
                </a>
              </div>

              {/* Contact Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center text-sm text-blue-900">
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
}