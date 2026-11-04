import { motion } from 'framer-motion'
import { spring } from './Motion'
import { COURSE, OLD_PRICE, PRICE, formatDA } from '../config'

const headline = ['الذكاء', 'الاصطناعي', 'في', 'التعليم']

// Tools taught in the course, orbiting the screen in the hero visual
const tools = [
  { name: 'ChatGPT', top: '4%', right: '6%' },
  { name: 'Gemini', top: '20%', left: '-4%' },
  { name: 'Canva', bottom: '20%', right: '-6%' },
  { name: 'NotebookLM', bottom: '2%', left: '8%' },
  { name: 'Gamma', top: '48%', right: '-10%' },
  { name: 'Wordwall', top: '56%', left: '-10%' },
]

export default function Hero() {
  return (
    <section className="hero purple-bg" id="top">
      <div className="container hero-grid">
        <div>
          <motion.span
            className="pill pill-purple"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
          >
            {COURSE.edition} — تكوين حضوري بالجزائر العاصمة
          </motion.span>

          <motion.div
            className="hero-title"
            initial={{ opacity: 0, scale: 1.3, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...spring, delay: 0.25 }}
          >
            {COURSE.title}
          </motion.div>

          <h1>
            {headline.map((w, i) => (
              <motion.span
                key={w}
                className={`word${w === 'الاصطناعي' ? ' hl' : ''}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
            يومان من التكوين التطبيقي لتوظيف أحدث أدوات الذكاء الاصطناعي في التخطيط والتدريس والتقويم — وتوفير وقتك وجهدك كأستاذ.
          </motion.p>

          <motion.div
            className="hero-chips"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.4 } } }}
          >
            {[
              { cls: 'pill-red', text: COURSE.dates },
              { cls: 'pill-white', text: `${COURSE.totalHours} ساعة تكوينية` },
              { cls: 'pill-yellow', text: `${formatDA(PRICE)} بدلًا من ${formatDA(OLD_PRICE)}` },
              { cls: 'pill-white', text: `${COURSE.seats} مقعدًا فقط` },
            ].map((c) => (
              <motion.span
                key={c.text}
                className={`pill ${c.cls}`}
                variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: spring } }}
              >
                {c.text}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}>
            <a href="#register" className="btn btn-yellow">
              احجز مقعدك الآن
            </a>
            <a href="#program" className="btn btn-ghost">
              البرنامج
            </a>
          </motion.div>
        </div>

        <motion.div
          className="screen-wrap"
          initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="screen"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="screen-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="screen-body">
              <span className="ai-badge">AI</span>
              <div className="prompt">
                <span className="prompt-label">Prompt</span>
                <motion.span
                  className="prompt-text"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.4, delay: 1.2, ease: 'linear' }}
                >
                  حضّر لي درسًا تفاعليًا حول دورة الماء…
                </motion.span>
              </div>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="line"
                  style={{ width: `${90 - i * 18}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 3.6 + i * 0.25, duration: 0.5 }}
                />
              ))}
            </div>
          </motion.div>

          {tools.map((t, i) => {
            const { name, ...pos } = t
            return (
              <motion.span
                key={name}
                className="floating-tag pill pill-white tool-chip"
                style={pos}
                dir="ltr"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{
                  scale: { ...spring, delay: 1.2 + i * 0.15 },
                  opacity: { delay: 1.2 + i * 0.15 },
                  y: { duration: 3 + (i % 3), repeat: Infinity, delay: 2 + i * 0.2 },
                }}
              >
                {name}
              </motion.span>
            )
          })}
        </motion.div>
      </div>

      <motion.a href="#about" className="scroll-hint" aria-label="انزل للأسفل" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
        <motion.span animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
      </motion.a>
    </section>
  )
}
