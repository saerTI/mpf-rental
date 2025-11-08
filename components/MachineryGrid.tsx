// components/MachineryGrid.tsx
'use client';

import { useState } from 'react';
import { machineryData } from '@/data/machinery';
import MachineryCard from './MachineryCard';

export default function MachineryGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Categorías disponibles
  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'Maquinaria pesada', name: 'Maquinaria Pesada' },
    { id: 'Camionetas', name: 'Camionetas' },
    { id: 'Camiones', name: 'Camiones' },
    { id: 'Plantas', name: 'Plantas' }
  ];

  // Filtrar maquinaria por categoría
  const filteredMachinery = selectedCategory === 'all' 
    ? machineryData 
    : machineryData.filter(m => m.category === selectedCategory);

  // Cantidad de items a mostrar por slide
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(filteredMachinery.length / itemsPerSlide);

  // Obtener items del slide actual
  const getCurrentSlideItems = () => {
    const start = currentIndex * itemsPerSlide;
    const end = start + itemsPerSlide;
    return filteredMachinery.slice(start, end);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Reset index cuando cambia la categoría
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestra Maquinaria
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Equipos de última generación para proyectos de pavimentación y reparación de caminos
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
                aria-label="Anterior"
              >
                <svg 
                  className="w-6 h-6 transition-transform group-hover:-translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group"
                aria-label="Siguiente"
              >
                <svg 
                  className="w-6 h-6 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Cards Grid */}
          <div className="overflow-hidden px-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
              {getCurrentSlideItems().map((machinery) => (
                <MachineryCard key={machinery.id} machinery={machinery} />
              ))}
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'bg-blue-600 w-8 h-3'
                    : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Mostrando{' '}
            <span className="font-semibold text-gray-900">
              {getCurrentSlideItems().length}
            </span>{' '}
            de{' '}
            <span className="font-semibold text-gray-900">
              {filteredMachinery.length}
            </span>{' '}
            {filteredMachinery.length === 1 ? 'máquina' : 'máquinas'}
          </p>
        </div>
      </div>
    </section>
  );
}