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
  };
  image: string;
  available: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  machinery?: string;
  message: string;
}