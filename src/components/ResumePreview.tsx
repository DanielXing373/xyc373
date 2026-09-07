import { PdfDocumentPreview } from "@/components/PdfDocumentPreview";
import { site } from "@/content/site";

export function ResumePreview() {
  return (
    <PdfDocumentPreview
      title="Resume"
      pdfHref={site.resumePdf}
      iframeTitle="Resume preview"
      description="Preview opens on this page. Download when you want a file."
    />
  );
}
