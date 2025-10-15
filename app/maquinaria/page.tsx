// app/maquinaria/page.tsx
'use client';

import { useState } from 'react';
import { machineryData } from '@/data/machinery';
import MachineryCard from '@/components/MachineryCard';

export default function MaquinariaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(machineryData.map(m => m.category))];

  const filteredMachinery = selectedCategory === 'all' 
    ? machineryData 
    : machineryData.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Catálogo de Maquinaria
          </h1>
          <p className="text-xl text-gray-300">
            Encuentra el equipo perfecto para tu proyecto
          </p>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'Todas' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredMachinery.length} {filteredMachinery.length === 1 ? 'máquina' : 'máquinas'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMachinery.map((machinery) => (
            <MachineryCard key={machinery.id} machinery={machinery} />
          ))}
        </div>
      </div>
    </div>
  );
}