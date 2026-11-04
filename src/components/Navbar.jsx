import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo-mark-white.png'

const links = [
  { href: '#about', label: 'الدورة' },
  { href: '#axes', label: 'المحاور' },
  { href: '#program', label: 'البرنامج' },
  { href: '#gallery', label: 'صور' },
  { href: '#gifts', label: 'الهدايا' },
  { href: '#where', label: 'المكان' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container nav-inner">
        <a href="#top" className="brand-pill" aria-label="السبورة">
          السبورة
          <img src={logo} alt="" />
        </a>
        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#register" className="btn btn-yellow">
          سجّل الآن
        </a>
      </div>
    </motion.header>
  )
}
