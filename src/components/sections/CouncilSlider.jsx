import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal.jsx'
import Img from '../ui/Img.jsx'
import Icon from '../ui/Icon.jsx'
import { LEADERSHIP } from '../../data/team.js'

const pad = (n) => String(n).padStart(2, '0')

// Leadership slider — one member at a time, horizontal slide transition.
function CouncilSlider({ className = '', showCta = true, id = 'council' }) {
  const [active, setActive] = useState(0)
  const count = LEADERSHIP.length
  const stageRef = useRef(null)

  const go = useCallback((dir) => setActive((a) => (a + dir + count) % count), [count])

  useEffect(() => {
    const node = stageRef.current
    if (!node) return
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
      }
    }
    node.addEventListener('keydown', onKeyDown)
    return () => node.removeEventListener('keydown', onKeyDown)
  }, [go])

  return (
    <section className={`section council ${className}`} id={id}>
      <div className="container">
        <div className="council__head">
          <Reveal dir="up" className="council__head-main">
            <span className="eyebrow">04 / Leadership</span>
            <h2 className="council__title">
              THE ATTI VERSE <span className="text-gold">COUNCIL</span>
            </h2>
            <p className="council__subtitle">
              THE PEOPLE
              <br />
              <span className="text-gold">BEHIND THE VERSE.</span>
            </p>
          </Reveal>

          <Reveal dir="up" delay={120} className="council__head-side">
            <p className="council__lede">
              Four perspectives. One direction. Meet the people shaping the vision,
              operations, growth and experiences behind ATTI VERSE.
            </p>
            {showCta && (
              <Link to="/team" className="text-link council__meet">
                <span>Meet Our Team</span>
                <Icon name="arrow-up-right" size={15} />
              </Link>
            )}
          </Reveal>
        </div>
      </div>

      <div className="container">
        <div
          className="council__stage"
          ref={stageRef}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="ATTII VERSE leadership"
        >
          <div
            className="council__track"
            style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
          >
            {LEADERSHIP.map((member, i) => (
              <article
                key={member.id}
                className={`council__slide ${i === active ? 'is-active' : ''}`}
                aria-hidden={i !== active}
              >
                <div className="council__media">
                  <Img
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    label={member.role.split('&')[0].trim()}
                    index={pad(i + 1)}
                    priority={i === 0}
                  />
                  <span className="council__media-index" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                </div>

                <div className="council__body">
                  <div className="council__counter" aria-hidden="true">
                    <span className="council__counter-current">{pad(i + 1)}</span>
                    <span className="council__counter-sep">/</span>
                    <span className="council__counter-total">{pad(count)}</span>
                  </div>
                  <span className="council__status">Currently shaping the verse</span>
                  <h3 className="council__name">{member.name}</h3>
                  <p className="council__role">{member.role}</p>
                  {member.designation && (
                    <p className="council__designation">{member.designation}</p>
                  )}
                  <span className="council__rule" aria-hidden="true" />
                  <p className="council__focus">{member.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="council__controls">
          <div className="council__dots" role="tablist" aria-label="Select leader">
            {LEADERSHIP.map((member, i) => (
              <button
                key={member.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${pad(i + 1)} — ${member.name}`}
                className={`council__dot ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="council__dot-num">{pad(i + 1)}</span>
                <span className="council__dot-bar" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="council__arrows">
            <button
              type="button"
              className="council__arrow"
              onClick={() => go(-1)}
              aria-label="Previous leader"
            >
              <Icon name="arrow-left" size={18} />
            </button>
            <button
              type="button"
              className="council__arrow"
              onClick={() => go(1)}
              aria-label="Next leader"
            >
              <Icon name="arrow-right" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CouncilSlider
