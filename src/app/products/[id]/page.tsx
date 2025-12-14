import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getProductById } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faArrowRight, faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { JsonLd } from '@/components/shared/json-ld';
import type { Metadata } from 'next';
import { ProductCard } from '@/components/shared/product-card';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: 'article',
    },
  };
}

export function generateStaticParams() {
  const products = getProducts();
  return products.map(product => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const allProducts = getProducts();
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 8);

  const productImage = PlaceHolderImages.find(p => p.id === product.image.id);

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": productImage ? productImage.imageUrl : "",
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
              {productImage && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={productImage.imageUrl}
                    alt={product.name}
                    data-ai-hint={productImage.imageHint}
                    fill
                    className="rounded-t-lg object-cover"
                  />
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
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-center">Related Products</h2>
            <Separator className="my-8" />
            <div className="flex overflow-x-auto pb-6 gap-6 md:gap-8 scrollbar-hide snap-x px-4 -mx-4 md:mx-0">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="min-w-[280px] md:min-w-[300px] lg:min-w-[calc(25%-1.5rem)] snap-start">
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
