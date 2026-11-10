'use client';

import { useState } from 'react';
import LazyVideo from '@/components/LazyVideo';

interface FeedPostCarouselProps {
  images: string[];
  onVideoClick?: (src: string) => void;
  aspectRatio?: string;
}

export default function FeedPostCarousel({ images, onVideoClick, aspectRatio }: FeedPostCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentItem = images[currentIndex];
  const isVideo = currentItem.endsWith('.mp4');

  const containerStyle = aspectRatio ? { aspectRatio: aspectRatio } : undefined;

  return (
    <div className="relative group">
      {/* Main content */}
      <div className="overflow-hidden rounded-lg" style={containerStyle}>
        {isVideo ? (
          onVideoClick ? (
            <div className="cursor-pointer" onClick={() => onVideoClick(currentItem)}>
              <LazyVideo key={currentItem} src={currentItem} className="w-full h-full object-cover rounded-lg" />
            </div>
          ) : (
            <LazyVideo key={currentItem} src={currentItem} className="w-full h-full object-cover rounded-lg" />
          )
        ) : (
          <img
            src={currentItem}
            alt={`Feed post ${currentIndex + 1}`}
            className={`w-full ${aspectRatio ? 'h-full object-cover' : 'h-auto'}`}
          />
        )}
      </div>

      {/* Left arrow */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
