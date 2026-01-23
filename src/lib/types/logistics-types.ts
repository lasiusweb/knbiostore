/**
 * Logistics & Inventory Types for KN Bio Sciences
 * Supports multi-warehouse regional distribution
 */

export interface Warehouse {
    id: string;
    name: string; // e.g., "Hyderabad Central Hub", "Nizamabad Regional Hub"
    code: string; // e.g., "HYD-01"
    location: {
        address: string;
        pincode: string;
        city: string;
        state: string;
        coordinates?: { lat: number; lng: number };
    };
    contactPerson: string;
    phone: string;
    capacityMetricTons?: number;
    isColdChainEnabled: boolean;
    isActive: boolean;
}

export interface StockLevel {
    productId: string;
    variantId: string;
    warehouseId: string;
    quantity: number;
    reservedQuantity: number;
    availableQuantity: number;
    lastStockCheck: string;
}

export interface StockMovement {
    id: string;
    type: 'TRANSFER' | 'INWARD' | 'OUTWARD' | 'REJECTION';
    sourceWarehouseId?: string;
    destinationWarehouseId?: string;
    items: {
        productId: string;
        variantId: string;
        quantity: number;
        batchNumber?: string;
        expiryDate?: string;
    }[];
    status: 'PENDING' | 'IN_TRANSIT' | 'RECEIVED' | 'CANCELLED';
    carrierDetails?: {
        name: string;
        trackingId: string;
        vehicleNumber?: string;
    };
    pincodeDestination?: string; // For distance-based delivery calculator
    performedBy: string;
    createdAt: string;
    updatedAt: string;
}

// Shipping Rule for Pincode/Distance logic
export interface ShippingRule {
    id: string;
    name: string;
    pincodes: string[];
    baseRate: number;
    ratePerKg: number;
    minWeight: number;
    maxWeight: number;
    deliveryEstimateDays: string;
}
