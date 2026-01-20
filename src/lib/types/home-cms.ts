/**
 * Home CMS Types for KN Biosciences Homepage
 */

export interface BannerData {
  text: string;
  link?: string;
  isVisible: boolean;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ShopByItem {
  id: string;
  name: string;
  icon?: string;
  image?: string;
  link: string;
  description?: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface ShopBySection {
  title: string;
  items: ShopByItem[];
}

export interface ChampionItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  link: string;
  color?: string;
}

export interface FarmingSegmentSection {
  title: string;
  subtitle?: string;
  items: ChampionItem[];
}

export interface ValuePropositionItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ValuePropositionSection {
  title: string;
  subtitle?: string;
  items: ValuePropositionItem[];
}

export interface CTACard {
  id: string;
  title: string;
  description: string;
  icon?: string;
  ctaText: string;
  ctaLink: string;
  color?: 'primary' | 'secondary' | 'accent';
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Certification {
  name: string;
  icon?: string;
  image?: string;
}

export interface Initiative {
  title: string;
  description: string;
  icon?: string;
}

export interface BrandStoryData {
  headline: string;
  subheadline?: string;
  founder: {
    name: string;
    title: string;
    bio: string;
    image?: string;
    achievements?: string[];
  };
  journey: {
    text: string;
    milestones?: Milestone[];
  };
  stats: {
    farmers: string;
    states: string;
    villages: string;
    womenEmpowered?: string;
  };
  certifications: Certification[];
  initiatives?: Initiative[];
}

export interface FooterData {
  address: string;
  helpline: string;
  email?: string;
  copyright: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
  quickLinks?: { label: string; href: string }[];
  customerCare?: { label: string; href: string }[];
  legal?: { label: string; href: string }[];
}

export interface HomeCMSData {
  banner: BannerData;
  heroSlides: HeroSlide[];
  shopBySegment: ShopBySection;
  shopByCrop: ShopBySection;
  shopByProblem: ShopBySection;
  farmingSegment: FarmingSegmentSection;
  valueProposition: ValuePropositionSection;
  ctaCards: CTACard[];
  brandStory: BrandStoryData;
  footer: FooterData;
}
