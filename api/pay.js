// POST /api/pay — creates a Slick-Pay payment for one registration and returns the payment page URL.
// The amount is fixed here on the server, so nobody can change the price from the browser.
import { PRICE } from '../src/config.js'
import { normalizePhone, validate } from '../src/lib/validate.js'
import { createInvoice, isConfigured } from './_lib/slickpay.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  if (!isConfigured()) return res.status(503).json({ error: 'payment_not_configured' })

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {}
  if (body.website) return res.status(400).json({ error: 'rejected' }) // honeypot

  // Same checks as the browser form
  const values = {
    fullName: String(body.fullName || ''),
    phone: String(body.phone || ''),
    email: String(body.email || ''),
    wilaya: String(body.wilaya || ''),
    profile: String(body.profile || ''),
    institution: String(body.institution || ''),
    level: String(body.level || ''),
    laptop: String(body.laptop || ''),
    notes: String(body.notes || ''),
    consent: body.consent === true,
  }
  const errors = validate(values)
  if (Object.keys(errors).length) return res.status(422).json({ error: 'invalid', fields: Object.keys(errors) })

  const origin = `https://${req.headers['x-forwarded-host'] || req.headers.host}`
  try {
    const invoice = await createInvoice({
      amount: PRICE,
      name: values.fullName.trim().replace(/\s+/g, ' '),
      phone: normalizePhone(values.phone),
      address: values.wilaya,
      returnUrl: `${origin}/?payment=return#register`,
      item: 'دورة الأستاذ الرقمي — الطبعة الثانية',
    })
    return res.status(200).json(invoice)
  } catch (err) {
    console.error('[pay]', err.message, err.details)
    return res.status(502).json({ error: 'payment_provider_error' })
  }
}

function safeJson(s) {
  try {
    return JSON.parse(s)
  } catch {
    return {}
  }
}
