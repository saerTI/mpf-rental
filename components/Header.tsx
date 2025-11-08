// components/Header.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // No actualizar la sección activa si estamos en medio de un scroll programático
      if (isScrollingRef.current) {
        return;
      }

      // Detectar sección activa
      const sections = ['inicio', 'maquinaria', 'nosotros', 'contacto'];
      
      // Ajustar el offset para mejor detección (header height + margen)
      const scrollOffset = 100; // Aumentado de 80 a 100 para mejor detección
      
      // Obtener la posición actual del scroll
      const scrollPosition = window.scrollY + scrollOffset;
      
      // Encontrar la sección activa basándose en la posición
      let currentSection = 'inicio';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          // Si hemos pasado el inicio de esta sección
          if (scrollPosition >= offsetTop) {
            currentSection = section;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Ejecutar al cargar y al hacer scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Marcar que estamos haciendo scroll programático
    isScrollingRef.current = true;
    
    // Actualizar inmediatamente la sección activa para feedback visual
    setActiveSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset ajustado para mejor visualización de la sección completa
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Limpiar timeout anterior si existe
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Desmarcar después de que termine el smooth scroll (típicamente 500-1000ms)
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
    setIsMenuOpen(false);
  };

  const isActive = (section: string) => activeSection === section;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
        : 'bg-white shadow-sm'
    }`}>
      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('inicio')} 
            className="flex items-center group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">MPF</span>
                <span className="text-2xl font-light text-gray-600 ml-1">Rental</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection('inicio')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('inicio') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('maquinaria')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('maquinaria') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Maquinaria
            </button>
            <button
              onClick={() => scrollToSection('nosotros')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('nosotros') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('contacto') 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Contacto
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="tel:+56912345678"
              className="text-gray-600 hover:text-blue-600 transition p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <button
              onClick={() => scrollToSection('contacto')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Cotizar
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('inicio')}
                className={`px-4 py-3 rounded-lg font-medium transition text-left ${
                  isActive('inicio') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('maquinaria')}
                className={`px-4 py-3 rounded-lg font-medium transition text-left ${
                  isActive('maquinaria') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Maquinaria
              </button>
              <button
                onClick={() => scrollToSection('nosotros')}
                className={`px-4 py-3 rounded-lg font-medium transition text-left ${
                  isActive('nosotros') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className={`px-4 py-3 rounded-lg font-medium transition text-left ${
                  isActive('contacto') 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Contacto
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition text-center font-semibold mt-2"
              >
                Solicitar Cotización
              </button>
              <a 
                href="tel:+56912345678"
                className="flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition text-center font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamar Ahora
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}