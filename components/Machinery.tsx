'use client';

import { useState, useEffect } from 'react';
import { machineryData } from '@/data/machinery';
import MachineryCard from './Machinery/MachineryCard';

export default function Machinery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Detectar tamaño de pantalla para responsive
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsToShow(1);
      } else if (width < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allCategories = ['all', ...new Set(machineryData.map(m => m.category))];

  const categories = allCategories.map(cat => ({
    id: cat,
    name: cat === 'all' ? 'Todas' : cat
  }));

  const filteredMachinery = selectedCategory === 'all'
    ? machineryData
    : machineryData.filter(m => m.category === selectedCategory);

  const maxIndex = Math.max(0, filteredMachinery.length - itemsToShow);

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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  const totalDots = maxIndex + 1;

  // CORRECCIÓN: Cálculo preciso del ancho sin gaps
  const cardWidth = 100 / itemsToShow;

  return (
    <section
      id="maquinaria"
      className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 scroll-mt-0 py-12 md:py-16 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 md:mb-3 tracking-tight">
            Nuestra Maquinaria
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Equipos de última generación para sus proyectos de construcción
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 md:px-5 py-2 rounded-lg font-medium transition-all duration-300 text-xs md:text-sm ${selectedCategory === category.id
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-200'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Contador */}
        <div className="text-center mb-4 md:mb-6">
          <p className="text-xs text-gray-500">
            {filteredMachinery.length} {filteredMachinery.length === 1 ? 'máquina disponible' : 'máquinas disponibles'}
          </p>
        </div>

        {/* Carousel Container */}
        {filteredMachinery.length > 0 ? (
          <div className="relative">
            {/* Navigation Arrows - Desktop */}
            {filteredMachinery.length > itemsToShow && (
              <>
                <button
                  onClick={goToPrevious}
                  disabled={isTransitioning}
                  className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 xl:-translate-x-6 z-10 bg-white hover:bg-primary text-gray-900 hover:text-white p-3 xl:p-4 rounded-full shadow-lg transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 items-center justify-center"
                  aria-label="Anterior"
                >
                  <svg
                    className="w-6 h-6 xl:w-8 xl:h-8 transition-transform group-hover:-translate-x-1"
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
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 xl:translate-x-6 z-10 bg-white hover:bg-primary text-gray-900 hover:text-white p-3 xl:p-4 rounded-full shadow-lg transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 items-center justify-center"
                  aria-label="Siguiente"
                >
                  <svg
                    className="w-6 h-6 xl:w-8 xl:h-8 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Cards Container - CORREGIDO: Sin gap en el flex, usando padding en tarjetas */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * cardWidth}%)`
                }}
              >
                {filteredMachinery.map((machinery, index) => (
                  <div
                    key={machinery.id}
                    className="flex-shrink-0 px-2 md:px-3 lg:px-4"
                    style={{
                      width: `${cardWidth}%`
                    }}
                  >
                    <MachineryCard machinery={machinery} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            {filteredMachinery.length > itemsToShow && (
              <div className="flex justify-center gap-2 mt-6 md:mt-8">
                {Array.from({ length: totalDots }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                      }`}
                    aria-label={`Ir a slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Botones de navegación mobile */}
            {filteredMachinery.length > itemsToShow && (
              <div className="flex lg:hidden justify-center gap-3 mt-4">
                <button
                  onClick={goToPrevious}
                  disabled={isTransitioning}
                  className="bg-gradient-to-r from-navy to-darkBlue hover:from-accent hover:to-accent-hover text-white hover:text-gray-900 p-3 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Anterior"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  disabled={isTransitioning}
                  className="bg-gradient-to-r from-navy to-darkBlue hover:from-accent hover:to-accent-hover text-white hover:text-gray-900 p-3 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Siguiente"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-base md:text-lg">
              No se encontraron máquinas en esta categoría
            </p>
          </div>
        )}
      </div>
    </section>
  );
}