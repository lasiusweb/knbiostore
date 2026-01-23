"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, ShoppingCart, User as UserIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

const SyncStatus = () => {
  const { isSyncing, error } = useOfflineSync();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center space-x-2 px-2 text-xs font-medium">
      {isSyncing ? (
        <span className="flex items-center text-blue-600 animate-pulse">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          Syncing...
        </span>
      ) : isOnline ? (
        <span className="flex items-center text-green-600">
          <Wifi className="h-3 w-3 mr-1" />
          Online
        </span>
      ) : (
        <span className="flex items-center text-amber-600">
          <WifiOff className="h-3 w-3 mr-1" />
          Offline
        </span>
      )}
      {error && <span className="text-red-500">!</span>}
    </div>
  );
};

const shopData = {
  segments: [
    'Agriculture', 'Aquaculture', 'Poultry Healthcare', 'Animal Healthcare',
    'Bioremediation', 'Seeds', 'Organic Farming', 'Farm equipment',
    'Testing lab', 'Oilpalm'
  ],
  farmingSegments: [
    'for-crop-champions', 'for-pond-champions', 'for-poultry-pros',
    'for-organic-newbies', 'organic-farming', 'farm-needs', 'farm-equipment'
  ],
  crops: [
    'Paddy', 'Mango', 'Banana', 'Chilli', 'Cotton', 'Coffee', 'Tea',
    'Papaya', 'Pomegranate', 'Dragoon', 'Ground Nut', 'Pulses', 'Coco',
    'Turmeric', 'Oil Palm', 'Coconut', 'Maize', 'Fish', 'Shrimp',
    'Chicks', 'Layers', 'Broilers'
  ],
  problems: [
    'Thrips', 'Mites', 'White Flys', 'Green Flys', 'White Grubs',
    'Nutrients Deficiency'
  ]
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const { cartItems } = useCart();

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
    <nav className="fixed top-0 w-full bg-white shadow-md z-50" aria-label="Main navigation">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-primary shrink-0">
            KN Biosciences
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
          {/* Shop Mega Menu Trigger */}
          <div className="relative group">
            <Button
              variant="ghost"
              className="flex items-center space-x-1 group-hover:text-primary transition-colors"
              aria-haspopup="true"
              aria-expanded={false}
            >
              <span>Shop</span>
              <ChevronDown className="h-4 w-4" />
            </Button>

            {/* Mega Menu Content */}
            <div className="absolute top-full right-0 w-[800px] bg-white border shadow-2xl rounded-b-lg opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out transform origin-top z-50 p-6">
              <div className="grid grid-cols-4 gap-8">
                {/* Column 1: Shop by Segment */}
                <div>
                  <h3 className="font-bold text-sm mb-3 text-primary uppercase tracking-wider">Shop by Segment</h3>
                  <div className="space-y-1">
                    {shopData.segments.map(item => (
                      <Link key={item} href="/store" className="block text-sm hover:text-primary py-1 transition-colors">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 2: Farming Segment */}
                <div>
                  <h3 className="font-bold text-sm mb-3 text-primary uppercase tracking-wider">Farming Segment</h3>
                  <div className="space-y-1">
                    {shopData.farmingSegments.map(item => (
                      <Link key={item} href="/store" className="block text-sm hover:text-primary py-1 transition-colors">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: Shop by Crop */}
                <div>
                  <h3 className="font-bold text-sm mb-3 text-primary uppercase tracking-wider">Shop by Crop</h3>
                  <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
                    {shopData.crops.map(item => (
                      <Link key={item} href="/store" className="block text-sm hover:text-primary py-1 transition-colors">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 4: Shop By Problem */}
                <div>
                  <h3 className="font-bold text-sm mb-3 text-primary uppercase tracking-wider">Shop By Problem</h3>
                  <div className="space-y-1">
                    {shopData.problems.map(item => (
                      <Link key={item} href="/store" className="block text-sm hover:text-primary py-1 transition-colors">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const query = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
              router.push(`/store?q=${encodeURIComponent(query)}`);
            }}
            className="relative w-48 lg:w-64"
          >
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              name="q"
              type="search"
              placeholder="Search..."
              className="pl-8 h-9"
              aria-label="Search products"
            />
          </form>

          <SyncStatus />

          <Button variant="ghost" size="icon" asChild aria-label="cart">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
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
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
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
                aria-label="Search products"
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
            className="w-full justify-between font-bold"
            onClick={() => setIsShopOpen(!isShopOpen)}
          >
            <span>Shop</span>
            {isShopOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {isShopOpen && (
            <div className="pl-4 space-y-4 pt-2">
              <div>
                <h3 className="font-bold text-xs text-primary uppercase mb-2">Shop by Segment</h3>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {shopData.segments.map(item => (
                    <Link key={item} href="/store" className="text-sm py-1" onClick={() => setIsMobileMenuOpen(false)}>{item}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xs text-primary uppercase mb-2">Farming Segment</h3>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {shopData.farmingSegments.map(item => (
                    <Link key={item} href="/store" className="text-sm py-1" onClick={() => setIsMobileMenuOpen(false)}>{item}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xs text-primary uppercase mb-2">Shop by Crop</h3>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {shopData.crops.map(item => (
                    <Link key={item} href="/store" className="text-sm py-1" onClick={() => setIsMobileMenuOpen(false)}>{item}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xs text-primary uppercase mb-2">Shop By Problem</h3>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {shopData.problems.map(item => (
                    <Link key={item} href="/store" className="text-sm py-1" onClick={() => setIsMobileMenuOpen(false)}>{item}</Link>
                  ))}
                </div>
              </div>
            </div>
          )}

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
