// app/(public)/layout.tsx
// Chrome del sitio público (header, footer, botón WhatsApp) + contenido del
// tenant vía SiteProvider. El admin/login ya no existen; esto es solo la web.
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { SiteProvider } from '@/components/SiteProvider';
import { getSiteContent } from '@/lib/content';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteContent();
  const { brand } = site;

  // JSON-LD LocalBusiness desde el contenido del tenant (SEO local).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.seo.siteUrl ?? ''}/#business`,
    name: brand.name,
    description: brand.description,
    url: site.seo.siteUrl,
    logo: brand.logo.full,
    image: site.seo.ogImage ?? brand.logo.full,
    telephone: brand.contact.phoneE164,
    email: brand.contact.email,
    priceRange: '$$',
    areaServed: brand.contact.areaServed.map((name) => ({ '@type': 'City', name })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: brand.contact.address.street,
      addressLocality: brand.contact.address.locality,
      addressRegion: brand.contact.address.region,
      addressCountry: brand.contact.address.country,
    },
    openingHoursSpecification: brand.contact.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => DAY_SCHEMA[d] ?? d),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(brand.social).filter(Boolean),
  };

  return (
    <SiteProvider value={site}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </SiteProvider>
  );
}

const DAY_SCHEMA: Record<string, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};
