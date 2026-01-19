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
    expect(screen.getByRole('button', { name: /Shop/i })).toBeInTheDocument();
  });

  it('renders utility placeholders (Search, Account, Cart)', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getAllByLabelText(/cart/i)[0]).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    
    const toggleButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(toggleButton);
    
    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(1);
  });

  describe('Desktop Mega Menu Content', () => {
    it('contains the 4 main categories', async () => {
      await act(async () => {
        render(<Navbar />);
      });
      
      // In a real browser, this is visibility: hidden until hover
      // In JSDOM, we just check if they are in the document
      expect(screen.getByText(/Shop by Segment/i)).toBeInTheDocument();
      expect(screen.getByText(/Farming Segment/i)).toBeInTheDocument();
      expect(screen.getByText(/Shop by Crop/i)).toBeInTheDocument();
      expect(screen.getByText(/Shop By Problem/i)).toBeInTheDocument();
    });

    it('contains specific items linked to /store', async () => {
      await act(async () => {
        render(<Navbar />);
      });
      
      const agricultureLink = screen.getByRole('link', { name: /Agriculture/i });
      expect(agricultureLink).toHaveAttribute('href', '/store');

      const paddyLink = screen.getByRole('link', { name: /Paddy/i });
      expect(paddyLink).toHaveAttribute('href', '/store');

      const thripsLink = screen.getByRole('link', { name: /Thrips/i });
      expect(thripsLink).toHaveAttribute('href', '/store');
    });
  });
});