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

export function ProductCard({ product }: ProductCardProps) {
  const productImage = PlaceHolderImages.find(p => p.id === product.image.id);

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative h-48 w-full">
            {productImage ? (
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                data-ai-hint={productImage.imageHint}
                fill
                className="object-cover"
              />
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
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>
            View Details <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
