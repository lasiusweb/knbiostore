import { BrandStory } from '@/components/home/BrandStory';
import { ChampionSelector } from '@/components/home/ChampionSelector';
import { HeroSection } from '@/components/home/HeroSection';
import { HomeFooter } from '@/components/home/HomeFooter';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { ShopByCrop } from '@/components/home/ShopByCrop';
import { ShopByProblem } from '@/components/home/ShopByProblem';
import { ShopBySegment } from '@/components/home/ShopBySegment';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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