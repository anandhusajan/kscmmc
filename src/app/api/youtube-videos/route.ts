import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // YouTube playlist RSS feed
    // Playlist ID: PLduIvDq8KeQoliK7BBGkuwXPXIIZiN3cp
    // Playlist URL: https://www.youtube.com/watch?v=bmduS76goQI&list=PLduIvDq8KeQoliK7BBGkuwXPXIIZiN3cp
    const playlistId = 'PLduIvDq8KeQoliK7BBGkuwXPXIIZiN3cp';
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    
    // Fetch playlist RSS feed
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      // If RSS fails, return empty array - frontend will show embedded playlist
      return NextResponse.json({
        videos: [],
        playlistUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
      });
    }

    const xmlText = await response.text();
    
    // Parse XML to extract video data
    const videos: Array<{
      id: string;
      title: string;
      thumbnail: string;
      publishedAt: string;
      url: string;
    }> = [];

    // Extract video entries from RSS XML
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    const entries = xmlText.match(entryRegex) || [];

    // Get all videos from playlist (no limit)
    for (const entry of entries) {
      const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
      const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
      const linkMatch = entry.match(/<link href="([^"]+)"/);
      const thumbnailMatch = entry.match(/<media:thumbnail url="([^"]+)"/);

      if (videoIdMatch && titleMatch) {
        const videoId = videoIdMatch[1];
        videos.push({
          id: videoId,
          title: titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
          thumbnail: thumbnailMatch ? thumbnailMatch[1] : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          publishedAt: publishedMatch ? publishedMatch[1] : new Date().toISOString(),
          url: linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${videoId}`,
        });
      }
    }

    // Sort by published date (descending - newest first)
    videos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json({
      videos,
      playlistUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    // Return empty array on error - frontend will show playlist embed
    return NextResponse.json({
      videos: [],
      playlistUrl: `https://www.youtube.com/playlist?list=PLduIvDq8KeQoliK7BBGkuwXPXIIZiN3cp`,
    });
  }
}

