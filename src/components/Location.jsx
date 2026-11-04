import { motion } from 'framer-motion'
import { COURSE, VENUE } from '../config'
import { CalendarIcon, ClockIcon, PinIcon } from './Icons'
import { Reveal } from './Motion'

export default function Location() {
  const points = [
    { icon: PinIcon, title: VENUE.name, text: VENUE.address },
    { icon: CalendarIcon, title: COURSE.dates, text: COURSE.days.map((d) => d.date.split(' ')[0]).join(' و') },
    { icon: ClockIcon, title: COURSE.hours, text: 'الاستقبال والتسجيل ابتداءً من 08:30' },
  ]

  return (
    <section className="purple-bg" id="where">
      <div className="container">
        <Reveal className="section-head">
          <h2>
            في قلب <span className="hl">الجزائر العاصمة</span>
          </h2>
          <p>فضاء عمل عصري ومريح في المحمدية مول.</p>
        </Reveal>

        <div className="location-grid">
          <Reveal className="gmap">
            <iframe
              title="موقع الدورة على خرائط Google"
              src={VENUE.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>

          <div className="loc-points">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                className="loc-item"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <span className="ico">
                  <p.icon width={26} height={26} />
                </span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </motion.div>
            ))}
            <motion.a
              href={VENUE.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-yellow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <PinIcon width={20} height={20} /> افتح الموقع في Google Maps
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
