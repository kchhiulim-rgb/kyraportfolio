import Link from "next/link";
import { projects } from "@/data/projects";
import HoverImage from "@/components/HoverImage";

export const metadata = {
  title: "Featured Work — Kyra Chhiu-Lim",
};

export default function WorkPage() {
  return (
    <div className="min-h-[calc(100vh)] bg-repeat-y" style={{ backgroundImage: 'url("/paper-texture.jpg")' }}>
      <div className="max-w-[1800px] mx-auto">
        {projects.map((project) => (
          <section key={project.slug} className="py-8 md:py-12">
            {/* Project Image */}
            <div className="w-full flex items-center justify-center">
              <Link href={`/work/${project.slug}`} className="block cursor-pointer">
                <HoverImage
                  src={project.coverImage}
                  alt={project.title}
                  className="w-[1400px] aspect-[4/3]"
                />
              </Link>
            </div>

            {/* Project Title + Category - Center */}
            <div className="text-center mt-6">
              <h2 className="font-heading font-bold text-lg md:text-xl">
                {project.title}
              </h2>
              <p className="font-body text-xs text-gray-600 mt-0.5 tracking-wide">
                {project.description}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
