/**
 * POS Optimization Types for KN BioStore
 * Inspired by Zoho POS enterprise capabilities
 */

// Tax Group for GST Compliance
export interface TaxGroup {
    id: string;
    name: string; // e.g., "GST12"
    description?: string;
    rates: TaxRate[];
    isDefault: boolean;
}

export interface TaxRate {
    id: string;
    name: string; // e.g., "CGST"
    percentage: number; // e.g., 6
}

// Inventory Adjustment for tracking stock movements
export interface InventoryAdjustment {
    id: string;
    productId: string;
    variantId?: string;
    adjustmentType: 'INCREMENT' | 'DECREMENT';
    quantity: number;
    reasonCode: 'DAMAGED' | 'EXPIRED' | 'RE-STOCK' | 'CORRECTION' | 'SAMPLE';
    notes?: string;
    date: string;
    performedBy: string;
}

// Composite Item / Bundle for "Total Farm Solutions"
export interface CompositeItem {
    id: string;
    bundleName: string;
    sku: string;
    description: string;
    productIds: string[]; // List of products in the bundle
    discountPercentage: number;
    totalMrp: number;
    bundlePrice: number;
    isActive: boolean;
}

// Sales Order for Pre-booking
export interface SalesOrder {
    id: string;
    customerId: string;
    orderDate: string;
    expectedDeliveryDate?: string;
    status: 'DRAFT' | 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    items: SalesOrderItem[];
    totalAmount: number;
    isPreBooking: boolean;
    notes?: string;
}

export interface SalesOrderItem {
    productId: string;
    variantId?: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    taxAmount: number;
}

// Customer Agri-Profile
export interface CustomerAgriProfile {
    customerId: string;
    landSizeAcres: number;
    primaryCrops: string[];
    soilHealthRecord?: {
        lastTested: string;
        pH: number;
        organicCarbon: number;
        notes: string;
    };
    cropHistory: {
        year: number;
        season: 'KHARIF' | 'RABI' | 'ZAYAD';
        crop: string;
        yield?: string;
    }[];
}
