import { useState } from 'react'
import Seo from '../components/ui/Seo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Icon from '../components/ui/Icon.jsx'
import Img from '../components/ui/Img.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import InstitutionalCTA from '../components/sections/InstitutionalCTA.jsx'
import { IMAGES } from '../config/images.js'
import { SITE, CONTACTS, CONTACT_PUBLISHED } from '../config/site.js'

const PROJECT_TYPES = [
  'Entertainment',
  'Event Management',
  'Photography',
  'Videography',
  'Video Production',
  'Creative Design',
  'Talent / Performance',
  'College Event',
  'Brand Collaboration',
  'Other',
]

const CATEGORIES = [
  {
    icon: 'calendar',
    title: 'Event Enquiries',
    desc: 'For entertainment and event management requirements.',
    image: IMAGES.services.eventManagement,
  },
  {
    icon: 'camera',
    title: 'Production Enquiries',
    desc: 'For photography, videography and creative production.',
    image: IMAGES.services.mediaProduction,
  },
  {
    icon: 'handshake',
    title: 'Collaborations',
    desc: 'For brands, institutions, creators and organizations.',
    image: IMAGES.work.creative,
  },
  {
    icon: 'mic',
    title: 'Talent / Performance',
    desc: 'For performers, creators and creative professionals.',
    image: IMAGES.services.talentCollaboration,
  },
]

const initial = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  projectType: '',
  preferredDate: '',
  message: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid email.'
  if (!values.projectType) errors.projectType = 'Please select a project type.'
  if (!values.message.trim()) errors.message = 'Please tell us a little about your project.'
  return errors
}

function buildMailto(values) {
  const subject = encodeURIComponent(`Enquiry: ${values.projectType} — ${values.name}`)
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.phone && `Phone: ${values.phone}`,
    values.organization && `Organization: ${values.organization}`,
    `Project Type: ${values.projectType}`,
    values.preferredDate && `Preferred Date: ${values.preferredDate}`,
    '',
    values.message,
  ]
    .filter(Boolean)
    .join('%0A')
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`
}

function Contact() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      window.location.href = buildMailto(values)
      setSent(true)
    }
  }

  return (
    <>
      <Seo
        title="Contact | Let's Create Something Worth Remembering — ATTII VERSE"
        description="Have an event, production, creative project or collaboration in mind? Contact ATTII VERSE Entertainment & Productions."
        path="/contact"
      />
      <PageHeader
        eyebrow="Contact"
        crumb="Contact"
        title="LET'S CREATE SOMETHING WORTH REMEMBERING."
        subtitle="Have an event, production, creative project or collaboration in mind? Tell us what you're building."
      />

      <InstitutionalCTA />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <Reveal dir="up">
              <span className="eyebrow">How To Reach Us</span>
              <h2 className="section-title" style={{ marginTop: '0.8rem' }}>
                THE RIGHT DOOR FOR EVERY PROJECT
              </h2>
            </Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
              {CATEGORIES.map((c, i) => (
                <Reveal key={c.title} dir="up" delay={i * 80}>
                  <div className="contact-cat">
                    <div className="contact-cat__media">
                      <Img src={c.image} alt={c.title} />
                      <span className="contact-cat__icon">
                        <Icon name={c.icon} size={19} />
                      </span>
                    </div>
                    <div className="contact-cat__body">
                      <h3 className="contact-cat__title">{c.title}</h3>
                      <p className="contact-cat__desc">{c.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal dir="up" delay={200}>
              <div className="mt-lg" style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1.2rem' }}>
                <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--gold-soft)' }}>
                  Contact Details
                </p>
                {CONTACT_PUBLISHED ? (
                  <>
                    <p className="mt-sm" style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                      Email: <a href={`mailto:${SITE.email}`} style={{ color: 'var(--gold)' }}>{SITE.email}</a>
                    </p>
                    {CONTACTS.map((c) => (
                      <p key={c.phone} style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                        <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{c.name}</span>{' '}
                        <a href={`tel:${c.phone.replace(/\s/g, '')}`} style={{ color: 'var(--gold)' }}>{c.phone}</a>
                      </p>
                    ))}
                    {SITE.address && (
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                        Address: {SITE.address}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-sm" style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                    Official contact details will be published here soon.
                  </p>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal dir="up" delay={120}>
            <div className="form-card">
              {sent ? (
                <div className="form-success">
                  <span className="form-success__mark">
                    <Icon name="check" size={26} />
                  </span>
                  <h3 className="section-title" style={{ fontSize: '1.6rem' }}>
                    ENQUIRY PREPARED
                  </h3>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '40ch' }}>
                    Your email client should open with your enquiry pre-filled. If it doesn't,
                    you can reach us directly using the contact details on the left.
                  </p>
                  <button type="button" className="btn btn--gold" onClick={() => { setSent(false); setValues(initial) }}>
                    <span>Send Another Enquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="form-grid">
                    <div className={`field ${errors.name ? 'is-invalid' : ''}`}>
                      <label htmlFor="c-name">Name *</label>
                      <input id="c-name" name="name" placeholder="Your name" value={values.name} onChange={set('name')} autoComplete="name" />
                      {errors.name && <p className="error-text">{errors.name}</p>}
                    </div>
                    <div className={`field ${errors.email ? 'is-invalid' : ''}`}>
                      <label htmlFor="c-email">Email *</label>
                      <input id="c-email" name="email" type="email" placeholder="you@email.com" value={values.email} onChange={set('email')} autoComplete="email" />
                      {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="c-phone">Phone</label>
                      <input id="c-phone" name="phone" placeholder="+91 — — —" value={values.phone} onChange={set('phone')} autoComplete="tel" />
                    </div>
                    <div className="field">
                      <label htmlFor="c-org">Institution / Organization</label>
                      <input id="c-org" name="organization" placeholder="Institution / brand / company" value={values.organization} onChange={set('organization')} />
                    </div>
                    <div className={`field ${errors.projectType ? 'is-invalid' : ''}`}>
                      <label htmlFor="c-type">Event Type *</label>
                      <select id="c-type" name="projectType" value={values.projectType} onChange={set('projectType')}>
                        <option value="" disabled>
                          Select a project type
                        </option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && <p className="error-text">{errors.projectType}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="c-date">Event Date</label>
                      <input id="c-date" name="preferredDate" type="date" value={values.preferredDate} onChange={set('preferredDate')} />
                    </div>
                    <div className={`field span-2 ${errors.message ? 'is-invalid' : ''}`}>
                      <label htmlFor="c-msg">Message *</label>
                      <textarea
                        id="c-msg"
                        name="message"
                        placeholder="Tell us about your event, production or idea..."
                        value={values.message}
                        onChange={set('message')}
                      />
                      {errors.message && <p className="error-text">{errors.message}</p>}
                    </div>
                  </div>
                  <button type="submit" className="btn btn--gold" style={{ width: '100%', marginTop: '1.4rem' }}>
                    <span>Send Enquiry</span>
                    <Icon name="send" size={16} className="btn--icon-arrow" />
                  </button>
                  <p className="form-note">
                    Fields marked * are required. Your enquiry opens as a pre-filled email — no data is stored.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Contact