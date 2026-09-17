import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/ui/Seo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Img from '../components/ui/Img.jsx'
import Icon from '../components/ui/Icon.jsx'
import CTASection from '../components/ui/CTASection.jsx'
import WhyAttii from '../components/sections/WhyAttii.jsx'
import ServicesIndex from '../components/sections/ServicesIndex.jsx'
import ProductionShowcase from '../components/sections/ProductionShowcase.jsx'
import TalentSection from '../components/sections/TalentSection.jsx'
import InstitutionalCTA from '../components/sections/InstitutionalCTA.jsx'
import CouncilSlider from '../components/sections/CouncilSlider.jsx'
import EventCard from '../components/cards/EventCard.jsx'
import { IMAGES } from '../config/images.js'
import { EVENTS } from '../data/events.js'
import { WORK } from '../data/work.js'
import { HOME_MILESTONES } from '../data/achievements.js'

const HERO_SLIDES = [
  IMAGES.hero,
  IMAGES.events.srmPongal2026,
  IMAGES.work.entertainment,
  IMAGES.events.culturalStage,
  IMAGES.work.production,
]

function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % HERO_SLIDES.length), 6500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero hero--slideshow">
      <div className="hero__media hero__slideshow">
        {HERO_SLIDES.map((src, i) => (
          <Img
            key={src}
            src={src}
            alt=""
            className={`hero__slide ${i === active ? 'hero__slide--active' : ''}`}
            priority={i === 0}
          />
        ))}
      </div>
      <div className="hero__overlay" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__top">
          <p className="hero__eyebrow hero-line" style={{ animationDelay: '0.1s' }}>
            Entertainment &amp; Productions
          </p>
        </div>

        <div className="hero__brand-lockup hero-line" style={{ animationDelay: '0.18s' }}>
          <span className="hero__brand-rule" />
          <p>ATTII VERSE</p>
          <span className="hero__brand-rule" />
        </div>

        <div className="hero__title-block hero-line" style={{ animationDelay: '0.32s' }}>
          <h1 className="hero__title-line hero__title-line--attii">CREATE</h1>
          <h1 className="hero__title-line hero__title-line--verse">THE MOMENT</h1>
        </div>

        <div className="hero__gold-rule hero-line" style={{ animationDelay: '0.4s' }} />

        <p className="hero__tagline hero-line" style={{ animationDelay: '0.55s' }}>
          Entertainment. Production. Experiences.
        </p>

        <div className="hero__actions hero-line" style={{ animationDelay: '0.7s' }}>
          <Link to="/work" className="btn btn--gold">
            <span>Explore Our Work</span>
            <Icon name="arrow-right" size={16} className="btn--icon-arrow" />
          </Link>
          <Link to="/contact" className="btn btn--outline">
            <span>Work With Us</span>
          </Link>
        </div>

        <div className="hero__meta hero-line" style={{ animationDelay: '0.85s' }}>
          <span>Entertainment</span>
          <span className="hero__meta-sep">/</span>
          <span>Events</span>
          <span className="hero__meta-sep">/</span>
          <span>Production</span>
          <span className="hero__meta-sep">/</span>
          <span>Creative</span>
        </div>

        <div className="hero__slides hero-line" style={{ animationDelay: '0.95s' }} aria-label="Hero image slideshow">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero__slide-dot ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Introduction() {
  const lines = [
    { text: 'WE CREATE', gold: false },
    { text: 'EXPERIENCES.', gold: true },
    { text: 'WE BUILD', gold: false },
    { text: 'TALENT.', gold: true },
    { text: 'WE PRODUCE', gold: false },
    { text: 'STORIES.', gold: true },
  ]
  return (
    <section className="section intro-statement">
      <div className="container">
        <div className="intro-statement__layout">
          <div className="intro-statement__lines">
            {lines.map((line, i) => (
              <Reveal key={line.text} dir="up" delay={i * 80}>
                <p className={`intro-statement__line ${line.gold ? 'intro-statement__line--gold' : ''}`}>
                  {line.text}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal dir="up" delay={220} className="intro-statement__aside">
            <p className="intro-statement__eyebrow">THE ATTII VERSE</p>
            <p className="intro-statement__tagline">OUR TALENT. OUR VERSE.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FeaturedWork() {
  const featured = WORK.filter((w) => w.featured)
  return (
    <section className="section section--paper">
      <div className="container">
        <div className="work-editorial">
          <div className="work-editorial__head">
            <Reveal dir="up">
              <span className="eyebrow">Our Work</span>
              <h2 className="section-title" style={{ marginTop: '1.1rem', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                SELECTED <span className="text-gold">WORK.</span>
              </h2>
            </Reveal>
            <Reveal dir="up" delay={100}>
              <Link to="/work" className="text-link" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                View All Work →
              </Link>
            </Reveal>
          </div>

          <div className="work-editorial__grid">
            {featured.slice(0, 3).map((project, i) => (
              <Reveal key={project.id} dir="up" delay={i * 80}>
                <Link
                  to="/work"
                  className="work-editorial__item"
                >
                  <div className="work-editorial__media">
                    <Img src={project.image} alt={`${project.title} — ${project.category}`} label={project.category} index={String(i + 1).padStart(2, '0')} />
                  </div>
                  <div className="work-editorial__overlay">
                    <span className="work-editorial__cat">{project.category}</span>
                    <h3 className="work-editorial__title">{project.title}</h3>
                    <span className="work-editorial__arrow" aria-hidden="true">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedEvents() {
  return (
    <section className="section section--off-white">
      <div className="container">
        <div className="section-head-row">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">Events</span>
            <h2 className="section-title section-head__title">MOMENTS WE'VE CREATED</h2>
          </div>
          <Reveal dir="up" delay={150}>
            <Link to="/events" className="text-link">
              View All Events →
            </Link>
          </Reveal>
        </div>

        <div className="events-rail" style={{ marginTop: '2rem' }}>
          {EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Milestones() {
  return (
    <section className="section">
      <div className="container">
        <div className="milestones-editorial">
          <div className="milestones-editorial__head">
            <Reveal dir="up">
              <span className="eyebrow">Milestones</span>
              <h2 className="section-title" style={{ marginTop: '1.1rem', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                BUILT ON <span className="text-gold">EARNED MILESTONES.</span>
              </h2>
            </Reveal>
            <Reveal dir="up" delay={100}>
              <p style={{ color: 'var(--text-muted)', marginTop: '1rem', maxWidth: '50ch' }}>
                Every milestone below is verified. Nothing here is invented.
              </p>
            </Reveal>
          </div>

          <div className="milestones-editorial__grid">
            {HOME_MILESTONES.map((m, i) => (
              <Reveal key={m.title} dir="up" delay={(i % 3) * 60}>
                <div className="milestone-card">
                  <span className="milestone-card__num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="milestone-card__body">
                    <h3 className="milestone-card__title">{m.title}</h3>
                    {m.note && <p className="milestone-card__note">{m.note}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <div className="home-page">
      <Seo
        title="ATTII VERSE | Entertainment & Productions"
        description="ATTII VERSE Entertainment & Productions — a structured creative organization bringing together entertainment, event management, media production, creative services and talented creators."
        path="/"
      />
      <Hero />
      <Introduction />
      <ServicesIndex />
      <WhyAttii />
      <FeaturedWork />
      <FeaturedEvents />
      <ProductionShowcase />
      <TalentSection />
      <Milestones />
      <CouncilSlider className="section--paper" />
      <InstitutionalCTA />
      <CTASection
        title="LET'S CREATE SOMETHING WORTH REMEMBERING."
        copy={
          <>
            Whether you are planning an event, looking for creative production, exploring a
            collaboration or building something new — let's start the conversation.
          </>
        }
      />
    </div>
  )
}

export default Home