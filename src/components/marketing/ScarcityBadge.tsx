import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface ScarcityBadgeProps {
  stock: number;
  threshold?: number;
}

export function ScarcityBadge({ stock, threshold = 10 }: ScarcityBadgeProps) {
  if (stock > threshold || stock <= 0) return null;

  return (
    <Badge variant="destructive" className="flex items-center gap-1 animate-pulse-glow">
      <AlertTriangle className="w-3 h-3" />
      <span>Only {stock} units left in this batch!</span>
    </Badge>
  );
}
