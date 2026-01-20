/**
 * Product Types for KN Biosciences Store
 * Comprehensive interfaces for agricultural products with regulatory compliance fields
 */

// Chemical composition entry
export interface ChemicalComponent {
  ingredient: string;
  percentage: string;
  role?: string;
}

// Contact details for customer care and marketer
export interface ContactDetails {
  name?: string;
  phone: string;
  email?: string;
  address: string;
}

// Product variant for different sizes/packaging
export interface ProductVariant {
  id: string;
  sku: string;
  gtin?: string;
  mrp: number;
  salePrice: number;
  netWeight?: string;
  grossWeight?: string;
  netContent?: string;
  packingType: string;
  formType: string;
  inStock: boolean;
  stockQuantity?: number;
}

// Main Product interface with all regulatory fields
export interface Product {
  // Identifiers
  id: string;
  slug: string;
  gtin?: string;
  sku?: string;

  // Basic Information
  brandName: string;
  productName: string;
  description: string;
  shortDescription: string;
  images: string[];
  thumbnailImage?: string;

  // Categorization
  segment: string;
  category?: string;
  subcategory?: string;
  targetCrops: string[];
  targetProblems: string[];
  tags: string[];

  // Pricing (base price, variants may override)
  mrp: number;
  salePrice: number;
  discount?: number;
  inStock: boolean;

  // Variants
  variants: ProductVariant[];

  // Physical Properties
  countryOfOrigin: string;
  netWeight?: string;
  grossWeight?: string;
  netContent?: string;
  shelfLife: string;

  // Regulatory Compliance
  cbirc?: string;
  manufacturingLicence?: string;
  stateRegistration?: string;
  chemicalComposition: ChemicalComponent[];

  // Safety Information
  antidoteStatement?: string;
  warningStatement?: string;
  precautions: string[];

  // Usage Information
  directionsOfUse: string;
  standardInstructions?: string;
  recommendations?: string;
  leafletInfo?: string;

  // Contact Information
  customerCareDetails: ContactDetails;
  marketedBy: ContactDetails;

  // Metadata
  isActive: boolean;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Filter state for store page
export interface ProductFilters {
  search?: string;
  segment?: string;
  crop?: string;
  problem?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  tags?: string[];
}

// Sort options
export type ProductSortOption = 
  | 'name-asc' 
  | 'name-desc' 
  | 'price-asc' 
  | 'price-desc' 
  | 'newest' 
  | 'popularity';

// Featured product for homepage
export interface FeaturedProduct {
  id: string;
  productName: string;
  shortDescription: string;
  thumbnailImage: string;
  salePrice: number;
  mrp: number;
  slug: string;
  segment: string;
  tags: string[];
}
