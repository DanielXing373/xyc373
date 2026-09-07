"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("about");
    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry?.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <a
      href="#top"
      className="fixed right-4 bottom-4 z-50 inline-flex min-h-11 items-center rounded-sm bg-paper-raised px-4 text-sm text-accent shadow-sm hover:bg-white"
      onClick={(event) => {
        event.preventDefault();
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        history.replaceState(null, "", `${window.location.pathname}${window.location.search}#top`);
      }}
    >
      Back to top
    </a>
  );
}
