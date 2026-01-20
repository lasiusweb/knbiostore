'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Use placeholder if no images
    const displayImages = images.length > 0 ? images : ['/placeholder-product.jpg'];

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-4 sticky top-24">
            {/* Main Image */}
            <Card className="relative aspect-square bg-muted overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Placeholder since we don't have actual images */}
                    <div className="text-center p-8">
                        <span className="text-8xl mb-4 block">📦</span>
                        <p className="text-muted-foreground">{productName}</p>
                    </div>
                </div>

                {/* Zoom Hint */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm">
                        <ZoomIn className="w-4 h-4" />
                        Click to zoom
                    </div>
                </div>

                {/* Navigation Arrows */}
                {displayImages.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md h-10 w-10"
                            onClick={goToPrevious}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md h-10 w-10"
                            onClick={goToNext}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </>
                )}
            </Card>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {displayImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-border hover:border-primary/50'
                                }`}
                        >
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                                <span className="text-2xl">📦</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
