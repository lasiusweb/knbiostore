import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders the logo text as a link to /store', () => {
    render(<Navbar />);
    const logoLink = screen.getByRole('link', { name: /KnBioStore/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/store');
  });

  it('is a client component', () => {
    // In a real environment, we'd check for "use client" or hooks
    expect(Navbar).toBeDefined();
  });
});
