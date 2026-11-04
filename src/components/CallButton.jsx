import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PHONES } from '../config'
import { PhoneIcon } from './Icons'

// Floating call button that opens the school's phone numbers
export default function CallButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="call-fab">
      <AnimatePresence>
        {open && (
          <motion.div
            className="call-menu"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <span className="call-title">اتصل بمدرسة السبورة</span>
            {PHONES.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="call-link">
                <PhoneIcon width={18} height={18} />
                <span dir="ltr">{p.display}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="call-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'إغلاق' : 'اتصل بنا'}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 2.5 }}
        whileTap={{ scale: 0.9 }}
      >
        {!open && (
          <motion.span
            className="call-pulse"
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
        {open ? '✕' : <PhoneIcon width={26} height={26} />}
      </motion.button>
    </div>
  )
}
