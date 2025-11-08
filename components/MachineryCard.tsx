// components/MachineryCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Machinery } from '@/types';
import MachineryModal from './MachineryModal';

interface MachineryCardProps {
  machinery: Machinery;
}

export default function MachineryCard({ machinery }: MachineryCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Link 
              href="/contacto"
              className="flex-1 border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 text-center"
            >
              Disponibilidad
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      <MachineryModal
        machinery={machinery}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}