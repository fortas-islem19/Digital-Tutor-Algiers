import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CameraIcon } from './Icons'
import { Reveal } from './Motion'

// Every image dropped into src/assets/gallery shows up here automatically (sorted by file name).
const photos = Object.entries(import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src)

const placeholders = ['ورشة تطبيقية', 'أساتذة الطبعة الأولى', 'توزيع الشهادات', 'العمل على الحواسيب', 'مشروع الدرس الرقمي', 'صورة جماعية']

export default function Gallery() {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowLeft') setOpen((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowRight') setOpen((i) => (i - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section className="purple-bg" id="gallery">
      <div className="container">
        <Reveal className="section-head">
          <span className="pill pill-yellow">من الطبعات السابقة</span>
          <h2 style={{ marginTop: 18 }}>
            أساتذة <span className="hl">جرّبوها قبلك</span>
          </h2>
          <p>لقطات من دورات «الأستاذ الرقمي» السابقة مع السبورة.</p>
        </Reveal>

        <div className="gallery">
          {photos.length
            ? photos.map((src, i) => (
                <motion.button
                  type="button"
                  key={src}
                  className="g-item"
                  onClick={() => setOpen(i)}
                  aria-label={`عرض الصورة ${i + 1}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
                >
                  <img src={src} alt={`من دورة الأستاذ الرقمي — صورة ${i + 1}`} loading="lazy" />
                </motion.button>
              ))
            : placeholders.map((t, i) => (
                <motion.div
                  key={t}
                  className="g-item g-empty"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <CameraIcon width={34} height={34} />
                  <span>{t}</span>
                </motion.div>
              ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              key={open}
              src={photos[open]}
              alt=""
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button type="button" className="lb-close" aria-label="إغلاق" onClick={() => setOpen(null)}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
