import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export function HomeFooter() {
  const { footer } = MOCK_HOME_DATA;

  const SocialIcon = ({ platform }: { platform: string }) => {
    const icons: Record<string, React.ReactNode> = {
      facebook: <Facebook className="w-4 h-4" />,
      twitter: <Twitter className="w-4 h-4" />,
      instagram: <Instagram className="w-4 h-4" />,
      youtube: <Youtube className="w-4 h-4" />,
      linkedin: <Linkedin className="w-4 h-4" />,
    };
    return icons[platform] || null;
  };

  return (
    <footer className="section-dark py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand & About */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              <span className="text-gradient">KN Bio</span>Store
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India&apos;s #1 Agri-Science Innovator Since 1997. Pioneering sustainable solutions for Indian farmers.
            </p>

            {/* Social Icons */}
            {footer.socials && (
              <div className="flex gap-3">
                {Object.entries(footer.socials).map(([platform, url]) => (
                  url && (
                    <Link
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
                      aria-label={platform}
                    >
                      <SocialIcon platform={platform} />
                    </Link>
                  )
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footer.quickLinks?.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Customer Care</h4>
            <ul className="space-y-3">
              {footer.customerCare?.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  {footer.address}
                </span>
              </li>
              <li>
                <Link
                  href={`tel:${footer.helpline}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="text-xs text-gray-500 block">Helpline</span>
                    <span className="text-sm font-semibold">{footer.helpline}</span>
                  </div>
                </Link>
              </li>
              {footer.email && (
                <li>
                  <Link
                    href={`mailto:${footer.email}`}
                    className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{footer.email}</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              {footer.copyright}
            </p>

            {/* Legal Links */}
            {footer.legal && (
              <div className="flex flex-wrap justify-center gap-6">
                {footer.legal.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-gray-500 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
