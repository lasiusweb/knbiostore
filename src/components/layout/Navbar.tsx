"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, ShoppingCart, User as UserIcon, ChevronDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';

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
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Knowledge Center', href: '/knowledge-center' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-primary shrink-0">
            KnBioStore
          </Link>

          {/* Left Side Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button key={link.label} variant="ghost" asChild size="sm">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Right Side Navigation & Utilities */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Shop Mega Menu Trigger (Placeholder for now) */}
          <div className="relative group">
            <Button variant="ghost" className="flex items-center space-x-1">
              <span>Shop</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            {/* Mega Menu content will go here in Phase 2 */}
          </div>

          <div className="relative w-48 lg:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-8 h-9"
            />
          </div>

          <Button variant="ghost" size="icon" asChild aria-label="cart">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1 rounded-full">0</span>
            </Link>
          </Button>

          <div className="border-l h-6 mx-1" />

          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground hidden lg:inline-block">Hi, {user.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login" className="flex items-center space-x-1">
                <UserIcon className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
           <Button variant="ghost" size="icon" asChild aria-label="cart">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="toggle menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="pb-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-8 h-9"
              />
            </div>
          </div>

          {navLinks.map((link) => (
            <Button 
              key={link.label} 
              variant="ghost" 
              asChild 
              className="w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}

          <Button 
            variant="ghost" 
            className="w-full justify-start font-bold"
            onClick={() => {/* Toggle Shop Accordion in Phase 3 */}}
          >
            Shop
          </Button>

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
                variant="ghost" 
                className="w-full justify-start" 
                asChild
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/login" className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4" />
                  <span>Login / Register</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
