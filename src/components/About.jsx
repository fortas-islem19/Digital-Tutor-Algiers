import { motion } from 'framer-motion'
import { COURSE, VENUE } from '../config'
import { CalendarIcon, ClockIcon, PinIcon, UsersIcon } from './Icons'
import { Reveal } from './Motion'

const facts = [
  { icon: CalendarIcon, label: 'التاريخ', value: COURSE.dates },
  { icon: ClockIcon, label: 'التوقيت', value: `${COURSE.hours}` },
  { icon: PinIcon, label: 'المكان', value: VENUE.name },
  { icon: UsersIcon, label: 'المقاعد', value: `${COURSE.seats} مقعدًا فقط` },
]

const goals = [
  'إنشاء محتوى تعليمي احترافي باستخدام أدوات الذكاء الاصطناعي',
  'تصميم دروس تفاعلية تجعل التعلّم تجربة ممتعة',
  'توليد صور وفيديوهات تعليمية',
  'إعداد عروض تقديمية ذكية وتفاعلية',
  'تصميم قصص وألعاب تعليمية بأساليب التلعيب',
  'إنشاء اختبارات إلكترونية مع التصحيح الآلي عبر الإنترنت',
  'إعداد خرائط ذهنية ودعائم بصرية بسهولة',
]

export default function About() {
  return (
    <section className="purple-bg" id="about">
      <div className="container">
        <div className="facts">
          {facts.map((f, i) => (
            <motion.div
              key={f.label}
              className="fact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="ico">
                <f.icon width={24} height={24} />
              </span>
              <div>
                <small>{f.label}</small>
                <b>{f.value}</b>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal className="section-head">
          <span className="pill pill-yellow">تقديم الدورة</span>
          <h2 style={{ marginTop: 18 }}>
            كن <span className="hl">أستاذًا رقميًا</span> متميزًا
          </h2>
          <p>
            تأتي هذه الطبعة الحضورية بعد نجاح الطبعات السابقة، بنسخة أكثر تطورًا وعمقًا لمواكبة ثورة الذكاء الاصطناعي في التعليم. في نهاية الدورة
            تكون قادرًا على:
          </p>
        </Reveal>

        <ol className="goals">
          {goals.map((g, i) => (
            <motion.li
              key={g}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <span className="goal-num">{i + 1}</span>
              {g}
            </motion.li>
          ))}
        </ol>

        <Reveal className="method">
          <div className="method-bar" aria-label="70% ممارسة و30% عرض نظري">
            <motion.span
              className="practice"
              initial={{ width: 0 }}
              whileInView={{ width: '70%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              70% ممارسة
            </motion.span>
            <span className="theory">30% نظري</span>
          </div>
          <p>تكوين تطبيقي عبر ورشات عمل فردية وجماعية وأمثلة من الواقع الصفي، يُختتم بمشروع درس رقمي متكامل من إنجازك.</p>
        </Reveal>
      </div>
    </section>
  )
}
