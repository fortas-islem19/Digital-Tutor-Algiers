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

## Payment

The form's last step asks how the person will pay. Both options first send the registration to FormBold, with the chosen method (`طريقة الدفع`).

- **Online (الدفع الإلكتروني):** after registering, the person is sent to a Slick-Pay payment link (CIB / Edahabia).
- **Post office transfer (الدفع عبر البريد):** the CCP and BaridiMob details appear in the form when this option is chosen, and again on the thank-you screen. Each value has a copy button. The person is asked to send a photo of the receipt on WhatsApp, and a button opens WhatsApp with a ready-made message.

Payment details, the Slick-Pay link and the WhatsApp number are in `src/config.js` (`PAYMENT`, `WHATSAPP`). The page doesn't check payments itself: confirm them from the Slick-Pay dashboard and the receipts sent on WhatsApp.

## Meta Pixel

`index.html` loads the course's own Meta Pixel (ID `1674432380905103`) and tracks `PageView`. `Purchase` (value 18,000 DZD, with the chosen status as `content_category`) is sent once per registration, when FormBold accepts it, whichever payment method is chosen.

## Groups (أفواج)

The course runs in several groups with the same programme, trainer, venue and price. They are listed in `GROUPS` in `src/config.js`:

| Group | Dates | Status |
| --- | --- | --- |
| الفوج الأول | 20 – 21 November 2026 | full (registration closed) |
| الفوج الثاني | Thursday 3 – Friday 4 December 2026 | open |
| الفوج الثالث | Saturday 5 – Sunday 6 December 2026 | open |

- To close a group, set `full: true`. It stays on the page marked «مكتمل» and can't be picked in the form.
- To show seats left, update `seatsTaken` (14 seats per group, `COURSE.seats`). With 0 the page says «14 مقعدًا فقط»; once seats are taken it says «بقي X مقاعد».
- To add a group, copy an entry and change `id`, `name`, `dates`, `days` and `startsAt`.

The groups section, the hero, the countdown (to the next open group), the price ticket, the location and the form all read from this list. The form requires a group; FormBold receives it as `الفوج`, and the Meta Pixel `Purchase` event names it in `content_name`.

## Updating for a new edition

Edit `COURSE`, `PRICE`, `OLD_PRICE` and `SEATS_TAKEN` in `src/config.js`. `SEATS_TAKEN` drives the red seats in the seat grid, so update it as registrations come in.
