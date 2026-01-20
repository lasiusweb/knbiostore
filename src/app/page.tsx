import { BrandStory } from '@/components/home/BrandStory';
import { ChampionSelector } from '@/components/home/ChampionSelector';
import { HeroSection } from '@/components/home/HeroSection';
import { HomeFooter } from '@/components/home/HomeFooter';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { ShopByCrop } from '@/components/home/ShopByCrop';
import { ShopByProblem } from '@/components/home/ShopByProblem';
import { ShopBySegment } from '@/components/home/ShopBySegment';
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
      <JsonLd data={[orgSchema, businessSchema, websiteSchema, collectionSchema]} />
      <HeroSection />
      <ShopBySegment />
      <ShopByCrop />
      <ShopByProblem />
      <ChampionSelector />
      <BrandStory />
      <NewsletterSignup />
      <HomeFooter />
    </div>
  );
}
