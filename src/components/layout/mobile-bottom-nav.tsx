'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faBox, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';

// Mobile navigation items in order: About, Contact, Home (center), Products, Videos
const navItems = [
  { href: '/about', label: 'About', icon: faUsers },
  { href: '/contact', label: 'Contact', icon: faEnvelope },
  { href: '/', label: 'Home', icon: faHome, isCenter: true },
  { href: '/products', label: 'Products', icon: faBox },
  { href: '/videos', label: 'Videos', icon: faVideo },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t bg-background">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isCenter = item.isCenter || false;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-lg",
                "text-xs font-medium transition-colors",
                isActive
                  ? "text-white bg-[#001837] dark:bg-primary dark:text-white"
                  : "text-muted-foreground hover:bg-primary/10 active:bg-primary/20"
              )}
            >
              <FontAwesomeIcon 
                icon={item.icon} 
                className={cn(
                  "transition-all",
                  isCenter ? "h-6 w-6" : "h-5 w-5",
                  isActive && "scale-110"
                )} 
              />
              <span className={cn(
                "text-[10px] leading-tight text-center",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

