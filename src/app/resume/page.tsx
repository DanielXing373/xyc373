import type { Metadata } from "next";
import { ResumePreview } from "@/components/ResumePreview";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Resume · ${site.title}`,
  description: "Preview and download the résumé PDF.",
};

export default function ResumePage() {
  return <ResumePreview />;
}
