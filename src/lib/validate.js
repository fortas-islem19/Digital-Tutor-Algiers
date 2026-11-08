// Registration form validation. Kept separate from the component so it can be tested on its own.

// Algerian mobile: 05/06/07 + 8 digits, written as 0XXXXXXXXX, +213XXXXXXXXX or 00213XXXXXXXXX
export function normalizePhone(raw) {
  const digits = raw.replace(/[\s.\-()]/g, '')
  const m = digits.match(/^(?:\+213|00213|0)([567]\d{8})$/)
  return m ? `0${m[1]}` : null
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
// Letters (Arabic or Latin), spaces, apostrophes and hyphens only
const NAME = /^[\p{L}\s'’-]+$/u

export function validate(v) {
  const e = {}
  const name = v.fullName.trim().replace(/\s+/g, ' ')
  if (!name) e.fullName = 'يرجى إدخال الاسم الكامل'
  else if (!NAME.test(name)) e.fullName = 'يجب أن يحتوي الاسم على حروف فقط'
  else if (name.split(' ').length < 2 || name.length < 5) e.fullName = 'يرجى كتابة الاسم واللقب معًا'
  else if (name.length > 60) e.fullName = 'الاسم طويل جدًا'

  if (!v.phone.trim()) e.phone = 'يرجى إدخال رقم الهاتف'
  else if (!normalizePhone(v.phone)) e.phone = 'رقم غير صالح — مثال: 0661 23 45 67'

  const email = v.email.trim()
  if (!email) e.email = 'يرجى إدخال البريد الإلكتروني'
  else if (!EMAIL.test(email)) e.email = 'بريد إلكتروني غير صالح'

  if (!v.wilaya) e.wilaya = 'يرجى اختيار الولاية'
  if (!v.profile) e.profile = 'يرجى اختيار الصفة'
  if (v.institution.trim().length > 120) e.institution = 'النص طويل جدًا'
  if (!v.level) e.level = 'يرجى اختيار المستوى'
  if (!v.laptop) e.laptop = 'يرجى الإجابة'
  if (v.notes.length > 500) e.notes = 'الحد الأقصى 500 حرف'
  if ('group' in v && !v.group) e.group = 'يرجى اختيار الفوج'
  if (!v.consent) e.consent = 'يجب الموافقة للمتابعة'
  return e
}
