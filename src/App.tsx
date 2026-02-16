import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import VariantPicker from '@/components/shared/VariantPicker';
import GuidedTour from '@/components/shared/GuidedTour';
import V1Layout from '@/variants/v1/Layout';
import V2Layout from '@/variants/v2/Layout';
import V3Layout from '@/variants/v3/Layout';
import V4Layout from '@/variants/v4/Layout';
import V5Layout from '@/variants/v5/Layout';
import DocsPage from '@/pages/DocsPage';
import NotFound from '@/pages/NotFound';
import KeyboardHints from '@/components/shared/KeyboardHints';
import VariantSettings from '@/components/shared/VariantSettings';
import { useDefaultVariant } from '@/hooks/useDefaultVariant';
import ScrollToTop from '@/components/shared/ScrollToTop';

const APP_ID = 'soc-showcase';
const VARIANT_NAMES = [
  'Mission Control',
  'Cyber Command',
  'Threat Matrix',
  'Neural Grid',
  'Dark Protocol',
];

function VariantKeyboardNav() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 5) navigate(`/dev/${num}`);
      else if (e.key === 'Escape' || e.key === '0') navigate('/');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);
  return null;
}

function DefaultVariantRedirect({ defaultVariant }: { defaultVariant: number | null }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && defaultVariant) {
      navigate(`/${defaultVariant}`, { replace: true });
    }
  }, [location.pathname, defaultVariant, navigate]);

  return null;
}

function GitHubFooter() {
  return (
    <a
      href="https://github.com/solomonneas/soc-showcase"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed', bottom: 8, right: 12, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, color: '#888', textDecoration: 'none',
        opacity: 0.4, transition: 'opacity 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}
    >
      <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
      Solomon Neas
    </a>
  );
}

export default function App() {
  const location = useLocation();
  const { defaultVariant, setDefaultVariant } = useDefaultVariant(APP_ID);
  const variantMatch = location.pathname.match(/^\/([1-5])/);
  const currentVariant = variantMatch?.[1] ? parseInt(variantMatch[1], 10) : null;

  return (
    <>
      <ScrollToTop />
      <VariantKeyboardNav />
      {/* DefaultVariantRedirect removed — V2 is now root */}
      <KeyboardHints />
      <VariantSettings
        currentVariant={currentVariant}
        defaultVariant={defaultVariant}
        onSetDefault={setDefaultVariant}
        variantNames={VARIANT_NAMES}
      />
      <Routes>
        <Route path="/*" element={<V2Layout />} />
        <Route path="/dev" element={<VariantPicker />} />
        <Route path="/dev/1/*" element={<V1Layout />} />
        <Route path="/dev/2/*" element={<V2Layout />} />
        <Route path="/dev/3/*" element={<V3Layout />} />
        <Route path="/dev/4/*" element={<V4Layout />} />
        <Route path="/dev/5/*" element={<V5Layout />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/:variant/docs" element={<DocsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GuidedTour />
      <GitHubFooter />
    </>
  );
}
