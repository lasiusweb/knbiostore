import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';

export function HomeFooter() {
  const { footer } = MOCK_HOME_DATA;

  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <p className="mb-4 text-sm opacity-80 leading-relaxed">{footer.address}</p>
            <p className="text-sm">
                <span className="font-bold text-accent">Helpline:</span> {footer.helpline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
                {footer.quickLinks?.map((link, i) => (
                    <li key={i}>
                        <Link href={link.href} className="hover:text-accent transition-colors">
                            {link.label}
                        </Link>
                    </li>
                )) || (
                    <>
                        <li><Link href="/store" className="hover:text-accent">Store</Link></li>
                        <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
                    </>
                )}
            </ul>
          </div>

          {/* Social / Legal */}
          <div>
             <h4 className="text-lg font-bold text-white mb-4">Connect</h4>
             <p className="text-sm opacity-80 mb-4">Follow us on social media for updates.</p>
             {/* Social icons placeholder */}
             <div className="flex gap-4">
                 <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-accent cursor-pointer transition-colors">F</div>
                 <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-accent cursor-pointer transition-colors">T</div>
                 <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-accent cursor-pointer transition-colors">I</div>
             </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs opacity-50">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
