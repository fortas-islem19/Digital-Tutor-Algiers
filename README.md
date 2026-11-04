# Digital Tutor Algiers — الأستاذ الرقمي

Landing page and registration form for **Esaboura (السبورة)**'s in-person course *الأستاذ الرقمي: الذكاء الاصطناعي في التعليم* (2nd edition), held 20–21 November 2026 at Coffice, Mohammadia Mall, Algiers. Built with React, Vite and Framer Motion, with the same brand look as the China trip page (`esaboura-china`).

## Sections

1. Hero: course title, AI "screen" with the tools taught, key chips (dates, 12 hours, 18,000 DA instead of 22,000 DA, 14 seats)
2. Key facts, course intro, the 7 objectives, 70% practice / 30% theory bar
3. The 7 course axes and their tools
4. Two-day timetable
5. Gallery of past editions (see below)
6. Trainer, target audience and what to bring
7. Gifts: Gemini subscription, Canva Pro, QuillBot, Mystylus, Aithor, 3 recorded courses, outputs
8. Price and a 14-seat grid
9. Location: embedded Google map + button to the venue link
10. Registration form with validation
11. Footer and a floating call button

All content comes from the course technical card (البطاقة التقنية). Dates, price, seats, venue and phone numbers live in `src/config.js`.

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

## Meta Pixel

`index.html` loads the same Meta Pixel as the China page (ID `2183132719278372`) and tracks `PageView`. When FormBold confirms a registration, the form also sends a `Purchase` event (value 18,000 DZD, with the chosen status as `content_category`). If FormBold returns an error, no Purchase is sent.

## Updating for a new edition

Edit `COURSE`, `PRICE`, `OLD_PRICE` and `SEATS_TAKEN` in `src/config.js`. `SEATS_TAKEN` drives the red seats in the seat grid, so update it as registrations come in.
