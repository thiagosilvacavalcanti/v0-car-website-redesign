import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { VehicleSearch } from "@/components/vehicle-search"
import { BrandShowcase } from "@/components/brand-showcase"
import { VehicleGrid } from "@/components/vehicle-grid"
import { SellYourCar } from "@/components/sell-your-car"
import { FinancingSection } from "@/components/financing-section"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* <VehicleSearch /> */}
        <BrandShowcase />
        <VehicleGrid />
        <SellYourCar />
        <FinancingSection />
      </main>
      <Footer />
    </>
  )
}
