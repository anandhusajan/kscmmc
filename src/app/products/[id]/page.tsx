'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { getProducts, getProductById } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faArrowRight, faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { JsonLd } from '@/components/shared/json-ld';
import { ProductCard } from '@/components/shared/product-card';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const allProducts = getProducts();
  // Get products excluding current product
  const availableProducts = allProducts.filter(p => p.id !== product.id);
  
  // Shuffle array to randomize product selection each time page loads
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  // Get 8 random products - shuffle only once on mount
  const [relatedProducts] = useState(() => {
    return shuffleArray(availableProducts).slice(0, 8);
  });

  // Auto-scroll plugin - use useRef like the working home page example
  const autoplayPlugin = useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: false, // Keep running, we'll handle pause manually
    })
  );

  const [carouselKey, setCarouselKey] = useState(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle interaction - pause and resume after delay
  const handleInteraction = () => {
    // Clear any existing timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    
    // Stop the plugin
    if (autoplayPlugin.current) {
      autoplayPlugin.current.stop();
    }
    
    // Remount carousel after 3 seconds to resume autoplay
    resumeTimeoutRef.current = setTimeout(() => {
      // Recreate plugin and remount carousel
      autoplayPlugin.current = Autoplay({ 
        delay: 3000, 
        stopOnInteraction: false,
      });
      setCarouselKey(prev => prev + 1);
    }, 3000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  // Check if image.id is a direct path (starts with /)
  const isDirectPath = product.image.id.startsWith('/');
  const imageSrc = isDirectPath ? product.image.id : (PlaceHolderImages.find(p => p.id === product.image.id)?.imageUrl || '');

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": imageSrc,
    "description": product.shortDescription,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "KSCMMC"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://coirconnect.firebaseapp.com/products/${product.id}`,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "KSCMMC"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://coirconnect.firebaseapp.com"
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://coirconnect.firebaseapp.com/products"
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": product.name
    }]
  };


  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="container mx-auto px-4 md:px-6 pt-4 pb-12 md:py-12">

        <nav className="mb-6 flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary flex items-center">
            <FontAwesomeIcon icon={faHome} className="h-4 w-4 mr-1" /> Home
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
          <Link href="/products" className="hover:text-primary">Products</Link>
          <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
          <span className="font-medium text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-6 md:gap-12 md:grid-cols-2">
          <Card>
            <CardContent className="p-0">
              {imageSrc && (
                <div className="relative w-full min-h-[400px] md:min-h-[500px] bg-secondary overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="rounded-lg object-contain max-w-full max-h-full w-auto h-full"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col">
            <p className="font-semibold text-primary">{product.category}</p>
            <h1 className="font-headline mt-2 text-2xl md:text-4xl font-bold">{product.name}</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">{product.shortDescription}</p>

            <div className="mt-8 flex flex-grow flex-col">
              <Card className="flex-grow">
                <CardHeader>
                  <CardTitle className="font-headline text-xl md:text-2xl">Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.specifications.map(spec => (
                      <li key={spec.key} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{spec.key}</span>
                        <span className="text-right text-muted-foreground">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button asChild size="lg">
                <Link href="/contact">
                  Enquire Now <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg">
                <a href={product.brochureUrl} download>
                  <FontAwesomeIcon icon={faDownload} className="mr-2 h-5 w-5" />
                  Download Brochure
                </a>
              </Button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-12 md:mt-24">
            <div className="text-center mb-8">
              <h2 className="font-headline text-2xl md:text-3xl font-bold">Other Products</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">Explore more of our products</p>
            </div>
            <Separator className="my-8" />
            <div 
              className="w-full"
              onTouchStart={handleInteraction}
              onMouseEnter={handleInteraction}
            >
              <Carousel
                key={carouselKey}
                plugins={[autoplayPlugin.current]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {relatedProducts.map((relatedProduct) => (
                    <CarouselItem key={relatedProduct.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <ProductCard product={relatedProduct} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/products">
                  View All Products <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
