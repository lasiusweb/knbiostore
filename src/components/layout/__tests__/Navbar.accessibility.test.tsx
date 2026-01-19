import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
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

describe('Navbar Accessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
  });

  it('nav container has correct role and label', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('mobile menu toggle has aria-expanded state', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    const toggleButton = screen.getByLabelText(/toggle menu/i);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('desktop shop menu trigger has aria attributes', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    // The desktop shop trigger is the one with text "Shop" and class "group" parent usually, 
    // but here we can identify it by excluding the mobile one if needed, or better, 
    // simply checking the button that contains "Shop".
    // However, there are two buttons with "Shop" (Desktop and Mobile).
    // The Desktop one is visible initially. The Mobile one is only in the mobile menu.
    
    // Let's find the desktop trigger. It is the one that is visible initially (hidden on mobile, flex on md).
    // We can rely on structure or just check all Shop buttons for appropriate ARIA if feasible.
    // Better: look for the one in the right side nav.
    
    const shopButtons = screen.getAllByRole('button', { name: /Shop/i });
    // The desktop one usually appears first or we can check visibility if we had full styles mock. 
    // We will assume the first one is desktop or filter by absence of 'w-full'.
    const desktopTrigger = shopButtons.find(b => !b.classList.contains('w-full'));
    
    expect(desktopTrigger).toBeInTheDocument();
    expect(desktopTrigger).toHaveAttribute('aria-haspopup', 'true');
    expect(desktopTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('search input has accessible label', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    const searchInputs = screen.getAllByPlaceholderText(/Search/i);
    // There are two search inputs (desktop and mobile). Both should be accessible.
    searchInputs.forEach(input => {
      expect(input).toHaveAttribute('aria-label', 'Search products');
    });
  });
});
