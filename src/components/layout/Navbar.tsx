"use client";

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/store" className="text-2xl font-bold text-primary">
          KnBioStore
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;