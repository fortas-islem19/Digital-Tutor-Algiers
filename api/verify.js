// GET /api/verify?id=123 — asks Slick-Pay whether an invoice has been paid.
// The page calls this when the visitor comes back from the payment page,
// so "paid" is always confirmed by Slick-Pay, never by the browser.
import { PRICE } from '../src/config.js'
import { getInvoice, isConfigured } from './_lib/slickpay.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  if (!isConfigured()) return res.status(503).json({ error: 'payment_not_configured' })

  const id = String(req.query.id || '')
  if (!/^[A-Za-z0-9-]{1,64}$/.test(id)) return res.status(400).json({ error: 'bad_id' })

  try {
    const inv = await getInvoice(id)
    // Only count it as paid if the amount matches the course price
    const paid = inv.paid && (inv.amount === null || inv.amount >= PRICE)
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({ id, paid })
  } catch (err) {
    console.error('[verify]', err.message, err.details)
    return res.status(502).json({ error: 'payment_provider_error' })
  }
}
