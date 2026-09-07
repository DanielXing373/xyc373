import type { FeaturedProject as FeaturedProjectData } from "@/content/types";
import { LinkedText } from "./LinkedText";
import { MediaAlbum } from "./MediaAlbum";

type FeaturedProjectProps = {
  project: FeaturedProjectData;
};

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const mediaFirst = project.mediaSide === "start";

  return (
    <section
      id={project.id}
      className={`grid min-h-[calc(100svh-3.5rem)] ${project.scrollMarginClass ?? "scroll-mt-24"} grid-cols-1 items-stretch gap-8 px-5 py-10 md:grid-cols-2 md:gap-12 md:px-10 md:py-12 lg:px-16`}
      aria-labelledby={`${project.id}-title`}
    >
      <div className={`order-1 ${mediaFirst ? "md:order-1" : "md:order-2"}`}>
        <MediaAlbum
          title={project.title}
          items={project.media}
          variant="page"
          aspect={project.albumAspect}
        />
      </div>
      <div
        className={`order-2 flex flex-col justify-center ${mediaFirst ? "md:order-2" : "md:order-1"}`}
      >
        {project.tag ? (
          <p className="text-sm tracking-wide text-ink-muted uppercase">
            {project.tag}
          </p>
        ) : null}
        <h2
          id={`${project.id}-title`}
          className={`${project.tag ? "mt-2" : ""} font-display text-3xl font-medium tracking-tight break-words text-ink md:text-5xl`}
        >
          {project.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-ink">
          <LinkedText text={project.oneLine} />
        </p>
        <ul className="mt-6 max-w-xl list-disc space-y-3 pl-5 text-base leading-7 break-words text-ink">
          {project.summaryBullets.map((bullet) => (
            <li key={bullet}>
              <LinkedText text={bullet} />
            </li>
          ))}
        </ul>
        {project.summaryNote ? (
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink-muted">
            <LinkedText text={project.summaryNote} />
          </p>
        ) : null}
      </div>
    </section>
  );
}
