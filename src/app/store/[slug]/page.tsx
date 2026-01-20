import { notFound } from 'next/navigation';
import { getProductBySlug, MOCK_PRODUCTS } from '@/data/mock-products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductTabs } from '@/components/product/ProductTabs';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
    return MOCK_PRODUCTS.map((product) => ({
        slug: product.slug,
    }));
}

// Generate metadata
export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        return { title: 'Product Not Found' };
    }

    return {
        title: `${product.productName} | KN Bio Store`,
        description: product.shortDescription,
        openGraph: {
            title: `${product.productName} | KN Bio Store`,
            description: product.shortDescription,
            images: product.images.length > 0 ? [product.images[0]] : [],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Generate JSON-LD for product
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.productName,
        description: product.description,
        image: product.images,
        sku: product.sku,
        gtin: product.gtin,
        brand: {
            '@type': 'Brand',
            name: product.brandName,
        },
        offers: {
            '@type': 'Offer',
            url: `https://knbiostore.com/store/${product.slug}`,
            priceCurrency: 'INR',
            price: product.salePrice,
            priceValidUntil: '2026-12-31',
            availability: product.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'K N Biosciences India Pvt Ltd',
            },
        },
        manufacturer: {
            '@type': 'Organization',
            name: 'K N Biosciences India Pvt Ltd',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Sy No 487, Behind SLI Power Engg Bachupally Road',
                addressLocality: 'Bachupally',
                addressRegion: 'Telangana',
                postalCode: '500090',
                addressCountry: 'IN',
            },
        },
        countryOfOrigin: product.countryOfOrigin,
        weight: product.netWeight,
    };

    return (
        <div className="min-h-screen bg-background">
            <JsonLd data={productSchema} />

            {/* Breadcrumbs */}
            <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-sm">
                    <li>
                        <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                            <Home className="w-4 h-4" />
                            Home
                        </Link>
                    </li>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <li>
                        <Link href="/store" className="text-muted-foreground hover:text-primary transition-colors">
                            Store
                        </Link>
                    </li>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <li>
                        <Link
                            href={`/store?segment=${encodeURIComponent(product.segment)}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            {product.segment}
                        </Link>
                    </li>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <li className="text-foreground font-medium truncate max-w-[200px]">
                        {product.productName}
                    </li>
                </ol>
            </nav>

            {/* Main Product Section */}
            <section className="container mx-auto px-4 pb-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Gallery */}
                    <ProductGallery images={product.images} productName={product.productName} />

                    {/* Product Info */}
                    <ProductInfo product={product} />
                </div>
            </section>

            {/* Product Tabs */}
            <section className="container mx-auto px-4 pb-16">
                <ProductTabs product={product} />
            </section>

            {/* Related Products */}
            <section className="container mx-auto px-4 pb-16">
                <RelatedProducts
                    currentProductId={product.id}
                    segment={product.segment}
                    targetCrops={product.targetCrops}
                />
            </section>
        </div>
    );
}
