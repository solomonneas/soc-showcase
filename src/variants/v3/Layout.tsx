import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
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

const theme = variantThemes[2]!;

const navLinks = [
  { path: '/3', label: 'Home' },
  { path: '/3/architecture', label: 'Architecture' },
  { path: '/3/tools', label: 'Tools' },
  { path: '/3/cases', label: 'Cases' },
  { path: '/3/pipeline', label: 'Pipeline' },
  { path: '/3/about', label: 'About' },
];

function HudStatusBar() {
  return (
    <div className="v3-status-bar fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-6 flex-wrap">
      <span className="flex items-center gap-2">
        <span className="v3-status-dot" />
        <span>Systems: <span className="v3-glow-green">Online</span></span>
      </span>
      <span className="text-[#5B7A8A]">|</span>
      <span>MCP Servers: <span className="v3-glow-cyan">7/7</span></span>
      <span className="text-[#5B7A8A]">|</span>
      <span>Threat Level: <span className="v3-glow-green">Nominal</span></span>
      <span className="text-[#5B7A8A]">|</span>
      <span className="text-[#5B7A8A] hidden sm:inline">
        {new Date().toISOString().replace('T', ' ').slice(0, 19)} UTC
      </span>
    </div>
  );
}

export default function V3Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/3') return location.pathname === '/3';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="v3-page">
      {/* Background effects */}
      <div className="v3-hex-grid" />
      <div className="v3-scanlines" />
      <div className="v3-scanline-sweep" />

      {/* Navigation */}
      <nav className="v3-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link to="/3" className="flex items-center gap-2.5">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Shield size={18} className="text-[#00F0FF]" style={{ filter: 'drop-shadow(0 0 6px rgba(0,240,255,0.5))' }} />
            </motion.div>
            <span className="font-audiowide text-sm tracking-wider text-[#00F0FF]" style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}>
              SOC<span className="text-[#FF00FF]">:</span>HUD
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`v3-nav-link ${isActive(link.path) ? 'v3-nav-link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-4 bg-[rgba(0,240,255,0.15)] mx-2" />
            <Link
              to="/"
              className="font-fira text-[10px] px-3 py-1.5 rounded border border-[rgba(0,240,255,0.15)] text-[#5B7A8A] hover:text-[#E0F7FF] hover:border-[rgba(0,240,255,0.3)] transition-colors"
            >
              All Variants
            </Link>
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden text-[#5B7A8A] hover:text-[#00F0FF] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[rgba(0,240,255,0.1)] overflow-hidden"
              style={{ background: 'rgba(5,5,16,0.95)' }}
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded text-sm font-audiowide tracking-wider transition-colors ${
                      isActive(link.path)
                        ? 'text-[#00F0FF] bg-[rgba(0,240,255,0.05)]'
                        : 'text-[#5B7A8A] hover:text-[#E0F7FF]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-[rgba(0,240,255,0.1)]">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-xs font-fira text-[#5B7A8A]"
                  >
                    ← All Variants
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Content */}
      <main className="relative z-10 pt-14 pb-8">
        <Routes>
          <Route index element={<Hero theme={theme} />} />
          <Route path="architecture" element={<Architecture theme={theme} />} />
          <Route path="tools" element={<Tools theme={theme} />} />
          <Route path="cases" element={<Cases theme={theme} />} />
          <Route path="pipeline" element={<Pipeline theme={theme} />} />
          <Route path="about" element={<About theme={theme} />} />
        </Routes>
      </main>

      {/* Persistent HUD Status Bar */}
      <HudStatusBar />
    </div>
  );
}
