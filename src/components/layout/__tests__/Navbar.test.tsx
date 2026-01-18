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

  it('renders navigation links', () => {
    render(<Navbar />);
    const storeLink = screen.getByRole('link', { name: /^Store$/i });
    const posLink = screen.getByRole('link', { name: /^POS$/i });
    const adminLink = screen.getByRole('link', { name: /^Admin$/i });

    expect(storeLink).toHaveAttribute('href', '/store');
    expect(posLink).toHaveAttribute('href', '/pos');
    expect(adminLink).toHaveAttribute('href', '/admin/products');
  });

  it('toggles mobile menu when button is clicked', () => {
    const { fireEvent } = require('@testing-library/react');
    render(<Navbar />);
    
    // Hamburger menu button should be visible (conceptually, in JSDOM we don't have CSS visibility check by default)
    // But we can check if the menu content is NOT in the document initially
    // Actually, in my current implementation, it's conditionally rendered.
    
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    // Now the mobile links should be visible (using getAllByRole because they are duplicates of desktop)
    const mobileLinks = screen.getAllByRole('link', { name: /^Store$/i });
    expect(mobileLinks.length).toBe(2); // One desktop, one mobile
  });
});
