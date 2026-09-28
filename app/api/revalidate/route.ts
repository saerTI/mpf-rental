// app/api/revalidate/route.ts
//
// Webhook de revalidación on-demand. crm-leads hace POST aquí al guardar
// contenido o maquinaria (header `x-secret`), y el sitio invalida su cache ISR
// para que el cambio se vea en la próxima visita, sin esperar el `revalidate`
// por tiempo de las páginas.
//
// Se usa revalidatePath (no revalidateTag) porque el contenido se lee con el
// SDK cliente de Firestore, no con fetch: no hay tags de fetch que invalidar.

import { timingSafeEqual } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function sameSecret(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    console.error('[revalidate] REVALIDATE_SECRET no configurado');
    return NextResponse.json({ error: 'No configurado' }, { status: 503 });
  }

  const secret = request.headers.get('x-secret') ?? '';
  if (!sameSecret(secret, expected)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  // Todo el sitio depende del mismo contenido (layout, home, SEO, sitemap).
  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
