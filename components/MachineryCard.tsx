// components/MachineryCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Machinery } from '@/types';

interface MachineryCardProps {
  machinery: Machinery;
}

export default function MachineryCard({ machinery }: MachineryCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <Image
          src={machinery.image}
          alt={machinery.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {!machinery.available && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg animate-pulse">
            No disponible
          </div>
        )}
        {machinery.available && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            Disponible
          </div>
        )}
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
          {machinery.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {machinery.name}
        </h3>
        <p className="text-gray-600 mb-5 line-clamp-2 text-sm leading-relaxed">
          {machinery.description}
        </p>
        
        <div className="space-y-2.5 mb-6">
          {machinery.specs.weight && (
            <div className="flex justify-between items-center text-sm bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-gray-500 font-medium">Peso:</span>
              <span className="text-gray-900 font-semibold">{machinery.specs.weight}</span>
            </div>
          )}
          {machinery.specs.power && (
            <div className="flex justify-between items-center text-sm bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-gray-500 font-medium">Potencia:</span>
              <span className="text-gray-900 font-semibold">{machinery.specs.power}</span>
            </div>
          )}
          {machinery.specs.capacity && (
            <div className="flex justify-between items-center text-sm bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-gray-500 font-medium">Capacidad:</span>
              <span className="text-gray-900 font-semibold">{machinery.specs.capacity}</span>
            </div>
          )}
        </div>
        
        <Link 
          href="/contacto"
          className="block w-full text-center bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
        >
          Solicitar Información
        </Link>
      </div>
    </div>
  );
}