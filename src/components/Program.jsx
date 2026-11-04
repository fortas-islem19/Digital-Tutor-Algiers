import { motion } from 'framer-motion'
import { COURSE } from '../config'
import { Reveal } from './Motion'

const schedule = [
  [
    ['08:30 – 09:00', 'الاستقبال والتسجيل'],
    ['09:00 – 09:30', 'الافتتاح، التعارف، مدخل إلى الذكاء الاصطناعي في التعليم'],
    ['09:30 – 11:00', 'المحور 1: إنشاء المحتوى التعليمي وهندسة الأوامر'],
    ['11:00 – 11:15', 'استراحة', true],
    ['11:15 – 12:30', 'المحور 2: تصميم الدروس التفاعلية'],
    ['12:30 – 13:30', 'استراحة الغداء', true],
    ['13:30 – 15:00', 'المحور 3: توليد الصور والفيديوهات التعليمية'],
    ['15:00 – 16:00', 'المحور 4: العروض التقديمية الذكية + تطبيق ختامي'],
  ],
  [
    ['08:30 – 10:30', 'المحور 5: القصص والألعاب التعليمية (التلعيب)'],
    ['10:30 – 10:45', 'استراحة', true],
    ['10:45 – 12:30', 'المحور 6: الاختبارات الإلكترونية والتصحيح الآلي'],
    ['12:30 – 13:30', 'استراحة الغداء', true],
    ['13:30 – 14:30', 'المحور 7: الخرائط الذهنية والدعائم البصرية'],
    ['14:30 – 15:30', 'مشروع تطبيقي: إعداد درس رقمي متكامل وعرضه'],
    ['15:30 – 16:00', 'التقييم، تفعيل الاشتراكات، توزيع الشهادات والاختتام'],
  ],
]

export default function Program() {
  return (
    <section className="purple-bg" id="program">
      <div className="container">
        <Reveal className="section-head">
          <span className="pill pill-yellow">البرنامج الزمني</span>
          <h2 style={{ marginTop: 18 }}>
            يومان <span className="hl">مكثّفان</span>
          </h2>
          <p>6 ساعات تكوين يوميًا، {COURSE.hours}.</p>
        </Reveal>

        <div className="days2">
          {COURSE.days.map((d, di) => (
            <motion.div
              key={d.label}
              className="day2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: di * 0.15 }}
            >
              <div className="day2-head">
                <span className="pill pill-yellow">{d.label}</span>
                <h3>{d.theme}</h3>
                <small>{d.date}</small>
              </div>
              <ol className="slots">
                {schedule[di].map(([time, what, rest], i) => (
                  <motion.li
                    key={time}
                    className={rest ? 'rest' : ''}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <span className="slot-time" dir="ltr">
                      {time}
                    </span>
                    <span>{what}</span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
