# SPECIFICATION: JSON-LD SCHEMA MARKUP FOR MEGA HOMEPAGE

## OVERVIEW
Implement structured data using JSON-LD (JSON for Linked Data) for the KN Biosciences Mega Homepage. This will improve SEO by helping search engines understand the site's content, organization, and search capabilities, potentially leading to rich results (Knowledge Graph, Sitelinks Search Box, etc.).

## FUNCTIONAL REQUIREMENTS

### 1. SCHEMA TYPES
- **Organization:** Define KN Biosciences, including logo, social profiles, and founder (P. Sudha Reddy).
- **WebSite:** Define the site and include Sitelinks Search Box potential.
- **LocalBusiness:** Specific details for the Hyderabad headquarters.
- **BreadcrumbList:** Define the home root in the hierarchy.
- **CollectionPage:** Describe the "Shop By" sections (Segment, Crop, Problem) as structured collections.

### 2. CORE COMPONENTS
- **JsonLd Component:** Create a reusable React component `src/components/seo/JsonLd.tsx` that renders the `<script type="application/ld+json">` tag safely.
- **Homepage Integration:** Inject the specific homepage schemas into `src/app/page.tsx`.

### 3. DATA INTEGRATION
- **Hybrid Data Sourcing:** 
  - Pull address, helpline, and founder details from `src/data/mock-home.ts`.
  - Add SEO-specific fields (site search URL, social profile URLs) as constants within the SEO component or a separate SEO config file.

### 4. SEO FEATURES
- **Logo:** Explicitly define the site logo URL for Google's Knowledge Graph.
- **Contact Point:** Define the helpline (+91 92810 30822) as "customer service".
- **Sitelinks Search Box:** Add a `potentialAction` to the WebSite schema pointing to the store's search functionality (e.g., `/store?search={search_term_string}`).
- **Social Profiles:** Include links to Facebook, Twitter, LinkedIn, etc., as `sameAs` links.

## NON-FUNCTIONAL REQUIREMENTS
- **Performance:** JSON-LD should be rendered server-side to ensure search engine crawlers can read it without executing complex JS.
- **Validation:** Schema must pass the Google Rich Results Test and the Schema Markup Validator.
- **Maintainability:** Use a clean, modular structure for constructing the JSON objects.

## ACCEPTANCE CRITERIA
- [ ] `src/components/seo/JsonLd.tsx` is created and functional.
- [ ] Homepage renders multiple schema blocks (Organization, WebSite, LocalBusiness).
- [ ] Schema data dynamically reflects the content in `mock-home.ts`.
- [ ] Sitelinks Search Box markup is correctly formatted.
- [ ] All social media and contact points are included in the Organization schema.

## OUT OF SCOPE
- Automated SEO auditing tools.
- Product-specific schemas (this is handled in the Product Detail tracks).
- Real-time updates to schema via an admin UI (future track).
