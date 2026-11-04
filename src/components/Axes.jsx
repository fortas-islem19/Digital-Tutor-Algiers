import { motion } from 'framer-motion'
import { Reveal } from './Motion'

const axes = [
  { title: 'إنشاء المحتوى التعليمي', text: 'كتابة الأوامر (Prompts)، إعداد المذكرات والملخصات والأنشطة', tools: ['ChatGPT', 'Claude', 'Gemini'] },
  { title: 'الدروس التفاعلية', text: 'تحويل الدرس إلى تجربة تعلّم نشطة وممتعة', tools: ['Genially', 'Canva'] },
  { title: 'توليد الصور والفيديوهات', text: 'إنتاج وسائط تعليمية بالذكاء الاصطناعي', tools: ['Google Flow', 'Super Grok'] },
  { title: 'العروض التقديمية الذكية', text: 'تصميم عروض تفاعلية بسرعة واحترافية', tools: ['Gamma', 'NotebookLM', 'Manus'] },
  { title: 'القصص والألعاب التعليمية', text: 'التلعيب، القصص الرقمية، الألعاب الصفية', tools: ['Wordwall', 'Canva'] },
  { title: 'الاختبارات الإلكترونية', text: 'بناء الاختبارات والتصحيح الآلي أونلاين', tools: ['Google Forms', 'Brisk', 'Canva'] },
  { title: 'الخرائط الذهنية والدعائم البصرية', text: 'تنظيم المعارف بصريًا', tools: ['Napkin', 'Canva'] },
]

export default function Axes() {
  return (
    <section className="purple-bg" id="axes">
      <div className="container">
        <Reveal className="section-head">
          <h2>
            <span className="hl">7 محاور</span> تطبيقية
          </h2>
          <p>كل محور ورشة عملية على أدوات حقيقية تستعملها في قسمك من الغد.</p>
        </Reveal>

        <div className="axes">
          {axes.map((a, i) => (
            <motion.article
              key={a.title}
              className="axis"
              initial={{ opacity: 0, y: 50, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16, delay: (i % 3) * 0.08 }}
            >
              <span className="axis-num">المحور {i + 1}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <div className="axis-tools" dir="ltr">
                {a.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
