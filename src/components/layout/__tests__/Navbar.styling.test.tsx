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

describe('Navbar Styling & Transitions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
  });

  it('mega menu container has polished transition classes', async () => {
    await act(async () => {
      render(<Navbar />);
    });
    
    // We need to find the Mega Menu container. It contains "Shop by Segment".
    // Since it's hidden initially, we might need to find it by text.
    // However, checking classes on a hidden element is fine.
    
    const segmentHeader = screen.getByText('Shop by Segment');
    // Traverse up to the container
    // Structure: div(container) > div(grid) > div > h3(header)
    const container = segmentHeader.closest('.absolute');
    
    expect(container).toBeInTheDocument();
    
    // Check for transition classes
    expect(container).toHaveClass('transition-all');
    expect(container).toHaveClass('duration-300'); // Refinement: Slower, smoother
    expect(container).toHaveClass('ease-in-out'); // Refinement: Easing
    
    // Check for transform animation classes (slide down effect)
    expect(container).toHaveClass('transform');
    expect(container).toHaveClass('origin-top');
    
    // Check for hover state classes
    expect(container).toHaveClass('group-hover:opacity-100');
    expect(container).toHaveClass('group-hover:visible');
    // We want a slight vertical movement
    expect(container).toHaveClass('group-hover:translate-y-0');
    expect(container).toHaveClass('-translate-y-2'); // Initial state
  });
});
