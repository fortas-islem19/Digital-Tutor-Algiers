import { motion } from 'framer-motion'
import logo from '../assets/logo-full-purple.png'
import { Pop } from './Motion'
import { PHONES } from '../config'
import { PhoneIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer purple-bg">
      <div className="container">
        <motion.img
          src={logo}
          alt="السبورة"
          className="logo-big"
          initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150, damping: 14 }}
        />
        <div className="latin">Esaboura</div>
        <Pop delay={0.6}>
          <span className="pill pill-yellow">الأستاذ الرقمي — الذكاء الاصطناعي في التعليم</span>
        </Pop>
        <div className="footer-contact">
          <span>للاستفسار والتسجيل:</span>
          {PHONES.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="pill pill-white">
              <PhoneIcon width={18} height={18} />
              <span dir="ltr">{p.display}</span>
            </a>
          ))}
        </div>
        <small>© {new Date().getFullYear()} السبورة — جميع الحقوق محفوظة</small>
      </div>
    </footer>
  )
}
