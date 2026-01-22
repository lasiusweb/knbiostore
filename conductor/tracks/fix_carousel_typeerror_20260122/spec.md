# Specification: Fix Carousel Component TypeError

## Overview
This track addresses a runtime `TypeError` in the `Carousel` component located at `src/components/ui/carousel.tsx`. The error `api.canScrollPrev is not a function` occurs within the `HeroSection` on the homepage. This appears to be caused by a mismatch or improper usage of the `embla-carousel-react` API within the `useEffect` hook of the `Carousel` component, likely triggered by recent updates to both the `Carousel` component and the `HeroSection`.

The goal is to investigate the root cause, fix the API usage in `carousel.tsx`, and ensure the `HeroSection` interacts correctly with the `Carousel` to prevent this crash across the application.

## Functional Requirements

### Error Resolution
- **Fix TypeError:** The application must not crash with `TypeError: api.canScrollPrev is not a function`.
- **API Availability Check:** The code must verify that the `api` object and its methods (`canScrollPrev`, `canScrollNext`) are fully initialized and available before attempting to call them.
- **State Updates:** `setCanScrollPrev` and `setCanScrollNext` should only be called when the `api` is ready.

### Component Behavior
- **Carousel Functionality:** The carousel in `HeroSection` (and any other usage) must continue to function correctly (scroll, auto-play if configured) after the fix.
- **Cross-Component Integrity:** Ensure that the fix in `src/components/ui/carousel.tsx` does not negatively impact other components using the `Carousel`.

## Non-Functional Requirements
- **Stability:** The application should be stable and free of runtime errors related to the carousel.
- **Performance:** The fix should not introduce unnecessary re-renders or performance regressions.

## Acceptance Criteria
- [ ] The homepage loads without the `Runtime TypeError`.
- [ ] The carousel in the `HeroSection` operates smoothly (navigation controls work, auto-scroll works if applicable).
- [ ] No console errors related to `api.canScrollPrev` or `api.canScrollNext` are observed during navigation.
- [ ] Automated tests (if applicable) pass.

## Out of Scope
- Major refactoring of the `embla-carousel-react` library integration beyond fixing this specific bug.
- Redesigning the `HeroSection` UI.
