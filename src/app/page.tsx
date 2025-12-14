
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCard } from '@/components/shared/product-card';
import { getProducts, getTenders } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatDate } from '@/lib/date-utils';
import { Badge } from '@/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faFileLines, 
  faChevronDown, 
  faAward, 
  faBullseye, 
  faEye,
  faX
} from '@fortawesome/free-solid-svg-icons';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function Home() {
  const featuredProducts = getProducts().slice(0, 2);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [selectedBannerImage, setSelectedBannerImage] = useState<string | null>(null);
  const latestTender = getTenders()[0];
  const sliderImages = [
    { id: '1', imageUrl: '/images/01.png', description: 'Coir Fiber Processing', imageHint: 'coir fiber' },
    { id: '2', imageUrl: '/images/02.png', description: 'Coir Mats and Products', imageHint: 'coir mats' },
    { id: '3', imageUrl: '/images/03.png', description: 'Rope Manufacturing', imageHint: 'coir rope' },
    { id: '4', imageUrl: '/images/04.png', description: 'Advanced Machinery', imageHint: 'machinery' },
    { id: '5', imageUrl: '/images/05.png', description: 'Raw Materials', imageHint: 'coconut husks' },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="flex flex-col mt-1">
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
                      onClick={() => setSelectedBannerImage(image.imageUrl)}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.description}
                        className="h-full w-full object-contain md:object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.error('Image failed to load:', image.imageUrl);
                          target.style.display = 'none'; // Hide broken image
                          // Show parent background color as fallback
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

      {/* Company Introduction Section */}
      <section className="bg-background pt-1 pb-8 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-3 md:space-y-6">
            {/* Company Name */}
            <div className="space-y-2 md:space-y-3">
              <h1 className="font-headline text-2xl md:text-4xl font-bold text-primary">
                Kerala State Coir Machinery Manufacturing Company Limited
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-sm md:text-base">
                <Badge variant="secondary" className="text-xs md:text-sm px-4 py-1 bg-[hsl(180,50%,25%)] text-white hover:bg-[hsl(180,50%,25%)]/80 dark:bg-[hsl(180,50%,25%)] dark:text-white dark:hover:bg-[hsl(180,50%,25%)]/80">
                  Government of Kerala Undertaking
                </Badge>
                <Badge className="text-xs md:text-sm px-4 py-1 flex items-center gap-2 bg-[hsl(220,90%,35%)] text-white hover:bg-[hsl(220,90%,35%)]/80 dark:bg-[hsl(220,90%,35%)] dark:text-white dark:hover:bg-[hsl(220,90%,35%)]/80">
                  <FontAwesomeIcon icon={faAward} className="h-3 w-3" />
                  ISO 9001:2015 Certified
                </Badge>
              </div>
            </div>

            {/* Company Description */}
            <div className="pt-4 md:pt-6 space-y-4">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                KSCMMC Limited, a public sector enterprise was established with an objective to revamp the coir industry in Kerala. The 24 crore project, which has a building complex sprawling upto 48,000 sq. ft. at Alappuzha was implemented after several comprehensive and thorough consultations at the governmental level.
              </p>

              {/* Scroll Down Indicator */}
              <div className="flex flex-col items-center justify-center pt-4">
                <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
                <FontAwesomeIcon icon={faChevronDown} className="h-6 w-6 text-primary animate-bounce" />
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
              <Card className="text-center md:text-left">
                <CardHeader>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2 flex items-center justify-center">
                      <FontAwesomeIcon icon={faBullseye} className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-lg md:text-xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Design and development of different types of machinery to modernise coir industry sector in India.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center md:text-left">
                <CardHeader>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2 flex items-center justify-center">
                      <FontAwesomeIcon icon={faEye} className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-lg md:text-xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Focus upon the development of coir manufacturing equipments and machinery in order to boost coir industry in India.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-8 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <h1 className="font-headline text-2xl md:text-5xl font-bold">
              Empowering the Coir Industry through Innovation
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-xl text-muted-foreground">
              As an ISO 9001:2015 certified company, we are dedicated to revolutionizing the coir sector with state-of-the-art machinery and technology.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <Link href="/products">Explore Our Products</Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-8 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 items-center gap-6 md:gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary">
                Pioneers in Coir Mechanization Since 1992
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                The Kerala State Coir Machinery Manufacturing Company Ltd (KSCMMC) was founded with the mission to manufacture and popularize modern coir processing machinery. We boast advanced manufacturing capabilities including CNC lathes and milling machines, ensuring precision and quality in every product.
              </p>
              <Button asChild className="mt-6">
                <Link href="/about">About Our Company</Link>
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-lg md:text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  To design, develop, and deliver high-quality, efficient, and affordable coir machinery, ensuring the sustainable growth of the coir sector and improving the livelihoods of those who depend on it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="products" className="bg-secondary py-8 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-headline text-2xl md:text-3xl font-bold">Featured Products</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm md:text-base text-muted-foreground">
              Discover our innovative machinery designed for efficiency and durability.
            </p>
          </div>
          <div className="mt-8 md:mt-12 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {getProducts().filter(p => ['rsm-01', 'pwm-01'].includes(p.id)).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            <Card className="flex flex-col items-center justify-center text-center">
              <CardHeader>
                <CardTitle className="font-headline text-lg md:text-xl">Explore Our Full Range</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">From fibre extraction to weaving, we have a solution for every need.</p>
                <Button asChild className="mt-4">
                  <Link href="/products">View All Products <FontAwesomeIcon icon={faArrowRight} className="ml-2 inline" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="updates" className="py-8 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-headline text-2xl md:text-3xl font-bold">Latest Updates & Tenders</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm md:text-base text-muted-foreground">
              Stay informed about our latest Expressions of Interest (EOI) and important announcements.
            </p>
          </div>
          <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
            {latestTender && (
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <Badge className="bg-secondary-foreground text-white hover:bg-[hsl(180,50%,15%)] dark:bg-secondary-foreground dark:hover:bg-[hsl(190,60%,70%)]">Latest Expression of Interest</Badge>
                      <CardTitle className="font-headline mt-2 text-lg md:text-xl">{latestTender.title}</CardTitle>
                    </div>
                    <div className="text-sm text-muted-foreground md:text-right flex-shrink-0">
                      <p>Ref: {latestTender.referenceNumber}</p>
                      <p>Closing: {formatDate(latestTender.closingDate)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 rounded-md border p-4">
                    <FontAwesomeIcon icon={faFileLines} className="h-6 w-6 text-primary" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Tender Document
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Download the official document for full details.
                      </p>
                    </div>
                    <Button asChild>
                      <Link href="/tenders">View Tenders</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Banner Image Modal */}
      <Dialog open={!!selectedBannerImage} onOpenChange={(open) => !open && setSelectedBannerImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0">
          {selectedBannerImage && (
            <div className="relative w-full aspect-video">
              <img
                src={selectedBannerImage}
                alt="Banner Image"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
