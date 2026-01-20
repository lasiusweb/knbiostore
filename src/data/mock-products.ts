/**
 * Mock Product Data for KN Biosciences Store
 * Sample agricultural products with complete regulatory information
 */

import { Product, FeaturedProduct } from '@/lib/types/product-types';

// Customer Care Details (shared across products)
const CUSTOMER_CARE: { phone: string; email: string; address: string } = {
    phone: '+91 92810 30822',
    email: 'support@knbiosciences.com',
    address: 'Sy No 487, Behind SLI Power Engg, Bachupally Road, Bachupally, Medchal-Malkajgiri, Hyderabad - 500090'
};

const MARKETED_BY: { name: string; phone: string; address: string } = {
    name: 'K N Biosciences India Pvt Ltd',
    phone: '+91 92810 30822',
    address: 'Sy No 487, Behind SLI Power Engg, Bachupally Road, Bachupally (Village & Mandal), Medchal-Malkajgiri dist, Hyderabad, Telangana'
};

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'prod-001',
        slug: 'vam-bio-fertilizer-premium',
        gtin: '8901234567890',
        sku: 'VAM-BF-500G',
        brandName: 'KN Bio Sciences',
        productName: 'VAM Bio-Fertilizer Premium',
        description: `VAM Bio-Fertilizer Premium is India's first and most trusted Vesicular Arbuscular Mycorrhizal (VAM) bio-fertilizer, developed by KN Bio Sciences in 1997. This revolutionary product enhances nutrient uptake, improves soil health, and significantly increases crop yield.

Our VAM fungi form a symbiotic relationship with plant roots, extending the root system's reach by up to 100 times. This dramatically improves the plant's ability to absorb phosphorus, zinc, copper, and other essential micronutrients from the soil.

Suitable for all crops including cereals, pulses, oilseeds, vegetables, fruits, and plantation crops. Our proprietary formulation contains a minimum of 100 spores per gram, ensuring maximum effectiveness.`,
        shortDescription: 'Revolutionary VAM bio-fertilizer that enhances nutrient uptake and increases crop yield by up to 30%.',
        images: ['/products/vam-fertilizer-1.jpg', '/products/vam-fertilizer-2.jpg', '/products/vam-fertilizer-3.jpg'],
        thumbnailImage: '/products/vam-fertilizer-thumb.jpg',
        segment: 'Agriculture',
        category: 'Bio-Fertilizers',
        subcategory: 'VAM Inoculants',
        targetCrops: ['Paddy', 'Cotton', 'Mango', 'Banana', 'Chilli', 'Turmeric', 'Coffee', 'Tea'],
        targetProblems: ['Nutrients Deficiency'],
        tags: ['organic', 'bio-fertilizer', 'vam', 'npop-certified', 'bestseller'],
        mrp: 450,
        salePrice: 399,
        discount: 11,
        inStock: true,
        variants: [
            {
                id: 'var-001-1',
                sku: 'VAM-BF-250G',
                gtin: '8901234567891',
                mrp: 250,
                salePrice: 225,
                netWeight: '250g',
                grossWeight: '280g',
                packingType: 'Pouch',
                formType: 'Powder',
                inStock: true,
                stockQuantity: 500
            },
            {
                id: 'var-001-2',
                sku: 'VAM-BF-500G',
                gtin: '8901234567892',
                mrp: 450,
                salePrice: 399,
                netWeight: '500g',
                grossWeight: '550g',
                packingType: 'Pouch',
                formType: 'Powder',
                inStock: true,
                stockQuantity: 300
            },
            {
                id: 'var-001-3',
                sku: 'VAM-BF-1KG',
                gtin: '8901234567893',
                mrp: 850,
                salePrice: 749,
                netWeight: '1kg',
                grossWeight: '1.1kg',
                packingType: 'Jar',
                formType: 'Powder',
                inStock: true,
                stockQuantity: 150
            }
        ],
        countryOfOrigin: 'India',
        netWeight: '500g',
        grossWeight: '550g',
        shelfLife: '24 months from date of manufacture',
        cbirc: 'CBIRC/2023/VAM/001',
        manufacturingLicence: 'ML/TS/BIO/2023/12345',
        stateRegistration: 'TS/AGRI/REG/2023/56789',
        chemicalComposition: [
            { ingredient: 'Vesicular Arbuscular Mycorrhizal (VAM) spores', percentage: 'Min. 100 spores/g', role: 'Active ingredient' },
            { ingredient: 'Organic carrier base', percentage: '95%', role: 'Carrier' },
            { ingredient: 'Moisture', percentage: 'Max. 8%', role: 'Quality parameter' }
        ],
        antidoteStatement: 'This product is non-toxic and safe for humans, animals, and the environment. No antidote required. In case of accidental ingestion, drink plenty of water and consult a physician if symptoms persist.',
        warningStatement: 'Keep away from direct sunlight. Store in a cool, dry place. Do not mix with chemical fertilizers during application. Keep out of reach of children.',
        precautions: [
            'Store in a cool, dry place away from direct sunlight',
            'Do not mix with chemical fertilizers or pesticides',
            'Use within 6 months of opening for best results',
            'Avoid contact with eyes - if contact occurs, rinse with clean water',
            'Wash hands after handling'
        ],
        directionsOfUse: `1. Soil Application: Mix 2-4 kg of VAM Bio-Fertilizer per acre with 100 kg of well-decomposed farmyard manure (FYM) or compost. Broadcast evenly over the field before sowing/transplanting.

2. Seedling Treatment: Make a slurry with 100g VAM and sufficient water. Dip seedling roots in the slurry for 15-20 minutes before transplanting.

3. Pot Application: Mix 10-20g per pot with soil before planting.

4. Drip Irrigation: Mix 1-2 kg per acre with water and apply through drip system.`,
        standardInstructions: 'Apply at the time of sowing or transplanting for best results. Can be used for all crops throughout the year. Compatible with organic farming practices.',
        recommendations: 'For maximum benefit, use in combination with other KN Bio products like Phosphate Solubilizing Bacteria (PSB) and Potash Mobilizing Bacteria (KMB). Avoid application during heavy rainfall.',
        leafletInfo: 'Detailed product leaflet available. Contact customer care for technical guidance and field demonstrations.',
        customerCareDetails: CUSTOMER_CARE,
        marketedBy: MARKETED_BY,
        isActive: true,
        isFeatured: true
    },
    {
        id: 'prod-002',
        slug: 'aqua-probiotic-plus',
        gtin: '8901234567894',
        sku: 'AQP-PRO-1KG',
        brandName: 'KN Bio Sciences',
        productName: 'Aqua Probiotic Plus',
        description: `Aqua Probiotic Plus is a premium blend of beneficial bacteria specifically formulated for aquaculture. This powerful probiotic maintains optimal water quality, controls harmful pathogens, and promotes healthy growth in shrimp and fish farming.

Our proprietary formula contains a consortium of Bacillus subtilis, Bacillus licheniformis, and Lactobacillus species that work synergistically to break down organic waste, reduce ammonia and nitrite levels, and outcompete harmful bacteria like Vibrio.

Trusted by over 5,000 pond farmers across coastal Andhra Pradesh, Tamil Nadu, and Gujarat. Our emergency Pond Rescue support team is available 24/7 for viral outbreak situations.`,
        shortDescription: 'Premium aquaculture probiotic for healthy shrimp and fish farming. Reduces mortality and improves water quality.',
        images: ['/products/aqua-probiotic-1.jpg', '/products/aqua-probiotic-2.jpg'],
        thumbnailImage: '/products/aqua-probiotic-thumb.jpg',
        segment: 'Aquaculture',
        category: 'Pond Health',
        subcategory: 'Probiotics',
        targetCrops: ['Shrimp', 'Fish'],
        targetProblems: ['White Grubs', 'Nutrients Deficiency'],
        tags: ['aquaculture', 'probiotic', 'pond-health', 'shrimp-farming', 'fish-farming'],
        mrp: 1200,
        salePrice: 999,
        discount: 17,
        inStock: true,
        variants: [
            {
                id: 'var-002-1',
                sku: 'AQP-PRO-500G',
                gtin: '8901234567895',
                mrp: 650,
                salePrice: 549,
                netWeight: '500g',
                grossWeight: '580g',
                packingType: 'Jar',
                formType: 'Powder',
                inStock: true,
                stockQuantity: 200
            },
            {
                id: 'var-002-2',
                sku: 'AQP-PRO-1KG',
                gtin: '8901234567896',
                mrp: 1200,
                salePrice: 999,
                netWeight: '1kg',
                grossWeight: '1.15kg',
                packingType: 'Bucket',
                formType: 'Powder',
                inStock: true,
                stockQuantity: 150
            },
            {
                id: 'var-002-3',
                sku: 'AQP-PRO-5KG',
                gtin: '8901234567897',
                mrp: 5500,
                salePrice: 4499,
                netWeight: '5kg',
                grossWeight: '5.5kg',
                packingType: 'Bucket',
                formType: 'Powder',
                inStock: true,
                stockQuantity: 50
            }
        ],
        countryOfOrigin: 'India',
        netWeight: '1kg',
        grossWeight: '1.15kg',
        shelfLife: '18 months from date of manufacture',
        cbirc: 'CBIRC/2023/AQU/045',
        manufacturingLicence: 'ML/TS/AQU/2023/67890',
        stateRegistration: 'TS/FISH/REG/2023/12345',
        chemicalComposition: [
            { ingredient: 'Bacillus subtilis', percentage: 'Min. 5 × 10⁹ CFU/g', role: 'Probiotic bacteria' },
            { ingredient: 'Bacillus licheniformis', percentage: 'Min. 3 × 10⁹ CFU/g', role: 'Probiotic bacteria' },
            { ingredient: 'Lactobacillus acidophilus', percentage: 'Min. 2 × 10⁹ CFU/g', role: 'Probiotic bacteria' },
            { ingredient: 'Enzyme complex', percentage: '5%', role: 'Digestive aid' },
            { ingredient: 'Carrier base', percentage: 'q.s.', role: 'Carrier' }
        ],
        antidoteStatement: 'Non-toxic product. Safe for aquatic life, environment, and humans. In case of accidental ingestion, drink water and consult a doctor if any discomfort persists.',
        warningStatement: 'Store in cool, dry place. Keep container tightly closed after use. Do not use in combination with antibiotics - wait 48 hours after antibiotic treatment before application.',
        precautions: [
            'Do not use with antibiotics or chemicals - wait 48 hours after chemical treatment',
            'Store at temperatures below 30°C',
            'Keep container sealed when not in use',
            'Apply during morning hours for best results',
            'Avoid application during extreme weather conditions'
        ],
        directionsOfUse: `Regular Application:
- Shrimp Ponds: 200-500g per acre, weekly
- Fish Ponds: 150-300g per acre, weekly

Dissolve in pond water and broadcast evenly across the pond. Apply during early morning or evening hours.

During Stress/Disease Outbreak:
Double the dosage and apply daily for 3-5 days. Contact our Pond Rescue helpline for emergency support.`,
        standardInstructions: 'Use throughout the culture period for best results. Start application from day 10 of stocking. Maintain proper aeration during application.',
        recommendations: 'For comprehensive pond management, use alongside KN Bio Water Clarifier and Pond Mineral Mix. Monitor water quality parameters regularly.',
        leafletInfo: 'Complete application guide and water quality management tips included. 24/7 technical support available through our Pond Rescue helpline.',
        customerCareDetails: CUSTOMER_CARE,
        marketedBy: MARKETED_BY,
        isActive: true,
        isFeatured: true
    },
    {
        id: 'prod-003',
        slug: 'neem-oil-organic-pesticide',
        gtin: '8901234567898',
        sku: 'NEEM-OIL-1L',
        brandName: 'KN Bio Sciences',
        productName: 'Neem Oil Organic Pesticide',
        description: `KN Bio's Neem Oil Organic Pesticide is a 100% natural, cold-pressed neem oil formulation with 10,000 PPM Azadirachtin. This NPOP certified organic pesticide effectively controls over 200 species of pests including thrips, mites, whiteflies, aphids, and caterpillars.

Our neem oil works through multiple modes of action - as an antifeedant, growth regulator, and repellent. Unlike chemical pesticides, pests cannot develop resistance to neem oil.

Safe for beneficial insects like bees and ladybugs when applied as directed. Ideal for organic farming, kitchen gardens, and export-oriented agriculture.`,
        shortDescription: '100% organic neem oil with 10,000 PPM Azadirachtin. Controls 200+ pest species naturally.',
        images: ['/products/neem-oil-1.jpg', '/products/neem-oil-2.jpg'],
        thumbnailImage: '/products/neem-oil-thumb.jpg',
        segment: 'Organic Farming',
        category: 'Bio-Pesticides',
        subcategory: 'Neem Products',
        targetCrops: ['Paddy', 'Cotton', 'Chilli', 'Mango', 'Papaya', 'Pomegranate', 'Turmeric'],
        targetProblems: ['Thrips', 'Mites', 'White Flys', 'Green Flys'],
        tags: ['organic', 'neem', 'pesticide', 'npop-certified', 'natural'],
        mrp: 550,
        salePrice: 475,
        discount: 14,
        inStock: true,
        variants: [
            {
                id: 'var-003-1',
                sku: 'NEEM-OIL-250ML',
                gtin: '8901234567899',
                mrp: 180,
                salePrice: 155,
                netContent: '250ml',
                grossWeight: '300g',
                packingType: 'Bottle',
                formType: 'Liquid',
                inStock: true,
                stockQuantity: 400
            },
            {
                id: 'var-003-2',
                sku: 'NEEM-OIL-500ML',
                gtin: '8901234567900',
                mrp: 320,
                salePrice: 275,
                netContent: '500ml',
                grossWeight: '580g',
                packingType: 'Bottle',
                formType: 'Liquid',
                inStock: true,
                stockQuantity: 300
            },
            {
                id: 'var-003-3',
                sku: 'NEEM-OIL-1L',
                gtin: '8901234567901',
                mrp: 550,
                salePrice: 475,
                netContent: '1 Litre',
                grossWeight: '1.1kg',
                packingType: 'Bottle',
                formType: 'Liquid',
                inStock: true,
                stockQuantity: 200
            },
            {
                id: 'var-003-4',
                sku: 'NEEM-OIL-5L',
                gtin: '8901234567902',
                mrp: 2400,
                salePrice: 1999,
                netContent: '5 Litres',
                grossWeight: '5.5kg',
                packingType: 'Can',
                formType: 'Liquid',
                inStock: true,
                stockQuantity: 80
            }
        ],
        countryOfOrigin: 'India',
        netContent: '1 Litre',
        grossWeight: '1.1kg',
        shelfLife: '24 months from date of manufacture',
        cbirc: 'CBIRC/2023/BIO/078',
        manufacturingLicence: 'ML/TS/ORG/2023/34567',
        stateRegistration: 'TS/NPOP/REG/2023/98765',
        chemicalComposition: [
            { ingredient: 'Azadirachtin', percentage: '10,000 PPM (1%)', role: 'Active ingredient' },
            { ingredient: 'Neem oil (cold pressed)', percentage: '99%', role: 'Base' },
            { ingredient: 'Natural emulsifiers', percentage: 'q.s.', role: 'Emulsification' }
        ],
        antidoteStatement: 'In case of skin contact, wash with soap and water. For eye contact, flush with clean water for 15 minutes. If ingested, do not induce vomiting - give water and seek medical attention. Keep the label for physician reference.',
        warningStatement: 'FOR AGRICULTURAL USE ONLY. Keep away from food and foodstuff. Do not contaminate water bodies. Harmful to fish and aquatic organisms. Wear protective clothing during handling.',
        precautions: [
            'Wear protective gloves and eyewear during handling and application',
            'Do not apply during flowering to protect pollinators',
            'Avoid application during peak sunlight hours',
            'Do not mix with alkaline substances',
            'Keep away from fire and heat sources',
            'Store in original container only'
        ],
        directionsOfUse: `Foliar Spray:
Mix 3-5ml per litre of water. Add a surfactant if needed. Spray thoroughly on both sides of leaves, covering all plant parts.

Frequency: Apply every 7-10 days for preventive action, or every 3-5 days during active infestation.

Pre-Harvest Interval: 3 days

Best Time to Spray: Early morning or late evening`,
        standardInstructions: 'Shake well before use. Test on a small area before full application. Compatible with most bio-inputs but conduct a jar test before tank mixing.',
        recommendations: 'For best results, use in rotation with other bio-pesticides like Beauveria bassiana and Metarhizium. Integrate with pheromone traps for complete IPM.',
        leafletInfo: 'Complete pest identification guide and application calendar available. Contact our organic farming consultants for free guidance.',
        customerCareDetails: CUSTOMER_CARE,
        marketedBy: MARKETED_BY,
        isActive: true,
        isFeatured: true
    },
    {
        id: 'prod-004',
        slug: 'poultry-gut-health-plus',
        gtin: '8901234567903',
        sku: 'PGH-PLUS-1KG',
        brandName: 'KN Bio Sciences',
        productName: 'Poultry Gut Health Plus',
        description: `Poultry Gut Health Plus is a synbiotic formulation containing probiotics, prebiotics, and organic acids for comprehensive digestive health in broilers and layers. This multi-strain probiotic improves feed conversion ratio (FCR), enhances immunity, and reduces mortality.

Our formulation contains over 20 billion CFU per gram of beneficial bacteria including Lactobacillus, Bacillus, and Enterococcus strains, combined with mannan-oligosaccharides (MOS) and fructo-oligosaccharides (FOS).

Proven to reduce antibiotic dependency while maintaining optimal flock performance. Ideal for antibiotic-free poultry production systems.`,
        shortDescription: 'Synbiotic gut health supplement for broilers and layers. Improves FCR and reduces mortality.',
        images: ['/products/poultry-gut-1.jpg', '/products/poultry-gut-2.jpg'],
        thumbnailImage: '/products/poultry-gut-thumb.jpg',
        segment: 'Poultry Healthcare',
        category: 'Probiotics',
        subcategory: 'Gut Health',
        targetCrops: ['Broilers', 'Layers', 'Chicks'],
        targetProblems: [],
        tags: ['poultry', 'probiotic', 'gut-health', 'broiler', 'layer', 'synbiotic'],
        mrp: 850,
        salePrice: 725,
        discount: 15,
        inStock: true,
        variants: [
            {
                id: 'var-004-1',
                sku: 'PGH-PLUS-500G',
                gtin: '8901234567904',
                mrp: 480,
                salePrice: 399,
                netWeight: '500g',
                grossWeight: '550g',
                packingType: 'Jar',
                formType: 'Powder',
                inStock: true,
                stockQuantity: 180
            },
            {
                id: 'var-004-2',
                sku: 'PGH-PLUS-1KG',
                gtin: '8901234567905',
                mrp: 850,
                salePrice: 725,
                netWeight: '1kg',
                grossWeight: '1.1kg',
                packingType: 'Bucket',
                formType: 'Powder',
                inStock: true,
                stockQuantity: 120
            },
            {
                id: 'var-004-3',
                sku: 'PGH-PLUS-5KG',
                gtin: '8901234567906',
                mrp: 3800,
                salePrice: 3199,
                netWeight: '5kg',
                grossWeight: '5.5kg',
                packingType: 'Bucket',
                formType: 'Powder',
                inStock: true,
                stockQuantity: 40
            }
        ],
        countryOfOrigin: 'India',
        netWeight: '1kg',
        grossWeight: '1.1kg',
        shelfLife: '12 months from date of manufacture',
        manufacturingLicence: 'ML/TS/VET/2023/45678',
        stateRegistration: 'TS/AH/REG/2023/54321',
        chemicalComposition: [
            { ingredient: 'Lactobacillus acidophilus', percentage: 'Min. 5 × 10⁹ CFU/g', role: 'Probiotic' },
            { ingredient: 'Lactobacillus plantarum', percentage: 'Min. 5 × 10⁹ CFU/g', role: 'Probiotic' },
            { ingredient: 'Bacillus subtilis', percentage: 'Min. 5 × 10⁹ CFU/g', role: 'Probiotic' },
            { ingredient: 'Enterococcus faecium', percentage: 'Min. 3 × 10⁹ CFU/g', role: 'Probiotic' },
            { ingredient: 'Saccharomyces cerevisiae', percentage: 'Min. 2 × 10⁹ CFU/g', role: 'Yeast' },
            { ingredient: 'Mannan-oligosaccharides (MOS)', percentage: '2%', role: 'Prebiotic' },
            { ingredient: 'Fructo-oligosaccharides (FOS)', percentage: '2%', role: 'Prebiotic' },
            { ingredient: 'Organic acids blend', percentage: '5%', role: 'Acidifier' }
        ],
        antidoteStatement: 'Non-toxic product. Safe for birds and handlers. In case of accidental ingestion by humans, drink water. No adverse effects expected.',
        warningStatement: 'FOR ANIMAL USE ONLY. Not for human consumption. Keep away from children. Store in a cool, dry place. Do not use with antibiotics - allow 48 hours gap.',
        precautions: [
            'Do not administer with antibiotics',
            'Store below 25°C for optimal viability',
            'Use dedicated measuring equipment',
            'Keep container tightly closed after use',
            'Use within 30 days of opening'
        ],
        directionsOfUse: `Drinking Water Application:
- Chicks (0-14 days): 0.5g per litre of drinking water
- Growers (15-35 days): 1g per litre of drinking water
- Finishers/Layers: 1g per litre of drinking water

Feed Application:
Mix 500g-1kg per ton of feed.

During Stress: Double the dosage for 3-5 days.`,
        standardInstructions: 'Use continuously from day 1 for best results. Ensure clean drinking water. Compatible with vitamins and minerals.',
        recommendations: 'Combine with KN Bio Liver Tonic for enhanced performance. Maintain good farm hygiene and biosecurity practices.',
        leafletInfo: 'Detailed poultry healthcare guide available. Our poultry experts can visit your farm for consultation.',
        customerCareDetails: CUSTOMER_CARE,
        marketedBy: MARKETED_BY,
        isActive: true,
        isFeatured: false
    },
    {
        id: 'prod-005',
        slug: 'electric-tiller-mini',
        gtin: '8901234567907',
        sku: 'E-TILL-MINI',
        brandName: 'KN Farm Equipment',
        productName: 'KN Electric Tiller Mini',
        description: `The KN Electric Tiller Mini is an affordable, eco-friendly alternative to petrol tillers. Designed specifically for small and marginal farmers, this compact tiller is perfect for kitchen gardens, polyhouses, and small farms up to 0.5 acres.

Powered by a 1.5 kW electric motor, it offers zero emissions, low noise operation, and minimal maintenance. The ergonomic design reduces operator fatigue, while the adjustable tilling width (20-40 cm) makes it versatile for different applications.

Comes with a 2-year warranty and dedicated after-sales service network. EMI options available through our partner banks.`,
        shortDescription: 'Affordable electric tiller for small farms. Zero emissions, low maintenance, 2-year warranty.',
        images: ['/products/electric-tiller-1.jpg', '/products/electric-tiller-2.jpg', '/products/electric-tiller-3.jpg'],
        thumbnailImage: '/products/electric-tiller-thumb.jpg',
        segment: 'Farm Equipment',
        category: 'Tillers',
        subcategory: 'Electric Tillers',
        targetCrops: [],
        targetProblems: [],
        tags: ['equipment', 'tiller', 'electric', 'eco-friendly', 'small-farm'],
        mrp: 18500,
        salePrice: 15999,
        discount: 14,
        inStock: true,
        variants: [
            {
                id: 'var-005-1',
                sku: 'E-TILL-MINI',
                gtin: '8901234567907',
                mrp: 18500,
                salePrice: 15999,
                netWeight: '15kg',
                grossWeight: '18kg',
                packingType: 'Box',
                formType: 'Equipment',
                inStock: true,
                stockQuantity: 25
            }
        ],
        countryOfOrigin: 'India',
        netWeight: '15kg',
        grossWeight: '18kg (with packaging)',
        shelfLife: 'Not applicable',
        manufacturingLicence: 'ML/TS/EQP/2023/78901',
        chemicalComposition: [],
        antidoteStatement: 'Not applicable - This is mechanical equipment.',
        warningStatement: 'Read user manual before operation. Use appropriate safety gear. Do not operate in wet conditions. Keep away from water. Disconnect power before maintenance.',
        precautions: [
            'Read user manual thoroughly before first use',
            'Wear safety shoes and eye protection during operation',
            'Do not operate in wet or waterlogged conditions',
            'Keep children and bystanders away during operation',
            'Disconnect from power supply before any maintenance',
            'Do not overload the tiller beyond rated capacity'
        ],
        directionsOfUse: `1. Connect to a 230V AC power supply using the provided cable
2. Adjust tilling depth using the depth control lever
3. Set desired tilling width (20-40 cm)
4. Hold both handles firmly and engage the motor
5. Guide the tiller at a steady walking pace
6. After use, clean tines and store in a dry place

Maintenance: Lubricate moving parts monthly. Check tine condition before each use.`,
        standardInstructions: 'Suitable for soft to medium soil. For hard soil, water the area before tilling. Maximum tilling depth: 15 cm.',
        recommendations: 'Ideal for vegetable gardens, flower beds, and nurseries. Use in combination with our organic fertilizers for best soil health.',
        leafletInfo: 'User manual, warranty card, and spare parts list included. Video tutorials available on our YouTube channel.',
        customerCareDetails: CUSTOMER_CARE,
        marketedBy: MARKETED_BY,
        isActive: true,
        isFeatured: true
    }
];

// Featured products for homepage
export const FEATURED_PRODUCTS: FeaturedProduct[] = MOCK_PRODUCTS
    .filter(p => p.isFeatured)
    .map(p => ({
        id: p.id,
        productName: p.productName,
        shortDescription: p.shortDescription,
        thumbnailImage: p.thumbnailImage || p.images[0] || '/placeholder-product.jpg',
        salePrice: p.salePrice,
        mrp: p.mrp,
        slug: p.slug,
        segment: p.segment,
        tags: p.tags
    }));

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
    return MOCK_PRODUCTS.find(p => p.slug === slug);
}

// Get products by segment
export function getProductsBySegment(segment: string): Product[] {
    return MOCK_PRODUCTS.filter(p => p.segment.toLowerCase() === segment.toLowerCase() && p.isActive);
}

// Get products by crop
export function getProductsByCrop(crop: string): Product[] {
    return MOCK_PRODUCTS.filter(p => p.targetCrops.some(c => c.toLowerCase() === crop.toLowerCase()) && p.isActive);
}

// Get products by problem
export function getProductsByProblem(problem: string): Product[] {
    return MOCK_PRODUCTS.filter(p => p.targetProblems.some(prob => prob.toLowerCase() === problem.toLowerCase()) && p.isActive);
}

// Search products
export function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return MOCK_PRODUCTS.filter(p =>
        p.isActive && (
            p.productName.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
            p.segment.toLowerCase().includes(lowerQuery)
        )
    );
}

// Get all segments
export function getAllSegments(): string[] {
    return [...new Set(MOCK_PRODUCTS.map(p => p.segment))];
}

// Get all crops
export function getAllCrops(): string[] {
    return [...new Set(MOCK_PRODUCTS.flatMap(p => p.targetCrops))];
}

// Get all problems  
export function getAllProblems(): string[] {
    return [...new Set(MOCK_PRODUCTS.flatMap(p => p.targetProblems))];
}
