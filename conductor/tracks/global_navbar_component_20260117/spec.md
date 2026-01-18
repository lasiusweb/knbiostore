# Track: Global Navbar Component

## Overview
This track involves creating a Client Component `src/components/layout/Navbar.tsx` to serve as a global navigation menu. It will allow users to easily switch between the 'Store', 'POS', and 'Admin' sections of the application. The Navbar will feature a fixed header design, a text logo, and navigation links.

## Functional Requirements
1.  **Component Creation:** Create a new Client Component file `src/components/layout/Navbar.tsx`.
2.  **Fixed Header Design:**
    *   Implement a simple fixed header at the top of the viewport.
    *   Apply styling for a white background and a subtle shadow.
3.  **Logo:**
    *   Display the text 'KnBioStore' on the left side of the Navbar.
    *   This text logo will function as a link, navigating to the 'Store' page (`/store`).
4.  **Navigation Links:**
    *   Display navigation links on the right side of the Navbar: 'Store', 'POS', 'Admin'.
    *   Use Shadcn Button (ghost variant) for these links.
    *   Links should use Next.js Link component to route to the following paths:
        *   'Store' -> `/store`
        *   'POS' -> `/pos`
        *   'Admin' -> `/admin/products`
    *   The 'Store' link will be visually emphasized as the primary entry point.
5.  **Mobile Responsiveness:**
    *   On smaller screens, the navigation links will collapse into a hamburger menu (or similar mobile navigation pattern).

## Non-Functional Requirements
*   **User Experience:** Intuitive and easy navigation between core application sections.
*   **Responsiveness:** The Navbar must be fully responsive and adapt gracefully to various screen sizes, especially mobile.
*   **Aesthetics:** Clean and modern design consistent with the overall application theme.
*   **Maintainability:** The component should be modular, well-structured, and easy to extend.

## Acceptance Criteria
*   The `Navbar.tsx` component is created and renders correctly.
*   A fixed header with a white background and shadow is displayed at the top.
*   The 'KnBioStore' text logo is present on the left and navigates to `/store` when clicked.
*   'Store', 'POS', and 'Admin' links are displayed on the right, using Shadcn Button (ghost variant) and Next.js Link components.
*   The 'Store' link is visually emphasized.
*   The Navbar transitions to a hamburger menu (or similar) on smaller screens, and the navigation links are accessible through it.
*   All navigation links correctly route to their specified paths.

## Out of Scope
*   Authentication/authorization logic for accessing 'Admin' or 'POS' routes (only navigation is handled).
*   Dynamic active link highlighting (basic routing is sufficient).
*   Dropdown menus or sub-navigation items within the Navbar.
*   Internationalization (i18n) for link text.
