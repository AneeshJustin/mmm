import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ReligionCategories } from "@/components/religion-categories"
import { FeaturedTemplates } from "@/components/featured-templates"
import { ReinventedSection } from "@/components/reinvented-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FeaturesSection } from "@/components/features-section"
import { ComparisonTable } from "@/components/comparison-table"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQAccordion } from "@/components/faq-accordion"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black selection:bg-black selection:text-white">
      <Navbar />
      <HeroSection />
      <ReligionCategories />
      <FeaturedTemplates />
      <ReinventedSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ComparisonTable />
      <TestimonialsSection />
      <FAQAccordion />
      <CTASection />
      <Footer />
    </main>
  )
}
