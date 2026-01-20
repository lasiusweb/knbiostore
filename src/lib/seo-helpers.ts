import { MOCK_HOME_DATA } from '@/data/mock-home';
import { SEO_CONFIG } from '@/lib/seo-config';

export function generateOrganizationSchema() {
  const { brandStory } = MOCK_HOME_DATA;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: SEO_CONFIG.logoUrl,
    sameAs: SEO_CONFIG.socialProfiles,
    contactPoint: {
      '@type': 'ContactPoint',
      ...SEO_CONFIG.contactPoint,
    },
    founder: {
      '@type': 'Person',
      name: brandStory.founder.name,
      jobTitle: brandStory.founder.title,
    },
    description: SEO_CONFIG.description,
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SEO_CONFIG.siteName,
    image: SEO_CONFIG.logoUrl,
    '@id': SEO_CONFIG.siteUrl,
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.contactPoint.telephone,
    address: {
      '@type': 'PostalAddress',
      ...SEO_CONFIG.address,
    },
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        opens: '09:00',
        closes: '18:00',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/store?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateCollectionPageSchema() {
  const { shopBySegment, shopByCrop } = MOCK_HOME_DATA;

  // Combining segments and crops as main collections
  const collections = [
    ...shopBySegment.items.map(item => ({ name: item.name, url: item.link })),
    ...shopByCrop.items.map(item => ({ name: item.name, url: item.link })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'KN BioStore Collections',
    description: 'Browse our agricultural products by segment, crop, or problem.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: collections.map((col, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SEO_CONFIG.siteUrl}${col.url}`,
        name: col.name,
      })),
    }
  };
}
