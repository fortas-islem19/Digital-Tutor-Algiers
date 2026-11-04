import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { submitRegistration } from '../lib/submit'
import { normalizePhone, validate } from '../lib/validate'
import { WILAYAS } from '../lib/wilayas'
import { COURSE, PHONES, PRICE, VENUE, formatDA } from '../config'
import { PhoneIcon } from './Icons'
import { Reveal } from './Motion'

const initial = {
  fullName: '',
  phone: '',
  email: '',
  wilaya: '',
  profile: '',
  institution: '',
  level: '',
  laptop: '',
  notes: '',
  consent: false,
  website: '', // honeypot
}

const PROFILES = ['أستاذ ابتدائي', 'أستاذ متوسط', 'أستاذ ثانوي', 'أستاذ جامعي', 'طالب دكتوراه', 'مكوّن / تكوين مهني', 'أخرى']
const LEVELS = ['مبتدئ', 'متوسط', 'متقدم']
const LAPTOP = ['نعم', 'لا، أحتاج حلًا']
const NOTES_MAX = 500

function Field({ label, name, error, required, full, hint, children }) {
  return (
    <div className={`field${full ? ' full' : ''}${error ? ' invalid' : ''}`}>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span className="req">*</span>}
        </label>
      )}
      {children}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.span key="err" id={`${name}-err`} className="err" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert">
            {error}
          </motion.span>
        ) : (
          hint && (
            <motion.span key="hint" className="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {hint}
            </motion.span>
          )
        )}
      </AnimatePresence>
    </div>
  )
}

function Choices({ name, options, value, onChange, error }) {
  return (
    <div className="choice-row" role="radiogroup" id={name} tabIndex={-1} aria-invalid={!!error} aria-describedby={error ? `${name}-err` : undefined}>
      {options.map((o) => (
        <label key={o} className="choice">
          <input type="radio" name={name} value={o} checked={value === o} onChange={onChange} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  )
}

function Success({ name, onReset }) {
  return (
    <motion.div className="success" key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
      <svg className="tick" viewBox="0 0 100 100" aria-hidden="true">
        <motion.circle cx="50" cy="50" r="44" fill="none" stroke="#22c55e" strokeWidth="7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
        <motion.path
          d="M30 52 L45 66 L71 37"
          fill="none"
          stroke="#22c55e"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        />
      </svg>
      {Array.from({ length: 14 }, (_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '22%',
            left: '50%',
            width: 10,
            height: 10,
            borderRadius: i % 2 ? 2 : '50%',
            background: ['#fcd31c', '#8a0bd6', '#dc240c', '#22c55e'][i % 4],
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: Math.cos((i / 14) * Math.PI * 2) * 140, y: Math.sin((i / 14) * Math.PI * 2) * 110, opacity: 0, rotate: 180 }}
          transition={{ duration: 1.1, delay: 0.6, ease: 'easeOut' }}
        />
      ))}
      <h3>
        شكرًا <bdi>{name.trim().split(' ')[0]}</bdi>!
      </h3>
      <p>تم استلام طلب تسجيلك في دورة «الأستاذ الرقمي». سيتصل بك فريق السبورة قريبًا لتأكيد مقعدك وطريقة الدفع.</p>
      <button type="button" className="btn btn-ghost" style={{ marginTop: 12 }} onClick={onReset}>
        تسجيل شخص آخر
      </button>
    </motion.div>
  )
}

export default function RegisterForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [state, setState] = useState('idle') // idle | sending | done | error

  // Show a field's error once it has been left, or after the first submit attempt
  const visible = (name) => (touched[name] || submitted ? errors[name] : undefined)

  const update = (name, value) => {
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name] || submitted) setErrors(validate(next))
  }

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    update(name, type === 'checkbox' ? checked : value)
    // Radio groups and checkboxes count as touched as soon as they're picked
    if (type === 'radio' || type === 'checkbox') {
      setTouched((t) => ({ ...t, [name]: true }))
      setErrors(validate({ ...values, [name]: type === 'checkbox' ? checked : value }))
    }
  }

  const onBlur = (e) => {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(values))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (state === 'sending') return
    setSubmitted(true)
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      const el = document.getElementById(first)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el?.focus({ preventScroll: true })
      return
    }
    setState('sending')
    try {
      await submitRegistration({
        ...values,
        fullName: values.fullName.trim().replace(/\s+/g, ' '),
        email: values.email.trim().toLowerCase(),
        phone: normalizePhone(values.phone),
      })
      // Meta Pixel: runs only after FormBold has accepted the registration,
      // and counts it as a Purchase, the same event as the China page
      window.fbq?.('track', 'Purchase', {
        value: PRICE,
        currency: 'DZD',
        content_name: 'دورة الأستاذ الرقمي - السبورة',
        content_category: values.profile,
      })
      setState('done')
    } catch (err) {
      console.error(err)
      setState('error')
    }
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setTouched({})
    setSubmitted(false)
    setState('idle')
  }

  const gmailHint =
    values.email && !errors.email && !/@gmail\.com$/i.test(values.email.trim())
      ? 'ننصح ببريد Gmail لأنه ضروري لتفعيل حسابات المنصات خلال الدورة'
      : undefined

  const aria = (name) => ({ 'aria-invalid': !!visible(name), 'aria-describedby': visible(name) ? `${name}-err` : undefined })

  return (
    <section className="form-section" id="register">
      <div className="container form-wrap">
        <Reveal className="form-aside">
          <span className="pill pill-yellow">{COURSE.edition}</span>
          <h2 style={{ marginTop: 18 }}>
            احجز <span className="hl">مقعدك</span> الآن
          </h2>
          <p>املأ الاستمارة وسيتواصل معك فريق السبورة لتأكيد التسجيل وطريقة الدفع.</p>
          <ul>
            {[
              `${COURSE.dates} — ${COURSE.hours}`,
              `${VENUE.name}، الجزائر العاصمة`,
              `${COURSE.totalHours} ساعة تكوين تطبيقي + شهادة`,
              `${formatDA(PRICE)} فقط — هدايا واشتراكات مجانية`,
              `${COURSE.seats} مقعدًا فقط`,
            ].map((t, i) => (
              <motion.li key={t} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
                <b>✓</b>
                {t}
              </motion.li>
            ))}
          </ul>
          <div className="aside-contact">
            <p>للاستفسار اتصل بمدرسة السبورة:</p>
            {PHONES.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="aside-phone">
                <PhoneIcon width={20} height={20} />
                <span dir="ltr">{p.display}</span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="form-card">
          <AnimatePresence mode="wait">
            {state === 'done' ? (
              <Success name={values.fullName} onReset={reset} />
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, y: -20 }} aria-label="استمارة التسجيل في دورة الأستاذ الرقمي">
                <div className="form-grid">
                  <Field label="الاسم واللقب" name="fullName" error={visible('fullName')} required full>
                    <input id="fullName" name="fullName" value={values.fullName} onChange={onChange} onBlur={onBlur} autoComplete="name" maxLength={60} placeholder="مثال: أمينة بن علي" {...aria('fullName')} />
                  </Field>

                  <Field label="رقم الهاتف (واتساب)" name="phone" error={visible('phone')} required>
                    <input id="phone" name="phone" type="tel" inputMode="tel" dir="ltr" value={values.phone} onChange={onChange} onBlur={onBlur} autoComplete="tel" maxLength={18} placeholder="06 61 23 45 67" {...aria('phone')} />
                  </Field>

                  <Field label="البريد الإلكتروني" name="email" error={visible('email')} required hint={gmailHint}>
                    <input id="email" name="email" type="email" dir="ltr" value={values.email} onChange={onChange} onBlur={onBlur} autoComplete="email" maxLength={80} placeholder="name@gmail.com" {...aria('email')} />
                  </Field>

                  <Field label="الولاية" name="wilaya" error={visible('wilaya')} required>
                    <select id="wilaya" name="wilaya" value={values.wilaya} onChange={onChange} onBlur={onBlur} {...aria('wilaya')}>
                      <option value="">اختر الولاية</option>
                      {WILAYAS.map((w, i) => (
                        <option key={w} value={w}>
                          {String(i + 1).padStart(2, '0')} - {w}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="المؤسسة / المادة المدرّسة" name="institution" error={visible('institution')}>
                    <input id="institution" name="institution" value={values.institution} onChange={onChange} onBlur={onBlur} maxLength={120} placeholder="مثال: ثانوية الأمير عبد القادر — رياضيات" {...aria('institution')} />
                  </Field>

                  <Field label="الصفة" name="profile" error={visible('profile')} required full>
                    <Choices name="profile" options={PROFILES} value={values.profile} onChange={onChange} error={visible('profile')} />
                  </Field>

                  <Field label="مستواك في استخدام الحاسوب" name="level" error={visible('level')} required full>
                    <Choices name="level" options={LEVELS} value={values.level} onChange={onChange} error={visible('level')} />
                  </Field>

                  <Field label="هل ستحضر حاسوبًا محمولًا؟" name="laptop" error={visible('laptop')} required full>
                    <Choices name="laptop" options={LAPTOP} value={values.laptop} onChange={onChange} error={visible('laptop')} />
                  </Field>

                  <Field label="ملاحظات أو أسئلة" name="notes" error={visible('notes')} full hint={`${values.notes.length} / ${NOTES_MAX}`}>
                    <textarea id="notes" name="notes" value={values.notes} onChange={onChange} onBlur={onBlur} maxLength={NOTES_MAX} placeholder="اكتب أي سؤال تريد طرحه..." {...aria('notes')} />
                  </Field>

                  {/* Honeypot: hidden from people, bots fill it in */}
                  <input type="text" name="website" value={values.website} onChange={onChange} tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

                  <Field label="" name="consent" error={visible('consent')} full>
                    <label className="choice-consent">
                      <input id="consent" name="consent" type="checkbox" checked={values.consent} onChange={onChange} {...aria('consent')} />
                      أوافق على أن يتواصل معي فريق السبورة بخصوص الدورة
                    </label>
                  </Field>
                </div>

                <motion.button type="submit" className="btn btn-yellow" disabled={state === 'sending'} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  {state === 'sending' ? (
                    <>
                      <span className="spinner" /> جارٍ الإرسال...
                    </>
                  ) : (
                    'أرسل طلب التسجيل'
                  )}
                </motion.button>

                {submitted && Object.keys(errors).length > 0 && (
                  <motion.div className="form-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="alert">
                    يرجى تصحيح الحقول المؤشّر عليها بالأحمر ({Object.keys(errors).length}).
                  </motion.div>
                )}
                {state === 'error' && (
                  <motion.div className="form-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="alert">
                    تعذّر إرسال الطلب، يرجى المحاولة مرة أخرى أو الاتصال بنا هاتفيًا.
                  </motion.div>
                )}
                <p className="form-note">المقاعد محدودة — الأولوية حسب ترتيب التسجيل.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
