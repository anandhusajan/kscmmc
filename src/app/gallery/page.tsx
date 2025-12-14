'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const sliderImages = [
    { id: '1', imageUrl: '/images/01.png', description: 'Coir Fiber Processing', imageHint: 'coir fiber' },
    { id: '2', imageUrl: '/images/02.png', description: 'Coir Mats and Products', imageHint: 'coir mats' },
    { id: '3', imageUrl: '/images/03.png', description: 'Rope Manufacturing', imageHint: 'coir rope' },
    { id: '4', imageUrl: '/images/04.png', description: 'Advanced Machinery', imageHint: 'machinery' },
    { id: '5', imageUrl: '/images/05.png', description: 'Raw Materials', imageHint: 'coconut husks' },
  ];

  const galleryImages = [
    { id: '1', imageUrl: '/images/01.png', title: 'Coir Fiber Processing', description: 'Advanced machinery for processing coir fiber from coconut husks' },
    { id: '2', imageUrl: '/images/02.png', title: 'Coir Mats and Products', description: 'Beautifully crafted coir mats and finished products' },
    { id: '3', imageUrl: '/images/03.png', title: 'Rope Manufacturing', description: 'High-quality coir rope production facility' },
    { id: '4', imageUrl: '/images/04.png', title: 'Advanced Machinery', description: 'State-of-the-art coir processing equipment' },
    { id: '5', imageUrl: '/images/05.png', title: 'Raw Materials', description: 'Sustainable coconut husks ready for processing' },
    { id: '6', imageUrl: '/images/01.png', title: 'Production Line', description: 'Efficient coir manufacturing process' },
    { id: '7', imageUrl: '/images/02.png', title: 'Quality Products', description: 'Premium coir products for various applications' },
    { id: '8', imageUrl: '/images/03.png', title: 'Manufacturing Unit', description: 'Modern facility for coir product manufacturing' },
    { id: '9', imageUrl: '/images/04.png', title: 'Technology & Innovation', description: 'Cutting-edge technology in coir industry' },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="flex flex-col mt-1">
      {/* Gallery Content Section */}
      <section className="bg-background pt-4 pb-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
                <FontAwesomeIcon icon={faImages} className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-headline text-2xl md:text-4xl font-bold mb-4">Gallery</h1>
              <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground mb-4">
                Explore our collection of images showcasing our products, machinery, facilities, and the coir industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="relative w-full pt-2 pb-0 md:py-4 bg-background">
        <div className="container mx-auto px-4 md:px-6 pb-2 md:pb-0">
          <div className="relative aspect-[16/9] w-full md:h-[60vh] md:min-h-[400px] md:max-h-[500px] md:aspect-auto rounded-lg overflow-hidden border-4 border-primary/20 shadow-lg">
            <Carousel
              plugins={[plugin.current]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full h-full"
            >
              <CarouselContent className="h-full">
                {sliderImages.map((image, idx) => (
                  <CarouselItem key={image.id} className="h-full">
                    <div 
                      className="relative h-full w-full bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedImage(image.imageUrl)}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.description}
                        className="h-full w-full object-contain md:object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.error('Image failed to load:', image.imageUrl);
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Gallery Images Grid */}
      <section className="bg-background pt-8 pb-12 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedImage(image.imageUrl)}
                >
                  <div className="relative w-full h-full bg-gray-100 dark:bg-gray-900">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center px-4">
                        <h3 className="font-semibold mb-1">{image.title}</h3>
                        <p className="text-sm">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0">
          {selectedImage && (
            <div className="relative w-full aspect-video">
              <img
                src={selectedImage}
                alt="Gallery Image"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

