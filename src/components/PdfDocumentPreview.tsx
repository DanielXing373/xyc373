"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

type PdfDocumentPreviewProps = {
  title: string;
  pdfHref: string;
  iframeTitle: string;
  description: string;
};

export function PdfDocumentPreview({
  title,
  pdfHref,
  iframeTitle,
  description,
}: PdfDocumentPreviewProps) {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(pdfHref, { method: "GET" })
      .then((response) => {
        if (!cancelled) {
          const type = response.headers.get("content-type") ?? "";
          setAvailable(response.ok && type.includes("pdf"));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAvailable(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pdfHref]);

  return (
    <div id="main" className="flex min-h-[100svh] flex-col bg-paper px-5 py-8 md:px-10">
      <p className="text-sm text-ink-muted">
        <Link href="/" className="inline-flex min-h-11 items-center text-accent underline underline-offset-2">
          Back to {site.title}
        </Link>
      </p>
      <h1 className="mt-4 font-display text-3xl font-medium text-ink">{title}</h1>
      <p className="mt-2 max-w-2xl text-base text-ink-muted">{description}</p>
      <a
        href={pdfHref}
        download
        className="mt-6 inline-flex min-h-11 w-fit items-center rounded-sm bg-accent px-5 text-sm text-paper-raised hover:bg-accent-hover"
      >
        Download PDF
      </a>

      <div className="mt-8 min-h-[70svh] flex-1 overflow-hidden rounded-sm border border-rule bg-paper-raised">
        {available === null ? (
          <div className="flex h-full min-h-[70svh] items-end p-6">
            <p className="text-ink-muted">Checking for a PDF…</p>
          </div>
        ) : available === false ? (
          <div className="flex h-full min-h-[70svh] flex-col justify-end gap-2 p-6">
            <p className="rounded-sm bg-accent px-2 py-1 text-xs tracking-wide text-paper-raised uppercase w-fit">
              PDF not in the repo yet
            </p>
            <p className="text-ink">
              Add the file at <code className="text-sm">{pdfHref}</code>.
            </p>
          </div>
        ) : (
          <iframe title={iframeTitle} src={pdfHref} className="h-[80svh] w-full" />
        )}
      </div>
    </div>
  );
}
