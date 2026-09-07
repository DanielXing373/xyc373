import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="px-5 py-10 md:px-10 lg:px-16">
      <p className="font-display text-lg text-ink">Daniel Xing</p>
      <a
        href={`mailto:${site.email}`}
        className="mt-3 inline-flex min-h-11 items-center text-sm text-accent hover:underline"
      >
        {site.email}
      </a>
    </footer>
  );
}
