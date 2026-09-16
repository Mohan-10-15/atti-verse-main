// Generate branded SVG placeholder images for every path in
// src/config/images.js so the site never shows broken images.
// Run: node scripts/generate-placeholders.mjs
// When you replace files with real images, simply overwrite them.

import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'

const OUT = resolve('public')

const SIZES = {
  hero: { w: 1920, h: 1080, label: 'Hero Visual', index: '01' },
  'og-image': { w: 1200, h: 630, label: 'Open Graph', index: '' },
  default: { w: 1200, h: 800, label: '', index: '' },
  portrait: { w: 800, h: 1000, label: 'Portrait', index: '' },
  events: { w: 1200, h: 800, label: 'Event Visual', index: '' },
  certificates: { w: 1000, h: 1200, label: 'Certificate', index: '' },
}

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function svg(w, h, label, index = '') {
  const fs = Math.round(Math.max(13, w * 0.009)) // small caps size
  const big = Math.round(Math.max(28, w * 0.024)) // serif display
  const safeLabel = escape((label || '').toUpperCase())
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#021C16"/><stop offset="100%" stop-color="#032E24"/>
    </linearGradient>
    <radialGradient id="vig" cx="0.72" cy="0.22" r="0.9">
      <stop offset="0%" stop-color="#C8A951" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#C8A951" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#E0C56E"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#E0C56E"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <g stroke="#FFFFFF" stroke-opacity="0.03">
    ${Array.from({ length: 6 }, (_, i) => `<line x1="${(w / 6) * (i + 1)}" y1="0" x2="${(w / 6) * (i + 1)}" y2="${h}"/>`).join('\n    ')}
    ${Array.from({ length: 4 }, (_, i) => `<line x1="0" y1="${(h / 4) * (i + 1)}" x2="${w}" y2="${(h / 4) * (i + 1)}"/>`).join('\n    ')}
  </g>
  <rect x="${w * 0.045}" y="${h * 0.05}" width="${w * 0.91}" height="${h * 0.9}" fill="none" stroke="#D4AF37" stroke-opacity="0.5" stroke-width="1"/>
  <rect x="${w * 0.056}" y="${h * 0.061}" width="${w * 0.888}" height="${h * 0.878}" fill="none" stroke="#D4AF37" stroke-opacity="0.16" stroke-width="1"/>
  <text x="${w * 0.075}" y="${h * 0.11}" font-family="Georgia, 'Times New Roman', serif" font-size="${fs}" font-weight="700" fill="#D4AF37" letter-spacing="${Math.round(Math.max(2, fs * 0.9))}">ATTII VERSE</text>
  <text x="${w * 0.075}" y="${h * 0.11 + fs * 1.7}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(fs * 0.82)}" fill="#FFFFFF" fill-opacity="0.62" letter-spacing="${Math.round(Math.max(2, fs * 0.75))}">ENTERTAINMENT &amp; PRODUCTIONS</text>
  ${index ? `<text x="${w - w * 0.075}" y="${h * 0.105 + big * 0.35}" text-anchor="end" font-family="Georgia, 'Times New Roman', serif" font-size="${big}" font-weight="700" fill="url(#gold)" letter-spacing="${Math.round(Math.max(3, big * 0.2))}">${index}</text>` : ''}
  <line x1="${w * 0.24}" y1="${h * 0.68}" x2="${w * 0.76}" y2="${h * 0.68}" stroke="#D4AF37" stroke-opacity="0.8" stroke-width="2"/>
  ${safeLabel ? `<text x="${w / 2}" y="${h * 0.68 - fs * 1.4}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fs * 1.05}" font-weight="600" fill="#FFFFFF" fill-opacity="0.85" letter-spacing="${Math.round(Math.max(2, fs * 0.55))}">${safeLabel}</text>` : ''}
  <text x="${w / 2}" y="${h * 0.78 + fs}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fs}" font-weight="700" fill="#E0C56E" letter-spacing="${Math.round(Math.max(2, fs * 0.9))}">A T T I I&nbsp;&nbsp;V E R S E</text>
</svg>`
}

const PLAN = [
  // brand visuals
  ['/images/hero-main.jpg', SIZES.hero],
  ['/images/og-image.jpg', SIZES['og-image']],
  ['/images/about-home.jpg', { ...SIZES.default, label: 'Creative Ecosystem' }],
  ['/favicon.svg', null],
  // founders (portrait)
  ['/images/founders/founder-rahul.jpg', { ...SIZES.portrait, label: 'Founder & CEO' }],
  ['/images/founders/founder-tamilselvan.jpg', { ...SIZES.portrait, label: 'Founder & COO' }],
  ['/images/founders/founder-siva.jpg', { ...SIZES.portrait, label: 'Co-Founder & MD' }],
  ['/images/founders/founder-harish.jpg', { ...SIZES.portrait, label: 'Co-Founder & Director of Events' }],
  // work
  ['/images/work/work-entertainment.jpg', { ...SIZES.default, label: 'Entertainment' }],
  ['/images/work/work-events.jpg', { ...SIZES.default, label: 'Event Coordination' }],
  ['/images/work/work-production.jpg', { ...SIZES.default, label: 'Media Production' }],
  ['/images/work/work-creative.jpg', { ...SIZES.default, label: 'Creative Design' }],
  ['/images/work/work-media.jpg', { ...SIZES.default, label: 'Digital Content' }],
  ['/images/work/work-additional.jpg', { ...SIZES.default, label: 'Project' }],
  // events
  ['/images/events/event-srm-pongal-2026.jpg', { ...SIZES.events, label: 'SRM Pongal Vizha 2026', index: '01' }],
  ['/images/events/event-dance-competition.jpg', { ...SIZES.events, label: 'Dance Competition' }],
  ['/images/events/event-flash-mob.jpg', { ...SIZES.events, label: 'Flash Mob' }],
  ['/images/events/event-cultural-stage.jpg', { ...SIZES.events, label: 'Cultural Stage' }],
  ['/images/events/event-future.jpg', { ...SIZES.events, label: 'Event' }],
  // productions
  ['/images/productions/photography.jpg', { ...SIZES.default, label: 'Photography' }],
  ['/images/productions/videography.jpg', { ...SIZES.default, label: 'Videography' }],
  ['/images/productions/editing.jpg', { ...SIZES.default, label: 'Editing' }],
  ['/images/productions/reels.jpg', { ...SIZES.default, label: 'Reels' }],
  ['/images/productions/aftermovies.jpg', { ...SIZES.default, label: 'Aftermovies' }],
  ['/images/productions/promotional.jpg', { ...SIZES.default, label: 'Promotional' }],
  ['/images/productions/shortfilms.jpg', { ...SIZES.default, label: 'Short Films' }],
  ['/images/productions/direction.jpg', { ...SIZES.default, label: 'Direction' }],
  // services
  ['/images/services/service-entertainment.jpg', { ...SIZES.default, label: 'Entertainment' }],
  ['/images/services/service-event-management.jpg', { ...SIZES.default, label: 'Event Management' }],
  ['/images/services/service-media-production.jpg', { ...SIZES.default, label: 'Media & Production' }],
  ['/images/services/service-film-creative.jpg', { ...SIZES.default, label: 'Film & Creative' }],
  ['/images/services/service-creative-design.jpg', { ...SIZES.default, label: 'Creative & Design' }],
  ['/images/services/service-talent.jpg', { ...SIZES.default, label: 'Talent' }],
  // gallery
  ...Array.from({ length: 20 }, (_, i) => [`/images/gallery/gallery-${String(i + 1).padStart(2, '0')}.jpg`, SIZES.default]),
  // certificates
  ['/images/certificates/certificate-01.jpg', { ...SIZES.certificates, label: 'Certificate 01' }],
  ['/images/certificates/certificate-02.jpg', { ...SIZES.certificates, label: 'Certificate 02' }],
  ['/images/certificates/certificate-03.jpg', { ...SIZES.certificates, label: 'Certificate 03' }],
]

for (const [relPath, size] of PLAN) {
  const abs = resolve(OUT, `.${relPath}`)
  mkdirSync(dirname(abs), { recursive: true })
  if (relPath === '/favicon.svg') {
    writeFileSync(
      abs,
      `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#021C16"/><stop offset="100%" stop-color="#032E24"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#g)"/>
  <rect x="4" y="4" width="56" height="56" rx="9" fill="none" stroke="#D4AF37" stroke-opacity="0.6" stroke-width="1.5"/>
  <text x="32" y="42" text-anchor="middle" font-family="Georgia, serif" font-size="26" font-weight="700" fill="#D4AF37">AV</text>
</svg>`,
    )
    console.log('generated', relPath)
    continue
  }
  writeFileSync(abs, svg(size.w, size.h, size.label, size.index))
  console.log('generated', relPath)
}

console.log('\nDone. Placeholder images were written to /public/images')