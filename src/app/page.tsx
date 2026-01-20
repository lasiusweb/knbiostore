import { BrandStory } from '@/components/home/BrandStory';
import { ChampionSelector } from '@/components/home/ChampionSelector';
import { CTASection } from '@/components/home/CTASection';
import { HeroSection } from '@/components/home/HeroSection';
import { HomeFooter } from '@/components/home/HomeFooter';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { ShopByCrop } from '@/components/home/ShopByCrop';
import { ShopByProblem } from '@/components/home/ShopByProblem';
import { ShopBySegment } from '@/components/home/ShopBySegment';
import { ValueProposition } from '@/components/home/ValueProposition';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateCollectionPageSchema
} from '@/lib/seo-helpers';

export default function Home() {
  const orgSchema = generateOrganizationSchema();
  const businessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebSiteSchema();
  const collectionSchema = generateCollectionPageSchema();

  return (
    <div className="flex flex-col min-h-screen">
      {/* JSON-LD Structured Data */}
      <JsonLd data={[orgSchema, businessSchema, websiteSchema, collectionSchema]} />

      {/* Hero Section with Carousel */}
      <HeroSection />

      {/* Shop By Segment - 10 Items */}
      <ShopBySegment />

      {/* Shop By Crop - 10 Items */}
      <ShopByCrop />

      {/* Shop By Problem - 6 Items */}
      <ShopByProblem />

      {/* For Champions - Farming Segments */}
      <ChampionSelector />

      {/* Value Proposition - Why Choose KN BioStore */}
      <ValueProposition />

      {/* Brand Story - About Section */}
      <BrandStory />

      {/* CTA Section - Dealer/Partner/R&D */}
      <CTASection />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Footer */}
      <HomeFooter />
    </div>
  );
}
