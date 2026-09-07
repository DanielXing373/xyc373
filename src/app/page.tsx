import { BackToTop } from "@/components/BackToTop";
import { CompactEntry } from "@/components/CompactEntry";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Hero } from "@/components/Hero";
import { SectionRule } from "@/components/SectionRule";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/content/site";

export default function Home() {
  return (
    <div>
      <div id="top" className="h-0 overflow-hidden" aria-hidden="true" />
      <SiteHeader />
      <main id="main">
        <Hero />
        <SectionRule />
        <section
          id="projects"
          className="scroll-mt-24"
          aria-labelledby="projects-heading"
        >
          <div className="px-5 pt-10 pb-2 md:px-10 md:pt-12 lg:px-16">
            <h2
              id="projects-heading"
              className="font-display text-center text-4xl font-medium text-ink md:text-5xl"
            >
              Projects
            </h2>
          </div>
          {site.featured.map((project, index) => (
            <div key={project.id}>
              {index > 0 ? <SectionRule /> : null}
              <FeaturedProject project={project} />
            </div>
          ))}
        </section>
        <SectionRule />
        <section id="interests" className="scroll-mt-24" aria-labelledby="interests-heading">
          <div className="px-5 pt-10 pb-2 md:px-10 md:pt-12 lg:px-16">
            <h2
              id="interests-heading"
              className="font-display text-center text-4xl font-medium text-ink md:text-5xl"
            >
              Interests
            </h2>
          </div>
          {site.interests.map((entry, index) => (
            <div key={entry.id}>
              {index > 0 ? <SectionRule /> : null}
              <CompactEntry entry={entry} />
            </div>
          ))}
        </section>
        <SectionRule />
        <section id="internships" className="scroll-mt-24" aria-labelledby="internships-heading">
          <div className="px-5 pt-10 pb-2 md:px-10 md:pt-12 lg:px-16">
            <h2
              id="internships-heading"
              className="font-display text-center text-4xl font-medium text-ink md:text-5xl"
            >
              Internships
            </h2>
          </div>
          {site.internships.map((entry, index) => (
            <div key={entry.id}>
              {index > 0 ? <SectionRule /> : null}
              <CompactEntry entry={entry} />
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
