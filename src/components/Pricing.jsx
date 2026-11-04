import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { COURSE, OLD_PRICE, PRICE, SEATS_TAKEN, formatDA } from '../config'
import { CheckIcon, SeatIcon } from './Icons'
import { Counter, Reveal } from './Motion'

const GREEN = '#22c55e'
const RED = '#dc240c'

const perks = [
  `${COURSE.totalHours} ساعة تكوين حضوري تطبيقي`,
  'اشتراك Gemini + Canva Pro + أدوات الكتابة',
  '3 دورات مسجّلة مهداة على منصة السبورة',
  'حقيبة تكوينية رقمية وأوامر جاهزة',
  'شهادة مشاركة',
]

function Seats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [booked, setBooked] = useState(0)
  const total = COURSE.seats
  const taken = Math.min(SEATS_TAKEN, total)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setBooked((b) => {
        if (b >= taken) {
          clearInterval(id)
          return b
        }
        return b + 1
      })
    }, 140)
    return () => clearInterval(id)
  }, [inView, taken])

  return (
    <div className="seats-card" ref={ref}>
      <h3>{total} مقعدًا فقط!</h3>
      <div className="seats seats-14">
        {Array.from({ length: total }, (_, i) => {
          const isTaken = i < booked
          return (
            <motion.div key={i} className="seat" animate={isTaken ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
              <SeatIcon color={isTaken ? RED : GREEN} />
            </motion.div>
          )
        })}
      </div>
      <div className="seats-legend">
        <span>
          <i style={{ background: RED }} /> محجوز
        </span>
        <span>
          <i style={{ background: GREEN }} /> متاح
        </span>
      </div>
      <p className="seats-left">
        بقي <b>{total - taken}</b> مقاعد — الأولوية حسب ترتيب التسجيل
      </p>
    </div>
  )
}

export default function Pricing() {
  return (
    <section className="purple-bg" id="prices">
      <div className="container">
        <Reveal className="section-head">
          <h2>
            رسوم <span className="hl">المشاركة</span>
          </h2>
          <p>
            {COURSE.dates} — {COURSE.hours}
          </p>
        </Reveal>

        <div className="deal-grid">
          <motion.div
            className="plan featured"
            initial={{ opacity: 0, y: 60, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          >
            <span className="pill pill-yellow">سعر خاص</span>
            <h3>الأستاذ الرقمي</h3>
            <div className="old-price">{formatDA(OLD_PRICE)}</div>
            <div className="plan-price">
              <Counter from={OLD_PRICE} to={PRICE} duration={1.4} className="amount" format={(v) => v.toLocaleString('en-US')} />
              <span className="cur">دج</span>
            </div>
            <ul>
              {perks.map((perk) => (
                <li key={perk}>
                  <span className="tick">
                    <CheckIcon width={14} height={14} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <a href="#register" className="btn btn-yellow">
              احجز مقعدك
            </a>
          </motion.div>

          <Seats />
        </div>
      </div>
    </section>
  )
}
