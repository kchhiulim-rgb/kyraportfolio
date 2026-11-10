'use client';

import { CSSProperties, useEffect, useRef } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  style?: CSSProperties;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  onClick?: () => void;
}

export default function LazyVideo({
  src,
  className = '',
  style,
  muted = true,
  autoPlay = true,
  loop = true,
  playsInline = true,
  preload = 'none',
  onClick,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loaded.current) {
            loaded.current = true;
            // Set the source when the video enters the viewport
            video.src = src;
            if (autoPlay) {
              video.play().catch(() => {});
            }
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      { rootMargin: '200px' }
    );

    observerRef.current.observe(video);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      muted={muted}
      autoPlay={autoPlay}
      loop={loop}
      playsInline={playsInline}
      preload={preload}
      onClick={onClick}
    />
  );
}
