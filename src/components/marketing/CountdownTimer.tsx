"use client"

import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = React.useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return null;

    return {
      h: Math.floor((difference / (1000 * 60 * 60))),
      m: Math.floor((difference / 1000 / 60) % 60),
      s: Math.floor((difference / 1000) % 60)
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<{h: number, m: number, s: number} | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  if (!timeLeft) {
    return (
      <div className="text-muted-foreground text-sm font-medium flex items-center gap-2">
        <Timer className="w-4 h-4" />
        Offer Ended
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-primary font-bold">
      <Timer className="w-4 h-4 animate-pulse" />
      <div className="grid grid-cols-3 gap-1 text-center text-xs">
        <div className="bg-primary/10 p-1 rounded min-w-[2rem]">
          {timeLeft.h}h
        </div>
        <div className="bg-primary/10 p-1 rounded min-w-[2rem]">
          {timeLeft.m}m
        </div>
        <div className="bg-primary/10 p-1 rounded min-w-[2rem]">
          {timeLeft.s}s
        </div>
      </div>
      <span className="text-xs uppercase tracking-wider ml-1">Left</span>
    </div>
  );
}
