// types/index.ts
export interface Machinery {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: {
    weight?: string;
    power?: string;
    capacity?: string;
    width?: string;
    [key: string]: string | undefined; // Para permitir specs adicionales
  };
  image: string;
  images?: string[]; // Galería de imágenes adicionales
  available: boolean;
  pdfUrl?: string; // URL del PDF con especificaciones técnicas
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  machinery?: string;
  message: string;
}