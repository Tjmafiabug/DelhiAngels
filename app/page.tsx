import Navbar from '@/components/event/Navbar'
import Hero from '@/components/event/Hero'
import About from '@/components/event/About'
import Speakers from '@/components/event/Speakers'
import Agenda from '@/components/event/Agenda'
import Sponsors from '@/components/event/Sponsors'
import RegisterCTA from '@/components/event/RegisterCTA'
import Footer from '@/components/event/Footer'

export default function EventHomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Speakers />
        <Agenda />
        <Sponsors />
        <RegisterCTA />
      </main>
      <Footer />
    </>
  )
}
