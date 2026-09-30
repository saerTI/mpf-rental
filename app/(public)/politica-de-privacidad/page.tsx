// app/(public)/politica-de-privacidad/page.tsx
//
// Política de privacidad pública. Meta la exige (Privacy Policy URL) para el
// App Review de la app que usa la WhatsApp Business Platform.

import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { getSiteContent } from '@/lib/content';
import { LEGAL } from '@/lib/legal';

// El contacto (email, WhatsApp) viene del contenido del tenant; mismo ISR que la home.
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Política de Privacidad | MPF Rental',
  description:
    'Cómo MPF Rental recopila, usa, comparte y protege tus datos personales, incluidos los mensajes que nos envías por WhatsApp.',
  alternates: { canonical: '/politica-de-privacidad' },
};

export default async function PrivacyPolicyPage() {
  const { brand } = await getSiteContent();
  const { contact } = brand;
  const whatsappUrl = `https://wa.me/${contact.whatsapp}`;

  return (
    <LegalPage
      title="Política de Privacidad"
      intro={`En ${brand.name} respetamos tu privacidad. Esta política explica qué datos personales recopilamos cuando visitas nuestro sitio web o te comunicas con nosotros por WhatsApp, para qué los usamos y qué derechos tienes sobre ellos.`}
    >
      <h2 id="responsable">1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de tus datos personales es{' '}
        <strong>{LEGAL.razonSocial}</strong>, RUT {LEGAL.rut}, que opera bajo la marca{' '}
        <strong>{brand.name}</strong>, con domicilio en {LEGAL.domicilio}.
      </p>
      <p>
        Para cualquier consulta sobre esta política o sobre tus datos puedes escribirnos a{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
      <p>
        Tratamos tus datos conforme a la Ley N° 19.628 sobre Protección de la Vida Privada y,
        desde su entrada en vigencia, a la Ley N° 21.719, que la modifica.
      </p>

      <h2 id="datos">2. Qué datos recopilamos</h2>

      <h3>Formulario de contacto del sitio web</h3>
      <p>Cuando solicitas una cotización a través del formulario, recopilamos:</p>
      <ul>
        <li>Nombre.</li>
        <li>Número de teléfono (obligatorio).</li>
        <li>Correo electrónico.</li>
        <li>La maquinaria que te interesa y el mensaje que nos escribes.</li>
      </ul>

      <h3>Mensajes por WhatsApp</h3>
      <p>
        Nos comunicamos con clientes y potenciales clientes mediante la WhatsApp Business
        Platform de Meta. Cuando nos escribes o te respondemos por WhatsApp, tratamos:
      </p>
      <ul>
        <li>Tu número de teléfono y el nombre de tu perfil de WhatsApp.</li>
        <li>
          El contenido de los mensajes que intercambiamos, incluidos los textos, imágenes,
          documentos, audios o ubicaciones que decidas enviarnos.
        </li>
        <li>La fecha y hora de los mensajes y su estado de entrega y lectura.</li>
      </ul>
      <p>
        No accedemos a tus contactos, a otras conversaciones ni a ninguna otra información de
        tu cuenta de WhatsApp.
      </p>

      <h3>Datos de campañas publicitarias</h3>
      <p>
        Si llegas al sitio desde un anuncio, guardamos en el almacenamiento local de tu
        navegador los parámetros de la campaña (identificador de clic de Google Ads y
        parámetros UTM). Si luego envías el formulario, esos parámetros se adjuntan a tu
        solicitud para saber qué campaña la originó. No usamos cookies de seguimiento ni
        píxeles de publicidad de terceros.
      </p>

      <h3>Datos técnicos</h3>
      <p>
        Nuestro proveedor de alojamiento registra datos técnicos de cada visita, como la
        dirección IP, el tipo de navegador y la fecha y hora de acceso, con fines de
        seguridad y funcionamiento del sitio.
      </p>

      <h2 id="finalidades">3. Para qué usamos tus datos</h2>
      <ul>
        <li>Responder tus consultas y enviarte cotizaciones.</li>
        <li>
          Coordinar y prestar el servicio de arriendo de maquinaria: disponibilidad,
          despacho, contratos y seguimiento.
        </li>
        <li>
          Enviarte por WhatsApp información relacionada con tu solicitud o con un servicio
          que tengas contratado con nosotros.
        </li>
        <li>Medir, de forma agregada, qué campañas publicitarias generan consultas.</li>
        <li>Cumplir obligaciones legales, contables y tributarias.</li>
      </ul>
      <p>
        Tratamos tus datos porque nos los entregas voluntariamente al contactarnos
        (consentimiento), porque son necesarios para preparar o ejecutar un contrato
        contigo, o porque la ley nos lo exige.
      </p>
      <p>
        <strong>No vendemos ni arrendamos tus datos personales</strong>, y no los usamos para
        crear perfiles publicitarios ni los compartimos con terceros para que te envíen
        publicidad. Solo te escribimos por WhatsApp si tú nos contactaste primero o nos
        diste tu número para ese fin.
      </p>

      <h2 id="terceros">4. Con quién compartimos tus datos</h2>
      <p>
        Compartimos tus datos únicamente con los proveedores que necesitamos para operar,
        que los tratan por cuenta nuestra y bajo nuestras instrucciones:
      </p>
      <ul>
        <li>
          <strong>Meta Platforms, Inc. y WhatsApp LLC</strong>, como proveedores de la
          WhatsApp Business Platform, para transmitir y almacenar los mensajes. WhatsApp
          también trata datos según su propia{' '}
          <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            política de privacidad
          </a>
          .
        </li>
        <li>
          <strong>Vercel Inc.</strong>, proveedor de alojamiento del sitio web.
        </li>
        <li>
          <strong>Google LLC (Google Cloud / Firebase)</strong>, donde almacenamos las
          solicitudes de contacto en nuestro sistema de gestión de clientes.
        </li>
      </ul>
      <p>
        Estos proveedores pueden almacenar datos en servidores ubicados fuera de Chile,
        principalmente en Estados Unidos. En esos casos exigimos que apliquen medidas de
        seguridad adecuadas.
      </p>
      <p>
        También podemos entregar datos a autoridades públicas cuando una ley o una orden
        judicial lo exija.
      </p>

      <h2 id="conservacion">5. Cuánto tiempo conservamos tus datos</h2>
      <p>
        Conservamos tus datos mientras mantengamos una relación comercial contigo y, si no
        llegas a contratar, hasta 24 meses desde tu último contacto con nosotros. Pasado ese
        plazo los eliminamos o anonimizamos, salvo la información que debamos conservar por
        más tiempo para cumplir obligaciones legales, como la normativa tributaria.
      </p>
      <p>
        Puedes pedirnos que eliminemos tus datos antes de ese plazo en cualquier momento (ver
        la sección 7).
      </p>

      <h2 id="seguridad">6. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra
        acceso no autorizado, pérdida o alteración: conexiones cifradas (HTTPS), acceso
        restringido al personal que lo necesita y credenciales que nunca se exponen en el
        navegador. Los mensajes de WhatsApp viajan cifrados entre tu dispositivo y la
        plataforma de Meta.
      </p>

      <h2 id="derechos">7. Tus derechos</h2>
      <p>Respecto de tus datos personales, tienes derecho a:</p>
      <ul>
        <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti y cómo los usamos.</li>
        <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
        <li><strong>Supresión:</strong> pedir que eliminemos tus datos.</li>
        <li><strong>Oposición:</strong> oponerte a que usemos tus datos para ciertos fines.</li>
        <li>
          <strong>Portabilidad y bloqueo</strong>, en los términos que establezca la Ley N°
          21.719 una vez vigente.
        </li>
      </ul>
      <p>
        Para ejercerlos, escríbenos a <a href={`mailto:${contact.email}`}>{contact.email}</a>{' '}
        o por <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>{' '}
        indicando tu nombre, tu número de teléfono y qué derecho quieres ejercer. Para
        eliminar tus datos sigue las instrucciones de nuestra página de{' '}
        <Link href="/eliminacion-de-datos">eliminación de datos</Link>.
      </p>
      <p>
        Ejercer estos derechos es gratuito. Si consideras que no atendimos correctamente tu
        solicitud, puedes recurrir a las autoridades competentes.
      </p>

      <h3>Dejar de recibir mensajes por WhatsApp</h3>
      <p>
        Si no quieres recibir más mensajes nuestros por WhatsApp, respóndenos con la palabra{' '}
        <strong>BAJA</strong> y dejaremos de escribirte. También puedes bloquear nuestro
        número directamente desde WhatsApp.
      </p>

      <h2 id="almacenamiento-local">8. Almacenamiento local del navegador</h2>
      <p>
        El sitio no usa cookies de seguimiento. Solo guarda en el almacenamiento local de tu
        navegador los parámetros de campaña descritos en la sección 2, que no te identifican
        por sí solos. Puedes borrarlos cuando quieras eliminando los datos de este sitio
        desde la configuración de tu navegador.
      </p>

      <h2 id="menores">9. Menores de edad</h2>
      <p>
        Nuestros servicios están dirigidos a empresas y personas mayores de 18 años. No
        recopilamos a sabiendas datos de menores de edad; si detectamos que lo hicimos, los
        eliminaremos.
      </p>

      <h2 id="cambios">10. Cambios a esta política</h2>
      <p>
        Podemos actualizar esta política para reflejar cambios en nuestros servicios o en la
        ley. Publicaremos la versión vigente en esta página, con su fecha de última
        actualización.
      </p>

      <h2 id="contacto">11. Contacto</h2>
      <ul>
        <li>
          Correo: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          WhatsApp:{' '}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            +{contact.whatsapp}
          </a>
        </li>
        <li>Domicilio: {LEGAL.domicilio}</li>
      </ul>
    </LegalPage>
  );
}
