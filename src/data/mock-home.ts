import { HomeCMSData } from '@/lib/types/home-cms';

export const MOCK_HOME_DATA: HomeCMSData = {
  banner: {
    text: "🎉 Free Shipping on Orders Above ₹999 | Use Code KISAN10 for 10% Off",
    link: '/store',
    isVisible: true,
  },
  heroSlides: [
    {
      id: '1',
      image: '/hero-1.jpg',
      title: 'FROM TISSUE CULTURE TO TOTAL FARM SOLUTIONS',
      subtitle: "India's #1 Agri-Science Innovator Since 1997 | Trusted by 50,000+ Farmers",
      ctaText: 'Explore Products',
      ctaLink: '/store',
    },
    {
      id: '2',
      image: '/hero-2.jpg',
      title: 'Pioneering Microbial Innovation',
      subtitle: '🔬 ICAR Partner | 🌿 NPOP Certified | 🏢 ISO 9001:2015',
      ctaText: 'Our Story',
      ctaLink: '#brand-story',
    },
    {
      id: '3',
      image: '/hero-3.jpg',
      title: 'Monsoon Season Special',
      subtitle: 'Get Ready for Kharif — Up to 20% Off on Bio-Fertilizers',
      ctaText: 'Shop Now',
      ctaLink: '/store?segment=agriculture',
    },
    {
      id: '4',
      image: '/hero-4.jpg',
      title: 'Pond Champions Program',
      subtitle: 'Complete Aquaculture Solutions for Shrimp & Fish Farming',
      ctaText: 'Learn More',
      ctaLink: '/store?segment=aquaculture',
    }
  ],
  shopBySegment: {
    title: 'Shop By Segment',
    items: [
      { id: '1', name: 'Agriculture', icon: '🌾', link: '/store?segment=agriculture', description: 'Bio-fertilizers & Crop Care' },
      { id: '2', name: 'Aquaculture', icon: '🦐', link: '/store?segment=aquaculture', description: 'Pond Health & Probiotics' },
      { id: '3', name: 'Poultry Healthcare', icon: '🐔', link: '/store?segment=poultry', description: 'Synbiotics & Feed Additives' },
      { id: '4', name: 'Animal Healthcare', icon: '🐄', link: '/store?segment=animal', description: 'Livestock Solutions' },
      { id: '5', name: 'Bioremediation', icon: '♻️', link: '/store?segment=bioremediation', description: 'Waste Management' },
      { id: '6', name: 'Seeds', icon: '🌱', link: '/store?segment=seeds', description: 'Quality Seeds' },
      { id: '7', name: 'Organic Farming', icon: '🌿', link: '/store?segment=organic', description: 'NPOP Certified Products' },
      { id: '8', name: 'Farm Equipment', icon: '🚜', link: '/store?segment=equipment', description: 'Tools & Machinery' },
      { id: '9', name: 'Testing Lab', icon: '🔬', link: '/store?segment=lab', description: 'Soil & Water Analysis' },
      { id: '10', name: 'Oil Palm', icon: '🌴', link: '/store?segment=oilpalm', description: 'Palm Plantation Solutions' },
    ]
  },
  shopByCrop: {
    title: 'Shop By Crop',
    items: [
      { id: '1', name: 'Paddy', icon: '🌾', link: '/store?crop=paddy' },
      { id: '2', name: 'Mango', icon: '🥭', link: '/store?crop=mango' },
      { id: '3', name: 'Banana', icon: '🍌', link: '/store?crop=banana' },
      { id: '4', name: 'Chilli', icon: '🌶️', link: '/store?crop=chilli' },
      { id: '5', name: 'Cotton', icon: '☁️', link: '/store?crop=cotton' },
      { id: '6', name: 'Coffee', icon: '☕', link: '/store?crop=coffee' },
      { id: '7', name: 'Tea', icon: '🍵', link: '/store?crop=tea' },
      { id: '8', name: 'Papaya', icon: '🍈', link: '/store?crop=papaya' },
      { id: '9', name: 'Pomegranate', icon: '🍎', link: '/store?crop=pomegranate' },
      { id: '10', name: 'Turmeric', icon: '🧡', link: '/store?crop=turmeric' },
    ]
  },
  shopByProblem: {
    title: 'Solve Common Problems',
    items: [
      { id: '1', name: 'Thrips', icon: '🐛', link: '/store?problem=thrips', severity: 'high' },
      { id: '2', name: 'Mites', icon: '🕷️', link: '/store?problem=mites', severity: 'medium' },
      { id: '3', name: 'White Flys', icon: '🪰', link: '/store?problem=white-flys', severity: 'high' },
      { id: '4', name: 'Green Flys', icon: '🦗', link: '/store?problem=green-flys', severity: 'medium' },
      { id: '5', name: 'White Grubs', icon: '🐛', link: '/store?problem=white-grubs', severity: 'high' },
      { id: '6', name: 'Nutrients Deficiency', icon: '⚠️', link: '/store?problem=deficiency', severity: 'medium' },
    ]
  },
  farmingSegment: {
    title: 'For Champions',
    subtitle: 'Specialized Solutions for Every Farming Champion',
    items: [
      { id: '1', title: 'For Crop Champions', description: 'Complete crop care solutions for cereals, pulses, and vegetables', icon: '🌾', link: '/store?type=crop', color: 'emerald' },
      { id: '2', title: 'For Pond Champions', description: 'Aquaculture solutions for shrimp and fish farmers', icon: '🦐', link: '/store?type=pond', color: 'blue' },
      { id: '3', title: 'For Poultry Pros', description: 'Synbiotics and supplements for broilers and layers', icon: '🐔', link: '/store?type=poultry', color: 'amber' },
      { id: '4', title: 'Organic Newbies', description: 'NPOP certified products for organic farming beginners', icon: '🌱', link: '/store?type=newbies', color: 'green' },
    ]
  },
  valueProposition: {
    title: 'Why Choose KN BioStore?',
    subtitle: 'We provide certified organic solutions backed by 27+ years of scientific research',
    items: [
      { id: '1', title: 'NPOP Certified', description: 'All organic products are certified under NPOP standards', icon: '✅' },
      { id: '2', title: 'Expert Support', description: 'Free consultation with our agri-scientists', icon: '👩‍🔬' },
      { id: '3', title: 'Fast Delivery', description: 'Delivery within 3-5 days across India', icon: '🚚' },
      { id: '4', title: 'Quality Assured', description: 'ISO 9001:2015 certified manufacturing', icon: '🏆' },
      { id: '5', title: '24/7 Pond Rescue', description: 'Emergency support for aquaculture farmers', icon: '🆘' },
      { id: '6', title: 'Farmer Training', description: 'Free training camps in 120+ villages', icon: '🎓' },
    ]
  },
  ctaCards: [
    {
      id: '1',
      title: 'Become a KN Bio Dealer',
      description: 'Low Investment, High Margin. Join our network of 500+ dealers.',
      icon: '🏪',
      ctaText: 'Apply Now',
      ctaLink: '/dealer',
      color: 'primary'
    },
    {
      id: '2',
      title: 'Partner With Us',
      description: 'FPOs, NGOs, Government Projects — Let\'s grow together.',
      icon: '🤝',
      ctaText: 'Get in Touch',
      ctaLink: '/partner',
      color: 'accent'
    },
    {
      id: '3',
      title: 'Collaborate on R&D',
      description: 'Universities, ICAR, Startups — Innovation partnerships.',
      icon: '🔬',
      ctaText: 'Learn More',
      ctaLink: '/research',
      color: 'secondary'
    }
  ],
  brandStory: {
    headline: 'FROM TISSUE CULTURE TO TOTAL FARM SOLUTIONS — INDIA\'S #1 AGRI-SCIENCE INNOVATOR SINCE 1997.',
    subheadline: 'Founded by Scientist & Farmer\'s Friend, P. Sudha Reddy. Trusted by 50,000+ Farmers Across India.',
    founder: {
      name: 'P. Sudha Reddy',
      title: "Scientist & Farmer's Friend",
      bio: "A rare blend of scientific rigor and rural empathy, P. Sudha Reddy believes that true innovation starts in the field, not the lab. Under her leadership, KN Bio Sciences pioneered: India's first VAM-Fertilizers for small farms, Viral cures for shrimp ponds that saved thousands of livelihoods, Affordable electric tillers with 2-year warranty, Free organic farming consultation for new farmers.",
      image: '/founder-sudha-reddy.jpg',
      achievements: [
        "India's first VAM-Fertilizers for small farms",
        "Viral cures for shrimp ponds that saved thousands of livelihoods",
        "Affordable electric tillers with 2-year warranty",
        "Free organic farming consultation for new farmers"
      ]
    },
    journey: {
      text: "In 1997, P. Sudha Reddy started K N Bio Sciences with a small tissue culture lab in Hyderabad — driven by one vision: 'Help Indian farmers grow more, earn more, lose less.' What began as a passion for plant science has grown into India's most trusted agri-solutions brand — serving farmers in Crop, Aquaculture, Poultry, Organic Farming, Equipment, and Industrial Waste Management. Today, 50,000+ farmers across 18 states rely on us not just for products — but for solutions, support, and peace of mind.",
      milestones: [
        { year: '1997', title: 'Founded', description: 'Small tissue culture lab in Hyderabad' },
        { year: '2003', title: 'VAM Launch', description: "India's first VAM bio-fertilizer" },
        { year: '2010', title: 'Aquaculture', description: 'Expanded to shrimp & fish farming' },
        { year: '2018', title: 'Farm Equipment', description: 'Launched electric tillers' },
        { year: '2023', title: '50K Farmers', description: 'Milestone of 50,000 farmers' }
      ]
    },
    stats: {
      farmers: '50,000+',
      states: '18',
      villages: '120+',
      womenEmpowered: '5,000+',
    },
    certifications: [
      { name: 'ICAR Partner', icon: '🔬' },
      { name: 'NPOP Certified', icon: '🌿' },
      { name: 'ISO 9001:2015', icon: '🏢' },
      { name: 'As Seen on DD Kisan', icon: '📺' }
    ],
    initiatives: [
      { title: 'KN Bio Kisan Samman', description: 'Annual awards for highest-yield farmers', icon: '🌾' },
      { title: 'Free Farmer Training', description: '120+ villages trained in 2023', icon: '🎓' },
      { title: 'Pond Rescue Drives', description: 'Emergency support during viral outbreaks', icon: '💧' },
      { title: 'Women Farmer Empowerment', description: 'Subsidy + training for 5,000+ women', icon: '👩‍🎓' }
    ]
  },
  footer: {
    address: 'Sy No 487, Behind SLI Power Engg Bachupally Road, Bachupally (Village & Mandal), Medchal-Malkajgiri dist, Hyderabad.',
    helpline: '+91 92810 30822',
    email: 'support@knbiosciences.com',
    copyright: '© 2026 K N Biosciences India Pvt Ltd. All rights reserved.',
    socials: {
      facebook: 'https://facebook.com/knbiosciences',
      twitter: 'https://twitter.com/knbiosciences',
      instagram: 'https://instagram.com/knbiosciences',
      youtube: 'https://youtube.com/knbiosciences',
      linkedin: 'https://linkedin.com/company/knbiosciences'
    },
    quickLinks: [
      { label: 'Store', href: '/store' },
      { label: 'About Us', href: '/about' },
      { label: 'Knowledge Center', href: '/knowledge-center' },
      { label: 'Contact', href: '/contact' },
      { label: 'Become a Dealer', href: '/dealer' },
      { label: 'Partner With Us', href: '/partner' },
    ],
    customerCare: [
      { label: 'Track Order', href: '/track-order' },
      { label: 'Returns & Refunds', href: '/returns' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'FAQs', href: '/faqs' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ]
  }
};
