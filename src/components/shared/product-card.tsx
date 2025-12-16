import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type ProductCardProps = {
  product: Product;
};

// Configuration: Number of days to disable the View Details button (from today)
const DAYS_TO_DISABLE = 3; // Button will be enabled after 3 days from today

function isViewDetailsEnabled(): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Calculate the enable date (today + DAYS_TO_DISABLE days)
  const enableDate = new Date(today);
  enableDate.setDate(today.getDate() + DAYS_TO_DISABLE);
  
  // Check if today has reached or passed the enable date
  return today >= enableDate;
}

export function ProductCard({ product }: ProductCardProps) {
  // Check if image.id is a direct path (starts with /)
  const isDirectPath = product.image.id.startsWith('/');
  const productImage = isDirectPath ? null : PlaceHolderImages.find(p => p.id === product.image.id);
  const imageSrc = isDirectPath ? product.image.id : (productImage?.imageUrl || '');
  const viewDetailsEnabled = isViewDetailsEnabled();

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative h-64 md:h-80 w-full bg-secondary overflow-hidden">
            {imageSrc ? (
              <div className="absolute inset-0 flex items-center justify-center p-3 md:p-4">
                <img
                  src={imageSrc}
                alt={product.name}
                  className="object-contain max-w-full max-h-full w-auto h-full"
              />
              </div>
            ) : (
                <div className="h-full w-full bg-secondary"></div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{product.category}</p>
        <CardTitle className="font-headline mt-2 text-lg">
          <Link href={`/products/${product.id}`} className="hover:underline">{product.name}</Link>
        </CardTitle>
        <CardDescription className="mt-2 flex-grow text-sm text-muted-foreground">{product.shortDescription}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {viewDetailsEnabled ? (
          <Button asChild className="w-full">
            <Link href={`/products/${product.id}`}>
              View Details <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button disabled className="w-full opacity-50 cursor-not-allowed">
            View Details <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
