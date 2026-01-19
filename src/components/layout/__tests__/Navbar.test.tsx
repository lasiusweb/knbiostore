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

describe('Navbar Mega Menu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
  });

  it('renders core navigation links', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    
    expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /About Us/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /Knowledge Center/i })).toHaveAttribute('href', '/knowledge-center');
    expect(screen.getByRole('link', { name: /Contact/i })).toHaveAttribute('href', '/contact');
  });

  it('renders the "Shop" trigger', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
  });

  it('renders utility placeholders (Search, Account, Cart)', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    
    // We expect a search input or button
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    
    // Account/Login (already tested in previous track, but good to verify it's still there)
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    
    // Cart icon/link (desktop and mobile)
    expect(screen.getAllByLabelText(/cart/i)[0]).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', async () => {
    const { fireEvent } = require('@testing-library/react');
    await act(async () => {
      render(<Navbar />);
    });
    
    const toggleButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(toggleButton);
    
    // Mobile links should appear
    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(1);
  });
});
