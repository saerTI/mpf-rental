// app/api/contact/route.ts
//
// Puente entre el landing y el microservicio crm-leads.
// El formulario del sitio hace POST aquí (mismo origen, sin CORS) y este
// handler reenvía el lead al crm-leads server-to-server, con el secreto
// compartido en el header (nunca expuesto al navegador).

import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ContactBody {
  nombre?: string;
  telefono?: string;
  email?: string;
  maquinariaInteres?: string;
  mensaje?: string;
  // Atribución de campaña capturada en el landing (gclid + UTMs).
  tracking?: Record<string, string>;
}

export async function POST(request: NextRequest) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const telefono = body.telefono?.trim();
  if (!telefono) {
    return NextResponse.json(
      { error: 'El teléfono es obligatorio' },
      { status: 422 },
    );
  }

  const base = process.env.CRM_LEADS_URL;
  if (!base) {
    console.error('[contact] CRM_LEADS_URL no está configurado');
    return NextResponse.json(
      { error: 'Servicio no disponible por ahora' },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(`${base}/api/leads/web`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Secreto compartido; crm-leads lo valida (P0 de seguridad de ese lado).
        ...(process.env.CRM_LEADS_SECRET
          ? { 'x-api-secret': process.env.CRM_LEADS_SECRET }
          : {}),
      },
      body: JSON.stringify({
        nombre: body.nombre?.trim() || undefined,
        telefono,
        email: body.email?.trim() || undefined,
        maquinariaInteres: body.maquinariaInteres?.trim() || undefined,
        mensaje: body.mensaje?.trim() || undefined,
        tracking: body.tracking,
        source: 'web',
        tenant: process.env.LEAD_TENANT || 'mpf-rental',
      }),
      // No dejamos colgada la request del usuario si crm-leads tarda.
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error(`[contact] crm-leads respondió ${res.status}`);
      return NextResponse.json(
        { error: 'No pudimos enviar tu solicitud. Intenta por WhatsApp.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('[contact] error reenviando a crm-leads:', err);
    return NextResponse.json(
      { error: 'No pudimos enviar tu solicitud. Intenta por WhatsApp.' },
      { status: 502 },
    );
  }
}
