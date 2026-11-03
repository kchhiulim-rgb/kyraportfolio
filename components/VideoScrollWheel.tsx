'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

export interface VideoItem {
  src: string;
  thumbnail?: string;
}

interface VideoScrollWheelProps {
  videos: VideoItem[];
  muted?: boolean;
  onToggleMute?: () => void;
}

export default function VideoScrollWheel({ videos, muted = true, onToggleMute }: VideoScrollWheelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Arrow visibility state
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkArrowVisibility = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.children;
    let closestIndex = 0;
    let closestDistance = Infinity;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    setActiveIndex(closestIndex);
    checkArrowVisibility();
  };

  // Check arrow visibility on mount and resize
  useEffect(() => {
    checkArrowVisibility();
    window.addEventListener('resize', checkArrowVisibility);
    return () => window.removeEventListener('resize', checkArrowVisibility);
  }, [checkArrowVisibility]);

  const scrollDirection = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = direction === 'left' ? 260 : 260; // approximate card width + gap on mobile
    container.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = muted;
      video.play().catch(() => {});
    }
  };

  const handleClick = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  };

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // Track touch start to distinguish tap from swipe
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent, index: number) => {
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - touchStartXRef.current);
    const dy = Math.abs(touch.clientY - touchStartYRef.current);
    // If movement is small, it's a tap — play/pause the video
    if (dx < 10 && dy < 10) {
      handleClick(index);
    }
  }, []);

  // Drag-to-scroll handlers (desktop only)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.pageX;
    scrollLeftRef.current = container.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = scrollRef.current;
    if (!container) return;
    const dx = e.pageX - startXRef.current;
    container.scrollLeft = scrollLeftRef.current - dx;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeaveContainer = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="relative">
      {/* Left arrow indicator */}
      {showLeftArrow && (
        <button
          onClick={() => scrollDirection('left')}
          className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-16 flex items-center justify-center bg-gradient-to-r from-black/60 to-transparent rounded-r-lg"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {/* Right arrow indicator */}
      {showRightArrow && (
        <button
          onClick={() => scrollDirection('right')}
          className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-16 flex items-center justify-center bg-gradient-to-l from-black/60 to-transparent rounded-l-lg"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeaveContainer}
        onTouchStart={handleTouchStart}
        className={`flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', userSelect: isDragging ? 'none' : 'auto' }}
      >
        {videos.map((videoItem, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start w-[240px] md:w-[380px]"
          >
            <div
              className="relative rounded-xl overflow-hidden bg-black aspect-[9/16] cursor-pointer group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => handleClick(index)}
              onTouchEnd={(e) => handleTouchEnd(e, index)}
            >
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={videoItem.src}
                muted={muted}
                playsInline
                loop
                className="w-full h-full object-cover"
              />
              {/* Thumbnail overlay */}
              {videoItem.thumbnail && (
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity"
                >
                  <img
                    src={videoItem.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {/* Play overlay */}
              {videoItem.thumbnail && (
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              {/* Volume toggle button */}
              <button
                onClick={(e) => { e.stopPropagation(); onToggleMute?.(); }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {muted ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
              {/* Active indicator */}
              {activeIndex === index && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
