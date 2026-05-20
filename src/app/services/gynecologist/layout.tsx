import type { Metadata } from "next";
import GynaecologyLayout, { metadata as gynaecologyMetadata } from "@/app/services/gynaecology/layout";

export const metadata: Metadata = {
  ...gynaecologyMetadata,
  alternates: { canonical: "https://www.mothrly.com/services/gynecologist" },
  openGraph: {
    ...gynaecologyMetadata.openGraph,
    url: "https://www.mothrly.com/services/gynecologist",
  },
};

export default GynaecologyLayout;
