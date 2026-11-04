import { motion } from 'framer-motion'
import { GiftIcon, PlayIcon, SparkIcon } from './Icons'
import { Reveal } from './Motion'

const gemini = [
  ['Google Flow', 'إنشاء الصور والفيديوهات باحترافية'],
  ['NotebookLM', 'إنشاء محتوى تعليمي احترافي'],
  ['Google AI Studio', 'إنشاء المقاطع الصوتية'],
  ['تخزين سحابي', '5000 جيغابايت'],
]

const tools = [
  ['Canva Pro', 'التصميم الإبداعي', 'حساب'],
  ['QuillBot', 'إعادة الصياغة والتلخيص', 'شهر كامل'],
  ['Mystylus', 'الكتابة والتدقيق', 'شهر'],
  ['Aithor', 'إنشاء البحوث', 'شهر'],
]

const courses = ['التصحيح الآلي للاختبارات باستعمال ZipGrade', 'الاستمارات الإلكترونية', 'النسخة المسجلة لآخر طبعة من دورة «الأستاذ الرقمي»']

const outputs = ['شهادة مشاركة في دورة «الأستاذ الرقمي»', 'مشروع درس رقمي متكامل من إنجازك', 'حقيبة تكوينية رقمية: الدليل، الأوامر الجاهزة، روابط الأدوات']

export default function Gifts() {
  return (
    <section className="purple-bg" id="gifts">
      <div className="container">
        <Reveal className="section-head">
          <span className="pill pill-red">
            <span className="dot">
              <GiftIcon width={16} height={16} />
            </span>
            هدايا الدورة
          </span>
          <h2 style={{ marginTop: 18 }}>
            تخرج بـ<span className="hl">أدوات جاهزة</span> للعمل
          </h2>
        </Reveal>

        <div className="gifts-grid">
          <motion.div
            className="gift-main"
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          >
            <span className="pill pill-yellow">الهدية الكبرى</span>
            <h3 dir="ltr">Gemini</h3>
            <p>اشتراك Gemini ويشمل:</p>
            <ul>
              {gemini.map(([n, d]) => (
                <li key={n}>
                  <b dir="ltr">{n}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="gift-list">
            {tools.map(([n, d, dur], i) => (
              <motion.div
                key={n}
                className="gift"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="ico">
                  <SparkIcon width={22} height={22} />
                </span>
                <div>
                  <b dir="ltr">{n}</b>
                  <small>{d}</small>
                </div>
                <span className="gift-dur">{dur}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="extras">
          <Reveal className="docs-card">
            <h3>
              <PlayIcon width={24} height={24} /> دورات مسجّلة مهداة على منصة السبورة
            </h3>
            <ol>
              {courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1} className="docs-card light">
            <h3>المخرجات والامتيازات</h3>
            <ul>
              {outputs.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
