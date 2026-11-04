import { motion } from 'framer-motion'
import { COURSE } from '../config'
import { CapIcon } from './Icons'
import { Pop, Reveal } from './Motion'

const audience = [
  'أساتذة التعليم الابتدائي والمتوسط والثانوي',
  'الأساتذة الجامعيون وطلبة الدكتوراه',
  'المكوّنون ومؤطرو التكوين المهني',
  'كل مهتم بتوظيف الذكاء الاصطناعي في التعليم',
]

const needs = ['إلمام أساسي باستخدام الحاسوب والإنترنت', 'حاسوب محمول شخصي مشحون (ويُستحسن هاتف ذكي)', 'حساب Gmail مفعّل لإنشاء حسابات المنصات']

export default function Trainer() {
  return (
    <section className="purple-bg" id="trainer">
      <div className="container trainer-grid">
        <Reveal className="trainer-card">
          <Pop className="trainer-avatar">
            <CapIcon width={56} height={56} />
          </Pop>
          <span className="pill pill-purple">المدرّب</span>
          <h3>{COURSE.trainer}</h3>
          <p>{COURSE.trainerRole}</p>
          <small>لغة التكوين: العربية، مع المصطلحات التقنية بالإنجليزية والفرنسية</small>
        </Reveal>

        <div className="audience">
          <Reveal>
            <h2>
              لمن هذه <span className="hl">الدورة؟</span>
            </h2>
          </Reveal>
          <ul className="check-list">
            {audience.map((a, i) => (
              <motion.li key={a} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <b>✓</b>
                {a}
              </motion.li>
            ))}
          </ul>
          <Reveal className="needs">
            <h3>ماذا تحضر معك؟</h3>
            <ul>
              {needs.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
