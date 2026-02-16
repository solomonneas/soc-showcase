import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { variantThemes } from '@/data/themes';
import Hero from './Hero';
import Architecture from './Architecture';
import Tools from './Tools';
import Cases from './Cases';
import Pipeline from './Pipeline';
import About from './About';
import './styles.css';

const theme = variantThemes[1]!;

const navLinks = [
  { path: '/', label: 'Overview' },
  { path: '/architecture', label: 'Architecture' },
  { path: '/tools', label: 'Tools' },
  { path: '/cases', label: 'Case Studies' },
  { path: '/pipeline', label: 'Pipeline' },
  { path: '/about', label: 'About' },
];

export default function V2Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="v2-page">
      {/* Navigation */}
      <nav className="v2-nav sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <Shield size={20} className="text-[#2563EB]" />
            <span className="font-space font-bold text-base text-[#0F172A] tracking-tight">
              S³ Stack
            </span>
            <span className="hidden sm:inline font-fira text-[10px] text-[#94A3B8] ml-0.5">
              docs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`v2-nav-link ${active ? 'v2-nav-link--active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#64748B] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="v2-mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="v2-mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[#E2E8F0] bg-white overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-space font-medium transition-colors ${
                        active
                          ? 'text-[#2563EB] bg-[#DBEAFE]'
                          : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      {active && <ChevronRight size={14} />}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Content */}
      <main>
        <Routes>
          <Route index element={<Hero theme={theme} />} />
          <Route path="architecture" element={<Architecture theme={theme} />} />
          <Route path="tools" element={<Tools theme={theme} />} />
          <Route path="cases" element={<Cases theme={theme} />} />
          <Route path="pipeline" element={<Pipeline theme={theme} />} />
          <Route path="about" element={<About theme={theme} />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-sm text-[#64748B] font-franklin">
              <Shield size={14} className="text-[#2563EB]" />
              <span>S³ Stack</span>
              <span className="text-[#CBD5E1]">·</span>
              <span>Solomon Neas</span>
            </div>
            <div className="flex items-center gap-4">
              {/* GitHub */}
              <a
                href="https://github.com/solomonneas/soc-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#64748B] hover:text-[#1E293B] transition-colors text-xs font-fira"
                title="View source on GitHub"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                <span>GitHub</span>
              </a>
              {/* Portfolio */}
              <a
                href="https://solomonneas.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#64748B] hover:text-[#1E293B] transition-colors text-xs font-fira"
                title="Portfolio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span>solomonneas.dev</span>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/solomonneas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#64748B] hover:text-[#0A66C2] transition-colors text-xs font-fira"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              {/* Email */}
              <a
                href="mailto:me@solomonneas.dev"
                className="flex items-center gap-1.5 text-[#64748B] hover:text-[#2563EB] transition-colors text-xs font-fira"
                title="Contact me"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
