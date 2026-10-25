import { site } from "@/content/site";
import type { CompactEntry } from "@/content/types";
import { LinkedText } from "./LinkedText";

function compactOneLine(entry: CompactEntry): string {
  const firstSection = entry.sections?.[0];
  const raw =
    entry.heroBlurb?.trim() ||
    entry.intro?.trim() ||
    firstSection?.intro?.trim() ||
    firstSection?.bullets?.[0] ||
    entry.bullets?.[0] ||
    "";
  return raw.replace(/:\s*$/, "");
}

function HeroEyebrow({
  children,
  href,
  id,
}: {
  children: string;
  href?: string;
  id?: string;
}) {
  const label = href ? (
    <a href={href}>{children}</a>
  ) : (
    children
  );

  return (
    <p id={id} className={id ? "hero-eyebrow scroll-mt-24" : "hero-eyebrow"}>
      {label}
    </p>
  );
}

export function Hero() {
  return (
    <section
      id="about"
      className="flex min-h-[calc(100svh-3.5rem)] scroll-mt-24 flex-col px-5 py-8 md:px-10 md:py-11 lg:px-16"
      aria-labelledby="hero-heading"
    >
      <div className="hero-band">
        <figure className="hero-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.hero.portrait.src} alt={site.hero.portrait.alt} />
        </figure>

        <div className="hero-who">
          <h1
            id="hero-heading"
            className="font-display text-4xl font-medium tracking-tight break-words text-ink md:text-5xl md:leading-[1.1]"
          >
            {site.hero.name}
          </h1>
          <p className="mt-3 flex flex-wrap items-baseline gap-x-2.5 text-[0.95rem] text-ink md:mt-4">
            <a
              href={`mailto:${site.email}`}
              className="text-accent underline underline-offset-2"
            >
              {site.email}
            </a>
            {site.phone ? (
              <>
                <span className="text-ink-muted" aria-hidden="true">
                  ·
                </span>
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  className="text-accent underline underline-offset-2"
                >
                  {site.phone}
                </a>
              </>
            ) : null}
          </p>
        </div>

        <div className="hero-schools">
          <h2 className="hero-eyebrow">Education</h2>
          <ul className="education-grid mt-2.5 md:mt-3">
            {site.education.map((item) => (
              <li key={item.id}>
                <div className="education-mark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.icon}
                    alt={item.iconAlt}
                    className={
                      item.id === "rochester"
                        ? "h-24 w-24 object-contain"
                        : "h-20 w-20 object-contain"
                    }
                  />
                </div>
                <div className="education-copy">
                  <p className="font-display text-base leading-snug text-ink">
                    {item.school}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-muted">{item.years}</p>
                  <p className="mt-0.5 whitespace-pre-line text-sm leading-relaxed text-ink">
                    {item.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hero-inventory">
        <div className="hero-inventory-primary">
          <div>
            <HeroEyebrow id="here-are-my-projects">Projects</HeroEyebrow>
            <ul className="mt-3 space-y-3">
              {site.featured.map((project) => (
                <li key={project.id} className="space-y-0.5">
                  <a
                    href={`#${project.id}`}
                    className="font-display text-lg text-accent underline underline-offset-2 md:text-[1.2rem]"
                  >
                    {project.title}
                  </a>
                  <p className="select-text text-base leading-relaxed text-ink">
                    <LinkedText
                      text={project.heroBlurb?.trim() || project.oneLine}
                      bold={false}
                    />
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <HeroEyebrow href="#interests">Other interests</HeroEyebrow>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a href="#print-3d" className="text-accent underline underline-offset-2">
                  3D printing
                </a>
              </li>
              <li>
                <a href="#rapid-prototyping" className="text-accent underline underline-offset-2">
                  Rapid prototyping
                </a>
              </li>
              <li>
                <a href="#ai-ethics" className="text-accent underline underline-offset-2">
                  AI in education (AIED)
                </a>
              </li>
              <li>
                <a href="#figma-app" className="text-accent underline underline-offset-2">
                  Human-Computer Interaction (HCI)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <HeroEyebrow href="#internships">Internship experience</HeroEyebrow>
          <ul className="mt-3 space-y-3">
            {site.internships.map((entry) => (
              <li key={entry.id} className="space-y-0.5">
                <a
                  href={`#${entry.id}`}
                  className="font-display text-lg text-accent underline underline-offset-2 md:text-[1.2rem]"
                >
                  {entry.title}
                </a>
                <p className="select-text text-base leading-relaxed text-ink">
                  <LinkedText text={compactOneLine(entry)} bold={false} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
