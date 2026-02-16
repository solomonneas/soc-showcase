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
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#64748B] font-franklin">
            <Shield size={14} className="text-[#2563EB]" />
            <span>S³ Stack Documentation</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>Solomon Neas</span>
          </div>
          <div className="font-fira text-[11px] text-[#94A3B8]">
            soc.solomonneas.dev
          </div>
        </div>
      </footer>
    </div>
  );
}
