// components/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">MPF</span>
            <span className="text-2xl font-light text-gray-600 ml-1">Ingeniería</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition">
              Inicio
            </Link>
            <Link href="/maquinaria" className="text-gray-700 hover:text-gray-900 transition">
              Maquinaria
            </Link>
            <Link href="/contacto" className="text-gray-700 hover:text-gray-900 transition">
              Contacto
            </Link>
          </div>

          <div className="hidden md:block">
            <Link 
              href="/contacto"
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Solicitar Cotización
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
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

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-gray-900 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/maquinaria" 
                className="text-gray-700 hover:text-gray-900 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Maquinaria
              </Link>
              <Link 
                href="/contacto" 
                className="text-gray-700 hover:text-gray-900 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link 
                href="/contacto"
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Solicitar Cotización
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}