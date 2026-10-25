const nav = [
  { href: "#here-are-my-projects", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#interests", label: "Interests" },
  { href: "#internships", label: "Internships" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm">
      <div className="flex min-h-14 flex-wrap items-center gap-x-6 gap-y-2 px-5 py-2 md:px-10 lg:px-16">
        <a
          href="#top"
          className="font-display text-lg font-medium tracking-tight text-ink"
        >
          Daniel Xing
        </a>
        <nav aria-label="Page" className="flex flex-wrap items-center gap-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center px-2 text-sm text-accent underline underline-offset-2 sm:px-3"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="/resume"
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex min-h-11 items-center px-3 text-sm text-accent underline underline-offset-2"
        >
          Resume
        </a>
      </div>
    </header>
  );
}
