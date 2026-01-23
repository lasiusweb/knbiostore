'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface StoreHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function StoreHero({ searchQuery, setSearchQuery }: StoreHeroProps) {
  return (
    <section className="gradient-hero py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Agricultural Microbes & Solutions</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Certified organic products trusted by 50,000+ farmers across India
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products, crops, problems..."
              className="pl-12 h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm focus:bg-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
