import { Link } from 'react-router-dom'
import Reveal from './../ui/Reveal.jsx'
import Icon from './../ui/Icon.jsx'
import { INSTITUTIONAL_POINTS } from '../../data/organization.js'

// Institutional enrolment — "Planning an institutional event?"
function InstitutionalCTA() {
  return (
    <section className="section" style={{ paddingTop: '0' }}>
      <div className="container">
        <Reveal dir="up">
          <div className="institutional">
            <div className="institutional__text">
              <span className="eyebrow">For Colleges &amp; Institutions</span>
              <h2 className="institutional__title">PLANNING YOUR NEXT EVENT?</h2>
              <p className="institutional__desc">
                Let's build an experience around your audience, your campus and your vision.
              </p>
              <Link to="/contact" className="btn btn--gold institutional__cta">
                <span>START A CONVERSATION</span>
              </Link>
            </div>
            <ul className="institutional__points">
              {INSTITUTIONAL_POINTS.map((point, i) => (
                <li key={point} className="institutional__point">
                  <Icon name="check" size={15} />
                  <span>{point}</span>
                  <span className="institutional__idx">{String(i + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default InstitutionalCTA