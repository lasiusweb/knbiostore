export interface BannerData {
  text: string;
  link?: string;
  isVisible: boolean;
}

export interface HeroSlide {
  id: string;
  image: string; // URL or path
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ShopByItem {
  id: string;
  name: string;
  image?: string;
  link: string;
}

export interface ShopBySection {
  title: string;
  items: ShopByItem[];
}

export interface ChampionItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  link: string;
}

export interface BrandStoryData {
  headline: string;
  subheadline?: string;
  founder: {
    name: string;
    title: string;
    bio: string; // Rich text or long string
    image?: string;
  };
  journey: {
    text: string; // The "Since 1997" story
  };
  stats: {
    farmers: string;
    states: string;
    villages: string;
    womenEmpowered?: string;
  };
  certifications: string[]; // ICAR, NPOP, etc.
}

export interface FooterData {
  address: string;
  helpline: string;
  copyright: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
  quickLinks?: { label: string; href: string }[];
}

export interface HomeCMSData {
  banner: BannerData;
  heroSlides: HeroSlide[];
  shopBySegment: ShopBySection;
  shopByCrop: ShopBySection;
  shopByProblem: ShopBySection;
  farmingSegment: {
    title: string;
    items: ChampionItem[];
  };
  brandStory: BrandStoryData;
  footer: FooterData;
}
