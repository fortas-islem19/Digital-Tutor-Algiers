// Minimal Slick-Pay client for the merchant invoice API (v2).
// Endpoints follow Slick-Pay's official SDKs: POST /merchants/invoices to create a payment,
// GET /merchants/invoices/{id} to read it back.
//
// Environment variables (set them in Vercel → Project → Settings → Environment Variables):
//   SLICKPAY_PUBLIC_KEY  your Slick-Pay API key (never put it in the front-end code)
//   SLICKPAY_SANDBOX     "1" to use the test server (devapi), anything else for real payments

export const isConfigured = () => Boolean(process.env.SLICKPAY_PUBLIC_KEY)

function baseUrl() {
  const host = process.env.SLICKPAY_SANDBOX === '1' ? 'devapi.slick-pay.com' : 'prodapi.slick-pay.com'
  return `https://${host}/api/v2`
}

async function call(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${baseUrl()}/${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SLICKPAY_PUBLIC_KEY}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  let data = null
  try {
    data = await res.json()
  } catch {
    // non-JSON error page
  }
  if (!res.ok || data?.errors) {
    const err = new Error(`Slick-Pay ${method} ${path} failed with status ${res.status}`)
    err.status = res.status
    err.details = data?.errors || data?.message || null
    throw err
  }
  return data
}

// Creates a payment and returns { id, url } where url is the Slick-Pay payment page.
export async function createInvoice({ amount, name, phone, address, returnUrl, item }) {
  const data = await call('merchants/invoices', {
    method: 'POST',
    body: {
      amount,
      name,
      phone,
      address,
      url: returnUrl,
      items: [{ name: item, price: amount, quantity: 1 }],
    },
  })
  const id = data?.id ?? data?.data?.id
  const url = data?.url ?? data?.data?.url
  if (!id || !url) {
    const err = new Error('Slick-Pay response is missing the invoice id or payment url')
    err.details = data
    throw err
  }
  return { id, url }
}

// Reads an invoice back and reports whether it has been paid.
export async function getInvoice(id) {
  const data = await call(`merchants/invoices/${encodeURIComponent(id)}`)
  const inv = data?.data && typeof data.data === 'object' ? data.data : data
  const flag = data?.completed ?? inv?.completed ?? inv?.paid
  const status = String(inv?.status ?? '').toLowerCase()
  const paid = flag === 1 || flag === true || flag === '1' || ['paid', 'completed', 'success'].includes(status)
  return { paid, amount: Number(inv?.amount ?? data?.amount) || null, raw: data }
}
