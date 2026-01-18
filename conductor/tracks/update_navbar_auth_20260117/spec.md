# Update Navbar Authentication Display

## Overview
This feature enhances the global navigation bar (Navbar) to dynamically display authentication-related options based on the user's login status. Guests will see a "Login" button, while authenticated users will see a greeting with their email address and a "Logout" button.

## Functional Requirements

### FR1: Dynamic Navbar Content
- The Navbar SHALL display different content based on the user's authentication status.

### FR1.1: Guest User Display
- When a user is not logged in, the Navbar SHALL display a "Login" button.
- The "Login" button SHALL link to the '/login' page.

### FR1.2: Authenticated User Display
- When a user is logged in, the Navbar SHALL display a greeting in the format "Hi, {user.email}".
- The Navbar SHALL also display a "Logout" button next to the user's email.

### FR2: User Session Management
- The Navbar component SHALL import `createClient` from `@/lib/supabase/client`.
- The Navbar component SHALL maintain a user state to track the authenticated user.
- Upon component mount, the Navbar component SHALL check the Supabase session using `supabase.auth.getSession()`.
- If a session exists, the user state SHALL be populated with the session's user information.

### FR3: Logout Functionality
- Clicking the "Logout" button SHALL call `supabase.auth.signOut()`.
- After successful logout, the user SHALL be redirected to the homepage ('/').

## Non-Functional Requirements

### NFR1: Styling and Layout
- The "Login" and "Logout" buttons SHALL use the default styles from the component library (Shadcn UI).
- The authentication-related elements (Login button, user email, Logout button) SHALL be grouped together and positioned on the right side of the Navbar.

### NFR2: Performance
- The authentication status check and UI updates SHALL occur efficiently to avoid any noticeable delay during page load or state changes.

## Acceptance Criteria
- As a guest user, I can see a "Login" button in the Navbar.
- As a guest user, clicking the "Login" button navigates me to the '/login' page.
- As a logged-in user, I can see "Hi, my.email@example.com" and a "Logout" button in the Navbar.
- As a logged-in user, clicking the "Logout" button logs me out and redirects me to the homepage.
- The Navbar styling for authentication elements uses default Shadcn UI styles and is positioned on the right.

## Out of Scope
- User registration functionality.
- Password reset functionality.
- Detailed error handling UI for authentication failures (beyond what Supabase provides by default).
- Styling of the overall Navbar beyond the new authentication elements.
