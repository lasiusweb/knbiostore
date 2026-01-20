'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    setEmail('');
  };

  return (
    <section className="py-16 bg-accent/10">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div className="inline-block p-3 bg-accent/20 rounded-full mb-6">
            <Mail className="h-8 w-8 text-accent" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Stay Updated with KN Bio Sciences</h2>
        <p className="text-gray-600 mb-8">
          Join our newsletter for the latest in agri-science innovation, seasonal tips, and exclusive offers.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full sm:w-auto">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
