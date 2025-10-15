// components/MachineryGrid.tsx
import { machineryData } from '@/data/machinery';
import MachineryCard from './MachineryCard';

export default function MachineryGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestra Maquinaria
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Equipos de última generación para proyectos de pavimentación y reparación de caminos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {machineryData.map((machinery) => (
            <MachineryCard key={machinery.id} machinery={machinery} />
          ))}
        </div>
      </div>
    </section>
  );
}