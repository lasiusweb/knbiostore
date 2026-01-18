"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { label: 'Store', href: '/store', emphasized: true },
    { label: 'POS', href: '/pos' },
    { label: 'Admin', href: '/admin/products' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/store" className="text-2xl font-bold text-primary">
          KnBioStore
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Button 
              key={link.label} 
              variant={link.emphasized ? 'default' : 'ghost'} 
              asChild
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Button 
              key={link.label} 
              variant={link.emphasized ? 'default' : 'ghost'} 
              asChild 
              className="w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
