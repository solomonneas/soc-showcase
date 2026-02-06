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

const theme = variantThemes[1]!;

const navLinks = [
  { path: '/2', label: 'Home' },
  { path: '/2/architecture', label: 'Architecture' },
  { path: '/2/tools', label: 'Tools' },
  { path: '/2/cases', label: 'Cases' },
  { path: '/2/pipeline', label: 'Pipeline' },
  { path: '/2/about', label: 'About' },
];

export default function V2Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bgColor, fontFamily: theme.fontBody }}>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md bg-black/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/2" className="flex items-center gap-2">
            <Shield size={20} style={{ color: theme.primaryColor }} />
            <span
              className="text-lg font-bold"
              style={{ fontFamily: theme.fontHeading, color: theme.primaryColor }}
            >
              SOC Showcase
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm transition-colors"
                style={{
                  fontFamily: theme.fontHeading,
                  color: location.pathname === link.path ? theme.primaryColor : '#94a3b8',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              className="text-xs px-3 py-1.5 rounded-md border border-white/10 text-gray-500 hover:text-white transition-colors"
            >
              All Variants
            </Link>
          </div>

          <button
            className="md:hidden text-gray-400"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/5 bg-black/90 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm"
                    style={{
                      color: location.pathname === link.path ? theme.primaryColor : '#94a3b8',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        <Routes>
          <Route index element={<Hero theme={theme} />} />
          <Route path="architecture" element={<Architecture theme={theme} />} />
          <Route path="tools" element={<Tools theme={theme} />} />
          <Route path="cases" element={<Cases theme={theme} />} />
          <Route path="pipeline" element={<Pipeline theme={theme} />} />
          <Route path="about" element={<About theme={theme} />} />
        </Routes>
      </main>
    </div>
  );
}
