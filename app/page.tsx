import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ContactCTA from "@/components/ContactCTA";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-4xl mx-auto px-6">
        <Divider />
      </div>
      <ProjectsSection />
      <div className="max-w-4xl mx-auto px-6">
        <Divider />
      </div>
      <ContactCTA />
      <div className="max-w-4xl mx-auto px-6">
        <Divider />
      </div>
      <Footer />
    </>
  );
}
