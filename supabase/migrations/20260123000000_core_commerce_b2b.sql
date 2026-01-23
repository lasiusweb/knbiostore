-- Migration: Core Commerce & B2B Expansion
-- Created: 2026-01-23

-- 1. Price Lists
CREATE TABLE IF NOT EXISTS price_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Price List Items
CREATE TABLE IF NOT EXISTS price_list_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    price_list_id UUID REFERENCES price_lists(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL, -- Reference to your product_variants table
    price DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(price_list_id, variant_id)
);

-- 3. User Price List Mapping
CREATE TABLE IF NOT EXISTS user_price_list_map (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- Reference to auth.users or profiles
    price_list_id UUID REFERENCES price_lists(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 4. Warehouses
CREATE TABLE IF NOT EXISTS warehouses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    location TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Warehouse Stock
CREATE TABLE IF NOT EXISTS warehouse_stock (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    warehouse_id UUID REFERENCES warehouses(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL, -- Reference to your product_variants table
    quantity INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(warehouse_id, variant_id)
);

-- 6. Coupons
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT CHECK (discount_type IN ('fixed', 'percentage', 'bogo')),
    discount_value DECIMAL(12, 2),
    min_purchase DECIMAL(12, 2) DEFAULT 0,
    max_discount DECIMAL(12, 2),
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (Basic setup, adjust as needed)
ALTER TABLE price_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_price_list_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouse_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users for active price lists and stock
CREATE POLICY "Allow read for authenticated" ON price_lists FOR SELECT USING (is_active = true);
CREATE POLICY "Allow read for authenticated" ON price_list_items FOR SELECT USING (true);
CREATE POLICY "Allow read for authenticated" ON warehouse_stock FOR SELECT USING (true);
CREATE POLICY "Allow read for authenticated" ON coupons FOR SELECT USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));
