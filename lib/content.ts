// lib/content.ts
//
// Lectura del contenido del sitio desde el Firestore de crm-leads.
// MPF Rental es un renderer público: lee `sites/{tenant}` (doc con campo `site`)
// y `sites/{tenant}/machinery/{slug}` (subcolección). Reglas: lectura pública,
// por eso alcanza con el SDK cliente + config pública (sin service account).
//
// Sin config (local/demo) cae al seed de data/machinery.ts. Siempre degrada
// con `null`/seed en vez de romper el render.

import { cache } from 'react';
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { machineryData } from '@/data/machinery';
import { mergeSite } from '@/lib/site-defaults';
import type { Machinery, MachineryStatus, SiteContent } from '@/types';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

export const isContentConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId,
);

const TENANT = process.env.LEAD_TENANT || 'mpf-rental';

function db() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return getFirestore(app);
}

/** Contenido crudo desde Firestore (o null si no hay). */
async function fetchSite(): Promise<SiteContent | null> {
  if (!isContentConfigured) return null;
  try {
    const snap = await getDoc(doc(db(), 'sites', TENANT));
    if (!snap.exists()) return null;
    const data = snap.data() as { site?: SiteContent };
    return data.site ?? null;
  } catch (err) {
    console.error('[content] fetchSite:', err);
    return null;
  }
}

/**
 * Contenido del sitio, SIEMPRE completo (Firestore ∪ defaults).
 * Cacheado por request: layout, JSON-LD y generateMetadata comparten una lectura.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  return mergeSite(await fetchSite());
});

// ---------- Maquinaria ----------

function seedMachinery(): Machinery[] {
  // El seed local no tiene máquinas en mantención.
  return machineryData.map((m) => {
    const status: MachineryStatus = m.available === false ? 'arrendada' : 'disponible';
    return { ...m, status, available: status === 'disponible' };
  });
}

function toMachinery(id: string, x: Record<string, unknown>): Machinery & { order?: number } {
  const status = (x.status as MachineryStatus) ?? 'disponible';
  return {
    id,
    name: (x.name as string) ?? '',
    category: (x.category as string) ?? 'Maquinaria Pesada',
    description: (x.description as string) ?? '',
    specs: (x.specs as Machinery['specs']) ?? {},
    image: (x.image as string) ?? '',
    images: (x.images as string[]) ?? undefined,
    status,
    available: status === 'disponible',
    pdfUrl: (x.pdfUrl as string) ?? undefined,
    order: (x.order as number) ?? 999,
  };
}

/** Catálogo público: oculta 'mantencion' y ordena por `order`. */
export async function getMachinery(): Promise<Machinery[]> {
  if (!isContentConfigured) return seedMachinery();
  try {
    const snap = await getDocs(collection(db(), 'sites', TENANT, 'machinery'));
    return snap.docs
      .map((d) => toMachinery(d.id, d.data()))
      .filter((m) => m.status !== 'mantencion')
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  } catch (err) {
    console.error('[content] getMachinery:', err);
    return seedMachinery();
  }
}
