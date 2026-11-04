import { motion, useScroll, useSpring } from 'framer-motion'
import Backdrop from './components/Backdrop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Axes from './components/Axes'
import Program from './components/Program'
import Gallery from './components/Gallery'
import Trainer from './components/Trainer'
import Gifts from './components/Gifts'
import Pricing from './components/Pricing'
import Location from './components/Location'
import RegisterForm from './components/RegisterForm'
import Footer from './components/Footer'
import CallButton from './components/CallButton'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          scaleX,
          transformOrigin: '100% 50%',
          position: 'fixed',
          top: 0,
          insetInline: 0,
          height: 4,
          background: 'linear-gradient(90deg, #fcd31c, #dc240c)',
          zIndex: 60,
        }}
      />
      <Backdrop />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Axes />
        <Program />
        <Gallery />
        <Trainer />
        <Gifts />
        <Pricing />
        <Location />
        <RegisterForm />
      </main>
      <Footer />
      <CallButton />
    </>
  )
}
