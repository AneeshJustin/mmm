import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ReligionCategories } from "@/components/religion-categories"
import { FeaturedTemplates } from "@/components/featured-templates"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ReligionCategories />
      <FeaturedTemplates />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
