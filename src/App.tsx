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
      if (num >= 1 && num <= 5) navigate(`/${num}`);
      else if (e.key === 'Escape' || e.key === '0') navigate('/');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);
  return null;
}

function DefaultVariantRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { defaultVariant } = useDefaultVariant(APP_ID);

  useEffect(() => {
    if (location.pathname === '/' && defaultVariant) {
      navigate(`/${defaultVariant}`, { replace: true });
    }
  }, [location.pathname, defaultVariant, navigate]);

  return null;
}

export default function App() {
  const location = useLocation();
  const { defaultVariant, setDefaultVariant } = useDefaultVariant(APP_ID);
  const variantMatch = location.pathname.match(/^\/([1-5])/);
  const currentVariant = variantMatch ? parseInt(variantMatch[1], 10) : null;

  return (
    <>
      <VariantKeyboardNav />
      <DefaultVariantRedirect />
      <KeyboardHints />
      <VariantSettings
        currentVariant={currentVariant}
        defaultVariant={defaultVariant}
        onSetDefault={setDefaultVariant}
        variantNames={VARIANT_NAMES}
      />
      <Routes>
        <Route path="/" element={<VariantPicker />} />
        <Route path="/1/*" element={<V1Layout />} />
        <Route path="/2/*" element={<V2Layout />} />
        <Route path="/3/*" element={<V3Layout />} />
        <Route path="/4/*" element={<V4Layout />} />
        <Route path="/5/*" element={<V5Layout />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/:variant/docs" element={<DocsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GuidedTour />
    </>
  );
}
