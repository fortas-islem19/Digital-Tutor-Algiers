// Browser side of the Slick-Pay flow. The secret key stays on the server (api/pay.js, api/verify.js).

const KEY = 'dt_payment'

// Asks our server to create a Slick-Pay payment, remembers it, then opens the payment page.
export async function startPayment(values) {
  const res = await fetch('/api/pay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.url) {
    const err = new Error(data.error || `pay failed (${res.status})`)
    err.code = data.error
    throw err
  }
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ id: data.id, values, counted: false }))
  } catch {
    // private mode: the return check will ask the visitor to contact us instead
  }
  window.location.assign(data.url)
}

export function readPending() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || 'null')
  } catch {
    return null
  }
}

export function markCounted() {
  const p = readPending()
  if (!p) return
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ ...p, counted: true }))
  } catch {
    // ignore
  }
}

export function clearPending() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

// True when the visitor has just come back from the Slick-Pay page
export const isPaymentReturn = () => new URLSearchParams(window.location.search).get('payment') === 'return'

export async function verifyPayment(id) {
  const res = await fetch(`/api/verify?id=${encodeURIComponent(id)}`, { cache: 'no-store' })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `verify failed (${res.status})`)
  return data.paid === true
}
