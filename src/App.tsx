import { useState } from 'react'
import { game, formatUsername, type Person } from './data/game'

const navItems = [
  { label: 'The game', href: '#game' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Creators', href: '#creators' },
  { label: 'Admins', href: '#admins' },
  { label: 'Community', href: '#community' },
]

function isReadyUrl(value: string) {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function isKnownGenre(genre: string) {
  return genre !== '[GENRE]'
}

function PlayLink({ className = '' }: { className?: string }) {
  const ready = isReadyUrl(game.links.roblox)

  return (
    <span className="action-wrap">
      {ready ? (
        <a className={className} href={game.links.roblox} target="_blank" rel="noreferrer">
          Play on Roblox <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <button
          className={className}
          type="button"
          disabled
        >
          Roblox link unavailable
        </button>
      )}
    </span>
  )
}

function SocialAction({ kind, label }: { kind: 'tiktok' | 'discord'; label: string }) {
  const value = game.links[kind]
  return (
    <span className="action-wrap">
      {isReadyUrl(value) ? (
        <a href={value} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a>
      ) : (
        <button type="button" disabled>
          {kind === 'tiktok' ? 'TikTok' : 'Discord'} link unavailable
        </button>
      )}
    </span>
  )
}

function GameImage({ src, alt, className, loading, fetchPriority }: {
  src: string
  alt: string
  className: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <div className={`${className} media-placeholder`} role="img" aria-label={`${alt} unavailable`}>
      <span>[IMAGE ASSET UNAVAILABLE]</span>
    </div>
  ) : (
    <img className={className} src={src} alt={alt} loading={loading} fetchPriority={fetchPriority} onError={() => setFailed(true)} />
  )
}

function PersonPortrait({ person, featured = false }: { person: Person; featured?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false)
  const username = formatUsername(person.username)
  return (
    <article className={featured ? 'person person-featured' : 'person'}>
      {imageFailed ? (
        <span className="person-image-fallback" role="img" aria-label={`No profile image for ${person.displayName}`}>{person.displayName.slice(0, 1)}</span>
      ) : (
        <img className="person-image" src={person.image} alt={`${person.displayName} avatar`} loading="lazy" onError={() => setImageFailed(true)} />
      )}
      <div className="person-copy">
        <span className="eyebrow">{person.role}</span>
        <h3>{person.displayName}</h3>
        {username && <p className="username">{username}</p>}
        {person.description && <p className="person-description">{person.description}</p>}
      </div>
    </article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const screenshot = game.artwork.screenshots[0]
  const galleryScreenshots = game.artwork.screenshots.slice(1)
  const hasGallery = galleryScreenshots.length > 0
  const owner = game.creators.at(0)
  const ownerUsername = formatUsername(owner?.username)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a href="#home" className="brand" aria-label={`${game.name} home`}>
          <img src={game.artwork.icon} alt="" />
          <span>{game.name}</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close menu' : 'Menu'}
        </button>
        <nav id="site-nav" className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
          {navItems.filter((item) => item.href !== '#gallery' || hasGallery).map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <PlayLink className="nav-play" />
        </nav>
      </header>

      <main id="main">
        <section id="home" className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">{game.heroKicker}</p>
            <h1>{game.name}</h1>
            <p className="hero-description">{game.shortDescription}</p>
            <div className="hero-actions">
              <PlayLink className="button-primary" />
              <a className="button-secondary" href="#community">Find the community</a>
            </div>
            <p className="hero-note">{game.heroNote}</p>
          </div>
          <div className="hero-art">
            <GameImage className="game-banner" src={game.artwork.banner} alt={game.artwork.bannerAlt} loading="eager" />
            <figure className="hero-shot">
              {screenshot ? (
                <>
                  <GameImage className="" src={screenshot.src} alt={screenshot.alt} fetchPriority="high" />
                  <figcaption>{screenshot.caption} <span>{game.platform}</span></figcaption>
                </>
              ) : (
                <p className="media-placeholder">No screenshots available.</p>
              )}
            </figure>
          </div>
          <div className="hero-footer" aria-label="Game status and platform">
            <span><i className="status-dot" /> {game.status}</span>
            <span>{game.platform}</span>
            {isKnownGenre(game.genre) && <span>{game.genre}</span>}
          </div>
        </section>

        <section id="game" className="game-section section-wrap section-rule">
          <div className="section-heading">
            <p className="eyebrow">01 / About the game</p>
            <h2>A little about<br />this world.</h2>
          </div>
          <div className="game-details">
            <p className="body-lede">{game.description}</p>
            <dl className="facts-list">
              <div><dt>Platform</dt><dd>{game.platform}</dd></div>
              <div><dt>Genre</dt><dd>{game.genre}</dd></div>
              <div><dt>Visits</dt><dd>{game.visits}</dd></div>
              <div><dt>Created</dt><dd>{game.createdAt}</dd></div>
              <div><dt>Last updated</dt><dd>{game.updatedAt}</dd></div>
              <div><dt>Version</dt><dd>{game.version}</dd></div>
              <div><dt>Roblox owner</dt><dd>{owner ? `${owner.displayName}${ownerUsername ? ` · ${ownerUsername}` : ""}` : 'Owner information unavailable.'}</dd></div>
            </dl>
          </div>
        </section>

        <section className="origin-section">
          <div className="origin-inner section-wrap">
            <div>
              <p className="eyebrow">Where it began</p>
              <h2>Made for someone.<br />Shared with everyone.</h2>
            </div>
              <p className="origin-copy">{game.originStory}</p>
          </div>
          <img className="origin-icon" src={game.artwork.icon} alt="" loading="lazy" />
        </section>

        {hasGallery && (
          <section id="gallery" className="gallery-section section-wrap section-rule">
            <div className="gallery-heading">
              <div>
                <p className="eyebrow">02 / A look inside</p>
                <h2>From the game</h2>
              </div>
              <p>One glimpse of the place as it appears in Roblox.</p>
            </div>
            {galleryScreenshots.map((shot, index) => (
              <figure className="gallery-image" key={`${shot.src}-${index}`}>
                <GameImage className="" src={shot.src} alt={shot.alt} loading="lazy" />
                <figcaption><span>{shot.caption}</span><span>{String(index + 1).padStart(2, '0')} / {String(galleryScreenshots.length).padStart(2, '0')}</span></figcaption>
              </figure>
            ))}
          </section>
        )}

        <section id="creators" className="people-section section-wrap section-rule">
          <div className="people-heading">
            <div>
              <p className="eyebrow">{hasGallery ? '03' : '02'} / The people behind it</p>
              <h2>Creators &amp; project partners</h2>
            </div>
            <p>The people who made the project and brought it into the world.</p>
          </div>
          <div className="creator-list">
            {!owner ? (
              <p>Creator information unavailable.</p>
            ) : game.creators.map((person) => <PersonPortrait key={person.role} person={person} featured />)}
          </div>
        </section>

        <section id="admins" className="admins-section section-wrap">
          <div className="admins-heading">
            <p className="eyebrow">{hasGallery ? '04' : '03'} / Community staff</p>
            <h2>Admins</h2>
          </div>
          <div className="admin-list">
            {game.admins.map((person) => <PersonPortrait key={person.displayName} person={person} />)}
          </div>
        </section>

        <section id="community" className="community-section">
          <div className="community-inner section-wrap">
            <img className="community-mark" src={game.artwork.icon} alt="" loading="lazy" />
            <div className="community-copy">
              <p className="eyebrow">Come say hello</p>
              <h2>Find us around.</h2>
              <p>Play the game or follow along with the people behind it.</p>
            </div>
            <div className="community-actions">
              <PlayLink className="community-play" />
              <SocialAction kind="tiktok" label="Follow on TikTok" />
              <SocialAction kind="discord" label="Join the Discord" />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a href="#home" className="footer-brand">{game.name}</a>
        <p>A {game.platform} project by {ownerUsername ?? owner?.displayName ?? "its listed creators"}.</p>
        <a href="#home" className="back-top">Back to top ↑</a>
      </footer>
    </>
  )
}

export default App
