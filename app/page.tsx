// app/page.tsx
import Hero from '@/components/Hero';
import MachineryGrid from '@/components/MachineryGrid';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <MachineryGrid />
      <About />
      <Contact />
    </>
  );
}