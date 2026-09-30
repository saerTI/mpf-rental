// app/(public)/eliminacion-de-datos/page.tsx
//
// Instrucciones para solicitar la eliminación de datos. Meta la acepta como
// "Data Deletion Instructions URL" en el App Review (la app no usa Facebook
// Login, así que no se requiere un callback de eliminación).

import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { getSiteContent } from '@/lib/content';

// El contacto (email, WhatsApp) viene del contenido del tenant; mismo ISR que la home.
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Eliminación de Datos | MPF Rental',
  description:
    'Cómo solicitar a MPF Rental la eliminación de tus datos personales, incluidos tus mensajes de WhatsApp y las solicitudes enviadas desde el sitio web.',
  alternates: { canonical: '/eliminacion-de-datos' },
};

const DELETE_KEYWORD = 'ELIMINAR MIS DATOS';

export default async function DataDeletionPage() {
  const { brand } = await getSiteContent();
  const { contact } = brand;
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(DELETE_KEYWORD)}`;
  const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent('Solicitud de eliminación de datos')}`;

  return (
    <LegalPage
      title="Eliminación de Datos"
      intro={`Puedes pedirnos en cualquier momento que eliminemos los datos personales que ${brand.name} tiene sobre ti, incluidos los mensajes que intercambiamos por WhatsApp. Aquí te explicamos cómo hacerlo.`}
    >
      <h2 id="que-se-elimina">Qué datos eliminamos</h2>
      <p>Al procesar tu solicitud eliminamos de nuestros sistemas:</p>
      <ul>
        <li>
          Tu nombre, número de teléfono, correo electrónico y demás datos de contacto.
        </li>
        <li>
          El historial de conversaciones de WhatsApp con nosotros, incluidos los archivos
          que nos hayas enviado.
        </li>
        <li>
          Las solicitudes de cotización enviadas desde el sitio web, junto con los datos de
          campaña asociados.
        </li>
      </ul>

      <h2 id="como-solicitar">Cómo solicitar la eliminación</h2>
      <p>Elige cualquiera de estas dos vías:</p>

      <h3>Opción 1: por WhatsApp</h3>
      <ol>
        <li>
          Escríbenos al{' '}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            +{contact.whatsapp}
          </a>{' '}
          desde el mismo número con el que te comunicaste con nosotros.
        </li>
        <li>
          Envía el mensaje <strong>{DELETE_KEYWORD}</strong>.
        </li>
      </ol>
      <p>Como el mensaje llega desde tu número, no necesitamos más datos para identificarte.</p>

      <h3>Opción 2: por correo electrónico</h3>
      <ol>
        <li>
          Escribe a <a href={mailtoUrl}>{contact.email}</a> con el asunto{' '}
          <strong>Solicitud de eliminación de datos</strong>.
        </li>
        <li>
          Indica tu nombre y el número de teléfono (y el correo, si corresponde) con el que
          te comunicaste con nosotros, para poder encontrar tus datos.
        </li>
      </ol>
      <p>
        Si la solicitud llega desde un correo o número distinto al registrado, podemos
        pedirte que confirmes tu identidad antes de eliminar los datos, para evitar que un
        tercero borre información que no le pertenece.
      </p>

      <h2 id="plazos">Plazos y confirmación</h2>
      <ul>
        <li>Confirmaremos que recibimos tu solicitud dentro de 2 días hábiles.</li>
        <li>
          Eliminaremos tus datos dentro de un plazo máximo de 30 días corridos desde la
          recepción y te avisaremos por el mismo medio cuando esté hecho.
        </li>
      </ul>

      <h2 id="excepciones">Información que podemos conservar</h2>
      <p>
        Si contrataste un servicio con nosotros, debemos conservar la información mínima
        necesaria para cumplir obligaciones legales, como facturas y registros contables y
        tributarios, durante el plazo que exija la ley. Esa información no se usa para
        ningún otro fin y se elimina cuando vence ese plazo.
      </p>

      <h2 id="whatsapp">Tu cuenta y tus chats de WhatsApp</h2>
      <p>
        Esta solicitud elimina los datos que <strong>{brand.name}</strong> tiene sobre ti. No
        borra la conversación en tu propio teléfono (puedes eliminarla desde la app de
        WhatsApp) ni los datos que WhatsApp conserva sobre tu cuenta, que se rigen por la{' '}
        <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          política de privacidad de WhatsApp
        </a>
        .
      </p>

      <h2 id="navegador">Datos guardados en tu navegador</h2>
      <p>
        Los parámetros de campaña que el sitio guarda en tu navegador no llegan a nosotros a
        menos que envíes el formulario. Puedes borrarlos tú mismo eliminando los datos de
        este sitio desde la configuración de tu navegador.
      </p>

      <p className="mt-12 text-sm text-gray-500">
        Para más información sobre cómo tratamos tus datos, revisa nuestra{' '}
        <Link href="/politica-de-privacidad">Política de Privacidad</Link>.
      </p>
    </LegalPage>
  );
}
