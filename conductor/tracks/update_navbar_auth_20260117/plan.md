# Implementation Plan: Update Navbar Authentication Display

## Phase 1: Setup and Initial Integration
- [ ] Task: Identify `Navbar.tsx` and relevant insertion points.
- [ ] Task: Configure Supabase client for client-side use.
    - [ ] Import `createClient` from `@/lib/supabase/client`.
    - [ ] Initialize Supabase client within the component.
- [ ] Task: Implement user session state and effect hook.
    - [ ] Add `useState` for user data.
    - [ ] Use `useEffect` to check `supabase.auth.getSession()` on component mount.
    - [ ] Update user state based on session data.
- [ ] Task: Conductor - User Manual Verification 'Setup and Initial Integration' (Protocol in workflow.md)

## Phase 2: UI Implementation - Guest State
- [ ] Task: Write tests for guest user Navbar display.
    - [ ] Create a test file for `Navbar.tsx`.
    - [ ] Write a test to assert "Login" button is visible when no user session.
    - [ ] Write a test to assert "Login" button links to `/login`.
- [ ] Task: Implement "Login" button for guest users.
    - [ ] Conditionally render "Login" button based on user state.
    - [ ] Set `href` for "Login" button to `/login`.
- [ ] Task: Conductor - User Manual Verification 'UI Implementation - Guest State' (Protocol in workflow.md)

## Phase 3: UI Implementation - Authenticated State
- [ ] Task: Write tests for authenticated user Navbar display.
    - [ ] Write a test to assert "Hi, {user.email}" is visible when user session exists.
    - [ ] Write a test to assert "Logout" button is visible when user session exists.
- [ ] Task: Implement user email and "Logout" button for authenticated users.
    - [ ] Conditionally render user email and "Logout" button based on user state.
    - [ ] Display `user.email` in the greeting.
- [ ] Task: Conductor - User Manual Verification 'UI Implementation - Authenticated State' (Protocol in workflow.md)

## Phase 4: Logout Functionality
- [ ] Task: Write tests for logout functionality.
    - [ ] Write a test to assert `supabase.auth.signOut()` is called on "Logout" button click.
    - [ ] Write a test to assert redirection to homepage after logout.
- [ ] Task: Implement logout action.
    - [ ] Add `onClick` handler to "Logout" button.
    - [ ] Call `supabase.auth.signOut()` within the handler.
    - [ ] Implement redirection to '/' after logout.
- [ ] Task: Conductor - User Manual Verification 'Logout Functionality' (Protocol in workflow.md)

## Phase 5: Styling and Final Adjustments
- [ ] Task: Write tests for styling and layout.
    - [ ] Write a test to assert buttons use Shadcn UI default styles (if testable programmatically).
    - [ ] Write a test to assert elements are grouped and positioned on the right (if testable programmatically).
- [ ] Task: Apply Shadcn UI styling and layout adjustments.
    - [ ] Ensure "Login" and "Logout" buttons utilize Shadcn UI components/classes.
    - [ ] Apply CSS/Tailwind classes to group and right-align authentication elements.
- [ ] Task: Conductor - User Manual Verification 'Styling and Final Adjustments' (Protocol in workflow.md)
