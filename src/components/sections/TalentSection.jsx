import { Link } from 'react-router-dom'
import Reveal from './../ui/Reveal.jsx'
import Img from './../ui/Img.jsx'
import SectionHeading from './../ui/SectionHeading.jsx'
import { TEAM_CATEGORIES } from '../../data/team.js'

// Talent — a professional creative roster. Portrait placeholders
// keep the roster honest until real people are documented.
function TalentSection() {
  return (
    <section className="section section--light-green talent">
      <div className="container">
        <SectionHeading
          eyebrow="Creative Network"
          title={
            <>
              TALENT IS WHERE
              <br />
              <span className="text-gold">EVERYTHING BEGINS.</span>
            </>
          }
          subtitle="ATTII VERSE is also a talent ecosystem — a place where performers, creators and production people find platform, opportunity and community."
        />

        <div className="roster" style={{ marginTop: '2.5rem' }}>
          {TEAM_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} dir="up" delay={i * 80}>
              <article className="roster-card">
                <div className="roster-card__media">
                  <Img
                    alt={`${cat.title} — ATTII VERSE creative roster`}
                    label={cat.title}
                    index={String(i + 1).padStart(2, '0')}
                    aspect="3 / 4"
                  />
                </div>
                <div className="roster-card__body">
                  <h3 className="roster-card__title">{cat.title}</h3>
                  <p className="roster-card__sub">{cat.subtitle}</p>
                  <ul className="roster-card__roles">
                    {cat.placeholderRoles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal dir="up" delay={200}>
          <div className="talent__actions">
            <Link to="/contact" className="btn btn--gold">
              <span>JOIN THE CREATIVE NETWORK</span>
            </Link>
            <Link to="/team" className="btn btn--outline-emerald">
              <span>SEE THE TEAM</span>
            </Link>
            <Link to="/team" className="text-link" style={{ alignItems: 'center' }}>
              Full Roster →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default TalentSection