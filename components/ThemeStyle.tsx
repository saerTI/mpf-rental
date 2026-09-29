// components/ThemeStyle.tsx
// Inyecta los colores de marca (Firestore) como variables CSS, sobreescribiendo
// los defaults de globals.css. Server component: el color va en el HTML inicial
// (sin flash). Los valores vacíos/ inválidos se omiten y caen al default.
import type { SiteBrand } from '@/types';
import { hexToRgbChannels } from '@/lib/site-defaults';

const VAR_MAP: Record<string, keyof SiteBrand['colors']> = {
  '--color-primary': 'primary',
  '--color-primary-hover': 'primaryHover',
  '--color-accent': 'accent',
  '--color-accent-hover': 'accentHover',
  '--color-secondary': 'secondary',
  '--color-navy': 'navy',
};

export default function ThemeStyle({ colors }: { colors: SiteBrand['colors'] }) {
  const decls = Object.entries(VAR_MAP)
    .map(([cssVar, key]) => {
      const channels = hexToRgbChannels(colors[key]);
      return channels ? `${cssVar}:${channels};` : '';
    })
    .join('');

  if (!decls) return null;
  return (
    <style dangerouslySetInnerHTML={{ __html: `:root{${decls}}` }} />
  );
}
