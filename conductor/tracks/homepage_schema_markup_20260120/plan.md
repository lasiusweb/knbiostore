# PLAN: JSON-LD SCHEMA MARKUP FOR MEGA HOMEPAGE

## Phase 1: SEO Utilities & Configuration
Establish the structural foundation for schema generation and the reusable injection component.

- [ ] Task: Define SEO Configuration & Types
    - [ ] Create `src/lib/seo-config.ts` to hold static SEO data (Social profiles, search URLs).
    - [ ] Define helper types for JSON-LD objects if necessary.
- [ ] Task: Create JsonLd Utility Component
    - [ ] Create `src/components/seo/JsonLd.tsx`.
    - [ ] Implement a safe script injection component that handles `dangerouslySetInnerHTML`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: SEO Utilities' (Protocol in workflow.md)

## Phase 2: Schema Object Generation
Implement the logic to construct the structured data objects using a mix of static config and mock data.

- [ ] Task: Implement Organization & LocalBusiness Schema
    - [ ] Create a helper function to generate Organization/LocalBusiness schema merging `mock-home.ts` and `seo-config.ts`.
- [ ] Task: Implement WebSite & Breadcrumb Schema
    - [ ] Create a helper function for WebSite (including Sitelinks Search Box) and BreadcrumbList.
- [ ] Task: Implement CollectionPage Schema
    - [ ] Create a helper function to map "Shop By" categories from `mock-home.ts` into a CollectionPage schema.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Schema Objects' (Protocol in workflow.md)

## Phase 3: Homepage Integration & Validation
Inject the generated schemas into the homepage and verify accuracy.

- [ ] Task: Integrate Schema into Homepage
    - [ ] Update `src/app/page.tsx` to include the `JsonLd` components for all required types.
- [ ] Task: Verify Schema Output
    - [ ] Manually verify the HTML output contains the correctly formatted JSON-LD blocks.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Integration' (Protocol in workflow.md)
