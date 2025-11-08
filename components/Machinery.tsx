// components/Machinery.tsx
'use client';

import { useState, useEffect } from 'react';
import { machineryData } from '@/data/machinery';
import MachineryCard from './Machinery/MachineryCard';

export default function Machinery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Generar categorías dinámicamente desde los datos
  const allCategories = ['all', ...new Set(machineryData.map(m => m.category))];
  
  const categories = allCategories.map(cat => ({
    id: cat,
    name: cat === 'all' ? 'Todas' : cat
  }));

  // Filtrar maquinaria por categoría
  const filteredMachinery = selectedCategory === 'all' 
    ? machineryData 
    : machineryData.filter(m => m.category === selectedCategory);

  // Número de items visibles según el tamaño de pantalla
  const getItemsToShow = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calcular el máximo índice posible
  const maxIndex = Math.max(0, filteredMachinery.length - itemsToShow);

  // Navegación del carousel
  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next > maxIndex ? 0 : next;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const previous = prev - 1;
      return previous < 0 ? maxIndex : previous;
    });
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Reset index cuando cambia la categoría
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  // Auto-play opcional (comentado por defecto)
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);
  */

  // Calcular número de dots
  const totalDots = maxIndex + 1;

  return (
    <section id="maquinaria" className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestra Maquinaria
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Equipos de última generación para proyectos de pavimentación y reparación de caminos
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gray-900 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Contador de resultados */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-base">
            Mostrando{' '}
            <span className="font-semibold text-gray-900">
              {filteredMachinery.length}
            </span>{' '}
            {filteredMachinery.length === 1 ? 'máquina' : 'máquinas'}
          </p>
        </div>

        {/* Carousel Container */}
        {filteredMachinery.length > 0 ? (
          <div className="relative">
            {/* Navigation Arrows - Solo mostrar si hay más items que los visibles */}
            {filteredMachinery.length > itemsToShow && (
              <>
                <button
                  onClick={goToPrevious}
                  disabled={isTransitioning}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 bg-white hover:bg-gray-900 text-gray-900 hover:text-white p-4 rounded-full shadow-2xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Anterior"
                >
                  <svg 
                    className="w-6 h-6 transition-transform group-hover:-translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={goToNext}
                  disabled={isTransitioning}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 bg-white hover:bg-gray-900 text-gray-900 hover:text-white p-4 rounded-full shadow-2xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Siguiente"
                >
                  <svg 
                    className="w-6 h-6 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Cards Container con animación suave */}
            <div className="overflow-hidden px-2">
              <div 
                className="flex transition-transform duration-500 ease-out gap-8"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`
                }}
              >
                {filteredMachinery.map((machinery) => (
                  <div
                    key={machinery.id}
                    className="flex-shrink-0"
                    style={{
                      width: `calc(${100 / itemsToShow}% - ${(itemsToShow - 1) * 32 / itemsToShow}px)`
                    }}
                  >
                    <MachineryCard machinery={machinery} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron máquinas en esta categoría
            </p>
          </div>
        )}

        {/* Dots Navigation - Solo mostrar si hay más items que los visibles */}
        {filteredMachinery.length > itemsToShow && totalDots > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${
                  currentIndex === index
                    ? 'bg-gray-900 w-10 h-3'
                    : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="#contacto"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <span>Solicitar Cotización</span>
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}