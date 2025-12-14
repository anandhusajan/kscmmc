'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDateLong } from '@/lib/date-utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

export function YouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  // Extract video ID from YouTube URL
  const getVideoId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  };

  // Get YouTube embed URL
  const getEmbedUrl = (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/youtube-videos`, {
          method: 'GET',
          cache: 'no-store', // Always fetch fresh data
        });

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos);
        } else {
          // If no videos, show fallback with channel embed
          setError('direct');
        }
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError('direct');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-0">
              <Skeleton className="aspect-video w-full rounded-t-lg" />
              <div className="p-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error === 'direct' || (videos.length === 0 && !loading)) {
    const playlistId = 'PLduIvDq8KeQoliK7BBGkuwXPXIIZiN3cp';
    return (
      <div className="space-y-6">
        <div className="aspect-video w-full rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
            title="KSCMMC YouTube Playlist"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="text-center">
          <Link
            href={`https://www.youtube.com/playlist?list=${playlistId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View all videos on YouTube
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => {
          const videoId = getVideoId(video.url);
          
          return (
            <Card 
              key={video.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video group">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="rounded-full bg-red-600 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FontAwesomeIcon icon={faPlay} className="h-6 w-6 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {formatDateLong(video.publishedAt)}
                    </p>
                    <Link
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary hover:text-primary/80 transition-colors"
                      title="Open on YouTube"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-full p-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="line-clamp-2">
              {selectedVideo?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedVideo && (
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={getEmbedUrl(getVideoId(selectedVideo.url))}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
          {selectedVideo && (
            <div className="px-6 pb-6 pt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Published: {formatDateLong(selectedVideo.publishedAt)}
              </p>
              <Link
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                Watch on YouTube
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 w-4" />
              </Link>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

