import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import StarBackground from "@/components/StarBackground"
import AnimatedSection from "@/components/AnimatedSection"

export default function Home() {
  return (
    <main>
      <StarBackground />
      <Navbar />

      <AnimatedSection id="home">
        <Hero />
      </AnimatedSection>

      <AnimatedSection id="about">
        <About />
      </AnimatedSection>

      <AnimatedSection id="projects">
        <Projects />
      </AnimatedSection>

      <AnimatedSection id="contact">
        <Contact />
      </AnimatedSection>

      <Footer />
    </main>
  )
}
