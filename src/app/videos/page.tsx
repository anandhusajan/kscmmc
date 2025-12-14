import type { Metadata } from 'next';
import { YouTubeVideos } from '@/components/shared/youtube-videos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faVideo } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch videos about KSCMMC products, machinery, and coir industry.',
};

export default function VideosPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 pt-4 pb-24 md:pb-12 lg:pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
            <FontAwesomeIcon icon={faVideo} className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-headline text-2xl md:text-4xl font-bold mb-4">Videos</h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground mb-4">
            Watch our product demonstrations, machinery operations, and learn more about the coir industry.
          </p>
          <Link
            href="https://www.youtube.com/playlist?list=PLduIvDq8KeQoliK7BBGkuwXPXIIZiN3cp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View All Videos on YouTube
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 w-4" />
          </Link>
        </div>
        
        <YouTubeVideos />
      </div>
    </div>
  );
}

