import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { submitRegistration } from '../lib/submit'
import { normalizePhone, validate } from '../lib/validate'
import { WILAYAS } from '../lib/wilayas'
import { COURSE, PHONES, PRICE, VENUE, formatDA } from '../config'
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
    <section className="sec sec-form" id="register">
      <div className="wrap narrow">
        <Reveal className="sec-title">
          <span className="kicker">التسجيل</span>
          <h2>احجز مقعدك الآن</h2>
          <p>
            املأ الاستمارة في أقل من دقيقة، وسيتصل بك فريق السبورة لتأكيد مقعدك وطريقة الدفع. عدد المقاعد {COURSE.seats} فقط، والأولوية حسب ترتيب التسجيل.
          </p>
        </Reveal>

        <Reveal className="form-box">
          <div className="form-summary">
            <span>
              <b>{COURSE.dates}</b>
            </span>
            <span>{VENUE.name}</span>
            <span>
              <b>{formatDA(PRICE)}</b>
            </span>
          </div>

          <AnimatePresence mode="wait">
            {state === 'done' ? (
              <Success name={values.fullName} onReset={reset} />
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, y: -20 }} aria-label="استمارة التسجيل في دورة الأستاذ الرقمي">
                <fieldset>
                  <legend>
                    <span>1</span> معلوماتك
                  </legend>
                  <div className="form-grid">
                    <Field label="الاسم واللقب" name="fullName" error={visible('fullName')} required full>
                      <input id="fullName" name="fullName" value={values.fullName} onChange={onChange} onBlur={onBlur} autoComplete="name" maxLength={60} placeholder="مثال: أمينة بن علي" {...aria('fullName')} />
                    </Field>
                    <Field label="رقم الهاتف (واتساب)" name="phone" error={visible('phone')} required>
                      <input id="phone" name="phone" type="tel" inputMode="tel" dir="ltr" value={values.phone} onChange={onChange} onBlur={onBlur} autoComplete="tel" maxLength={18} placeholder="0661 23 45 67" {...aria('phone')} />
                    </Field>
                    <Field label="البريد الإلكتروني" name="email" error={visible('email')} required hint={gmailHint}>
                      <input id="email" name="email" type="email" dir="ltr" value={values.email} onChange={onChange} onBlur={onBlur} autoComplete="email" maxLength={80} placeholder="name@gmail.com" {...aria('email')} />
                    </Field>
                    <Field label="الولاية" name="wilaya" error={visible('wilaya')} required full>
                      <select id="wilaya" name="wilaya" value={values.wilaya} onChange={onChange} onBlur={onBlur} {...aria('wilaya')}>
                        <option value="">اختر ولايتك</option>
                        {WILAYAS.map((w, i) => (
                          <option key={w} value={w}>
                            {String(i + 1).padStart(2, '0')} - {w}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>
                    <span>2</span> ملفك المهني
                  </legend>
                  <div className="form-grid">
                    <Field label="الصفة" name="profile" error={visible('profile')} required full>
                      <Choices name="profile" options={PROFILES} value={values.profile} onChange={onChange} error={visible('profile')} />
                    </Field>
                    <Field label="المؤسسة أو المادة التي تدرّسها" name="institution" error={visible('institution')} full>
                      <input id="institution" name="institution" value={values.institution} onChange={onChange} onBlur={onBlur} maxLength={120} placeholder="مثال: ثانوية الأمير عبد القادر، رياضيات" {...aria('institution')} />
                    </Field>
                    <Field label="مستواك في استخدام الحاسوب" name="level" error={visible('level')} required full>
                      <Choices name="level" options={LEVELS} value={values.level} onChange={onChange} error={visible('level')} />
                    </Field>
                    <Field label="هل ستحضر حاسوبًا محمولًا؟" name="laptop" error={visible('laptop')} required full>
                      <Choices name="laptop" options={LAPTOP} value={values.laptop} onChange={onChange} error={visible('laptop')} />
                    </Field>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>
                    <span>3</span> التأكيد
                  </legend>
                  <div className="form-grid">
                    <Field label="ملاحظات أو أسئلة (اختياري)" name="notes" error={visible('notes')} full hint={`${values.notes.length} / ${NOTES_MAX} حرف`}>
                      <textarea id="notes" name="notes" value={values.notes} onChange={onChange} onBlur={onBlur} maxLength={NOTES_MAX} placeholder="اكتب أي سؤال تريد طرحه" {...aria('notes')} />
                    </Field>

                    {/* Honeypot: hidden from people, bots fill it in */}
                    <input type="text" name="website" value={values.website} onChange={onChange} tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

                    <Field label="" name="consent" error={visible('consent')} full>
                      <label className="consent">
                        <input id="consent" name="consent" type="checkbox" checked={values.consent} onChange={onChange} {...aria('consent')} />
                        <span>أوافق على أن يتصل بي فريق السبورة بخصوص الدورة</span>
                      </label>
                    </Field>
                  </div>
                </fieldset>

                {submitted && Object.keys(errors).length > 0 && (
                  <div className="form-error" role="alert">
                    يرجى تصحيح الحقول المشار إليها باللون الأحمر ({Object.keys(errors).length}).
                  </div>
                )}
                {state === 'error' && (
                  <div className="form-error" role="alert">
                    تعذّر إرسال الطلب. حاول مرة أخرى أو اتصل بنا على <span dir="ltr">{PHONES[0].display}</span>.
                  </div>
                )}

                <button type="submit" className="btn btn-yellow btn-lg btn-block" disabled={state === 'sending'}>
                  {state === 'sending' ? (
                    <>
                      <span className="spinner" /> جارٍ الإرسال...
                    </>
                  ) : (
                    'أرسل طلب التسجيل'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
