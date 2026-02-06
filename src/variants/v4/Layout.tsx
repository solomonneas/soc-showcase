import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { variantThemes } from '../../data/themes';
import Hero from './Hero';
import Architecture from './Architecture';
import Tools from './Tools';
import Cases from './Cases';
import Pipeline from './Pipeline';
import About from './About';
import './styles.css';

const theme = variantThemes[3]!;

const navLinks = [
  { path: '/4', label: '§1 Abstract', section: '1' },
  { path: '/4/architecture', label: '§2 Architecture', section: '2' },
  { path: '/4/tools', label: '§3 Components', section: '3' },
  { path: '/4/cases', label: '§4 Cases', section: '4' },
  { path: '/4/pipeline', label: '§5 Pipeline', section: '5' },
  { path: '/4/about', label: '§6 References', section: '6' },
];

export default function V4Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/4') return location.pathname === '/4';
    return location.pathname.startsWith(path);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        fontFamily: "'Crimson Pro', 'Georgia', serif",
      }}
    >
      {/* Academic-style navigation */}
      <nav className="paper-nav">
        <div className="paper-nav-inner">
          {/* Paper title (compact) */}
          <Link
            to="/4"
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#1C1917',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            SOC Stack
          </Link>

          {/* Section links */}
          <div className="paper-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`paper-nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}

            {/* All Variants link */}
            <Link
              to="/"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.7rem',
                color: '#57534E',
                textDecoration: 'none',
                border: '1px solid #D6D3D1',
                padding: '0.2rem 0.5rem',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              ← All Variants
            </Link>
          </div>
        </div>
      </nav>

      {/* Paper body */}
      <main style={{ backgroundColor: '#FFFFFF' }}>
        <Routes>
          <Route index element={<Hero theme={theme} />} />
          <Route path="architecture" element={<Architecture theme={theme} />} />
          <Route path="tools" element={<Tools theme={theme} />} />
          <Route path="cases" element={<Cases theme={theme} />} />
          <Route path="pipeline" element={<Pipeline theme={theme} />} />
          <Route path="about" element={<About theme={theme} />} />
        </Routes>
      </main>

      {/* Footer (minimal, academic) */}
      <footer
        style={{
          borderTop: '1px solid #D6D3D1',
          padding: '1.5rem',
          textAlign: 'center',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.7rem',
          color: '#57534E',
        }}
      >
        SOC Stack — soc.solomonneas.dev — © 2026 Solomon Neas
      </footer>
    </div>
  );
}
