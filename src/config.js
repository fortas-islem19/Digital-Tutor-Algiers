// FormBold form ID: Dashboard → your form → Settings → Integration (the part after formbold.com/s/).
// Digital Tutor's own form (the China page uses a separate one).
// VITE_FORM_ENDPOINT in .env overrides this if you switch to another service.
export const FORMBOLD_FORM_ID = '3Kqnp'

export const FORM_ENDPOINT =
  import.meta.env?.VITE_FORM_ENDPOINT || (FORMBOLD_FORM_ID ? `https://formbold.com/s/${FORMBOLD_FORM_ID}` : '')

// Course details from the technical card (البطاقة التقنية — دورة الأستاذ الرقمي)
export const COURSE = {
  title: 'الأستاذ الرقمي',
  subtitle: 'الذكاء الاصطناعي في التعليم',
  edition: 'الطبعة الثانية',
  // Short summary of the open groups' dates, used in the hero and form header
  dates: '3 – 6 ديسمبر 2026',
  // The two days of the programme (same for every group)
  days: [
    { label: 'اليوم الأول', theme: 'المحتوى والوسائط' },
    { label: 'اليوم الثاني', theme: 'التلعيب والتقويم' },
  ],
  hours: 'من 08:30 إلى 16:00',
  totalHours: 12,
  seats: 14, // per group
  trainer: 'أ.د. عبد الفتاح تباني',
  trainerRole: 'أستاذ محاضر بجامعة سطيف 1، مدرب في تكنولوجيا المعلومات والتحول الرقمي',
}

export const PRICE = 18000
export const OLD_PRICE = 22000

// Course groups (أفواج). Same programme, venue and price for every group.
// Set full: true to close registration for a group; seatsTaken drives the "seats left" counters.
// startsAt (Algiers time, UTC+1) is used by the countdown to the next open group.
export const GROUPS = [
  {
    id: 'g1',
    name: 'الفوج الأول',
    dates: '20 – 21 نوفمبر 2026',
    days: ['الجمعة 20 نوفمبر', 'السبت 21 نوفمبر'],
    startsAt: '2026-11-20T08:30:00+01:00',
    full: true,
    seatsTaken: 14,
  },
  {
    id: 'g2',
    name: 'الفوج الثاني',
    dates: '3 – 4 ديسمبر 2026',
    days: ['الخميس 3 ديسمبر', 'الجمعة 4 ديسمبر'],
    startsAt: '2026-12-03T08:30:00+01:00',
    full: false,
    seatsTaken: 0,
  },
  {
    id: 'g3',
    name: 'الفوج الثالث',
    dates: '5 – 6 ديسمبر 2026',
    days: ['السبت 5 ديسمبر', 'الأحد 6 ديسمبر'],
    startsAt: '2026-12-05T08:30:00+01:00',
    full: false,
    seatsTaken: 0,
  },
]

export const OPEN_GROUPS = GROUPS.filter((g) => !g.full)
export const seatsLeft = (g) => (g.full ? 0 : Math.max(COURSE.seats - g.seatsTaken, 0))
// Seat text for an open group: "14 مقعدًا فقط" until someone books, then "بقي X مقاعد"
export const seatsText = (g) => {
  const left = seatsLeft(g)
  if (g.full || left === 0) return 'مكتمل'
  if (g.seatsTaken <= 0) return `${COURSE.seats} مقعدًا فقط`
  return left <= 10 ? `بقي ${left} مقاعد` : `بقي ${left} مقعدًا`
}
export const groupLabel = (g) => `${g.name} (${g.dates})`

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

// Payment details
export const PAYMENT = {
  // Slick-Pay payment link (CIB / Edahabia), created in the Slick-Pay dashboard
  slickLink: 'https://www.slick-pay.com/slicklink/details/SLK-092632W4FES',
  ccp: { account: '6650093', key: '11', holder: 'Abdeslam Hetatache' },
  baridimobRib: '00799999000665009314',
}

// Number that receives payment receipts on WhatsApp
export const WHATSAPP = { display: '0676 10 13 71', wa: '213676101371' }
