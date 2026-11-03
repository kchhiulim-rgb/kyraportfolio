'use client';

import { useState } from 'react';
import Image from 'next/image';
import PdfSection from './PdfSection';
import HoverToPlayGif from './HoverToPlayGif';
import ClickableImage from './ClickableImage';
import VideoScrollWheel from './VideoScrollWheel';

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
}

interface FulcrumSectionsProps {
  sections: Section[];
  isFulcrum: boolean;
}

export default function FulcrumSections({ sections, isFulcrum }: FulcrumSectionsProps) {
  const [muted, setMuted] = useState(true);
  const toggleMute = () => setMuted(prev => !prev);

  return (
    <>
      {sections.map((section, i) => {
        const nextSection = sections[i + 1];
        const isProblemSolutionPair =
          section.title === 'Problem:' && nextSection?.title === 'Solution:';

        if (isProblemSolutionPair) {
          return (
            <div key={i} className="space-y-8 mb-12 md:mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                  <h3 className="font-heading text-lg md:text-xl mb-4" style={{ fontWeight: 900 }}>
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.content.split('\n\n').map((paragraph, j) => (
                      <p
                        key={j}
                        className="font-body text-base md:text-lg leading-snug font-light text-justify"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className={isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                  <h3 className="font-heading text-lg md:text-xl mb-4" style={{ fontWeight: 900 }}>
                    {nextSection.title}
                  </h3>
                  <div className="space-y-4">
                    {nextSection.content.split('\n\n').map((paragraph, j) => (
                      <p
                        key={j}
                        className="font-body text-base md:text-lg leading-snug font-light text-justify"
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
                    <div className={isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                      <div className="space-y-4">
                        {section.images.map((img, j) => (
                          <ClickableImage key={j} src={img} alt={`${section.title} image ${j + 1}`}>
                            <Image
                              key={j}
                              src={img}
                              alt={`${section.title} image ${j + 1}`}
                              width={800}
                              height={600}
                              className="w-full h-auto"
                            />
                          </ClickableImage>
                        ))}
                      </div>
                    </div>
                  )}
                  {nextSection.images && nextSection.images.length > 0 && (
                    <div className={isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                      <div className="space-y-4">
                        {nextSection.images.map((img, j) => (
                          <ClickableImage key={j} src={img} alt={`${nextSection.title} image ${j + 1}`}>
                            <Image
                              key={j}
                              src={img}
                              alt={`${nextSection.title} image ${j + 1}`}
                              width={800}
                              height={600}
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
                <div className={isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 flex flex-col" : "flex flex-col"}>
                  {section.pdf.title && (
                    <h3 className="font-heading font-bold text-lg md:text-xl mb-4 flex-shrink-0" style={{ fontWeight: 900 }}>
                      {section.pdf.title}
                    </h3>
                  )}
                  <div>
                    <PdfSection src={section.pdf.src} />
                  </div>
                </div>
                <div className={isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 flex flex-col" : "flex flex-col"}>
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
            <div key={i} className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
              {section.title && (
                <h3 className="font-heading font-bold text-lg md:text-xl mb-4">
                  {section.title}
                </h3>
              )}
              {section.content && (
                <div className="max-w-4xl space-y-4 mb-6">
                  {section.content.split('\n\n').map((paragraph, j) => (
                    <p
                      key={j}
                      className="font-body text-base md:text-lg leading-snug font-light text-justify"
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
                    <div key={j} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8">
                      {img.endsWith('.gif') ? (
                        <HoverToPlayGif src={img} alt={`Project image ${j + 1}`} />
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
                            width={800}
                            height={600}
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

        return (
          <div key={i} className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
            {section.title && (
              <h3
                className={`font-heading font-bold text-xl md:text-2xl mb-4 ${section.content || (section.images && section.images.length > 0) ? 'pl-12' : 'pl-12'}`}
                style={{ fontWeight: 700 }}
              >
                {section.title}
              </h3>
            )}
            {section.content && (
              <div className={`pl-12 pr-12 ${section.isCompactText ? 'space-y-2' : 'space-y-4'}`}>
                {section.content.split('\n\n').map((paragraph, j) => (
                  <p
                    key={j}
                    className={`font-body ${section.isCompactText ? 'text-base md:text-lg leading-snug font-light text-justify' : 'text-base md:text-lg leading-snug font-light text-justify'}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            {section.images && section.images.length > 0 && (
              <div className={`mt-6 pl-12 pr-12 grid gap-4 ${
                section.images.length === 1 ? 'grid-cols-1' :
                section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {section.images.map((img, j) => {
                  if (img.endsWith('.gif')) {
                    return <HoverToPlayGif key={j} src={img} alt={`${section.title || 'Project image'} ${j + 1}`} />;
                  }
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
                        width={800}
                        height={600}
                        className="w-full h-auto"
                      />
                    </ClickableImage>
                  );
                })}
              </div>
            )}
            {section.columns && section.columns.length > 0 && (
              <>
                <div className="mt-6">
                  <div className={isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
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
                                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 md:mb-4 flex-shrink-0">
                                  <Image
                                    src={coverImage}
                                    alt={`${col.header} cover`}
                                    width={128}
                                    height={128}
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
                      <div className={isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}>
                        <div className={`grid gap-4 ${
                          allRemaining.length === 1 ? 'grid-cols-1' :
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
    </>
  );
}
