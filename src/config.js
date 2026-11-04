// FormBold form ID: Dashboard → your form → Settings → Integration (the part after formbold.com/s/).
// Currently the same form as the China page; every submission carries a "المصدر" field so the two are easy to tell apart.
// VITE_FORM_ENDPOINT in .env overrides this if you switch to another service.
export const FORMBOLD_FORM_ID = '9m52W'

export const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || (FORMBOLD_FORM_ID ? `https://formbold.com/s/${FORMBOLD_FORM_ID}` : '')

// Course details from the technical card (البطاقة التقنية — دورة الأستاذ الرقمي)
export const COURSE = {
  title: 'الأستاذ الرقمي',
  subtitle: 'الذكاء الاصطناعي في التعليم',
  edition: 'الطبعة الثانية',
  dates: '20 – 21 نوفمبر 2026',
  days: [
    { label: 'اليوم الأول', date: 'الجمعة 20 نوفمبر 2026', theme: 'المحتوى والوسائط' },
    { label: 'اليوم الثاني', date: 'السبت 21 نوفمبر 2026', theme: 'التلعيب والتقويم' },
  ],
  hours: 'من 08:30 إلى 16:00',
  totalHours: 12,
  seats: 14,
  trainer: 'أ.د. عبد الفتاح تباني',
  trainerRole: 'أستاذ محاضر بجامعة سطيف 1، مدرب في تكنولوجيا المعلومات والتحول الرقمي',
}

export const PRICE = 18000
export const OLD_PRICE = 22000

// Seats already booked, shown in the seat grid. Update it as registrations come in.
export const SEATS_TAKEN = 9

export const VENUE = {
  name: 'Coffice — المحمدية مول',
  address: 'الطابق الرابع، المحمدية مول، الجزائر العاصمة',
  mapsLink: 'https://maps.app.goo.gl/xBhGSYecopaUqaes6?g_st=ac',
  // Embedded map (no API key needed). Replace the query with exact coordinates if the pin is off.
  embed: 'https://maps.google.com/maps?q=Coffice%20Mohammadia%20Mall%2C%20Alger&z=16&output=embed',
}

export const formatDA = (n) => `${n.toLocaleString('en-US')} دج`

// Esaboura school phone numbers
export const PHONES = [
  { display: '0676 10 13 71', tel: '+213676101371' },
  { display: '0561 46 84 57', tel: '+213561468457' },
]
