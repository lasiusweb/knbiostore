# Specification: High-Fidelity Skeleton Loaders (KN Biosciences Brand)

## Overview
To improve the perceived performance and user experience of the KN BioStore application, we will implement high-fidelity skeleton loaders across all data-heavy pages. These loaders will replace blank states during data fetching, minimizing layout shift (CLS) and providing visual feedback that aligns with the KN Biosciences brand.

## Functional Requirements

### 1. Brand-Aligned Aesthetic
- **Visual Style:** Implement a "shimmer" or pulse effect using KN Biosciences' brand colors. Instead of standard neutral grays, use subtle earthy or plant-inspired tones (e.g., very light sage green or muted clay).
- **Animation:** Smooth, non-distracting pulse or shimmer transition.

### 2. High-Fidelity Components
- **Store Product List:** Skeletons must match the dimensions of the `ProductCard` (image placeholder, title line, description block, price tag, and button).
- **Admin Product List:** Implement skeleton rows for the Shadcn Table that match the column widths and row heights of the actual product data.
- **Product Detail Page:** Skeletons for the product gallery, technical specifications, and variant selectors.
- **Homepage Sections:** Specific skeletons for `ShopByCrop`, `ShopByProblem`, and `ShopBySegment` components.

### 3. Architectural Integration (Hybrid Approach)
- **Page Level:** Implement `loading.tsx` files for the `/store` and `/admin` routes to show immediate feedback during initial page load.
- **Component Level:** Wrap data-fetching components in `Suspense` boundaries with the high-fidelity skeletons as fallbacks.
- **State Management:** Ensure component-level loaders trigger correctly if client-side re-fetching occurs.

## Technical Requirements
- **Framework:** Utilize Next.js 15+ Streaming and `Suspense`.
- **Styling:** Extend the existing Shadcn `Skeleton` component or create a custom `Skeleton` utility in `src/components/ui`.
- **Performance:** Ensure skeleton components are lightweight and do not add significant overhead to the initial bundle.

## Acceptance Criteria
- [ ] Skeleton loaders appear immediately when navigating to Store, Admin, or Product Detail pages.
- [ ] Loaders precisely match the layout of the final content (no jumps or layout shifts when data arrives).
- [ ] Visual style uses the approved "Agricultural Microbes" color palette.
- [ ] No "blank" or "white" flashes during data fetching on any major route.

## Out of Scope
- Adding skeletons to static pages (e.g., Contact Us, About Us) where no data fetching occurs.
- Modifying actual data fetching logic or Supabase queries.
