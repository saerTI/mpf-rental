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
    production?: string; // Nueva propiedad
    [key: string]: string | undefined;
  };
  image: string;
  images?: string[];
  available: boolean;
  pdfUrl?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  machinery?: string;
  message: string;
}