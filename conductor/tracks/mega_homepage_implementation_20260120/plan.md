# PLAN: MEGA HOMEPAGE IMPLEMENTATION (CMS-READY)

## Phase 1: Foundation & Data Modeling
Build the structural foundation and populate the comprehensive mock data.

- [x] Task: Define CMS Data Interfaces
    - [ ] Create `src/lib/types/home-cms.ts` including interfaces for Segment, Crop, Problem, and Champion categories.
- [x] Task: Implement Mock CMS Data
    - [ ] Create `src/data/mock-home.ts` and populate it with ALL the specific items (Agriculture, Paddy, Thrips, etc.) and brand content.
- [x] Task: Scaffold Home Component Directory
    - [ ] Create `src/components/home/` folder.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation' (Protocol in workflow.md)

## Phase 2: Core Layout & Global Components
Integrate global elements.

- [x] Task: Implement Global Coupon Banner
    - [ ] Create `src/components/home/CouponBanner.tsx`.
    - [ ] Integrate into `src/app/layout.tsx` above the Navbar.
- [x] Task: Implement Global Floating Feedback Button
    - [ ] Create `src/components/home/FloatingFeedback.tsx` using Shadcn Dialog.
    - [ ] Add to `src/app/layout.tsx`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Core Layout' (Protocol in workflow.md)

## Phase 3: Dynamic Category Grids (The "Shop By" Sections)
Implement the specific grid sections.

- [x] Task: Implement "Shop By Segment" Grid
    - [ ] Create `src/components/home/ShopBySegment.tsx` (3-col grid).
- [x] Task: Implement "Shop By Crop" Grid
    - [ ] Create `src/components/home/ShopByCrop.tsx` (5-col grid).
- [x] Task: Implement "Shop By Problem" Grid
    - [ ] Create `src/components/home/ShopByProblem.tsx` (3-col grid).
- [x] Task: Implement "For Champions" Grid
    - [ ] Create `src/components/home/ChampionSelector.tsx` (4-col grid).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Category Grids' (Protocol in workflow.md)

## Phase 4: Story, Hero & Assembly
Build the narrative sections and assemble the full page.

- [x] Task: Implement Hero Carousel
    - [ ] Create `src/components/home/HeroSection.tsx` using Shadcn Carousel.
- [x] Task: Implement Brand Story & Value Prop
    - [ ] Create `src/components/home/BrandStory.tsx`.
- [x] Task: Implement Newsletter & Footer
    - [ ] Create `src/components/home/NewsletterSignup.tsx` and `src/components/home/HomeFooter.tsx`.
- [x] Task: Assemble Homepage
    - [ ] Update `src/app/page.tsx` to stack all components in the correct order: Navbar > Banner > Hero > Segments > Crops > Problems > Champions > Story > Newsletter > Footer.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Assembly' (Protocol in workflow.md)
