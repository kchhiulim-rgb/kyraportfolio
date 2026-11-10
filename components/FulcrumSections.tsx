'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import PdfSection from './PdfSection';
import HoverToPlayGif from './HoverToPlayGif';
import ClickableImage from './ClickableImage';
import VideoScrollWheel from './VideoScrollWheel';

function AutoplayVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const p = v.play().catch(() => {});
    return () => { if (p) p.catch(() => {}); };
  }, [src]);
  return (
    <video
      ref={ref}
      src={src}
      className={className}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
    />
  );
}

interface Section {
  title: string;
  content: string;
  images?: string[];
  videos?: { src: string; thumbnail?: string }[];
  videographerCredit?: string;
  pdf?: {
    src: string;
    title?: string;
    disclaimer?: string;
  };
  columns?: {
    header: string;
    images: string[];
  }[];
  isCompactText?: boolean;
  stacked?: boolean;
  gallery?: boolean;
  padding?: string;
  overlap?: { background: string; overlay: string };
  afterOverlap?: string[];
  firstRow?: string;
  secondRow?: string[];
}

interface FulcrumSectionsProps {
  sections: Section[];
  isFulcrum: boolean;
}

export default function FulcrumSections({ sections, isFulcrum }: FulcrumSectionsProps) {
  const [muted, setMuted] = useState(true);
  const toggleMute = () => setMuted(prev => !prev);
  // Popup modal for video expand
  const [popupVideo, setPopupVideo] = useState<string | null>(null);
  const popupVideoRef = useRef<HTMLVideoElement | null>(null);
  // Floating back-to-TOC button
  const [showBackToTop, setShowBackToTop] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popupVideo !== null && popupVideoRef.current) {
      popupVideoRef.current.play().catch(() => {});
    }
  }, [popupVideo]);

  const closePopup = useCallback(() => {
    if (popupVideoRef.current) {
      popupVideoRef.current.pause();
    }
    setPopupVideo(null);
  }, []);

  // Show/hide back-to-TOC button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (tocRef.current) {
        const rect = tocRef.current.getBoundingClientRect();
        setShowBackToTop(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToToc = () => {
    if (tocRef.current) {
      tocRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Collect section titles for the table of contents
  // Merge "Problem:" and "Solution:" into a single "THE BRAND" entry
  // Nest "Single Origin Coffee Educational Series" and "Small Business Highlight Reels" under "Social Media"
  const tocItems: { title: string; index: number; children?: { title: string; index: number }[] }[] = sections
    .map((section, idx) => {
      let title = section.title;
      if (title === 'Problem:' || title === 'Solution:') {
        return { title: 'THE BRAND', index: idx, isBrand: true };
      }
      return { title, index: idx, isBrand: false };
    })
    .filter((item) => item.title && item.title.trim() !== '')
    .reduce((acc: { title: string; index: number; children?: { title: string; index: number }[]; isBrand?: boolean }[], item) => {
      if (item.isBrand) {
        // Keep only the first "THE BRAND" entry
        if (!acc.some((i) => i.title === 'THE BRAND')) {
          acc.push({ title: item.title, index: item.index });
        }
        return acc;
      }
      // Check if the previous item is "Social Media" and current item is a sub-item
      const lastItem = acc[acc.length - 1];
      if (lastItem && lastItem.title === 'Social Media' && (item.title === 'Single Origin Coffee Educational Series' || item.title === 'Small Business Highlight Reels' || item.title === 'Instagram Story Highlights')) {
        if (!lastItem.children) lastItem.children = [];
        lastItem.children.push({ title: item.title, index: item.index });
        return acc;
      }
      acc.push({ title: item.title, index: item.index });
      return acc;
    }, []);

  return (
    <>
      {/* Table of Contents */}
      {tocItems.length > 0 && (
        <div ref={tocRef} className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
          <h3 className="font-heading font-bold text-xl md:text-2xl mb-4" style={{ fontWeight: 700 }}>
            Table of Contents
          </h3>
          <div className="space-y-0">
            {tocItems.map((item, idx) => (
              <div key={item.index} className="py-3 border-b border-black last:border-b-0">
                <a
                  href={`#section-${item.index}`}
                  className="font-body text-lg uppercase text-gray-800 hover:text-gray-900 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(`section-${item.index}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  ↓&ensp;{item.title}
                </a>
                {item.children && item.children.map((child) => (
                  <div key={child.index} className="py-2 border-b border-black last:border-b-0 ml-4">
                    <a
                      href={`#section-${child.index}`}
                      className="font-body text-base uppercase text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(`section-${child.index}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {child.title}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Floating Back to TOC Button */}
      {showBackToTop && (
        <button
          onClick={scrollToToc}
          className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 cursor-pointer"
          aria-label="Back to Table of Contents"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
      {sections.map((section, i) => {
        const nextSection = sections[i + 1];
        const isProblemSolutionPair =
          section.title === 'Problem:' && nextSection?.title === 'Solution:';

        if (isProblemSolutionPair) {
          return (
            <div key={i} className="space-y-8 mb-12 md:mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                  <h3 id={`section-${i}`} className="font-heading text-lg md:text-xl mb-4" style={{ fontWeight: 900 }}>
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.content.split('\n\n').map((paragraph, j) => (
                      <p
                        key={j}
                        className="font-body text-base leading-relaxed font-normal"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className={isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                  <h3 id={`section-${i + 1}`} className="font-heading text-lg md:text-xl mb-4" style={{ fontWeight: 900 }}>
                    {nextSection.title}
                  </h3>
                  <div className="space-y-4">
                    {nextSection.content.split('\n\n').map((paragraph, j) => (
                      <p
                        key={j}
                        className="font-body text-base leading-relaxed font-normal"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              {(section.images && section.images.length > 0) || (nextSection.images && nextSection.images.length > 0) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.images && section.images.length > 0 && (
                    <div className={isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                      <div className="space-y-4">
                        {section.images.map((img, j) => (
                          <ClickableImage key={j} src={img} alt={`${section.title} image ${j + 1}`}>
                            <Image
                              key={j}
                              src={img}
                              alt={`${section.title} image ${j + 1}`}
                              width={2600}
                              height={1733}
                              quality={75}
                              className="w-full h-auto"
                            />
                          </ClickableImage>
                        ))}
                      </div>
                    </div>
                  )}
                  {nextSection.images && nextSection.images.length > 0 && (
                    <div className={isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                      <div className="space-y-4">
                        {nextSection.images.map((img, j) => (
                          <ClickableImage key={j} src={img} alt={`${nextSection.title} image ${j + 1}`}>
                            <Image
                              key={j}
                              src={img}
                              alt={`${nextSection.title} image ${j + 1}`}
                              width={2600}
                              height={1733}
                              quality={75}
                              className="w-full h-auto"
                            />
                          </ClickableImage>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        }

        if (section.title === 'Solution:' && sections[i - 1]?.title === 'Problem:') {
          return null;
        }

        const isPdfOnly = !section.title && !section.content && !!section.pdf;
        const nextIsPdfOnly = !!nextSection && !nextSection.title && !nextSection.content && !!nextSection.pdf;
        if (isPdfOnly && nextIsPdfOnly && section.pdf && nextSection?.pdf) {
          return (
            <div key={i} className="mb-12 md:mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-4 md:p-6 flex flex-col" : "flex flex-col"}>
                  {section.pdf.title && (
                    <h3 className="font-heading font-bold text-lg md:text-xl mb-4 flex-shrink-0" style={{ fontWeight: 900 }}>
                      {section.pdf.title}
                    </h3>
                  )}
                  <div>
                    <PdfSection src={section.pdf.src} />
                  </div>
                </div>
                <div className={isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-4 md:p-6 flex flex-col" : "flex flex-col"}>
                  {nextSection.pdf.title && (
                    <h3 className="font-heading font-bold text-lg md:text-xl mb-4 flex-shrink-0" style={{ fontWeight: 900 }}>
                      {nextSection.pdf.title}
                    </h3>
                  )}
                  <div>
                    <PdfSection src={nextSection.pdf.src} />
                    {nextSection.pdf.disclaimer && (
                      <p className="text-xs font-normal text-gray-500 mt-4 text-center">
                        {nextSection.pdf.disclaimer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (isPdfOnly && sections[i - 1] && !sections[i - 1].title && !sections[i - 1].content && sections[i - 1].pdf) {
          return null;
        }

        if (section.videos && section.videos.length > 0) {
          return (
            <div key={i} className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
              {section.title && (
                <h3 id={`section-${i}`} className="font-heading font-bold text-lg md:text-xl mb-4">
                  {section.title}
                </h3>
              )}
              {section.content && (
                <div className="max-w-4xl space-y-4 mb-6">
                  {section.content.split('\n\n').map((paragraph, j) => (
                    <p
                      key={j}
                      className="font-body text-base leading-relaxed font-normal"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              <VideoScrollWheel videos={section.videos} muted={muted} onToggleMute={toggleMute} />
              {section.videographerCredit && (
                <p className="text-xs font-bold text-gray-500 mt-4">
                  {section.videographerCredit}
                </p>
              )}
            </div>
          );
        }

        if (isFulcrum && !section.title && !section.content && section.images && section.images.length > 0) {
          return (
            <div key={i} className="mb-12 md:mb-16">
              <div className={`grid gap-4 ${
                section.images.length === 1 ? 'grid-cols-1' :
                section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {section.images.map((img, j) => {
                  const isFullResImage = img.includes('barista-thumbnail') || img.includes('email/mockup');
                  return (
                    <div key={j} className="bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8">
                      {img.endsWith('.pdf') ? (
                        <PdfSection src={img} />
                      ) : img.endsWith('.mp4') ? (
                        <div key={j} className="cursor-pointer" onClick={() => setPopupVideo(img)}>
                          <video src={img} className="w-full h-auto rounded-lg" muted autoPlay loop playsInline />
                        </div>
                      ) : isFullResImage ? (
                        <ClickableImage src={img} alt={`Project image ${j + 1}`}>
                          <img
                            src={img}
                            alt={`Project image ${j + 1}`}
                            className="w-full h-auto"
                            loading="lazy"
                          />
                        </ClickableImage>
                      ) : (
                        <ClickableImage src={img} alt={`Project image ${j + 1}`}>
                          <Image
                            src={img}
                            alt={`Project image ${j + 1}`}
                            width={2600}
                            height={1733}
                            quality={75}
                            className="w-full h-auto"
                          />
                        </ClickableImage>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // Gallery layout: masonry/tetris style where images pack together
        if (section.gallery && section.images && section.images.length > 0) {
          return (
            <div key={i} className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
              {section.title && (
                <h3
                  id={`section-${i}`}
                  className="font-heading font-bold text-xl md:text-2xl mb-6 pl-12 pr-12"
                  style={{ fontWeight: 700 }}
                >
                  {section.title}
                </h3>
              )}
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 px-12 space-y-4">
                {section.images.map((img, j) => {
                  // Skip black-tote2.png here — it's rendered with tote-mockup.png below
                  if (img.includes('black-tote2')) return null;
                  if (img.endsWith('.mp4')) {
                    const isAutoplay = img.includes('world-cup');
                    return (
                      <div
                        key={j}
                        className="break-inside-avoid overflow-hidden cursor-pointer"
                        onClick={() => setPopupVideo(img)}
                      >
                        {isAutoplay ? (
                          <AutoplayVideo src={img} className="w-full" />
                        ) : (
                          <video src={img} className="w-full" muted autoPlay loop playsInline />
                        )}
                      </div>
                    );
                  }
                  // GIFs are now converted to MP4 — handled by the .mp4 branch above
                  // If this is tote-mockup.png (not brian-alfred-tote-mockup), render it with black-tote2.png overlapping top-left
                  if (img === '/projects/fulcrum/merch/tote-mockup.png') {
                    return (
                      <div key={j} className="break-inside-avoid relative overflow-hidden">
                        <ClickableImage src={img} alt={`${section.title || 'Project image'} ${j + 1}`}>
                          <img
                            src={img}
                            alt={`${section.title || 'Project image'} ${j + 1}`}
                            className="w-full h-auto"
                            loading="lazy"
                          />
                        </ClickableImage>
                        <ClickableImage src="/projects/fulcrum/merch/black-tote2.png" alt="Merchandise/Print Design 14">
                          <img
                            src="/projects/fulcrum/merch/black-tote2.png"
                            alt="Merchandise/Print Design 14"
                            className="absolute top-0 left-0 w-1/3 h-auto"
                            loading="lazy"
                          />
                        </ClickableImage>
                      </div>
                    );
                  }
                  return (
                    <ClickableImage key={j} src={img} alt={`${section.title || 'Project image'} ${j + 1}`}>
                      <div className="break-inside-avoid overflow-hidden">
                        <img
                          src={img}
                          alt={`${section.title || 'Project image'} ${j + 1}`}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    </ClickableImage>
                  );
                })}
              </div>
            </div>
          );
        }

        return (
          <div key={i} className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
            {section.title && (
              <h3
                id={`section-${i}`}
                className={`font-heading font-bold text-xl md:text-2xl mb-4 ${section.content || (section.images && section.images.length > 0) ? 'pl-12' : 'pl-12'}`}
                style={{ fontWeight: 700 }}
              >
                {section.title}
              </h3>
            )}
            {section.content && (
              <div className={`${section.padding || 'pl-12 pr-12'} ${section.isCompactText ? 'space-y-2' : 'space-y-4'}`}>
                {section.content.split('\n\n').map((paragraph, j) => (
                  <p
                    key={j}
                    className="font-body text-base leading-relaxed font-normal"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            {section.firstRow && (
              <div className={`mt-6 ${section.padding || 'pl-12 pr-12'}`}>
                <ClickableImage src={section.firstRow} alt={`${section.title || 'Project image'} first row`}>
                  <img
                    src={section.firstRow}
                    alt={`${section.title || 'Project image'} first row`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </ClickableImage>
              </div>
            )}
            {section.secondRow && section.secondRow.length > 0 && (
              <div className={`mt-6 ${section.padding || 'pl-12 pr-12'} grid gap-4 grid-cols-3`}>
                {section.secondRow.map((img, j) => {
                  if (img.endsWith('.mp4')) {
                    return (
                      <div key={j} className="cursor-pointer" onClick={() => setPopupVideo(img)}>
                        <video src={img} className="w-full h-auto" muted autoPlay loop playsInline />
                      </div>
                    );
                  }
                  return (
                    <ClickableImage key={j} src={img} alt={`${section.title || 'Project image'} ${j + 1}`}>
                      <img
                        src={img}
                        alt={`${section.title || 'Project image'} ${j + 1}`}
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </ClickableImage>
                  );
                })}
              </div>
            )}
            {section.images && section.images.length > 0 && (
              <div className={`mt-6 ${section.padding || 'pl-12 pr-12'} grid gap-4 ${
                section.stacked ? 'grid-cols-1' :
                section.images.length === 1 ? 'grid-cols-1' :
                section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                section.images.length === 3 ? 'grid-cols-3' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {section.images.map((img, j) => {
                  if (img.endsWith('.pdf')) {
                    return <PdfSection key={j} src={img} />;
                  }
                  if (img.endsWith('.mp4')) {
                    const isAutoplay = img.includes('world-cup');
                    if (isAutoplay) {
                      return (
                        <div
                          key={j}
                          className="cursor-pointer"
                          onClick={() => setPopupVideo(img)}
                        >
                          <AutoplayVideo
                            src={img}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      );
                    }
                    return (
                      <video
                        key={j}
                        src={img}
                        controls
                        className="w-full h-auto rounded-lg"
                      />
                    );
                  }
                  // GIFs are now converted to MP4 — handled by the .mp4 branch above
                  const isFullResImage = img.includes('barista-thumbnail') || img.includes('email/mockup');
                  if (isFullResImage) {
                    return (
                      <ClickableImage key={j} src={img} alt={`${section.title || 'Project image'} ${j + 1}`}>
                        <img
                          src={img}
                          alt={`${section.title || 'Project image'} ${j + 1}`}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </ClickableImage>
                    );
                  }
                  return (
                    <ClickableImage key={j} src={img} alt={`${section.title || 'Project image'} ${j + 1}`}>
                      <Image
                        src={img}
                        alt={`${section.title || 'Project image'} ${j + 1}`}
                        width={2600}
                        height={1733}
                        quality={75}
                        className="w-full h-auto"
                      />
                    </ClickableImage>
                  );
                })}
              </div>
            )}
            {section.overlap && (
              <div className={`mt-6 ${section.padding || 'pl-12 pr-12'} relative w-full`}>
                {/* Background image - tote mockup */}
                <div className="relative z-0">
                  <ClickableImage src={section.overlap.background} alt="Tote mockup">
                    <img
                      src={section.overlap.background}
                      alt="Tote mockup"
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </ClickableImage>
                </div>
                {/* Overlay image - black tote */}
                <div className="absolute top-0 left-0 w-[60%] h-[60%] z-10">
                  <img
                    src={section.overlap.overlay}
                    alt="Black tote"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
            {section.afterOverlap && section.afterOverlap.length > 0 && (
              <div className={`mt-6 ${section.padding || 'pl-12 pr-12'} grid gap-4 grid-cols-1`}>
                {section.afterOverlap.map((img, j) => (
                  <ClickableImage key={j} src={img} alt={`Project image ${j + 1}`}>
                    <img
                      src={img}
                      alt={`Project image ${j + 1}`}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </ClickableImage>
                ))}
              </div>
            )}
            {section.columns && section.columns.length > 0 && (
              <>
                <div className="mt-6">
                  <div className={isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                    <div className="grid grid-cols-3 gap-2 md:gap-8">
                      {section.columns.map((col, ci) => {
                        const circularIndex = col.images.findIndex(
                          (img) =>
                            img.includes('brands-2') ||
                            img.includes('drinks-blue') ||
                            img.includes('learn-more.png')
                        );
                        const coverImage = circularIndex >= 0 ? col.images[circularIndex] : null;

                        return (
                          <div key={ci} className="flex flex-col items-center">
                            {coverImage && (
                              <ClickableImage src={coverImage} alt={`${col.header} cover`}>
                                <div className="w-14 h-14 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 md:mb-4">
                                  <Image
                                    src={coverImage}
                                    alt={`${col.header} cover`}
                                    width={128}
                                    height={128}
                                    quality={75}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </ClickableImage>
                            )}
                            <h4 className="font-heading font-bold text-xs md:text-base lg:text-lg text-center">
                              {col.header}
                            </h4>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {(() => {
                  const allRemaining: string[] = [];
                  section.columns.forEach((col) => {
                    const circularIndex = col.images.findIndex(
                      (img) =>
                        img.includes('brands-2') ||
                        img.includes('drinks-blue') ||
                        img.includes('learn-more.png')
                    );
                    const remaining = circularIndex >= 0
                      ? [...col.images.slice(0, circularIndex), ...col.images.slice(circularIndex + 1)]
                      : col.images;
                    allRemaining.push(...remaining);
                  });
                  if (allRemaining.length === 0) return null;
                  return (
                    <div className="mt-6">
                      <div className={isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                        <div className={`grid gap-4 ${
                          allRemaining.length === 1 ? 'grid-cols-1' :
                          allRemaining.length === 3 ? 'grid-cols-3' :
                          allRemaining.length <= 4 ? 'grid-cols-2 md:grid-cols-4' :
                          'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                        }`}>
                          {allRemaining.map((img, j) => (
                            <ClickableImage key={j} src={img} alt={`Column image ${j + 1}`}>
                              <Image
                                src={img}
                                alt={`Column image ${j + 1}`}
                                width={400}
                                height={300}
                                quality={75}
                                className="w-full h-auto"
                              />
                            </ClickableImage>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
            {section.pdf && (
              <PdfSection src={section.pdf.src} title={section.pdf.title} />
            )}
          </div>
        );
      })}
      {/* Popup modal for video expand */}
      {popupVideo !== null && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closePopup}
        >
          {/* Close button */}
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
            aria-label="Close video"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Mute button — always visible in popup */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleMute(); }}
            className="absolute top-4 right-16 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
            aria-label={muted ? 'Unmute video' : 'Mute video'}
          >
            {muted ? (
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
          {/* Video container */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={(el) => { popupVideoRef.current = el; }}
              src={popupVideo}
              muted={muted}
              playsInline
              loop
              autoPlay
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
