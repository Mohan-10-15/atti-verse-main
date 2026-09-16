import { useState } from 'react'
import Seo from '../components/ui/Seo.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Img from '../components/ui/Img.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import FilterBar from '../components/ui/FilterBar.jsx'
import CTASection from '../components/ui/CTASection.jsx'
import { WORK, WORK_FILTERS } from '../data/work.js'

function Work() {
  const [filter, setFilter] = useState('ALL')
  const visible =
    filter === 'ALL' ? WORK : WORK.filter((w) => w.category.toUpperCase() === filter)

  return (
    <>
      <Seo
        title="Our Work | Portfolio — ATTII VERSE"
        description="A portfolio of entertainment, events, production, creative and media work by ATTII VERSE Entertainment & Productions."
        path="/work"
      />
      <PageHeader
        eyebrow="Our Work"
        crumb="Work"
        title="THE WORK WE CREATE"
        subtitle="Entertainment, events, production, design and media — a visual record of what happens inside the verse."
      />

      <section className="section" style={{ paddingTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
        <div className="container">
          <Reveal dir="up">
            <FilterBar filters={WORK_FILTERS} active={filter} onChange={setFilter} />
          </Reveal>

          {visible.length === 0 ? (
            <Reveal dir="up">
              <p className="center" style={{ color: 'var(--text-muted)' }}>
                Work in this category is being documented — To Be Added.
              </p>
            </Reveal>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vw, 5rem)' }}>
              {visible.map((project, i) => (
                <Reveal key={project.id} dir="up" delay={(i % 2) * 70}>
                  <article className={`editorial ${i % 2 === 1 ? 'editorial--flip' : ''}`}>
                    <div className="editorial__media">
                      <span className="editorial__index">{String(i + 1).padStart(2, '0')}</span>
                      <div className="frame" style={{ aspectRatio: '16 / 10' }}>
                        <Img src={project.image} alt={`${project.title} — ${project.category}`} label={project.category} index={String(i + 1).padStart(2, '0')} />
                      </div>
                    </div>
                    <div>
                      <span className="feature__num">{project.category}</span>
                      <h2 className="editorial__title">{project.title}</h2>
                      <p className="editorial__body">{project.description}</p>
                      <div className="editorial__meta">
                        <strong>{project.year}</strong>
                        <span>Documented as projects are completed</span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        copy={
          <>
            Have a project in mind? Let's add your event, film or creative brief to the verse.
          </>
        }
      />
    </>
  )
}

export default Work