import { useState } from 'react'

// Renders an image. If the source is missing, an elegant
// branded data-URI placeholder is shown instead of a broken image.

function fallbackSVG(label = '', index = '') {
  const safe = (label || 'ATTII VERSE')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .slice(0, 40)
    .toUpperCase()

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#021C16"/><stop offset="100%" stop-color="#032E24"/>
    </linearGradient>
    <radialGradient id="v" cx="0.72" cy="0.2" r="0.95">
      <stop offset="0%" stop-color="#C8A951" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#C8A951" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#b)"/>
  <rect width="800" height="600" fill="url(#v)"/>
  <rect x="44" y="36" width="712" height="528" fill="none" stroke="#D4AF37" stroke-opacity="0.45" stroke-width="1"/>
  <rect x="54" y="46" width="692" height="508" fill="none" stroke="#D4AF37" stroke-opacity="0.16" stroke-width="1"/>
  <text x="60" y="64" font-family="Georgia, serif" font-size="10" font-weight="700" fill="#D4AF37" letter-spacing="2.5">ATTII VERSE</text>
  <text x="60" y="80" font-family="Arial, sans-serif" font-size="8" fill="#FFFFFF" fill-opacity="0.62" letter-spacing="2.5">ENTERTAINMENT &amp; PRODUCTIONS</text>
  ${index ? `<text x="738" y="72" text-anchor="end" font-family="Georgia, serif" font-size="42" font-weight="700" fill="#D4AF37" letter-spacing="4">${index}</text>` : ''}
  <line x1="300" y1="290" x2="500" y2="290" stroke="#D4AF37" stroke-opacity="0.8" stroke-width="2"/>
  <text x="400" y="274" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="#FFFFFF" fill-opacity="0.85" letter-spacing="4">${safe}</text>
  <text x="400" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="14" font-weight="700" fill="#E0C56E" letter-spacing="7">ATTII VERSE</text>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function Img({
  src,
  alt = '',
  className = '',
  aspect,
  priority = false,
  sizes,
  srcSet,
  width,
  height,
  label,
  index,
  ...rest
}) {
  const [failed, setFailed] = useState(false)

  const isMissing = src === null || src === undefined || src === '' || failed
  const placeholder = () => {
    const dsv = fallbackSVG(label || alt, index)
    return (
      <div className={`img ${className}`} style={aspect ? { aspectRatio: aspect } : undefined} {...rest}>
        <img
          className="img__el"
          src={dsv}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>
    )
  }

  if (isMissing) return placeholder()

  return (
    <div className={`img ${className}`} style={aspect ? { aspectRatio: aspect } : undefined} {...rest}>
      <img
        className="img__el"
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export default Img