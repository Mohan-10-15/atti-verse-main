import { Link, useParams, Navigate } from 'react-router-dom'
import Seo from '../components/ui/Seo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Img from '../components/ui/Img.jsx'
import Icon from '../components/ui/Icon.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import VideoBox from '../components/ui/VideoBox.jsx'
import CTASection from '../components/ui/CTASection.jsx'
import { EVENTS } from '../data/events.js'
import { PLACEHOLDER } from '../config/site.js'

function CaseSection({ index, eyebrow, title, children, dark = false }) {
  return (
    <section className={`section ${dark ? 'section--dark' : ''}`}>
      <div className="container">
        <Reveal dir="up">
          <div className={`case ${dark ? 'case--dark' : ''}`}>
            <span className="case__num" aria-hidden="true">
              {index}
            </span>
            <div className="case__body">
              <span className="case__eyebrow">{eyebrow}</span>
              {title && <h2 className="case__title">{title}</h2>}
              {children}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function EventDetail() {
  const { slug } = useParams()
  const event = EVENTS.find((e) => e.id === slug)
  if (!event) return <Navigate to="/events" replace />
  const next = EVENTS.find((e) => e.id !== slug)

  const verified = event.status === 'verified'

  return (
    <>
      <Seo
        title={`${event.title} | ATTII VERSE`}
        description={event.description}
        path={`/events/${slug}`}
      />
      <PageHeader
        eyebrow="Events — Case Study"
        crumb={event.title}
        title={event.title.toUpperCase()}
        subtitle={event.category}
        image={event.image}
      />

      {/* 01 Overview */}
      <CaseSection index="01" eyebrow="Overview" title={event.title}>
        <Reveal dir="up" delay={100}>
          <div className="grid-2" style={{ marginTop: '1.5rem', gap: '1.5rem' }}>
            <div>
              <p className="case__desc">{event.description}</p>
              <p className="case__desc" style={{ marginTop: '0.7rem', fontSize: '0.86rem', fontStyle: 'italic' }}>
                {verified
                  ? 'Date, location and further documentation will be added as they are confirmed.'
                  : `${PLACEHOLDER.tba} — this page will grow as the event is documented.`}
              </p>
            </div>
            <div className="detail-meta" style={{ flexDirection: 'column', gap: '0.75rem', marginTop: '0.25rem' }}>
              <div className="detail-meta__item">
                <span className="detail-meta__label">Category</span>
                <span className="detail-meta__value">{event.category}</span>
              </div>
              <div className="detail-meta__item">
                <span className="detail-meta__label">Role</span>
                <span className="detail-meta__value">{event.role}</span>
              </div>
              <div className="detail-meta__item">
                <span className="detail-meta__label">Status</span>
                <span className="detail-meta__value" style={{ color: 'var(--gold)', fontWeight: 700 }}>
                  {verified ? 'Verified Participation' : 'To Be Documented'}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </CaseSection>

      {/* 02 The Experience */}
      <CaseSection index="02" eyebrow="The Experience" title="WHAT WE DELIVERED" dark>
        <Reveal dir="up" delay={100}>
          <div className="case__desc">
            {verified
              ? 'ATTII VERSE contributed to this celebration through entertainment and cultural performance — part of our journey as a growing entertainment and production organization.'
              : 'Details of what we delivered, coordinated and performed are being documented and will appear here.'}
          </div>
        </Reveal>
        <Reveal dir="up" delay={180}>
          <div className="grid-2" style={{ marginTop: '1.8rem', alignItems: 'stretch' }}>
            <VideoBox video={event.video} poster={event.image} label={verified ? 'EVENT FILM' : 'EVENT FILM — TBA'} />
            <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', aspectRatio: '16 / 9' }}>
              <Img src={event.image} alt={event.title} />
            </div>
          </div>
        </Reveal>
      </CaseSection>

      {/* 03 Role */}
      <CaseSection index="03" eyebrow="Our Role" title={event.role}>
        <Reveal dir="up" delay={100}>
          <div className="detail-meta" style={{ gap: '1.5rem' }}>
            <div className="detail-meta__item">
              <span className="detail-meta__label">Category</span>
              <span className="detail-meta__value">{event.category}</span>
            </div>
            <div className="detail-meta__item">
              <span className="detail-meta__label">Domains Involved</span>
              <span className="detail-meta__value">Entertainment / Performance / Production</span>
            </div>
          </div>
        </Reveal>
      </CaseSection>

      {/* 04 Visual Coverage */}
      <CaseSection index="04" eyebrow="Visual Coverage" title="GALLERY & DOCUMENTATION">
        <Reveal dir="up" delay={100}>
          <div className="related-grid" style={{ marginTop: '1.5rem' }}>
            {event.gallery?.length > 0 ? (
              event.gallery.map((src, i) => (
                <Reveal key={src + i} dir="up" delay={(i % 3) * 80}>
                  <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', aspectRatio: '4 / 3' }}>
                    <Img src={src} alt={`${event.title} — visual ${i + 1}`} />
                  </div>
                </Reveal>
              ))
            ) : (
              [0, 1, 2].map((i) => (
                <Reveal key={i} dir="up" delay={(i % 3) * 80}>
                  <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', aspectRatio: '4 / 3' }}>
                    <Img src={event.image} alt={`${event.title} — visual ${i + 1}`} />
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </Reveal>
      </CaseSection>

      {/* 05 Key Moments */}
      <CaseSection index="05" eyebrow="Key Moments" title="MOMENTS WORTH REMEMBERING" dark>
        <Reveal dir="up" delay={100}>
          <div className="case__desc" style={{ maxWidth: '60ch' }}>
            Highlights, performances and standout moments from the event will be documented here as
            they are verified. Until then, the archive above keeps every visual we have in one place.
          </div>
        </Reveal>
        <Reveal dir="up" delay={180}>
          <div className="talent__actions" style={{ marginTop: '1.6rem' }}>
            <Link to="/about" className="btn btn--gold">
              <span>See Milestones</span>
            </Link>
            <Link to="/gallery" className="btn btn--outline">
              <span>Open Gallery</span>
            </Link>
          </div>
        </Reveal>
      </CaseSection>

      {/* 06 Next Project */}
      <CaseSection index="06" eyebrow="Next Project" title="THE VERSE CONTINUES">
        <Reveal dir="up" delay={100}>
          <div className="grid-2" style={{ marginTop: '1.2rem', gap: '1.5rem' }}>
            <span className="case__desc" style={{ margin: 0 }}>
              Every event is a chapter. The next moment in the verse is already being planned.
            </span>
            {next && (
              <div>
                <span className="detail-meta__label">Up Next</span>
                <span className="case__eyebrow" style={{ display: 'block', marginTop: '0.4rem' }}>
                  {next.title}
                </span>
                <Link
                  to={`/events/${next.id}`}
                  className="text-link mt-md"
                  style={{ marginTop: '1.2rem', display: 'inline-flex' }}
                >
                  <Icon name="arrow-right" size={14} />
                  Next Event →
                </Link>
              </div>
            )}
          </div>
        </Reveal>
      </CaseSection>

      <CTASection
        title="HAVE AN EVENT IN MIND?"
        copy={
          <>
            Planning something worth remembering? Let's create it together — entertainment,
            production and coordination in one place.
          </>
        }
        primary={{ label: 'Plan An Event', to: '/contact' }}
      />
    </>
  )
}

export default EventDetail