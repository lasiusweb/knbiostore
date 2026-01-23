"use client";

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function StoreSearch({ defaultValue = "" }: { defaultValue?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set('q', value);
            } else {
                params.delete('q');
            }
            router.push(`/store?${params.toString()}`);
        }, 500);

        return () => clearTimeout(timer);
    }, [value, router, searchParams]);

    return (
        <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
                type="search"
                placeholder="Search products..."
                className="pl-12 h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm focus:bg-white/20"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
