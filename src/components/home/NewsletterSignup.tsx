'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-6 border border-primary/20">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stay Updated with KN Bio Sciences
          </h2>

          {/* Description */}
          <p className="text-muted-foreground mb-8 text-lg">
            Join our newsletter for the latest in agri-science innovation, seasonal tips, and exclusive offers for farmers.
          </p>

          {/* Form */}
          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 py-4 px-6 bg-primary/10 rounded-xl border border-primary/20 animate-fade-in">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-lg font-medium text-primary">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-12 h-14 text-base bg-background border-border focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 gradient-primary border-0 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          )}

          {/* Trust Text */}
          <p className="text-sm text-muted-foreground mt-6">
            🔒 We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
