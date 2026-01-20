import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';

export function CouponBanner() {
  const { banner } = MOCK_HOME_DATA;

  if (!banner.isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm font-medium">
      {banner.text}
      {banner.link && (
        <Link href={banner.link} className="underline ml-2 hover:text-accent">
          Learn More
        </Link>
      )}
    </div>
  );
}
