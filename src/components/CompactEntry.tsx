import type { CompactEntry as CompactEntryData } from "@/content/types";
import { LinkedText } from "./LinkedText";
import { MediaAlbum } from "./MediaAlbum";

type CompactEntryProps = {
  entry: CompactEntryData;
};

export function CompactEntry({ entry }: CompactEntryProps) {
  const mediaFirst = entry.mediaSide === "start";
  const compact = entry.layout === "compact";

  return (
    <article
      id={entry.id}
      className={`grid ${entry.scrollMarginClass ?? "scroll-mt-24"} grid-cols-1 gap-6 px-5 md:grid-cols-2 md:px-10 lg:px-16 ${entry.albumMaxHeight ? "items-center" : "items-start"} ${compact ? "py-8 md:gap-8 md:py-10" : "gap-8 py-8 md:gap-12"}`}
      aria-labelledby={`${entry.id}-title`}
    >
      <div className={`order-1 w-full ${mediaFirst ? "md:order-1" : "md:order-2"}`}>
        <MediaAlbum
          title={entry.title}
          items={entry.media}
          variant={compact ? "slides" : "entry"}
          aspect={entry.albumAspect}
          maxHeight={entry.albumMaxHeight}
          chrome={entry.albumChrome}
        />
      </div>
      <div
        className={`order-2 flex flex-col justify-start ${compact ? "" : "md:pt-8"} ${mediaFirst ? "md:order-2" : "md:order-1"}`}
      >
        {entry.tag ? (
          <p className="text-sm tracking-wide text-ink-muted uppercase">
            {entry.tag}
          </p>
        ) : null}
        <h3
          id={`${entry.id}-title`}
          className={`${entry.tag ? "mt-2" : ""} font-display tracking-tight break-words text-ink ${compact ? "text-2xl font-bold md:text-3xl" : "text-3xl font-bold md:text-4xl"}`}
        >
          {entry.title}
        </h3>
        {entry.intro ? (
          <p className={`${compact ? "mt-3" : "mt-6"} text-base leading-7 text-ink`}>
            <LinkedText text={entry.intro} />
          </p>
        ) : null}
        {entry.sections && entry.sections.length > 0 ? (
          <div className="mt-8 space-y-8">
            {entry.sections.map((section) => (
              <div key={section.heading}>
                <p className="font-display text-xl font-bold text-ink">
                  {section.heading}
                </p>
                {section.intro ? (
                  <p className="mt-2 text-base leading-7 text-ink">
                    <LinkedText text={section.intro} />
                  </p>
                ) : null}
                {section.bullets.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-ink">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>
                        <LinkedText text={bullet} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        ) : entry.bullets && entry.bullets.length > 0 ? (
          <ul className={`${entry.intro ? "mt-4" : "mt-6"} list-disc space-y-2 pl-5 text-base leading-7 text-ink`}>
            {(entry.bullets ?? []).map((bullet) => (
              <li key={bullet}>
                <LinkedText text={bullet} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
