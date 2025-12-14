import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatDateLong } from '@/lib/date-utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type NewsCardProps = {
  article: NewsArticle;
};

export function NewsCard({ article }: NewsCardProps) {
  const newsImage = PlaceHolderImages.find(p => p.id === article.image.id);

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="p-0">
        {newsImage && (
          <div className="relative h-48 w-full">
            <Image
              src={newsImage.imageUrl}
              alt={article.title}
              data-ai-hint={newsImage.imageHint}
              fill
              className="object-cover"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{formatDateLong(article.date)}</p>
        <CardTitle className="font-headline mt-2 text-lg">{article.title}</CardTitle>
        <p className="mt-2 text-muted-foreground">{article.summary}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={article.link} className="flex items-center text-sm font-semibold text-primary hover:underline">
          Read More <FontAwesomeIcon icon={faArrowRight} className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
