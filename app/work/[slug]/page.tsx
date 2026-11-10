import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectIndex,
  projects,
} from "@/data/projects";
import PdfSection from "@/components/PdfSection";
import ClickToPlayGif from "@/components/ClickToPlayGif";
import ClickableImage from "@/components/ClickableImage";
import VideoScrollWheel from "@/components/VideoScrollWheel";
import FulcrumSections from "@/components/FulcrumSections";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }
  return {
    title: `${project.title} — Kyra Chhiu-Lim`,
  };
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isFulcrum = slug === "fulcrumroasters";
  const index = getProjectIndex(slug);
  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject =
    index < projects.length - 1 ? projects[index + 1] : null;

  // Ensure both links are different and never point to the current page
  const leftLink = prevProject ?? (nextProject && projects.length > 2 ? projects[index + 2] : projects[projects.length - 1]);
  const rightLink = nextProject ?? (prevProject && projects.length > 2 ? projects[index - 2] : projects[0]);

  return (
    <div className={isFulcrum ? "relative" : ""}>
      {/* Background video for Fulcrum page */}
      {isFulcrum && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="min-w-full min-h-full absolute object-cover"
          >
            <source src="/roaster-video.mp4" type="video/mp4" />
          </video>
        </div>
      )}
      <div
        className={`py-8 md:py-12 ${isFulcrum ? "px-6 md:px-12" : "px-6 md:px-12"}`}
        style={slug === "14thseattleaaff" ? {
          backgroundImage: 'url("/vellum-texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        } : slug === "dp5" ? {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url("/background-texture.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        } : undefined}
      >
        {/* Full-width Cover Image (hero) - like reference site */}
        {project.coverImage && !isFulcrum && (
          <div className={`mb-8 md:mb-16 ${slug === "dp5" ? "mt-[38px] md:mt-[146px] mx-4 md:mx-16" : "-mx-6 md:-mx-12"}`}>
            <div className='relative'>
              <div className='relative block w-full'>
                {project.coverImage.endsWith(".mp4") ? (
                  <video
                    src={project.coverImage}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-auto"
                  />
                ) : (
                  <ClickableImage src={project.coverImage} alt={project.title}>
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      width={1920}
                      height={1080}
                      quality={75}
                      className="w-full h-auto"
                    />
                  </ClickableImage>
                )}
                {project.overlayImage && (
                  <Image
                    src={project.overlayImage}
                    alt="Digital Natives overlay"
                    width={800}
                    height={800}
                    quality={75}
                    className="absolute z-10 -top-[calc(10%+30px)] md:-top-[calc(10%+105px)] -left-[calc(10%-15px)] w-auto h-auto max-w-[50%] max-h-[50%] object-contain pointer-events-none"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Project Header - Title then two-column row */}
        <div className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg px-8 md:px-16 py-8 md:py-12" : slug === "dp5" ? "px-8 md:px-16 py-8 md:py-12" : ""}`} style={slug === "dp5" ? { backgroundColor: '#ffffff', backgroundImage: 'url("/paper-texture.jpg")', backgroundRepeat: 'repeat' } : undefined}>
          {project.subtitle && (
            <h1 className="font-heading font-bold text-[2.5em] leading-none mb-8 md:mb-12" style={{ fontWeight: 900 }}>
              {project.subtitle}
            </h1>
          )}
          {project.description && (
            <p className="font-body text-sm md:text-base mb-8 md:mb-12 text-gray-500 uppercase tracking-[0.1em]">
              {project.description}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-12 md:items-start gap-8 md:gap-12">
            {/* Left column - Intro text (wider) */}
            <div className="md:col-span-8">
              {project.intro && (
                <p className="font-body text-[1.5em] leading-tight font-normal">
                  {project.intro}
                </p>
              )}
            </div>
            {/* Right column - Metadata sidebar (narrower) */}
            <div className="md:col-span-4">
              <div className="space-y-4">
                {(() => {
                  const roleParts = project.role ? project.role.split("\n\n") : [];
                  const roleTitle = roleParts[0];
                  const teamPart = roleParts[1];
                  const isTeam = teamPart && teamPart.startsWith("Team:");
                  const teamNames = isTeam ? teamPart.slice(5).trim() : undefined;
                  return (
                    <>
                      {roleTitle && (
                        <div>
                          <h4 className="font-heading font-medium text-sm mb-2 text-gray-500">Role</h4>
                          <p className="font-body text-base leading-relaxed font-normal">{roleTitle}</p>
                        </div>
                      )}
                      {teamNames && (
                        <div>
                          <h4 className="font-heading font-medium text-sm mb-2 text-gray-500">Team</h4>
                          <p className="font-body text-base leading-relaxed font-normal">{teamNames}</p>
                        </div>
                      )}
                    </>
                  );
                })()}
                {project.year && (
                  <div>
                    <h4 className="font-heading font-medium text-sm mb-2 text-gray-500">Year</h4>
                    <p className="font-body text-base leading-relaxed font-normal">{project.year}</p>
                  </div>
                )}
                {project.tools && project.tools.length > 0 && (
                  <div>
                    <h4 className="font-heading font-medium text-sm mb-2 text-gray-500">Tools</h4>
                    <p className="font-body text-base leading-relaxed font-normal">
                      {project.tools.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Sections */}
        {isFulcrum ? (
          <FulcrumSections sections={project.sections || []} isFulcrum={isFulcrum} />
        ) : (
          project.sections?.map((section, i) => {
          // Check if this is a Problem section followed by Solution — render them side-by-side
          const nextSection = project.sections?.[i + 1];
          const isProblemSolutionPair =
            section.title === "Problem:" && nextSection?.title === "Solution:";

          if (isProblemSolutionPair) {
            return (
              <div key={i} className="space-y-8 mb-12 md:mb-16">
                {/* Row 1: Text blurbs side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Problem column */}
                  <div className={`${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : slug === "dp5" ? "p-6 md:p-8" : ""}`} style={slug === "dp5" ? { backgroundColor: '#ffffff', backgroundImage: 'url("/paper-texture.jpg")', backgroundRepeat: 'repeat' } : undefined}>
                    <h3 className="font-heading font-bold text-xl md:text-2xl mb-4" style={{ fontWeight: 700 }}>
                      {section.title}
                    </h3>
                    <div className="space-y-4">
                      {(section.content || "").split("\n\n").map((paragraph, j) => (
                        <p
                          key={j}
                          className="font-body text-base leading-relaxed font-normal"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  {/* Solution column */}
                  <div className={`${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : slug === "dp5" ? "p-6 md:p-8" : ""}`} style={slug === "dp5" ? { backgroundColor: '#ffffff', backgroundImage: 'url("/paper-texture.jpg")', backgroundRepeat: 'repeat' } : undefined}>
                    <h3 className="font-heading font-bold text-xl md:text-2xl mb-4" style={{ fontWeight: 700 }}>
                      {nextSection.title}
                    </h3>
                    <div className="space-y-4">
                      {(nextSection.content || "").split("\n\n").map((paragraph, j) => (
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
                {/* Row 2: Images side-by-side */}
                {(section.images && section.images.length > 0) || (nextSection.images && nextSection.images.length > 0) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Problem images column */}
                    {section.images && section.images.length > 0 && (
                      <div className={`${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
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
                    {/* Solution images column */}
                    {nextSection.images && nextSection.images.length > 0 && (
                      <div className={`${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
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

          // Skip rendering Solution individually if already rendered with Problem
          if (section.title === "Solution:" && project.sections?.[i - 1]?.title === "Problem:") {
            return null;
          }

          // Check if this is a PDF-only section followed by another PDF-only section — render them side-by-side
          const isPdfOnly = !section.title && !section.content && !!section.pdf;
          const nextIsPdfOnly = !!nextSection && !nextSection.title && !nextSection.content && !!nextSection.pdf;
          if (isPdfOnly && nextIsPdfOnly && section.pdf && nextSection?.pdf) {
            return (
              <div key={i} className="mb-12 md:mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left PDF column */}
                  <div className={`${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-4 md:p-6 flex flex-col" : slug === "dp5" ? "p-4 md:p-6 flex flex-col" : "flex flex-col"}`} style={slug === "dp5" ? { backgroundColor: '#ffffff', backgroundImage: 'url("/paper-texture.jpg")', backgroundRepeat: 'repeat' } : undefined}>
                    {section.pdf.title && (
                      <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 flex-shrink-0" style={{ fontWeight: 700 }}>
                      {section.pdf.title}
                    </h3>
                    )}
                    <div>
                      <PdfSection src={section.pdf.src} />
                    </div>
                  </div>
                  {/* Right PDF column */}
                  <div className={`${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-4 md:p-6 flex flex-col" : slug === "dp5" ? "p-4 md:p-6 flex flex-col" : "flex flex-col"}`} style={slug === "dp5" ? { backgroundColor: '#ffffff', backgroundImage: 'url("/paper-texture.jpg")', backgroundRepeat: 'repeat' } : undefined}>
                    {nextSection.pdf.title && (
                      <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 flex-shrink-0" style={{ fontWeight: 700 }}>
                        {nextSection.pdf.title}
                      </h3>
                    )}
                    <div>
                      <PdfSection src={nextSection.pdf.src} />
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Skip rendering second PDF individually if already rendered in a pair
          if (isPdfOnly && project.sections?.[i - 1] && !project.sections[i - 1].title && !project.sections[i - 1].content && project.sections[i - 1].pdf) {
            return null;
          }

          // Skip rendering image-only sections already grouped under "Magazine Spreads" for dp5
          if (slug === "dp5" && !section.title && !section.content && section.images && section.images.length > 0) {
            // Check if a previous section was "Magazine Spreads" that would have grouped this one
            for (let k = i - 1; k >= 0; k--) {
              const prev = project.sections?.[k];
              if (prev?.title === "Magazine Spreads") {
                return null;
              }
              // If we hit a section with a title that's not "Magazine Spreads", stop looking
              if (prev?.title && prev.title !== "Magazine Spreads") break;
            }
          }

          // For sections with videos, render the video scroll wheel
          if (section.videos && section.videos.length > 0) {
            // For Fulcrum, use the shared volume provider client component
            if (isFulcrum) {
              return null;
            }
            return (
              <div key={i} className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
                {section.title && (
                  <h3 className="font-heading font-bold text-xl md:text-2xl mb-4" style={{ fontWeight: 700 }}>
                    {section.title}
                  </h3>
                )}
                {section.content && (
                  <div className="space-y-4 mb-6">
                    {section.content.split("\n\n").map((paragraph, j) => (
                      <p
                        key={j}
                        className="font-body text-base leading-relaxed font-normal"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                <VideoScrollWheel videos={section.videos} />
              </div>
            );
          }

          // For Fulcrum image-only sections (no title, no content), render each image as a separate white card
          if (isFulcrum && !section.title && !section.content && section.images && section.images.length > 0) {
            return (
              <div key={i} className="mb-12 md:mb-16">
                <div className={`grid gap-4 ${
                  section.images.length === 1 ? 'grid-cols-1 place-items-center' :
                  section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                  'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {section.images.map((img, j) => {
                    const isFullResImage = img.includes('barista-thumbnail') || img.includes('email/mockup');
                    return (
                      <div key={j} className="bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8">
                        {img.endsWith('.mp4') ? (
                          <video src={img} className="w-full h-auto rounded-lg" muted autoPlay loop playsInline />
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

          // For dp5, group "Magazine Spreads" and consecutive image-only sections under one white background
          if (slug === "dp5" && section.title === "Magazine Spreads") {
            // Collect this section and following image-only sections
            const groupedSections = [section];
            let j = i + 1;
            while (j < (project.sections?.length || 0)) {
              const next = project.sections?.[j];
              if (!next) break;
              if (!next.title && !next.content && next.images && next.images.length > 0) {
                groupedSections.push(next);
                j++;
              } else {
                break;
              }
            }
            return (
              <div key={i} className="mb-12 md:mb-16 p-6 md:p-8" style={{ backgroundColor: '#ffffff', backgroundImage: 'url("/paper-texture.jpg")', backgroundRepeat: 'repeat' }}>
                {section.title && (
                  <h3 className="font-heading font-bold text-xl md:text-2xl mb-4" style={{ fontWeight: 700 }}>
                    {section.title}
                  </h3>
                )}
                <div className="space-y-8">
                  {groupedSections.map((grp, gi) =>
                    grp.images && grp.images.length > 0 ? (
                      grp.images.map((img, imgIdx) => (
                        <ClickableImage key={`${gi}-${imgIdx}`} src={img} alt={`Magazine spread ${gi}-${imgIdx}`}>
                          <Image
                            src={img}
                            alt={`Magazine spread ${gi}-${imgIdx}`}
                            width={2600}
                            height={1733}
                            quality={75}
                            className="w-full h-auto"
                          />
                        </ClickableImage>
                      ))
                    ) : null
                  )}
                </div>
              </div>
            );
          }

          // Check if this is the mockup standalone section - render with same margins as pocket gif
          const isMockupStandalone = !section.title && !section.content && section.images?.length === 1 && section.images[0].includes('print/mockup');
          if (isMockupStandalone && section.images) {
            return (
              <div key={i} className="mb-12 md:mb-16">
                <ClickableImage src={section.images[0]} alt="Poster mockup">
                  <img
                    src={section.images[0]}
                    alt="Poster mockup"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </ClickableImage>
              </div>
            );
          }
          // Stats box - render content as h2 in a styled box
          if ((section as any).isStatsBox && section.content) {
            return (
              <div key={i} className="mb-12 md:mb-16">
                <div className="bg-gray-100 rounded-lg p-8 md:p-12 text-center">
                  <h2 className="font-heading font-bold text-lg md:text-xl lg:text-2xl" style={{ fontWeight: 700 }}>
                    {section.content}
                  </h2>
                </div>
              </div>
            );
          }

          return (
              <div key={i} className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : slug === "dp5" ? "p-6 md:p-8" : ""}`} style={slug === "dp5" ? { backgroundColor: '#ffffff', backgroundImage: 'url("/paper-texture.jpg")', backgroundRepeat: 'repeat' } : undefined}>
              {section.title === "Style Guide" && (
                <hr className="border-t border-gray-300 my-8 md:my-12" />
              )}
              {section.title && (
                <h3
                  className="font-heading font-bold text-xl md:text-2xl mb-4"
                  style={{ fontWeight: 700 }}
                >
                  {section.title}
                </h3>
              )}
              {section.content && (
                <div className="space-y-4 mb-6">
                  {section.content.split("\n\n").map((paragraph, j) => (
                      <p
                        key={j}
                        className="font-body text-base leading-relaxed font-normal"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              )}
              {/* Section images */}
              {section.images && section.images.length > 0 && (() => {
                const isBadgeOverlap = section.images.length === 2 && section.images[0].includes('mockup') && section.images[1].includes('badge-mockup');
                const isOnPrintsOverlap = section.images.length === 2 && section.images[0].includes('on-prints') && section.images[1].includes('badge-mockup');
                const isToteOverlap = section.images.length === 2 && section.images[0].includes('tote-black') && section.images[1].includes('tote-red');
                if (isBadgeOverlap) {
                  return (
                    <div className="mt-6 relative w-full max-w-[64rem]">
                      {/* Mockup - background */}
                      <div className="relative z-0">
                        <Image
                          src={section.images[0]}
                          alt="Poster mockup"
                          width={2268}
                          height={4032}
                          quality={75}
                          className="w-full h-auto"
                        />
                      </div>
                      {/* Badge mockup - shrunk and pinned to left corner */}
                      <div className="absolute z-10 -top-[10%] left-0 w-[60%] sm:w-[55%] md:w-[50%]">
                        <Image
                          src={section.images[1]}
                          alt="Badge mockup"
                          width={3000}
                          height={2250}
                          quality={75}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  );
                }
                if (isOnPrintsOverlap) {
                  return (
                    <div className="mt-6 relative w-full -mx-6 md:-mx-12">
                      {/* On prints - background */}
                      <div className="relative z-0">
                        <Image
                          src={section.images[0]}
                          alt="On prints"
                          width={3000}
                          height={2000}
                          quality={75}
                          className="w-full h-auto"
                        />
                      </div>
                      {/* Badge mockup - shrunk and pinned to left corner */}
                      <div className="absolute z-10 top-0 left-0 w-[80%] sm:w-[70%] md:w-[60%]">
                        <Image
                          src={section.images[1]}
                          alt="Badge mockup"
                          width={3000}
                          height={2250}
                          quality={75}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  );
                }
                if (isToteOverlap) {
                  return (
                    <div className="mt-6 relative flex justify-center items-end">
                      <div className="relative w-full max-w-[40rem] sm:max-w-[50rem] md:max-w-[64rem]">
                        {/* Red bag - behind, shifted right */}
                        <div className="absolute right-0 bottom-0 z-0">
                          <Image
                            src={section.images[1]}
                            alt="Red tote bag"
                            width={1000}
                            height={1000}
                            quality={75}
                            className="w-[60%] h-auto ml-auto"
                          />
                        </div>
                        {/* Black bag - front, shifted left */}
                        <div className="relative z-10 flex justify-start">
                          <Image
                            src={section.images[0]}
                            alt="Black tote bag"
                            width={1000}
                            height={1000}
                            quality={75}
                            className="w-[60%] h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
                const isStickerImage = section.images.some(img => img.includes('sticker-'));
                if (isStickerImage) {
                  // If section has a nameTag, render two-column layout: name-tag left, stickers right
                  if (section.nameTag) {
                    return (
                      <div className="mt-6 flex flex-col items-center">
                        {/* Stickers above - as wide as both columns of badges */}
                        <div className="grid grid-cols-1 gap-4 place-items-center w-full max-w-[56rem] sm:max-w-[64rem]">
                          {section.images.map((img, j) => (
                            <ClickableImage key={j} src={img} alt={`${section.title || 'Project image'} ${j + 1}`}>
                              <Image
                                src={img}
                                alt={`${section.title || 'Project image'} ${j + 1}`}
                                width={1200}
                                height={800}
                                quality={95}
                                className="w-full h-auto max-h-[70vh] object-contain"
                              />
                            </ClickableImage>
                          ))}
                        </div>
                        {/* Badges grid with name tag overlapping middle */}
                        {section.badges && section.badges.length > 0 && (
                          <div className="relative mt-6 w-full max-w-[56rem] sm:max-w-[64rem]">
                            {/* Badges - 2x2 grid */}
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4 place-items-center">
                              {section.badges.map((badge, j) => (
                                <ClickableImage key={j} src={badge} alt={`Badge ${j + 1}`}>
                                  <div className="w-full max-w-[24rem] sm:max-w-[28rem] aspect-[2/3] flex items-center justify-center">
                                    <Image
                                      src={badge}
                                      alt={`Badge ${j + 1}`}
                                      width={800}
                                      height={1200}
                                      quality={95}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                </ClickableImage>
                              ))}
                            </div>
                            {/* Name tag - centered over middle, same width as full badge grid, rotated 30deg right */}
                            <div className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none rotate-[30deg]">
                              <ClickableImage src={section.nameTag} alt="Name tag">
                                <div className="w-full max-w-[56rem] sm:max-w-[64rem] aspect-[4/3] flex items-center justify-center">
                                  <Image
                                    src={section.nameTag}
                                    alt="Name tag"
                                    width={2400}
                                    height={1800}
                                    quality={95}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              </ClickableImage>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div className={`mt-6 grid gap-4 ${
                      section.images.length === 1 ? 'grid-cols-1 place-items-center' :
                      section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2 place-items-center' :
                      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center'
                    }`}>
                      {section.images.map((img, j) => {
                        if (img.endsWith('.mp4')) {
                          return (
                            <div key={j} className="cursor-pointer">
                              <video
                                src={img}
                                className="w-auto h-auto max-w-[28rem] sm:max-w-[36rem] md:max-w-[48rem] max-h-[75vh] object-contain rounded-lg"
                                muted
                                autoPlay
                                loop
                                playsInline
                              />
                            </div>
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
                              className="w-auto h-auto max-w-[28rem] sm:max-w-[36rem] md:max-w-[48rem] max-h-[75vh] object-contain"
                            />
                          </ClickableImage>
                        );
                      })}
                    </div>
                  );
                }
                const isStyleGuide = section.images.some(img => img.includes('style-guide/'));
                return (
                  <div className={`mt-6 grid gap-4 ${
                    isStyleGuide ? 'grid-cols-2' :
                    section.images.length === 1 ? 'grid-cols-1 place-items-center' :
                    section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {section.images.map((img, j) => {
                      const isVideo = img.endsWith('.mp4');
                      const isFullResImage = img.includes('barista-thumbnail') || img.includes('email/mockup') || img.includes('print/mockup');
                      if (isVideo) {
                        return (
                          <div key={j} className="cursor-pointer">
                            <video
                              src={img}
                              className="w-full h-auto rounded-lg"
                              muted
                              autoPlay
                              loop
                              playsInline
                            />
                          </div>
                        );
                      }
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
                );
              })()}
              {/* Column layout — split into two rows: headers row + images row */}
              {section.columns && section.columns.length > 0 && (
                <>
                  {/* Row 1: Circular cover photos with headers */}
                  <div className="mt-6">
                    <div className={`${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
                      <div className="grid grid-cols-3 gap-4 md:gap-8">
                        {section.columns.map((col, ci) => {
                          const circularIndex = col.images.findIndex(
                            (img) =>
                              img.includes("brands-2") ||
                              img.includes("drinks-blue") ||
                              img.includes("learn-more.png")
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
                  {/* Row 2: Remaining images below */}
                  {(() => {
                    const allRemaining: string[] = [];
                    section.columns.forEach((col) => {
                      const circularIndex = col.images.findIndex(
                        (img) =>
                          img.includes("brands-2") ||
                          img.includes("drinks-blue") ||
                          img.includes("learn-more.png")
                      );
                      const remaining = circularIndex >= 0
                        ? [...col.images.slice(0, circularIndex), ...col.images.slice(circularIndex + 1)]
                        : col.images;
                      allRemaining.push(...remaining);
                    });
                    if (allRemaining.length === 0) return null;
                    return (
                      <div className="mt-6">
                        <div className={`${isFulcrum ? "bg-white/75 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
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
              {/* PDF Viewer */}
              {section.pdf && (
                <PdfSection src={section.pdf.src} title={section.pdf.title} />
              )}
            </div>
          );
        })
        )}

      </div>
      {/* Full-width navigation and white space */}
      <div className="bg-white">
        <div className="px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-16 pt-8 pb-8 border-t border-gray-300">
            <Link
              href={`/work/${leftLink.slug}`}
              className="group inline-flex items-center gap-3 border border-gray-300 px-5 py-3 rounded-sm max-w-xs md:max-w-md"
            >
              <svg className="w-4 h-4 flex-shrink-0 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <h3 className="font-heading font-bold text-xl group-hover:opacity-60 transition-opacity">
                {leftLink.title}
              </h3>
            </Link>
            <Link
              href={`/work/${rightLink.slug}`}
              className="group inline-flex items-center gap-3 border border-gray-300 px-5 py-3 rounded-sm max-w-xs md:max-w-md md:ml-auto"
            >
              <h3 className="font-heading font-bold text-xl group-hover:opacity-60 transition-opacity">
                {rightLink.title}
              </h3>
              <svg className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="min-h-[40px] border-t border-black"></div>
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={
      <div className="px-6 md:px-12 py-8 md:py-12 max-w-[1800px] mx-auto">
        <div className="font-body text-sm text-gray-400">Loading project...</div>
      </div>
    }>
      <ProjectContent params={params} />
    </Suspense>
  );
}
