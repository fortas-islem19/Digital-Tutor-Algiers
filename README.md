# Digital Tutor Algiers — الأستاذ الرقمي

Landing page and registration form for **Esaboura (السبورة)**'s in-person course *الأستاذ الرقمي: الذكاء الاصطناعي في التعليم* (2nd edition), held 20–21 November 2026 at Coffice, Mohammadia Mall, Algiers. Built with React, Vite and Framer Motion, with the same brand look as the China trip page (`esaboura-china`).

## Sections

The page has its own layout. From the China page it keeps only the Esaboura brand: colours, fonts and button style.

1. Header and hero: course title, price, a countdown to the first day, and a bar with the date, time, place and seats
2. The tools taught in the course
3. What you'll learn: pick one of the 7 axes to see its content, its objective, its tools and when it's taught
4. Timetable, with a tab for each day
5. Photos from past editions (see below)
6. Trainer, who the course is for, and what to bring
7. Gifts, shown as tables, plus the recorded courses and what you take away
8. Price ticket with the number of seats left
9. Location: map, address and a Google Maps button
10. FAQ, answered from the technical card
11. Registration form in 3 steps
12. Footer with phone numbers, and a bar fixed to the bottom of phone screens with the price, a register button and a call button

Text is dark on light backgrounds (or white on dark purple), at least 18px, with no blurred or see-through text, so everything stays easy to read. Course content lives in `src/data.js`; dates, price, seats, venue and phones in `src/config.js`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Adding photos from past courses

Drop `.jpg`, `.png` or `.webp` files into `src/assets/gallery/`. They show up in the gallery automatically, sorted by file name, with a click-to-zoom lightbox. Until there are photos, the gallery shows placeholder tiles. Resize photos to about 1600px wide first to keep the page fast.

## Registration form

Validation (in `src/lib/validate.js`):

- Full name: letters only, first name and surname
- Phone: Algerian mobile (05/06/07), accepts `0661234567`, `06 61 23 45 67`, `+213…`, `00213…`; sent normalized as `0XXXXXXXXX`
- Email: required and checked; a hint recommends Gmail, which the course needs for platform accounts
- Wilaya, status, computer level, laptop: required
- Consent: required
- Errors show when a field is left or on submit, the first invalid field gets focus, and a hidden honeypot field drops bot submissions.

Submissions go to FormBold as JSON (Arabic field names). The form ID is in `src/config.js` (`FORMBOLD_FORM_ID = '3Kqnp'`, i.e. `https://formbold.com/s/3Kqnp`), a form of its own, separate from the China page. To use another service, set `VITE_FORM_ENDPOINT` in `.env`.

## Online payment (Slick-Pay)

People can pay the course fee by CIB or Edahabia card through [Slick-Pay](https://slick-pay.com), or choose to pay later.

How it works:

1. The form first sends the registration to FormBold, with the chosen payment method.
2. For online payment, the page calls `api/pay.js` (a Vercel serverless function). It checks the form again and creates a Slick-Pay merchant invoice for the fixed price in `src/config.js` (the browser cannot change the amount), then sends the person to the Slick-Pay payment page.
3. Slick-Pay sends them back to `/?payment=return`. The page calls `api/verify.js`, which asks Slick-Pay whether the invoice is paid.
4. If it is paid: the person sees a confirmation, FormBold receives a second entry ("تأكيد الدفع" with the Slick-Pay invoice number), and the Meta Pixel sends `Purchase` once. If not: the person sees a "payment not completed" message with a retry button and the phone number.

Setup in Vercel → digital-tutor-algiers → Settings → Environment Variables:

| Name | Value |
| --- | --- |
| `SLICKPAY_PUBLIC_KEY` | your API key from the Slick-Pay merchant dashboard |
| `SLICKPAY_SANDBOX` | `1` to test with Slick-Pay's test server, remove it (or set `0`) for real payments |

Redeploy after adding them. Until `SLICKPAY_PUBLIC_KEY` is set, choosing online payment still saves the registration and tells the person the team will call them.

The key is only read by the server functions in `api/`; never put it in `src/` or in a `VITE_` variable, or it would be visible to anyone.

## Meta Pixel

`index.html` loads the same Meta Pixel as the China page (ID `2183132719278372`) and tracks `PageView`. `Purchase` (value 18,000 DZD, with the chosen status as `content_category`) is sent once per registration: for "pay later", when FormBold accepts the registration; for online payment, only when Slick-Pay confirms the payment.

## Updating for a new edition

Edit `COURSE`, `PRICE`, `OLD_PRICE` and `SEATS_TAKEN` in `src/config.js`. `SEATS_TAKEN` drives the red seats in the seat grid, so update it as registrations come in.
