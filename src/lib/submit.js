import { FORM_ENDPOINT } from '../config'

// Readable field names, so the emails FormBold sends are easy to read
const LABELS = {
  group: 'الفوج',
  fullName: 'الاسم الكامل',
  phone: 'رقم الهاتف (واتساب)',
  email: 'البريد الإلكتروني (Gmail)',
  wilaya: 'الولاية',
  profile: 'الصفة',
  institution: 'المؤسسة / المادة المدرّسة',
  level: 'المستوى في استخدام الحاسوب',
  laptop: 'يحضر حاسوبًا محمولًا',
  notes: 'ملاحظات',
  consent: 'موافقة على التواصل',
  payment: 'طريقة الدفع',
}

// Sends a registration as JSON to FormBold (or VITE_FORM_ENDPOINT).
// Without an endpoint the form runs in demo mode.
export async function submitRegistration(data) {
  const payload = {}
  for (const [key, label] of Object.entries(LABELS)) {
    const value = data[key]
    if (value === undefined || value === '') continue
    payload[label] = typeof value === 'boolean' ? (value ? 'نعم' : 'لا') : value
  }
  payload['الدورة'] = 'الأستاذ الرقمي: الذكاء الاصطناعي في التعليم — الطبعة الثانية'
  payload['تاريخ الإرسال'] = new Date().toISOString()
  payload['المصدر'] = 'صفحة دورة الأستاذ الرقمي - الجزائر العاصمة'
  // Honeypot: bots fill hidden fields, people don't
  if (data.website) return

  if (!FORM_ENDPOINT) {
    console.info('[demo] No form endpoint set; registration not sent:', payload)
    await new Promise((r) => setTimeout(r, 900))
    return
  }

  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
}
