// components/Hero.tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useSite } from '@/components/SiteProvider';

export default function Hero() {
  const { hero } = useSite();
  const bgRef = useRef<HTMLDivElement>(null);

  // Parallax: la imagen de fondo se desplaza a ~0.3x del scroll, más lento
  // que el hero, dando la sensación de que "se scrollea primero".
  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.3}px, 0)`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // CTA: '#seccion' hace scroll suave; cualquier otra cosa es un enlace normal.
  const handleCta = (href: string) => {
    if (href.startsWith('#')) scrollToSection(href.slice(1));
    else window.open(href, href.startsWith('http') ? '_blank' : '_self');
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-start bg-gradient-to-br from-navy via-lightBlue to-lightBlue scroll-mt-0"
    >
      {/* Background Image & Overlay (con parallax) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Contenedor a tamaño real (inset-0): el parallax hacia abajo no deja
            huecos, así evitamos el sobre-escalado que pixelaba la imagen. */}
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <Image
            src={hero.image}
            alt="Maquinaria de construcción"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
            priority
          />
          {/* Overlay oscuro (20% más claro que antes: 95/80/40 → 75/60/20) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/20"></div>
        </div>
      </div>

      {/* Curva inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-32 md:pt-40 pb-40">
        <div className="max-w-3xl">
          {/* Badge */}
          {hero.badge && (
            <div className="inline-block mb-6 animate-fade-in">
              <span className="bg-accent text-gray-900 px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                {hero.badge}
              </span>
            </div>
          )}

          {/* Título Principal */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            {hero.title}
            {hero.titleHighlight && (
              <>
                {' '}
                <span className="text-accent underline decoration-accent/30 underline-offset-8">
                  {hero.titleHighlight}
                </span>
              </>
            )}
          </h1>

          {/* Descripción */}
          {hero.subtitle && (
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed animate-slide-up delay-200">
              {hero.subtitle}
            </p>
          )}

          {/* Botones CTA */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
            <button
              onClick={() => handleCta(hero.cta.href)}
              className="bg-accent text-gray-900 px-8 py-4 rounded-lg hover:bg-accent-hover transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              {hero.cta.label}
            </button>
            {hero.ctaSecondary && (
              <button
                onClick={() => handleCta(hero.ctaSecondary!.href)}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all font-semibold text-lg border-2 border-white/30 shadow-xl"
              >
                {hero.ctaSecondary.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}