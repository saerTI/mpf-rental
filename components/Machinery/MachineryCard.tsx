// components/MachineryCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Machinery } from '@/types';
import MachineryModal from './MachineryModal';

interface MachineryCardProps {
  machinery: Machinery;
}

export default function MachineryCard({ machinery }: MachineryCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsApp = () => {
    const phoneNumber = '56912345678';
    const message = `¡Hola! Me interesa el arriendo de: ${machinery.name}. ¿Podrían darme más información?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
        {/* Image Container - Clickable */}
        <div 
          className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-pointer flex-shrink-0"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={machinery.image}
            alt={machinery.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
            <div className="text-white font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ver detalles
            </div>
          </div>

          {/* Status Badge */}
          {!machinery.available ? (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              No disponible
            </div>
          ) : (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              Disponible
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
            {machinery.category}
          </div>
        </div>
        
        {/* Content - flex-grow pushes buttons to bottom */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 
            className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {machinery.name}
          </h3>
          
          <p className="text-gray-600 mb-5 line-clamp-2 text-sm leading-relaxed">
            {machinery.description}
          </p>
          
          {/* Specs Grid - flex-grow pushes buttons down */}
          <div className="space-y-2 mb-6 flex-grow">
            {machinery.specs.weight && (
              <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-gray-500 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  Peso
                </span>
                <span className="text-gray-900 font-semibold">{machinery.specs.weight}</span>
              </div>
            )}
            {machinery.specs.power && (
              <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-gray-500 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Potencia
                </span>
                <span className="text-gray-900 font-semibold">{machinery.specs.power}</span>
              </div>
            )}
            {machinery.specs.capacity && (
              <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-gray-500 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Capacidad
                </span>
                <span className="text-gray-900 font-semibold">{machinery.specs.capacity}</span>
              </div>
            )}
          </div>
          
          {/* Action Buttons - Always at bottom */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 text-center"
            >
              Ver Detalles
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 text-center flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal - Renderizado fuera del carousel usando portal */}
      {isModalOpen && (
        <MachineryModal
          machinery={machinery}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}