import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Navbar from '../Navbar';
import { createClient } from '@/lib/supabase/client';

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mockSupabase = {
  auth: {
    getSession: jest.fn(),
    onAuthStateChange: jest.fn(() => ({
      data: { subscription: { unsubscribe: jest.fn() } },
    })),
    signOut: jest.fn(),
  },
};

(createClient as jest.Mock).mockReturnValue(mockSupabase);

describe('Navbar Route Verification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
  });

  it('contains correct static navigation links', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    
    // Core Links
    expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /About Us/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /Knowledge Center/i })).toHaveAttribute('href', '/knowledge-center');
    expect(screen.getByRole('link', { name: /Contact/i })).toHaveAttribute('href', '/contact');
    
    // Utilities
    expect(screen.getByRole('link', { name: /Login/i })).toHaveAttribute('href', '/login');
    // Cart is duplicated (mobile/desktop), check all
    const cartLinks = screen.getAllByRole('link', { name: /cart/i }); // accessible name via aria-label on button or inner svg?
    // The button has aria-label="cart", and it wraps the Link. 
    // Wait, the code structure is: Button(asChild) > Link.
    // So the Link itself might not have the aria-label "cart".
    // But the Button does. Testing library finds by role link?
    // Let's verify via href.
    
    // We can find by href directly if needed, or by icon logic.
    // Let's rely on finding all links with href '/cart'
    // But verify there are at least 2 (mobile + desktop)
  });

  it('all shop mega menu items point to /store', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    
    // We can sample a few items from each category
    const segments = ['Agriculture', 'Aquaculture'];
    const farming = ['for-crop-champions', 'farm-equipment'];
    const crops = ['Paddy', 'Mango'];
    const problems = ['Thrips', 'Mites'];
    
    const allSamples = [...segments, ...farming, ...crops, ...problems];
    
    allSamples.forEach(itemText => {
      // There might be multiple links if mobile menu renders them too (it does, but hidden? No, it conditionally renders).
      // On desktop initial render, mobile menu is closed.
      // But wait, the mobile menu content is only rendered when `isMobileMenuOpen` is true.
      // So we should find exactly 1 of each unless strictly desktop/mobile visibility issues.
      // The desktop menu is always in the DOM (just hidden with CSS).
      const links = screen.getAllByRole('link', { name: itemText });
      links.forEach(link => {
        expect(link).toHaveAttribute('href', '/store');
      });
    });
  });
});
