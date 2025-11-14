// components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
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

      if (isScrollingRef.current) {
        return;
      }

      const sections = ['inicio', 'maquinaria', 'nosotros', 'contacto'];
      const scrollOffset = 100;
      const scrollPosition = window.scrollY + scrollOffset;
      
      let currentSection = 'inicio';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

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
    isScrollingRef.current = true;
    setActiveSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
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
        ? 'bg-white/98 backdrop-blur-sm shadow-md' 
        : 'bg-[#3d4e7c] shadow-sm'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('inicio')} 
            className="flex items-center group relative h-12"
          >
            {/* Logo para fondo azul (cuando NO está scrolled) */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${
              isScrolled ? 'opacity-0' : 'opacity-100'
            }`}>
              <Image
                src="/logo/mpf_rental_blanco.png"
                alt="MPF Rental"
                width={180}
                height={48}
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            
            {/* Logo para fondo blanco (cuando está scrolled) */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}>
              <Image
                src="/logo/mpf_rental_morado.png"
                alt="MPF Rental"
                width={180}
                height={48}
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            
            {/* Espaciador invisible para mantener el espacio */}
            <div className="w-[180px] h-12"></div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection('inicio')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('inicio') 
                  ? isScrolled 
                    ? 'bg-[#ff7d6c] text-white' 
                    : 'bg-white/20 text-white'
                  : isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('maquinaria')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('maquinaria') 
                  ? isScrolled 
                    ? 'bg-[#ff7d6c] text-white' 
                    : 'bg-white/20 text-white'
                  : isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Maquinaria
            </button>
            <button
              onClick={() => scrollToSection('nosotros')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('nosotros') 
                  ? isScrolled 
                    ? 'bg-[#ff7d6c] text-white' 
                    : 'bg-white/20 text-white'
                  : isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('contacto') 
                  ? isScrolled 
                    ? 'bg-[#ff7d6c] text-white' 
                    : 'bg-white/20 text-white'
                  : isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Contacto
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="tel:+56912345678"
              className={`p-2 transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-[#ff7d6c]' : 'text-white/80 hover:text-white'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <button
              onClick={() => scrollToSection('contacto')}
              className="bg-[#ff7d6c] text-white px-6 py-2.5 rounded-lg hover:bg-[#ff6b5a] transition-all font-semibold shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2"
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
            className={`md:hidden p-2 rounded-lg transition ${
              isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
            }`}
          >
            <svg
              className={`h-6 w-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
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
                    ? 'bg-[#ff7d6c] text-white'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-gray-50'
                      : 'text-white/90 hover:bg-white/10'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('maquinaria')}
                className={`px-4 py-3 rounded-lg font-medium transition text-left ${
                  isActive('maquinaria') 
                    ? 'bg-[#ff7d6c] text-white'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-gray-50'
                      : 'text-white/90 hover:bg-white/10'
                }`}
              >
                Maquinaria
              </button>
              <button
                onClick={() => scrollToSection('nosotros')}
                className={`px-4 py-3 rounded-lg font-medium transition text-left ${
                  isActive('nosotros') 
                    ? 'bg-[#ff7d6c] text-white'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-gray-50'
                      : 'text-white/90 hover:bg-white/10'
                }`}
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className={`px-4 py-3 rounded-lg font-medium transition text-left ${
                  isActive('contacto') 
                    ? 'bg-[#ff7d6c] text-white'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-gray-50'
                      : 'text-white/90 hover:bg-white/10'
                }`}
              >
                Contacto
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="bg-[#ff7d6c] text-white px-6 py-3 rounded-lg hover:bg-[#ff6b5a] transition text-center font-semibold mt-2"
              >
                Solicitar Cotización
              </button>
              <a 
                href="tel:+56975372435"
                className={`flex items-center justify-center gap-2 border-2 px-6 py-3 rounded-lg transition text-center font-semibold ${
                  isScrolled 
                    ? 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
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