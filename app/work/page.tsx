import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Featured Work — Kyra Chhiu-Lim",
};

export default function WorkPage() {
  return (
    <div className="px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <div key={project.slug} className={index % 2 === 0 ? "md:mt-12" : ""}>
              <Link
                href={`/work/${project.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] bg-gray-200 mb-3 overflow-hidden relative">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300" />
                  )}
                </div>
                <h2 className="font-raleway font-bold text-xl md:text-2xl group-hover:opacity-60 transition-opacity">
                  {project.title}
                </h2>
                <p className="font-space-grotesk text-sm md:text-base mt-1">
                  {project.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
