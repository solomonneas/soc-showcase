import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Radio, Wifi, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { variantThemes } from '@/data/themes';
import Hero from './Hero';
import Architecture from './Architecture';
import Tools from './Tools';
import Cases from './Cases';
import Pipeline from './Pipeline';
import About from './About';
import './styles.css';

const theme = variantThemes[0]!;

const navLinks = [
  { path: '/1', label: 'Command' },
  { path: '/1/architecture', label: 'Architecture' },
  { path: '/1/tools', label: 'Arsenal' },
  { path: '/1/cases', label: 'Operations' },
  { path: '/1/pipeline', label: 'Pipeline' },
  { path: '/1/about', label: 'Operator' },
];

function StatusClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="font-jetbrains tabular-nums">
      {time.toISOString().slice(0, 19).replace('T', ' ')}Z
    </span>
  );
}

export default function V1Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/1') return location.pathname === '/1';
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="min-h-screen flex flex-col v1-grid-bg"
      style={{ backgroundColor: '#0A0E17', fontFamily: '"Exo 2", sans-serif' }}
    >
      {/* Classification Banner */}
      <div className="v1-classification-banner">
        UNCLASSIFIED // SOC STACK PORTFOLIO // SOLOMON NEAS
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-cyan-500/10 backdrop-blur-xl bg-[#0A0E17]/90">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/1" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Shield size={20} className="text-cyan-400" />
              <motion.div
                className="absolute -inset-1 rounded-full border border-cyan-400/30"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="font-chakra font-bold text-sm tracking-wider uppercase text-cyan-400">
              SOC Showcase
            </span>
            <span className="hidden sm:inline text-[10px] font-jetbrains text-slate-500 ml-1">
              v1.0
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`v1-nav-link px-3 py-2 rounded ${
                    active
                      ? 'v1-nav-link--active text-cyan-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="w-px h-5 bg-slate-700 mx-2" />
            <Link
              to="/"
              className="text-[10px] font-jetbrains px-2.5 py-1.5 rounded border border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500 transition-colors uppercase tracking-wider"
            >
              Variants
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-400 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-cyan-500/10 bg-[#0A0E17]/95 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-3 py-2 rounded text-sm font-chakra uppercase tracking-wider ${
                        active
                          ? 'text-cyan-400 bg-cyan-400/5'
                          : 'text-slate-400'
                      }`}
                    >
                      {active && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                      )}
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-2 border-t border-slate-800">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-xs font-jetbrains text-slate-500"
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
      <main className="flex-1">
        <Routes>
          <Route index element={<Hero theme={theme} />} />
          <Route path="architecture" element={<Architecture theme={theme} />} />
          <Route path="tools" element={<Tools theme={theme} />} />
          <Route path="cases" element={<Cases theme={theme} />} />
          <Route path="pipeline" element={<Pipeline theme={theme} />} />
          <Route path="about" element={<About theme={theme} />} />
        </Routes>
      </main>

      {/* Status Bar */}
      <footer className="sticky bottom-0 z-40 bg-[#0A0E17] border-t border-cyan-500/10 px-4 md:px-6 py-2 flex items-center justify-between text-[10px] font-jetbrains text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Radio size={10} className="text-green-500" />
            <span className="text-green-500">SYSTEMS NOMINAL</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Wifi size={10} className="text-cyan-500" />
            <span>7 MCP CONNECTED</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={10} />
          <StatusClock />
        </div>
      </footer>

      {/* Scanline overlay */}
      <div className="v1-scanlines" />
    </div>
  );
}
