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
    <div className={isFulcrum ? "relative" : "px-6 md:px-12"}>
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
      <div className={`max-w-[1800px] mx-auto py-8 md:py-12 ${isFulcrum ? "px-6 md:px-12" : ""}`}>
        {/* Project Header */}
        <div className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg px-8 md:px-16 py-8 md:py-12" : ""}`}>
          {isFulcrum ? (
            <div className="max-w-7xl">
              {project.subtitle && (
                <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                  <strong>{project.subtitle}</strong>
                </h2>
              )}
              {project.description && (
                <p className="font-body text-base md:text-lg uppercase tracking-widest mb-8 md:mb-12">
                  {project.description}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-6 md:gap-12">
                {project.intro && (
                  <p className="font-body text-xl md:text-2xl leading-snug text-justify">
                    {project.intro}
                  </p>
                )}
                {project.role && (
                  <div className="font-body text-xl md:text-2xl leading-relaxed whitespace-nowrap">
                    <p><strong>Project Role:</strong> {project.role}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {project.subtitle && (
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                  <strong>{project.subtitle}</strong>
                </h2>
              )}
              {project.intro && (
                <p className="font-body text-base md:text-lg leading-relaxed max-w-4xl mb-6">
                  {project.intro}
                </p>
              )}
              {project.role && (
                <p className="font-body text-base md:text-lg leading-relaxed max-w-4xl mb-6">
                  <strong>Role:</strong> {project.role}
                </p>
              )}
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
                {project.slug.includes("seattleaaff") ||
                project.slug.includes("dp5") ? (
                  <>
                    <p className="font-body text-sm italic">
                      {project.slug.includes("14th")
                        ? "14th Annual Film Festival"
                        : project.slug.includes("seattleaaff")
                          ? "13th Annual Film Festival"
                          : "Edition 5, Digital Natives"}
                    </p>
                    {project.slug.includes("seattleaaff") &&
                      !project.slug.includes("14th") && (
                        <p className="font-body text-sm">
                          Illustrations by Felix Tran/@softvelvetboy
                        </p>
                      )}
                  </>
                ) : null}
              </div>
              <p className="font-body text-base md:text-lg leading-relaxed max-w-4xl mb-6">
                {project.description}
              </p>

              {/* Tools and Skills */}
              {project.tools.length > 0 && (
                <div className="grid grid-cols-2 gap-4 max-w-xl mb-8">
                  <ul className="space-y-1">
                    {project.tools.slice(0, Math.ceil(project.tools.length / 2)).map((tool) => (
                      <li key={tool} className="font-body text-sm">
                        • {tool}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1">
                    {project.tools
                      .slice(Math.ceil(project.tools.length / 2))
                      .map((tool) => (
                        <li key={tool} className="font-body text-sm">
                          • {tool}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Cover Image (only for non-Fulcrum projects) */}
        {project.coverImage && !isFulcrum && (
          <div className="mb-8 md:mb-12">
            <ClickableImage src={project.coverImage} alt={project.title}>
              <Image
                src={project.coverImage}
                alt={project.title}
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </ClickableImage>
          </div>
        )}

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
                  <div className={`${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
                    <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 pl-12" style={{ fontWeight: 700 }}>
                      {section.title}
                    </h3>
                    <div className="pl-12 pr-12 space-y-4">
                      {section.content.split("\n\n").map((paragraph, j) => (
                        <p
                          key={j}
                          className="font-body text-base md:text-lg leading-snug font-light text-justify"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  {/* Solution column */}
                  <div className={`${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
                    <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 pl-12" style={{ fontWeight: 700 }}>
                      {nextSection.title}
                    </h3>
                    <div className="pl-12 pr-12 space-y-4">
                      {nextSection.content.split("\n\n").map((paragraph, j) => (
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
                {/* Row 2: Images side-by-side */}
                {(section.images && section.images.length > 0) || (nextSection.images && nextSection.images.length > 0) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Problem images column */}
                    {section.images && section.images.length > 0 && (
                      <div className={`${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
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
                    {/* Solution images column */}
                    {nextSection.images && nextSection.images.length > 0 && (
                      <div className={`${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
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
                  <div className={`${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 flex flex-col" : "flex flex-col"}`}>
                    {section.pdf.title && (
                      <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 pl-12 flex-shrink-0" style={{ fontWeight: 700 }}>
                      {section.pdf.title}
                    </h3>
                  )}
                  <div>
                    <PdfSection src={section.pdf.src} />
                  </div>
                </div>
                {/* Right PDF column */}
                <div className={`${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 flex flex-col" : "flex flex-col"}`}>
                  {nextSection.pdf.title && (
                    <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 pl-12 flex-shrink-0" style={{ fontWeight: 700 }}>
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

          // For sections with videos, render the video scroll wheel
          if (section.videos && section.videos.length > 0) {
            // For Fulcrum, use the shared volume provider client component
            if (isFulcrum) {
              return null;
            }
            return (
              <div key={i} className={`mb-12 md:mb-16 ${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
                {section.title && (
                  <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 pl-12" style={{ fontWeight: 700 }}>
                    {section.title}
                  </h3>
                )}
                {section.content && (
                  <div className="pl-12 pr-12 space-y-4 mb-6">
                    {section.content.split("\n\n").map((paragraph, j) => (
                      <p
                        key={j}
                        className="font-body text-base md:text-lg leading-snug font-light text-justify"
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
                  section.images.length === 1 ? 'grid-cols-1' :
                  section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                  'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {section.images.map((img, j) => {
                    const isFullResImage = img.includes('barista-thumbnail') || img.includes('email/mockup');
                    return (
                      <div key={j} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8">
                        {img.endsWith('.gif') ? (
                          <ClickToPlayGif src={img} alt={`Project image ${j + 1}`} />
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
                  className="font-heading font-bold text-xl md:text-2xl mb-4 pl-12"
                  style={{ fontWeight: 700 }}
                >
                  {section.title}
                </h3>
              )}
              {section.content && (
                <div className="pl-12 pr-12 space-y-4">
                  {section.content.split("\n\n").map((paragraph, j) => (
                    <p
                      key={j}
                      className="font-body text-base md:text-lg leading-snug font-light text-justify"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              {/* Section images */}
              {section.images && section.images.length > 0 && (
                <div className={`mt-6 pl-12 pr-12 grid gap-4 ${
                  section.images.length === 1 ? 'grid-cols-1' :
                  section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                  'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {section.images.map((img, j) => {
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
              {/* Column layout — split into two rows: headers row + images row */}
              {section.columns && section.columns.length > 0 && (
                <>
                  {/* Row 1: Circular cover photos with headers */}
                  <div className="mt-6">
                    <div className={`${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
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
                        <div className={`${isFulcrum ? "bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8" : ""}`}>
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
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
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
