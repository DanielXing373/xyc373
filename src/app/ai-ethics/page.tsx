import type { Metadata } from "next";
import { PdfDocumentPreview } from "@/components/PdfDocumentPreview";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `CAL Evaluation and Guided Adoption of AIED · ${site.title}`,
  description: "Preview and download the AI ethics policy memo PDF.",
};

export default function AiEthicsPage() {
  return (
    <PdfDocumentPreview
      title="CAL Evaluation and Guided Adoption of AIED"
      pdfHref={site.aiEthicsPdf}
      iframeTitle="CAL Evaluation and Guided Adoption of AIED preview"
      description="Preview opens on this page. Download when you want a file."
    />
  );
}
