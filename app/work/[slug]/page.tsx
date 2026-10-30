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

  const index = getProjectIndex(slug);
  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject =
    index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <div className="px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto py-8 md:py-12">
        {/* Project Header */}
        <div className="mb-12 md:mb-16">
          {project.subtitle && (
            <h2 className="font-raleway font-bold text-2xl md:text-3xl mb-4">
              <strong>{project.subtitle}</strong>
            </h2>
          )}
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
            {project.slug.includes("seattleaaff") ||
            project.slug.includes("dp5") ? (
              <>
                <p className="font-space-grotesk text-sm italic">
                  {project.slug.includes("14th")
                    ? "14th Annual Film Festival"
                    : project.slug.includes("seattleaaff")
                      ? "13th Annual Film Festival"
                      : "Edition 5, Digital Natives"}
                </p>
                {project.slug.includes("seattleaaff") &&
                  !project.slug.includes("14th") && (
                    <p className="font-space-grotesk text-sm">
                      Illustrations by Felix Tran/@softvelvetboy
                    </p>
                  )}
              </>
            ) : null}
          </div>
          <p className="font-space-grotesk text-base md:text-lg leading-relaxed max-w-4xl mb-6">
            {project.sections?.[0]?.content || project.description}
          </p>

          {/* Tools and Skills */}
          {project.tools.length > 0 && (
            <div className="grid grid-cols-2 gap-4 max-w-xl mb-8">
              <ul className="space-y-1">
                {project.tools.slice(0, Math.ceil(project.tools.length / 2)).map((tool) => (
                  <li key={tool} className="font-space-grotesk text-sm">
                    • {tool}
                  </li>
                ))}
              </ul>
              <ul className="space-y-1">
                {project.tools
                  .slice(Math.ceil(project.tools.length / 2))
                  .map((tool) => (
                    <li key={tool} className="font-space-grotesk text-sm">
                      • {tool}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {/* Cover Image */}
        {project.coverImage && (
          <div className="mb-12 md:mb-16">
            <Image
              src={project.coverImage}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Project Sections */}
        {project.sections?.slice(1).map((section, i) => (
          <div key={i} className="mb-12 md:mb-16">
            {section.title && (
              <h3 className="font-raleway font-bold text-lg md:text-xl mb-4">
                {section.title}
              </h3>
            )}
            {section.content && (
              <div className="max-w-4xl space-y-4">
                {section.content.split("\n\n").map((paragraph, j) => (
                  <p
                    key={j}
                    className="font-space-grotesk text-base md:text-lg leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            {/* Section images */}
            {section.images && section.images.length > 0 && (
              <div className={`mt-6 grid gap-4 ${
                section.images.length === 1 ? 'grid-cols-1' :
                section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {section.images.map((img, j) => (
                  <Image
                    key={j}
                    src={img}
                    alt={`${section.title || 'Project image'} ${j + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                ))}
              </div>
            )}
            {/* PDF Viewer */}
            {section.pdf && (
              <PdfSection src={section.pdf.src} title={section.pdf.title} />
            )}
          </div>
        ))}

        {/* Navigation */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mt-16 pt-8 border-t border-gray-300">
          {prevProject && (
            <Link
              href={`/work/${prevProject.slug}`}
              className="group max-w-xs md:max-w-md"
            >
              <p className="font-space-grotesk text-sm mb-1">Previous</p>
              <h3 className="font-raleway font-bold text-xl group-hover:opacity-60 transition-opacity">
                {prevProject.title}
              </h3>
            </Link>
          )}
          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="group max-w-xs md:max-w-md md:text-right"
            >
              <p className="font-space-grotesk text-sm mb-1">Next</p>
              <h3 className="font-raleway font-bold text-xl group-hover:opacity-60 transition-opacity">
                {nextProject.title}
              </h3>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={
      <div className="px-6 md:px-12 py-8 md:py-12 max-w-[1800px] mx-auto">
        <div className="font-space-grotesk text-sm text-gray-400">Loading project...</div>
      </div>
    }>
      <ProjectContent params={params} />
    </Suspense>
  );
}
