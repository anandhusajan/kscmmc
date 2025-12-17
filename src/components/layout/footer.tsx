
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faLinkedin,
  faXTwitter,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { Logo } from '@/components/shared/logo';

export function Footer() {
  return (
    <footer className="border-t border-white/20 bg-[#001f3f] text-white">
      <div className="container mx-auto px-4 md:px-6 py-8 lg:py-6">
        {/* Mobile View - Centered */}
        <div className="lg:hidden flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex justify-center">
            <Logo />
          </div>
          <p className="text-sm font-bold max-w-xs mx-auto text-white">
            Kerala State Coir Machinery Manufacturing Company Ltd.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Link href="https://www.facebook.com/kscmmc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
            </Link>
            <Link href="https://www.instagram.com/kscmmc/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
            </Link>
            <Link href="https://www.youtube.com/channel/UCY25NCixlkOXfpY1zSOmwnw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
            </Link>
            <Link href="https://x.com/kscmmc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="X (Twitter)">
              <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
            </Link>
            <Link href="https://www.linkedin.com/company/kscmmc/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
            </Link>
            <Link href="https://wa.me/919961266688" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm font-bold text-white">
              KERALA STATE COIR MACHINERY MANUFACTURING COMPANY LTD.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/kscmmc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/kscmmc/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
              </Link>
              <Link href="https://www.youtube.com/channel/UCY25NCixlkOXfpY1zSOmwnw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/kscmmc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="X (Twitter)">
                <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com/company/kscmmc/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} className="h-5 w-5" />
              </Link>
              <Link href="https://wa.me/919961266688" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition-colors" aria-label="WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-white hover:text-gray-200 font-bold">About Us</Link></li>
              <li><Link href="/products" className="text-sm text-white hover:text-gray-200 font-bold">Products</Link></li>
              <li><Link href="/careers" className="text-sm text-white hover:text-gray-200 font-bold">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-white hover:text-gray-200 font-bold">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/tenders" className="text-sm text-white hover:text-gray-200 font-bold">Tenders</Link></li>
              <li><Link href="/rti" className="text-sm text-white hover:text-gray-200 font-bold">RTI</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-white hover:text-gray-200 font-bold">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold text-white">Contact Info</h3>
            <address className="mt-4 not-italic text-sm text-white space-y-2">
              <p className="font-bold">BC-Road, Industrial Estate PO, Alappuzha, Kerala, 688521</p>
              <p className="font-bold">Email: <a href="mailto:info@kscmmc.com" className="hover:text-primary">info@kscmmc.com</a></p>
              <p className="font-bold">Phone: <a href="tel:+914772243486" className="hover:text-primary">+91-477-224-3486</a></p>
            </address>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-white/20 bg-[#001837] pb-16 lg:pb-0">
        <div className="container mx-auto px-4 md:px-6 py-4 text-center text-sm leading-relaxed">
          <p className="font-bold text-white">Copyright © 2025 – KSCMMC. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
