import { galleryImages } from "@/data/gallery";
import GalleryStrip from "@/components/GalleryStrip";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Gallery — Georgio Silvea",
};

export default function GalleryPage() {
  const reversed = [...galleryImages].reverse();

  return (
    <>
      <section className="w-full pt-20 pb-4">
        <div className="max-w-4xl mx-auto px-6 mb-10">
          <h1
            className="text-5xl text-[var(--fg)] leading-tight"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            scenes from my life
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <GalleryStrip images={galleryImages} direction="left" />
          <GalleryStrip images={reversed} direction="right" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 mt-16">
        <Divider />
      </div>
      <Footer />
    </>
  );
}
