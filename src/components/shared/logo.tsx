import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';

type LogoProps = {
  stacked?: boolean;
  useImage?: boolean; // Set to false to use icon + text instead
  size?: 'sm' | 'md' | 'lg'; // Logo size variants
};

export function Logo({ stacked = false, useImage = true, size = 'md' }: LogoProps) {
  // KSCMMC circular logo path
  const logoPath = '/logo/kerala-state-coir-machinery-manufacturing-company-limited-logo-kscmmc.png';
  
  // Size variants for the circular logo
  const sizeClasses = {
    sm: 'h-8 w-8',      // 32px
    md: 'h-12 w-12',    // 48px - default for header
    lg: 'h-16 w-16',    // 64px
  };
  
  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center gap-2",
        stacked && "flex-col"
      )}
      prefetch={false}
    >
      {useImage ? (
        // Circular logo image from public/logo/ folder
        <div className={cn(
          "relative rounded-full overflow-hidden flex-shrink-0",
          "ring-2 ring-primary/20 hover:ring-primary/40 transition-all",
          sizeClasses[size]
        )}>
          <Image 
            src={logoPath} 
            alt="KSCMMC Logo" 
            fill
            className="object-cover rounded-full"
            priority
          />
        </div>
      ) : (
        // Fallback to icon + text
        <>
          <div className="rounded-full bg-primary p-2 text-primary-foreground">
            <FontAwesomeIcon icon={faLeaf} className="h-6 w-6" />
          </div>
          <span className="font-headline text-xl font-bold">KSCMMC</span>
        </>
      )}
    </Link>
  );
}
