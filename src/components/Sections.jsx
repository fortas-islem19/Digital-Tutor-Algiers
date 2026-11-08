import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logoWhite from '../assets/logo-mark-white.png'
import logoFull from '../assets/logo-full-purple.png'
import { COURSE, GROUPS, OLD_PRICE, OPEN_GROUPS, PHONES, PRICE, VENUE, formatDA, seatsLeft, seatsText } from '../config'
import { AUDIENCE, AXES, FAQ, GEMINI, OUTPUTS, RECORDED, REQUIREMENTS, SCHEDULE, TOOL_GIFTS } from '../data'
import { CalendarIcon, CameraIcon, CapIcon, CheckIcon, ClockIcon, GiftIcon, PhoneIcon, PinIcon, PlayIcon, UsersIcon } from './Icons'
import { Reveal } from './Motion'

const openDates = OPEN_GROUPS.map((g) => g.dates.replace(' 2026', '')).join(' أو ')
// Compact form for tight spots, e.g. "3 – 4 أو 5 – 6 ديسمبر"
const shortDates = openDates.replace(/ ديسمبر أو /g, ' أو ')

// Lets any "register in this group" button pre-select the group in the form
export function pickGroup(id) {
  window.dispatchEvent(new CustomEvent('pick-group', { detail: id }))
  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function SectionTitle({ kicker, title, text }) {
  return (
    <Reveal className="sec-title">
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}

/* ---------- Header ---------- */
const NAV = [
  ['#groups', 'الأفواج'],
  ['#learn', 'ماذا ستتعلم'],
  ['#program', 'البرنامج'],
  ['#gifts', 'الهدايا'],
  ['#where', 'المكان'],
  ['#faq', 'أسئلة'],
]

export function Header() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 20)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`top${solid ? ' solid' : ''}`}>
      <div className="wrap top-inner">
        <a href="#top" className="logo" aria-label="السبورة">
          <img src={logoWhite} alt="" />
          <span>السبورة</span>
        </a>
        <nav className="top-nav">
          {NAV.map(([h, l]) => (
            <a key={h} href={h}>
              {l}
            </a>
          ))}
        </nav>
        <a href="#register" className="btn btn-yellow btn-sm">
          سجّل الآن
        </a>
      </div>
    </header>
  )
}

/* ---------- Hero ---------- */
function Countdown() {
  const [now, setNow] = useState(() => Date.now())
  const next = OPEN_GROUPS.find((g) => new Date(g.startsAt).getTime() > now)
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(id)
  }, [])
  if (!next) return null
  const diff = new Date(next.startsAt).getTime() - now
  const d = Math.floor(diff / 864e5)
  const h = Math.floor((diff % 864e5) / 36e5)
  const m = Math.floor((diff % 36e5) / 6e4)
  return (
    <div className="countdown" aria-label={`يبدأ ${next.name} بعد ${d} يوم و${h} ساعة`}>
      <span className="cd-label">يبدأ {next.name} بعد</span>
      {[
        [d, 'يوم'],
        [h, 'ساعة'],
        [m, 'دقيقة'],
      ].map(([v, l]) => (
        <span key={l} className="cd-box">
          <b>{v}</b>
          <small>{l}</small>
        </span>
      ))}
    </div>
  )
}

export function Hero() {
  const facts = [
    [CalendarIcon, 'الأفواج المفتوحة', `${openDates} 2026`],
    [ClockIcon, 'التوقيت', COURSE.hours],
    [PinIcon, 'المكان', 'Coffice، المحمدية مول'],
    [UsersIcon, 'المقاعد', `${COURSE.seats} مقعدًا لكل فوج`],
  ]
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <motion.span className="tag" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          {COURSE.edition} · تكوين حضوري بالجزائر العاصمة
        </motion.span>
        <motion.p className="hero-notice" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          اكتمل الفوج الأول، وفتحنا فوجين جديدين: {openDates.replace(' أو ', ' و')}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          دورة <span className="mark">الأستاذ الرقمي</span>
        </motion.h1>
        <motion.p className="hero-lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          الذكاء الاصطناعي في التعليم: يومان من التكوين التطبيقي لتستعمل أحدث الأدوات في التخطيط والتدريس والتقويم، وتوفّر وقتك وجهدك.
        </motion.p>
        <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <a href="#register" className="btn btn-yellow btn-lg">
            احجز مقعدك بـ {formatDA(PRICE)}
          </a>
          <span className="was">
            بدلًا من <s>{formatDA(OLD_PRICE)}</s>
          </span>
        </motion.div>
        <Countdown />
      </div>

      <div className="wrap">
        <motion.ul className="facts" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          {facts.map(([Icon, label, value]) => (
            <li key={label}>
              <Icon width={26} height={26} />
              <div>
                <small>{label}</small>
                <b>{value}</b>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* ---------- Groups ---------- */
export function Groups() {
  return (
    <section className="sec groups-sec" id="groups">
      <div className="wrap">
        <SectionTitle kicker="الأفواج" title="اختر الفوج الذي يناسبك" text={`نفس البرنامج والمدرّب والمكان في كل فوج، ${COURSE.hours}. ${COURSE.seats} مقعدًا لكل فوج.`} />
        <div className="groups">
          {GROUPS.map((g, i) => {
            return (
              <Reveal key={g.id} delay={i * 0.08} className={`group${g.full ? ' is-full' : ''}`}>
                <div className="group-head">
                  <h3>{g.name}</h3>
                  <span className={`status ${g.full ? 'closed' : 'open'}`}>{g.full ? 'مكتمل' : 'التسجيل مفتوح'}</span>
                </div>
                <p className="group-dates">{g.dates}</p>
                <ul className="group-days">
                  {g.days.map((d, k) => (
                    <li key={d}>
                      <b>{COURSE.days[k].label}:</b> {d}
                    </li>
                  ))}
                </ul>
                {g.full ? (
                  <p className="group-closed">أُغلق التسجيل في هذا الفوج.</p>
                ) : (
                  <>
                    <p className="group-seats">
                      المقاعد: <b>{seatsText(g)}</b>
                    </p>
                    <button type="button" className="btn btn-yellow btn-block" onClick={() => pickGroup(g.id)}>
                      سجّل في {g.name}
                    </button>
                  </>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Tools strip ---------- */
const ALL_TOOLS = ['ChatGPT', 'Gemini', 'Claude', 'Canva', 'Genially', 'NotebookLM', 'Gamma', 'Manus', 'Google Flow', 'Wordwall', 'Google Forms', 'Brisk', 'Napkin']

export function ToolsStrip() {
  return (
    <section className="tools-strip" aria-label="الأدوات التي ستتعلمها">
      <div className="wrap">
        <p>أكثر من 13 أداة ستتعلم استعمالها:</p>
        <ul dir="ltr">
          {ALL_TOOLS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- What you'll learn (interactive axes) ---------- */
export function Learn() {
  const [active, setActive] = useState(0)
  const panel = useRef(null)
  const a = AXES[active]
  // On phones the details sit under the list, so bring them into view after a tap
  const pick = (i) => {
    setActive(i)
    if (window.innerWidth < 860) setTimeout(() => panel.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
  }
  return (
    <section className="sec" id="learn">
      <div className="wrap">
        <SectionTitle
          kicker="محاور الدورة"
          title="ماذا ستتعلم خلال يومين؟"
          text="7 محاور تطبيقية، كل محور ورشة على أدوات تستعملها في قسمك من الغد. اختر محورًا لترى تفاصيله."
        />
        <div className="learn">
          <ol className="learn-list" role="tablist" aria-label="محاور الدورة">
            {AXES.map((x, i) => (
              <li key={x.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={i === active ? 'on' : ''}
                  onClick={() => pick(i)}
                >
                  <span className="n">{i + 1}</span>
                  {x.title}
                </button>
              </li>
            ))}
          </ol>
          <div className="learn-panel" role="tabpanel" ref={panel}>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }}>
                <span className="panel-n">المحور {active + 1}</span>
                <h3>{a.title}</h3>
                <p className="panel-content">{a.content}</p>
                <div className="panel-goal">
                  <CheckIcon width={22} height={22} />
                  <p>
                    <b>في النهاية ستكون قادرًا على:</b> {a.goal}
                  </p>
                </div>
                <div className="panel-tools">
                  <span>الأدوات:</span>
                  {a.tools.map((t) => (
                    <b key={t} dir="ltr">
                      {t}
                    </b>
                  ))}
                </div>
                <p className="panel-when">
                  <ClockIcon width={18} height={18} /> {a.when}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Reveal className="method">
          <div className="method-bar" role="img" aria-label="70% ممارسة و30% عرض نظري">
            <span className="practice">70% ممارسة</span>
            <span className="theory">30% نظري</span>
          </div>
          <p>ورشات عمل فردية وجماعية وأمثلة من الواقع الصفي، وتختم الدورة بمشروع: درس رقمي متكامل من إنجازك.</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Programme (tabs) ---------- */
export function Program() {
  const [day, setDay] = useState(0)
  return (
    <section className="sec sec-tint" id="program">
      <div className="wrap">
        <SectionTitle kicker="البرنامج الزمني" title="يومان، 12 ساعة تكوين" text={`نفس البرنامج في كل الأفواج: 6 ساعات في اليوم، ${COURSE.hours}، مع استراحة قهوة.`} />
        <div className="day-tabs" role="tablist">
          {COURSE.days.map((d, i) => (
            <button key={d.label} type="button" role="tab" aria-selected={day === i} className={day === i ? 'on' : ''} onClick={() => setDay(i)}>
              <b>{d.label}</b>
              <span>{d.theme}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={day} className="timeline" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            <h3>{COURSE.days[day].theme}</h3>
            <ol>
              {SCHEDULE[day].map(([from, to, what, rest]) => (
                <li key={from} className={rest ? 'rest' : ''}>
                  <span className="time">
                    {from} ← {to}
                  </span>
                  <span className="what">{what}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ---------- Gallery ---------- */
const photos = Object.entries(import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' }))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src)

export function Gallery() {
  const [open, setOpen] = useState(null)
  useEffect(() => {
    if (open === null) return
    const k = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowLeft') setOpen((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowRight') setOpen((i) => (i - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  return (
    <section className="sec" id="gallery">
      <div className="wrap">
        <SectionTitle kicker="من الطبعات السابقة" title="صور من دوراتنا" text="أساتذة شاركوا في دورات «الأستاذ الرقمي» السابقة مع السبورة." />
        {photos.length ? (
          <div className="photos">
            {photos.map((src, i) => (
              <button type="button" key={src} onClick={() => setOpen(i)} aria-label={`تكبير الصورة ${i + 1}`}>
                <img src={src} alt={`من دورة الأستاذ الرقمي، صورة ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        ) : (
          <div className="photos-empty">
            <CameraIcon width={40} height={40} />
            <p>الصور قادمة قريبًا</p>
          </div>
        )}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <img src={photos[open]} alt="" onClick={(e) => e.stopPropagation()} />
            <button type="button" className="lb-close" aria-label="إغلاق" onClick={() => setOpen(null)}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ---------- Trainer + audience ---------- */
export function Trainer() {
  return (
    <section className="sec sec-tint" id="trainer">
      <div className="wrap split">
        <Reveal className="trainer">
          <span className="trainer-ico">
            <CapIcon width={40} height={40} />
          </span>
          <div>
            <span className="kicker">المدرّب</span>
            <h3>{COURSE.trainer}</h3>
            <p>{COURSE.trainerRole}</p>
            <p className="lang">لغة التكوين: العربية، مع المصطلحات التقنية بالإنجليزية والفرنسية.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="who">
          <h3>لمن هذه الدورة؟</h3>
          <ul className="ticks">
            {AUDIENCE.map((a) => (
              <li key={a}>
                <CheckIcon width={18} height={18} />
                {a}
              </li>
            ))}
          </ul>
          <h3>ماذا تحتاج؟</h3>
          <ul className="ticks ticks-alt">
            {REQUIREMENTS.map((a) => (
              <li key={a}>
                <CheckIcon width={18} height={18} />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Gifts ---------- */
export function Gifts() {
  return (
    <section className="sec" id="gifts">
      <div className="wrap">
        <SectionTitle kicker="مع التسجيل" title="هدايا الدورة" text="اشتراكات وأدوات تبقى معك بعد التكوين لتواصل العمل بها." />
        <div className="gifts">
          <Reveal className="gift-big">
            <span className="gift-badge">
              <GiftIcon width={20} height={20} /> الهدية الكبرى
            </span>
            <h3>
              اشتراك <span dir="ltr">Gemini</span>
            </h3>
            <table>
              <tbody>
                {GEMINI.map(([n, d]) => (
                  <tr key={n}>
                    <th dir="ltr">{n}</th>
                    <td>{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal delay={0.1} className="gift-table">
            <table>
              <thead>
                <tr>
                  <th>الأداة</th>
                  <th>الاستخدام</th>
                  <th>المدة</th>
                </tr>
              </thead>
              <tbody>
                {TOOL_GIFTS.map(([n, u, d]) => (
                  <tr key={n}>
                    <th dir="ltr">{n}</th>
                    <td>{u}</td>
                    <td>
                      <span className="dur">{d}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
        <div className="gifts-more">
          <Reveal className="box">
            <h3>
              <PlayIcon width={24} height={24} /> 3 دورات مسجّلة على منصة السبورة
            </h3>
            <ol>
              {RECORDED.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1} className="box">
            <h3>
              <CheckIcon width={24} height={24} /> ما تخرج به من الدورة
            </h3>
            <ul>
              {OUTPUTS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- Price ticket ---------- */
export function Ticket() {
  return (
    <section className="sec sec-dark" id="price">
      <div className="wrap ticket-wrap">
        <Reveal className="ticket">
          <div className="ticket-main">
            <span className="kicker kicker-light">رسوم المشاركة</span>
            <div className="ticket-price">
              <b>{PRICE.toLocaleString('en-US')}</b>
              <span>دج</span>
            </div>
            <p className="ticket-old">
              بدلًا من <s>{formatDA(OLD_PRICE)}</s>
            </p>
            <ul>
              <li>{COURSE.totalHours} ساعة تكوين حضوري تطبيقي</li>
              <li>كل الهدايا والاشتراكات المذكورة أعلاه</li>
              <li>شهادة مشاركة وحقيبة تكوينية رقمية</li>
            </ul>
          </div>
          <div className="ticket-side">
            <p className="seats-title">المقاعد في الأفواج المفتوحة</p>
            {OPEN_GROUPS.map((g) => {
              const left = seatsLeft(g)
              const pct = Math.round(((COURSE.seats - left) / COURSE.seats) * 100)
              return (
                <div key={g.id} className="seat-group">
                  <p className="seats-line">
                    <span>
                      {g.name} <small>({g.dates.replace(' 2026', '')})</small>
                    </span>
                    <b>{seatsText(g)}</b>
                  </p>
                  {g.seatsTaken > 0 && (
                  <div className="bar" role="img" aria-label={`${COURSE.seats - left} مقاعد محجوزة من ${COURSE.seats} في ${g.name}`}>
                    <motion.span initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1 }} />
                  </div>
                  )}
                </div>
              )
            })}
            <p className="seats-note">الأولوية حسب ترتيب التسجيل</p>
            <a href="#register" className="btn btn-yellow">
              سجّل الآن
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Location ---------- */
export function Location() {
  return (
    <section className="sec" id="where">
      <div className="wrap">
        <SectionTitle kicker="مكان الدورة" title="Coffice، المحمدية مول" text={VENUE.address} />
        <div className="where">
          <Reveal className="map">
            <iframe title="موقع الدورة على خرائط Google" src={VENUE.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </Reveal>
          <Reveal delay={0.1} className="where-info">
            <ul>
              <li>
                <PinIcon width={24} height={24} />
                <span>
                  <b>العنوان</b>
                  {VENUE.address}
                </span>
              </li>
              <li>
                <CalendarIcon width={24} height={24} />
                <span>
                  <b>الأفواج المفتوحة</b>
                  {OPEN_GROUPS.map((g) => `${g.name}: ${g.days.join(' و')}`).join('، ')}
                </span>
              </li>
              <li>
                <ClockIcon width={24} height={24} />
                <span>
                  <b>التوقيت</b>
                  {COURSE.hours}، والاستقبال ابتداءً من 08:30
                </span>
              </li>
            </ul>
            <a href={VENUE.mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-purple">
              <PinIcon width={20} height={20} /> افتح الموقع في Google Maps
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
export function Faq() {
  return (
    <section className="sec sec-tint" id="faq">
      <div className="wrap narrow">
        <SectionTitle kicker="أسئلة شائعة" title="قبل أن تسجّل" />
        <div className="faq">
          {FAQ.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <img src={logoFull} alt="السبورة" />
        <div>
          <p>
            <b>للاستفسار والتسجيل اتصل بالسبورة:</b>
          </p>
          <div className="phones">
            {PHONES.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`}>
                <PhoneIcon width={18} height={18} />
                <span dir="ltr">{p.display}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="copy">© {new Date().getFullYear()} السبورة. جميع الحقوق محفوظة.</p>
    </footer>
  )
}

/* ---------- Mobile sticky bar ---------- */
export function MobileBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => {
      const form = document.getElementById('register')
      const past = window.scrollY > 500
      const atForm = form && form.getBoundingClientRect().top < window.innerHeight
      setShow(past && !atForm)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="mbar" initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}>
          <div>
            <b>{formatDA(PRICE)}</b>
            <small>{OPEN_GROUPS.length === 1 ? OPEN_GROUPS[0].dates : shortDates}</small>
          </div>
          <a href="#register" className="btn btn-yellow">
            سجّل الآن
          </a>
          <a href={`tel:${PHONES[0].tel}`} className="mbar-call" aria-label="اتصل بنا">
            <PhoneIcon width={22} height={22} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
