"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
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
          
          <div className="border-l h-6 mx-2" />

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Hi, {user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="toggle menu">
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
          <div className="pt-4 border-t">
            {user ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground px-4">Hi, {user.email}</p>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="default" 
                className="w-full justify-start" 
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;