// lib/tracking.ts
//
// Captura y persiste la atribución de campaña (gclid de Google Ads + UTMs) para
// adjuntarla al lead. Así crm-leads puede calcular el costo-por-lead por campaña.

const KEY = 'mpf_tracking';

export interface Tracking {
  gclid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

/** Lee gclid/UTM de la URL actual y los guarda (last-touch) si hay alguno. */
export function captureTrackingFromUrl(): void {
  if (typeof window === 'undefined') return;
  const p = new URLSearchParams(window.location.search);
  const t: Tracking = {
    gclid: p.get('gclid') ?? undefined,
    utmSource: p.get('utm_source') ?? undefined,
    utmMedium: p.get('utm_medium') ?? undefined,
    utmCampaign: p.get('utm_campaign') ?? undefined,
    utmTerm: p.get('utm_term') ?? undefined,
    utmContent: p.get('utm_content') ?? undefined,
  };
  if (!Object.values(t).some(Boolean)) return; // no había parámetros
  try {
    localStorage.setItem(KEY, JSON.stringify(t));
  } catch {
    /* localStorage no disponible (modo privado, etc.) */
  }
}

/** Devuelve la atribución guardada, o {} si no hay. */
export function getTracking(): Tracking {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Tracking;
  } catch {
    return {};
  }
}
