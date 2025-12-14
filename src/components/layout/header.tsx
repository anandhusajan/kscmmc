'use client';
// Re-syncing server state

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBox,
  faFileLines,
  faUsers,
  faBriefcase,
  faVideo,
  faImages,
  faScaleBalanced,
  faEnvelope,
  faBars
} from '@fortawesome/free-solid-svg-icons';

import { cn } from '@/lib/utils';
import type { NavLink } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: faHome },
  { href: '/products', label: 'Products', icon: faBox },
  { href: '/videos', label: 'Videos', icon: faVideo },
  { href: '/gallery', label: 'Gallery', icon: faImages },
  { href: '/tenders', label: 'Tenders', icon: faFileLines },
  { href: '/careers', label: 'Careers', icon: faBriefcase },
  { href: '/rti', label: 'RTI', icon: faScaleBalanced },
  { href: '/about', label: 'About Us', icon: faUsers },
  { href: '/contact', label: 'Contact Us', icon: faEnvelope },
];

export function Header() {
  const pathname = usePathname();
  const [language, setLanguage] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ml' : 'en'));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center relative px-4 md:px-6">
        {/* Desktop: Logo on left */}
        <div className="absolute left-4 md:left-6 hidden lg:flex items-center gap-2">
          <Logo />
          <Link href="/" className="flex flex-col justify-center group">
            <span className="font-headline text-lg font-bold text-foreground leading-none">
              KSCMMC
            </span>
            <span className="text-[10px] font-medium text-black dark:text-white leading-none mt-0.5">
              Govt. of Kerala Undertaking
            </span>
          </Link>
        </div>

        {/* Desktop: Navigation in center */}
        <div className="hidden lg:flex flex-1 justify-center">
          <nav className="flex justify-center gap-1 text-sm bg-primary/5 dark:bg-white/10 p-1 rounded-xl border border-primary/10 dark:border-white/10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap font-bold uppercase transition-colors px-3 py-1.5 rounded-lg text-xs xl:text-sm",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-black dark:text-muted-foreground hover:bg-primary/10 hover:text-primary dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile: Logo on left */}
        <div className="flex-1 flex justify-start items-center gap-2 lg:hidden">
          <Logo size="sm" />
          <Link href="/" className="flex flex-col justify-center group">
            <span className="font-headline text-base font-bold text-foreground leading-none">
              KSCMMC
            </span>
            <span className="text-[9px] font-medium text-black dark:text-white leading-none mt-0.5">
              Govt. of Kerala Undertaking
            </span>
          </Link>
        </div>

        {/* Desktop & Mobile: Theme toggle, language selector, and menu button on right */}
        <div className="absolute right-4 md:right-6 flex items-center justify-end space-x-2">
          <ThemeToggle />
          <Button variant="outline" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
            <span className="font-bold text-sm">{language === 'en' ? 'En' : 'Ml'}</span>
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <FontAwesomeIcon icon={link.icon} className="h-5 w-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
