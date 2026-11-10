'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import HTMLFlipBook from 'react-pageflip';
import { version } from 'pdfjs-dist';
import { useLightbox } from '@/components/LightboxModal';

// Configure PDF.js worker using CDN
GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

interface PdfFlipbookProps {
  src: string;
  title?: string;
}

const LONG_PRESS_DURATION = 600;

export default function PdfFlipbook({ src, title }: PdfFlipbookProps) {
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookSize, setBookSize] = useState({ width: 800, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<any>(null);
  const { openLightbox } = useLightbox();

  // Long-press state
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);

  const triggerLightbox = useCallback(() => {
    openLightbox({ src, alt: title || 'PDF document', type: 'pdf' });
  }, [src, title, openLightbox]);

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setIsLongPressing(false);
  }, []);

  const startLongPress = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Don't trigger on right-click
    if ('button' in e && (e as React.MouseEvent).button === 2) return;
    setIsLongPressing(true);
    longPressTimerRef.current = setTimeout(() => {
      setIsLongPressing(false);
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      triggerLightbox();
    }, LONG_PRESS_DURATION);
  }, [triggerLightbox]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearLongPressTimer();
  }, [clearLongPressTimer]);

  // Measure parent container width and calculate page dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;

        // Each page is half the book width (two-page spread)
        // Small padding prevents right-side cropping when window is minimized
        const padding = 16; // book padding
        const availableWidth = containerWidth - padding;
        const pageW = Math.floor(availableWidth / 2);
        const pageH = Math.floor(pageW * 1.414); // A4 aspect ratio
        const bookW = pageW * 2 + padding;
        const bookH = pageH + 40; // extra vertical padding for book controls and spacing

        setBookSize({ width: bookW, height: bookH });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Load PDF and render each page to a canvas, then convert to image
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        const pdf = getDocument({ url: src });
        const pdfDoc = await pdf.promise;
        const images: string[] = [];

        // Use higher scale for sharper rendering - accounts for stretch sizing and high-DPI displays
        const scale = Math.max(3, window.devicePixelRatio * 2);

        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvas,
            viewport,
          }).promise;
          images.push(canvas.toDataURL('image/png'));
        }

        setPageImages(images);
      } catch (err) {
        console.error('PDF load error:', err);
        setError('Failed to load PDF.');
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [src]);

  // Derive page dimensions from measured book size
  const padding = 16;
  const pageWidth = Math.floor((bookSize.width - padding) / 2);
  const pageHeight = Math.floor(pageWidth * 1.414); // A4 aspect ratio

  return (
    <div
      ref={containerRef}
      className="pdf-flipbook w-full min-h-0 flex flex-col items-center justify-center py-2 md:py-4 overflow-hidden"
      onMouseDown={startLongPress}
      onMouseUp={clearLongPressTimer}
      onMouseLeave={clearLongPressTimer}
      onTouchStart={startLongPress}
      onTouchEnd={clearLongPressTimer}
      onTouchCancel={clearLongPressTimer}
    >
      {title && (
        <p className="font-body text-sm text-gray-600 mb-2">
          <span className="font-semibold text-gray-800">{title}</span>
        </p>
      )}
      <div
        className={`bg-transparent rounded-lg w-full ${isLongPressing ? 'cursor-grabbing' : 'cursor-pointer'}`}
        style={{ height: bookSize.height }}
        title="Hold to open full-screen"
      >
        {loading ? (
          <div className="flex items-center justify-center text-gray-400 font-body text-sm" style={{ height: pageHeight }}>
            Loading PDF...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center text-red-500 font-body text-sm" style={{ height: pageHeight }}>
            {error}
          </div>
        ) : pageImages.length > 0 ? (
          <HTMLFlipBook
            ref={bookRef}
            className="pdf-flipbook-container"
            style={{ width: '100%', height: '100%' }}
            width={pageWidth}
            height={pageHeight}
            minWidth={100}
            minHeight={141}
            maxWidth={bookSize.width}
            maxHeight={bookSize.height}
            size="stretch"
            showCover={true}
            startPage={0}
            startZIndex={0}
            flippingTime={700}
            drawShadow={false}
            maxShadowOpacity={0}
            usePortrait={false}
            autoSize={false}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={50}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {pageImages.map((imgSrc, index) => (
              <div key={index} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <img
                  src={imgSrc}
                  alt={`Page ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>
            ))}
          </HTMLFlipBook>
        ) : null}
      </div>
    </div>
  );
}
