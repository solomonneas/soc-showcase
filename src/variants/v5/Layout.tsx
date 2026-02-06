import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { variantThemes } from '@/data/themes';
import Hero from './Hero';
import Architecture from './Architecture';
import Tools from './Tools';
import Cases from './Cases';
import Pipeline from './Pipeline';
import About from './About';
import './styles.css';

const theme = variantThemes[4]!;

const navLinks = [
  { path: '/5', label: 'Home' },
  { path: '/5/architecture', label: 'Architecture' },
  { path: '/5/tools', label: 'Tools' },
  { path: '/5/cases', label: 'Cases' },
  { path: '/5/pipeline', label: 'Pipeline' },
  { path: '/5/about', label: 'About' },
];

export default function V5Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Glass nav on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-dm-sans" style={{ backgroundColor: '#0A0A0F', color: '#FAFAFA' }}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'v5-nav-glass v5-nav-scrolled' : 'v5-nav-glass'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo — left */}
          <Link to="/5" className="flex items-center gap-2.5 group">
            <div className="p-1.5 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.1))' }}>
              <Shield size={18} className="text-[#7C3AED]" />
            </div>
            <span className="font-space text-base font-bold tracking-tight v5-gradient-text">
              SOC Stack
            </span>
          </Link>

          {/* Links — center */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path ||
                (link.path === '/5' && location.pathname === '/5');
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#FAFAFA] bg-white/[0.06]'
                      : 'text-[#71717A] hover:text-[#A1A1AA] hover:bg-white/[0.03]'
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA + Variant switcher — right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.06] text-[#52525B] hover:text-[#A1A1AA] hover:border-white/[0.12] transition-colors font-jetbrains"
            >
              All Variants
            </Link>
            <Link
              to="/5/tools"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-all hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Explore
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#71717A] hover:text-[#A1A1AA] transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-white/[0.04]"
              style={{ backgroundColor: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)' }}
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-[#FAFAFA] bg-white/[0.06]'
                          : 'text-[#71717A] hover:text-[#A1A1AA]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-3 border-t border-white/[0.04] mt-3">
                  <Link
                    to="/"
                    className="block text-xs text-[#52525B] hover:text-[#A1A1AA] transition-colors font-jetbrains"
                  >
                    ← All Variants
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main content */}
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
