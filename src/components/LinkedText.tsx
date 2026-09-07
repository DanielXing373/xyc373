function unwrapBold(value: string) {
  const emphasized = /^\*\*(.+)\*\*$/.exec(value);
  if (emphasized) {
    return { label: emphasized[1], emphasized: true };
  }
  return { label: value, emphasized: false };
}

export function LinkedText({
  text,
  bold = true,
}: {
  text: string;
  bold?: boolean;
}) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const { label, emphasized } = unwrapBold(link[1]);
          const inner =
            bold && emphasized ? (
              <strong className="font-semibold">{label}</strong>
            ) : (
              label
            );

          const href = link[2];
          const external = /^(https?:)?\/\//i.test(href);

          return (
            <a
              key={`${label}-${index}`}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noreferrer" }
                : undefined)}
              className="text-accent underline underline-offset-2"
            >
              {inner}
            </a>
          );
        }

        const emphasis = /^\*\*([^*]+)\*\*$/.exec(part);
        if (emphasis) {
          if (!bold) {
            return emphasis[1];
          }
          return (
            <strong key={`${emphasis[1]}-${index}`} className="font-semibold">
              {emphasis[1]}
            </strong>
          );
        }

        return part;
      })}
    </>
  );
}
