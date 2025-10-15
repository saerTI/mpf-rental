// data/machinery.ts
import { Machinery } from '@/types';

export const machineryData: Machinery[] = [
  {
    id: '1',
    name: 'Pavimentadora de Asfalto',
    category: 'Pavimentación',
    description: 'Pavimentadora autopropulsada ideal para trabajos de asfaltado de carreteras y caminos. Alta precisión y rendimiento.',
    specs: {
      weight: '15.000 kg',
      power: '129 HP',
      width: '3.0 - 6.0 m',
      capacity: '600 ton/h'
    },
    image: '/images/maquina1.jpg',
    available: true
  },
  {
    id: '2',
    name: 'Rodillo Compactador Vibratorio',
    category: 'Compactación',
    description: 'Rodillo de doble tambor vibratorio para compactación de asfalto y suelos. Excelente para acabados de alta calidad.',
    specs: {
      weight: '12.000 kg',
      power: '95 HP',
      width: '2.13 m',
      capacity: '10 ton'
    },
    image: '/images/maquina2.jpg',
    available: true
  },
  {
    id: '3',
    name: 'Fresadora de Asfalto',
    category: 'Demolición y Fresado',
    description: 'Fresadora de alta potencia para remoción de pavimento asfáltico. Ideal para trabajos de repavimentación.',
    specs: {
      weight: '18.500 kg',
      power: '450 HP',
      width: '2.0 m',
      capacity: '300 m³/h'
    },
    image: '/images/maquina3.png',
    available: true
  },
  {
    id: '4',
    name: 'Motoniveladora',
    category: 'Nivelación',
    description: 'Motoniveladora de alto rendimiento para nivelación y perfilado de caminos. Precisión y control superiores.',
    specs: {
      weight: '16.000 kg',
      power: '190 HP',
      width: '3.7 m'
    },
    image: '/images/maquina4.png',
    available: true
  },
  {
    id: '5',
    name: 'Planta de Asfalto Móvil',
    category: 'Producción',
    description: 'Planta de asfalto móvil para producción en sitio. Alta capacidad de producción y eficiencia energética.',
    specs: {
      weight: '45.000 kg',
      power: '320 HP',
      capacity: '200 ton/h'
    },
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600',
    available: true
  },
  {
    id: '6',
    name: 'Camión Distribuidor de Asfalto',
    category: 'Distribución',
    description: 'Camión distribuidor de emulsión asfáltica con control automatizado. Distribución uniforme garantizada.',
    specs: {
      weight: '18.000 kg',
      capacity: '6.000 L',
      width: '2.5 m'
    },
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600',
    available: false
  },
  {
    id: '7',
    name: 'Recicladora de Pavimento',
    category: 'Reciclaje',
    description: 'Máquina recicladora para recuperación y estabilización de pavimentos existentes. Sostenible y económica.',
    specs: {
      weight: '22.000 kg',
      power: '500 HP',
      width: '2.4 m'
    },
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
    available: true
  },
  {
    id: '8',
    name: 'Compactador de Neumáticos',
    category: 'Compactación',
    description: 'Rodillo compactador de neumáticos para compactación de capas asfálticas. Acabado liso y uniforme.',
    specs: {
      weight: '25.000 kg',
      power: '160 HP',
      capacity: '27 ton'
    },
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600',
    available: true
  }
];