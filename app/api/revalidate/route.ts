// app/api/revalidate/route.ts
//
// Invalidación de cache on-demand. crm-leads llama a este endpoint tras guardar
// el contenido del tenant (sites/{tenant}) para que la web refleje el cambio al
// instante, en vez de esperar el ISR de 60s.
//
// Auth: header `x-secret` == REVALIDATE_SECRET (mismo valor en ambos repos),
// comparado en tiempo constante.

import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createHash, timingSafeEqual } from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Comparación en tiempo constante (hash a longitud fija → sin fuga de longitud).
function tokensMatch(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    console.error('[revalidate] REVALIDATE_SECRET no configurado');
    return NextResponse.json({ error: 'No configurado' }, { status: 503 });
  }

  const provided = request.headers.get('x-secret') ?? '';
  if (!provided || !tokensMatch(provided, secret)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  // Sitio de una sola página: purgamos la home (lee Firestore fresco en la
  // próxima visita). Si a futuro hay más rutas por tenant, se amplía aquí.
  revalidatePath('/');

  return NextResponse.json({ revalidated: true, at: Date.now() });
}
