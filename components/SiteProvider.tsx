'use client';

import { createContext, useContext } from 'react';
import type { SiteContent } from '@/types';
import { DEFAULT_SITE } from '@/lib/site-defaults';

const SiteContext = createContext<SiteContent | null>(null);

export function SiteProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: React.ReactNode;
}) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

/** Contenido del sitio (marca, hero, secciones, contacto). Cae a defaults. */
export function useSite(): SiteContent {
  return useContext(SiteContext) ?? DEFAULT_SITE;
}
