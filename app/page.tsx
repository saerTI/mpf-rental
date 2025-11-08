// app/page.tsx
import Hero from '@/components/Hero';
import Machinery from '@/components/Machinery';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Machinery />
      <About />
      <Contact />
    </>
  );
}