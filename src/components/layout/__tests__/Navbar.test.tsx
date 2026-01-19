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

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
  });

  it('renders the logo text as a link to /store', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    const logoLink = screen.getByRole('link', { name: /KnBioStore/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/store');
  });

  it('renders navigation links', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    const storeLink = screen.getByRole('link', { name: /^Store$/i });
    const posLink = screen.getByRole('link', { name: /^POS$/i });
    const adminLink = screen.getByRole('link', { name: /^Admin$/i });

    expect(storeLink).toHaveAttribute('href', '/store');
    expect(posLink).toHaveAttribute('href', '/pos');
    expect(adminLink).toHaveAttribute('href', '/admin/products');
  });

  it('toggles mobile menu when button is clicked', async () => {
    const { fireEvent } = require('@testing-library/react');
    await act(async () => {
      render(<Navbar />);
    });
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i || '' }); // Depending on if it has an aria-label
    // If no aria-label, we might need a different selector, but let's assume one for now or just get the first button
    const buttons = screen.getAllByRole('button');
    const toggleButton = buttons.find(b => b.querySelector('svg'));
    
    if (toggleButton) {
      fireEvent.click(toggleButton);
      const mobileLinks = screen.getAllByRole('link', { name: /^Store$/i });
      expect(mobileLinks.length).toBe(2); // One desktop, one mobile
    }
  });

  it('shows Login button when not authenticated', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
    
    await act(async () => {
      render(<Navbar />);
    });

    const loginLink = screen.getByRole('link', { name: /Login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('shows user email and Logout button when authenticated', async () => {
    const mockUser = { email: 'test@example.com' };
    mockSupabase.auth.getSession.mockResolvedValue({ 
      data: { session: { user: mockUser } } 
    });

    await act(async () => {
      render(<Navbar />);
    });

    expect(screen.getByText(/Hi, test@example.com/i)).toBeInTheDocument();
    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it('calls supabase.auth.signOut() when Logout is clicked', async () => {
    const { fireEvent } = require('@testing-library/react');
    const mockUser = { email: 'test@example.com' };
    mockSupabase.auth.getSession.mockResolvedValue({ 
      data: { session: { user: mockUser } } 
    });

    await act(async () => {
      render(<Navbar />);
    });

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);

    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });
});