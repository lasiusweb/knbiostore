import { HomeCMSData } from '@/lib/types/home-cms';

export const MOCK_HOME_DATA: HomeCMSData = {
  banner: {
    text: "India's #1 Agri-Science Innovator Since 1997",
    isVisible: true,
  },
  heroSlides: [
    {
      id: '1',
      image: '/hero-1.jpg',
      title: 'Pioneering Microbial Innovation',
      subtitle: 'Sustainable solutions for modern agriculture',
      ctaText: 'Explore Products',
      ctaLink: '/store',
    },
    {
      id: '2',
      image: '/hero-2.jpg',
      title: 'From Tissue Culture to Total Farm Solutions',
      subtitle: 'Trusted by 50,000+ Farmers',
      ctaText: 'Our Story',
      ctaLink: '/about',
    },
    {
      id: '3',
      image: '/hero-3.jpg',
      title: 'Monsoon Special Offers',
      subtitle: 'Get the best deals on bio-fertilizers',
      ctaText: 'Shop Now',
      ctaLink: '/store/offers',
    }
  ],
  shopBySegment: {
    title: 'Shop By Segment',
    items: [
      { id: '1', name: 'Agriculture', link: '/store?segment=agriculture' },
      { id: '2', name: 'Aquaculture', link: '/store?segment=aquaculture' },
      { id: '3', name: 'Poultry Healthcare', link: '/store?segment=poultry' },
      { id: '4', name: 'Animal Healthcare', link: '/store?segment=animal' },
      { id: '5', name: 'Bioremediation', link: '/store?segment=bioremediation' },
      { id: '6', name: 'Seeds', link: '/store?segment=seeds' },
      { id: '7', name: 'Organic Farming', link: '/store?segment=organic' },
      { id: '8', name: 'Farm Equipment', link: '/store?segment=equipment' },
      { id: '9', name: 'Testing Lab', link: '/store?segment=lab' },
      { id: '10', name: 'Oilpalm', link: '/store?segment=oilpalm' },
    ]
  },
  shopByCrop: {
    title: 'Shop By Crop',
    items: [
      { id: '1', name: 'Paddy', link: '/store?crop=paddy' },
      { id: '2', name: 'Mango', link: '/store?crop=mango' },
      { id: '3', name: 'Banana', link: '/store?crop=banana' },
      { id: '4', name: 'Chilli', link: '/store?crop=chilli' },
      { id: '5', name: 'Cotton', link: '/store?crop=cotton' },
      { id: '6', name: 'Coffee', link: '/store?crop=coffee' },
      { id: '7', name: 'Tea', link: '/store?crop=tea' },
      { id: '8', name: 'Papaya', link: '/store?crop=papaya' },
      { id: '9', name: 'Pomegranate', link: '/store?crop=pomegranate' },
      { id: '10', name: 'Turmeric', link: '/store?crop=turmeric' },
    ]
  },
  shopByProblem: {
    title: 'Solve Common Problems',
    items: [
      { id: '1', name: 'Thrips', link: '/store?problem=thrips' },
      { id: '2', name: 'Mites', link: '/store?problem=mites' },
      { id: '3', name: 'White Flys', link: '/store?problem=white-flys' },
      { id: '4', name: 'Green Flys', link: '/store?problem=green-flys' },
      { id: '5', name: 'White Grubs', link: '/store?problem=white-grubs' },
      { id: '6', name: 'Nutrients Deficiency', link: '/store?problem=deficiency' },
    ]
  },
  farmingSegment: {
    title: 'For Champions',
    items: [
      { id: '1', title: 'For Crop Champions', link: '/store?type=crop' },
      { id: '2', title: 'For Pond Champions', link: '/store?type=pond' },
      { id: '3', title: 'For Poultry Pros', link: '/store?type=poultry' },
      { id: '4', title: 'Organic Newbies', link: '/store?type=newbies' },
    ]
  },
  brandStory: {
    headline: 'FROM TISSUE CULTURE TO TOTAL FARM SOLUTIONS — INDIA’S #1 AGRI-SCIENCE INNOVATOR SINCE 1997.',
    founder: {
      name: 'P. Sudha Reddy',
      title: "Scientist & Farmer's Friend",
      bio: "A rare blend of scientific rigor and rural empathy, P. Sudha Reddy believes that true innovation starts in the field, not the lab. Under her leadership, KN Bio Sciences pioneered: India's first VAM-Fertilizers for small farms, Viral cures for shrimp ponds that saved thousands of livelihoods, Affordable electric tillers with 2-year warranty, Free organic farming consultation for new farmers.",
    },
    journey: {
      text: "In 1997, P. Sudha Reddy started K N Bio Sciences with a small tissue culture lab in Hyderabad — driven by one vision: ‘Help Indian farmers grow more, earn more, lose less.’ What began as a passion for plant science has grown into India’s most trusted agri-solutions brand — serving farmers in Crop, Aquaculture, Poultry, Organic Farming, Equipment, and Industrial Waste Management. Today, 50,000+ farmers across 18 states rely on us not just for products — but for solutions, support, and peace of mind.",
    },
    stats: {
      farmers: '50,000+',
      states: '18',
      villages: '120+',
      womenEmpowered: '5,000+',
    },
    certifications: [
      'ICAR Partner',
      'NPOP Certified',
      'ISO 9001:2015',
      'As Seen on DD Kisan',
    ]
  },
  footer: {
    address: 'Sy No 487, Behind SLI Power Engg Bachupally Road, Bachupally (Village & Mandal), Medchal-Malkajgiri dist, Hyderabad.',
    helpline: '+91 92810 30822',
    copyright: '© 2026 K N Bio Sciences India Pvt Ltd. All rights reserved.',
    quickLinks: [
      { label: 'Store', href: '/store' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ]
  }
};
