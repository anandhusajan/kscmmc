'use client';

import { getProducts } from '@/lib/data';
import { ProductCard } from '@/components/shared/product-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCogs } from '@fortawesome/free-solid-svg-icons';

export default function ProductsPage() {
  const allItems = getProducts();
  const finishedProducts = allItems.filter(p => p.productType === 'product');
  const machines = allItems.filter(p => p.productType === 'machine');

  return (
    <div className="container mx-auto px-4 md:px-6 pt-4 pb-12 md:py-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
          <FontAwesomeIcon icon={faBox} className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-headline text-2xl md:text-4xl font-bold">Our Products</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
          Explore our range of finished coir products and advanced machinery.
        </p>
      </div>

      {finishedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="font-headline text-2xl font-bold mb-6 border-b pb-2 text-center">Finished Products</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {finishedProducts.map(product => (
              <div key={product.id} className="w-full md:w-[350px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {machines.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6 border-b pb-2">
            <FontAwesomeIcon icon={faCogs} className="h-6 w-6 text-primary" />
            <h2 className="font-headline text-2xl font-bold">Machinery</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {machines.map(machine => (
              <ProductCard key={machine.id} product={machine} />
            ))}
          </div>
        </div>
      )}

      {allItems.length === 0 && (
        <div className="mt-12 text-center text-muted-foreground">No products found.</div>
      )}
    </div>
  );
}
