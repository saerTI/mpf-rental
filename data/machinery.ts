// data/machinery.ts
import { Machinery } from '@/types';

export const machineryData: Machinery[] = [
  {
    id: 'cf-02',
    name: 'Pala Cargadora XCMG LW180KV',
    category: 'Maquinaria Pesada',
    description: 'Pala cargadora que combina potencia, versatilidad y eficiencia. Equipada con motor YTO de 80 HP y transmisión Powershift 4x4, ofrece gran capacidad de carga y excelente maniobrabilidad. Ideal para movimiento de tierra, carga de áridos y tareas de construcción o agrícolas.',
    specs: {
      weight: '6.200 kg',
      power: '80,4 HP @ 2200 rpm',
      capacity: '1,0 m³',
      torque: '270 N·m @ 1800 rpm',
      maxSpeed: '28 km/h',
      slope: '28°'
    },
    image: '/images/maquinaria/optimized/CF-02/fotos/imagen1.jpg',
    images: [
      '/images/maquinaria/optimized/CF-02/fotos/imagen1.jpg',
      '/images/maquinaria/optimized/CF-02/fotos/imagen2.jpg',
      '/images/maquinaria/optimized/CF-02/fotos/imagen3.jpg',
    ],
    available: true,
    pdfUrl: '/images/maquinaria/optimized/CF-02/ficha_tecnica.pdf'
  },
  {
    id: 'ct-01',
    name: 'Camión Tolva Sitrak G7 400',
    category: 'Transporte',
    description: 'Camión tolva que ofrece potencia, durabilidad y gran capacidad de carga. Equipado con motor de 400 HP y tolva HARDOX de 15 m³, es ideal para transporte de áridos, movimientos de tierra o faenas mineras. Transmisión ZF de 16 velocidades, suspensión reforzada y sistemas de seguridad ABS y ASR.',
    specs: {
      power: '400 HP',
      capacity: '15 m³ (HARDOX 450)',
      weight: '13.860 kg (tara)',
      maxLoad: '28.000 kg',
      grossWeight: '42.000 kg',
      dimensions: '5.300 × 2.300 × 1.300 mm'
    },
    image: '/images/maquinaria/optimized/CT-01/fotos/imagen1.jpg',
    images: [
      '/images/maquinaria/optimized/CT-01/fotos/imagen1.jpg',
      '/images/maquinaria/optimized/CT-01/fotos/imagen2.jpg',
      '/images/maquinaria/optimized/CT-01/fotos/imagen3.jpg',
      '/images/maquinaria/optimized/CT-01/fotos/imagen4.jpg',
    ],
    available: true,
    pdfUrl: '/images/maquinaria/optimized/CT-01/ficha_tecnica.pdf'
  },
  {
    id: 'ct-02',
    name: 'Camión Tolva JAC',
    category: 'Transporte',
    description: 'Camión tolva de alta resistencia marca JAC. Diseñado para transporte pesado de materiales en obras de construcción y movimientos de tierra. Robusto y confiable para trabajos exigentes.',
    specs: {
      capacity: '15 m³',
      configuration: '6x4'
    },
    image: '/images/maquinaria/optimized/CT-02/fotos/imagen1.jpg',
    images: [
      '/images/maquinaria/optimized/CT-02/fotos/imagen1.jpg',
      '/images/maquinaria/optimized/CT-02/fotos/imagen2.jpg',
      '/images/maquinaria/optimized/CT-02/fotos/imagen3.jpg',
    ],
    available: true
    // No tiene ficha técnica
  },
  {
    id: 'ex-01',
    name: 'Excavadora Shantui SE210-9',
    category: 'Maquinaria Pesada',
    description: 'Excavadora de orugas de alto rendimiento. Equipada con motor Cummins B5.9-C de 6 cilindros y capacidad de balde de 0.9 m³. Ideal para excavaciones, movimientos de tierra y trabajos de construcción pesada.',
    specs: {
      weight: '20.800 kg',
      power: '112 kW / 150 HP @ 1950 rpm',
      capacity: '0,9 m³ (0.45 - 1.0 m³)',
      motor: 'Cummins B5.9-C (6 cil.)',
      emissions: 'Tier 2'
    },
    image: '/images/maquinaria/optimized/EX-01/fotos/imagen4.jpg',
    images: [
      '/images/maquinaria/optimized/EX-01/fotos/imagen1.jpg',
      '/images/maquinaria/optimized/EX-01/fotos/imagen2.jpg',
      '/images/maquinaria/optimized/EX-01/fotos/imagen3.jpg',
      '/images/maquinaria/optimized/EX-01/fotos/imagen4.jpg',
    ],
    available: true,
    pdfUrl: '/images/maquinaria/optimized/EX-01/ficha_tecnica.pdf'
  },
  {
    id: 'mn-01',
    name: 'Motoniveladora John Deere 772G',
    category: 'Maquinaria Pesada',
    description: 'Motoniveladora 6×6 de alto rendimiento para nivelación y perfilado de caminos. Con transmisión PowerShift Plus de 8 velocidades y tracción en las 6 ruedas, ofrece precisión y control superiores en cualquier terreno.',
    specs: {
      weight: '17.530 - 20.500 kg',
      length: '8,89 m',
      width: '2,49 - 2,82 m',
      height: '3,18 m',
      transmission: 'PowerShift Plus 8 vel.',
      traction: '6x6 Hidrostática'
    },
    image: '/images/maquinaria/optimized/MN-01/fotos/imagen4.jpg',
    images: [
      '/images/maquinaria/optimized/MN-01/fotos/imagen1.jpg',
      '/images/maquinaria/optimized/MN-01/fotos/imagen2.jpg',
      '/images/maquinaria/optimized/MN-01/fotos/imagen3.jpg',
      '/images/maquinaria/optimized/MN-01/fotos/imagen4.jpg',
    ],
    available: true,
    pdfUrl: '/images/maquinaria/optimized/MN-01/ficha_tecnica.pdf'
  },
  {
    id: 'rt-01',
    name: 'Rodillo Compactador Cummins T4F',
    category: 'Maquinaria Pesada',
    description: 'Rodillo compactador de alto rendimiento con motor Cummins de 160 HP. Sistema vibratorio de doble frecuencia (32/36 Hz) y amplitud variable. Ideal para compactación de asfalto y bases. Cumple normas Tier 4 Final EPA / Etapa V UE.',
    specs: {
      weight: '11.709 kg',
      power: '160 HP @ 2200 RPM',
      width: '2.130 mm',
      drumDiameter: '1.500 mm',
      frequency: '32/36 Hz',
      amplitude: '1,8 / 0,9 mm',
      fuelTank: '200 L'
    },
    image: '/images/maquinaria/optimized/RT-01/fotos/imagen1.jpg',
    images: [
      '/images/maquinaria/optimized/RT-01/fotos/imagen1.jpg',
      '/images/maquinaria/optimized/RT-01/fotos/imagen2.jpg',
      '/images/maquinaria/optimized/RT-01/fotos/imagen3.jpg',
    ],
    available: true,
    pdfUrl: '/images/maquinaria/optimized/RT-01/ficha_tecnica.pdf'
  },
  {
    id: 'plantas',
    name: 'Planta de Áridos',
    category: 'Plantas',
    description: 'Planta de Áridos para producción en sitio. Alta capacidad de producción y eficiencia energética. Perfecta para proyectos de gran envergadura que requieren producción continua de mezcla asfáltica.',
    specs: {
      capacity: '160-200 ton/h',
      power: '320 HP',
      mobility: 'Totalmente móvil'
    },
    image: '/images/maquinaria/optimized/Plantas/fotos/imagen10.jpg',
    images: [
      '/images/maquinaria/optimized/Plantas/fotos/imagen1.jpg',
      '/images/maquinaria/optimized/Plantas/fotos/imagen2.jpg',
      '/images/maquinaria/optimized/Plantas/fotos/imagen3.jpg',
      '/images/maquinaria/optimized/Plantas/fotos/imagen10.jpg',
      '/images/maquinaria/optimized/Plantas/fotos/imagen12.jpg',
    ],
    available: true,
    pdfUrl: '/images/maquinaria/optimized/Plantas/ficha_tecnica.pdf'
  },
  {
    id: 'ca-01',
    name: 'Camión Aljibe Sinotruk HOWO A7',
    category: 'Transporte',
    description: 'Camión aljibe de alta capacidad marca Sinotruk modelo HOWO A7. Equipado con estanque de agua de gran volumen, ideal para control de polvo, riego de caminos y compactación en obras viales, mineras y de construcción. Robusto sistema de bombeo y aspersión para distribución uniforme del agua.',
    specs: {
      capacity: '15.000 L',
      power: '371 HP',
      configuration: '6x4',
      pumpFlow: '600 L/min',
      sprayWidth: '12-16 m'
    },
    image: '/images/maquinaria/optimized/CA-01/fotos/imagen1.jpg',
    images: [
      '/images/maquinaria/optimized/CA-01/fotos/imagen1.jpg',
      '/images/maquinaria/optimized/CA-01/fotos/imagen2.jpg',
      '/images/maquinaria/optimized/CA-01/fotos/imagen3.jpg',
      '/images/maquinaria/optimized/CA-01/fotos/imagen4.jpg',
    ],
    available: true,
    // pdfUrl: '/images/maquinaria/optimized/CA-01/ficha_tecnica.pdf'
  },
  {
    id: 'cr-01',
    name: 'Camión Cama Baja',
    category: 'Transporte',
    description: 'Camión cama baja especializado en transporte de maquinaria pesada. Diseñado para el traslado seguro de equipos de construcción, excavadoras, palas cargadoras y otras máquinas. Plataforma reforzada con rampas hidráulicas para carga y descarga eficiente. Ideal para movilización de equipos entre faenas en Chillán, Los Ángeles, Temuco, Valdivia, Osorno y Puerto Montt.',
    specs: {
      capacity: '25-30 ton',
      platformLength: '8-10 m',
      platformWidth: '2,5 m',
      loadingSystem: 'Rampas hidráulicas',
      configuration: '6x4'
    },
    image: '/images/maquinaria/optimized/CR-01/fotos/imagen1.jpeg',
    images: [
      '/images/maquinaria/optimized/CR-01/fotos/imagen1.jpeg',
      '/images/maquinaria/optimized/CR-01/fotos/imagen2.jpeg',
      '/images/maquinaria/optimized/CR-01/fotos/imagen3.jpeg',
      '/images/maquinaria/optimized/CR-01/fotos/imagen4.jpeg',
      '/images/maquinaria/optimized/CR-01/fotos/imagen5.jpeg',
    ],
    available: true
    // No tiene ficha técnica
  },
];

// Función helper para obtener máquina por ID
export function getMachineryById(id: string): Machinery | undefined {
  return machineryData.find(m => m.id === id);
}

// Función helper para obtener máquinas por categoría
export function getMachineryByCategory(category: string): Machinery[] {
  return machineryData.filter(m => m.category === category);
}

// Función helper para obtener todas las categorías únicas
export function getCategories(): string[] {
  return [...new Set(machineryData.map(m => m.category))];
}