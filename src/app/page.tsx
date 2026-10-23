import { About } from "@/components/about";
import { Faq } from "@/components/faq";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Locations } from "@/components/locations";
import { Marquee } from "@/components/marquee";
import { MenuSection } from "@/components/menu-section";
import { Order } from "@/components/order";
import { Reviews } from "@/components/reviews";

/** Every content section below returns null when its content is empty. */
export default function HomePage() {
  return (
    <main id="content">
      <Hero />
      <Marquee />
      <MenuSection />
      <Locations />
      <Order />
      <Reviews />
      <Gallery />
      <About />
      <Faq />
    </main>
  );
}
