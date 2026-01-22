# Implementation Plan - Fix Carousel Component TypeError

## Phase 1: Diagnosis & Reproduction (Red Phase)
- [x] **Task: Analyze Carousel Implementation.** Read `src/components/ui/carousel.tsx` and `src/components/home/HeroSection.tsx` (or where the Hero Section is defined) to understand how the carousel is initialized and how the API is being accessed. (4f7835e)
- [x] **Task: Create Reproduction Test.** Create a test file `src/components/ui/__tests__/carousel-bug.test.tsx` that attempts to mount the `Carousel` component in a way that mimics the failure (e.g., ensuring `useEffect` runs). Use `jest` and `react-testing-library`. (f1a9b0a)
    - [x] **Sub-task:** Write a test case that mocks the `embla-carousel-react` hook and attempts to trigger the state update.
    - [x] **Sub-task:** Verify the test fails with the expected error (or a similar error indicating the issue).
- [x] **Task: Conductor - User Manual Verification 'Diagnosis & Reproduction' (Protocol in workflow.md).** [checkpoint: d8ca1e0]

## Phase 2: Implementation (Green Phase)
- [x] **Task: Apply Fix to Carousel Component.** Modify `src/components/ui/carousel.tsx`. (613060d)
    - [x] **Sub-task:** Add a guard clause inside the `useEffect` (or the `onSelect` callback) to check if `api` is defined and if `api.canScrollPrev` and `api.canScrollNext` are functions before calling them.
    - [x] **Sub-task:** Ensure the component handles the case where `api` is not yet ready gracefully.
- [x] **Task: Verify Fix with Tests.** Run the reproduction test again to ensure it now passes. (6aee12e)
- [ ] **Task: Conductor - User Manual Verification 'Implementation' (Protocol in workflow.md).**

## Phase 3: Verification & Integration
- [ ] **Task: Manual Verification.** Run the development server (`npm run dev`) and navigate to the homepage. Confirm the error is gone and the carousel works.
- [ ] **Task: Conductor - User Manual Verification 'Verification & Integration' (Protocol in workflow.md).**
