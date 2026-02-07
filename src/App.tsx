import { Routes, Route } from 'react-router-dom';
import VariantPicker from '@/components/shared/VariantPicker';
import GuidedTour from '@/components/shared/GuidedTour';
import V1Layout from '@/variants/v1/Layout';
import V2Layout from '@/variants/v2/Layout';
import V3Layout from '@/variants/v3/Layout';
import V4Layout from '@/variants/v4/Layout';
import V5Layout from '@/variants/v5/Layout';
import DocsPage from '@/pages/DocsPage';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <>
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
