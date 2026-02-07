import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 text-center">
      <Shield size={48} className="text-cyan-400 mb-6 opacity-50" />
      <h1 className="text-6xl font-bold text-white mb-2 font-mono">404</h1>
      <p className="text-xl text-gray-400 mb-8">
        Page not found — this sector is uncharted.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Return to Base
      </Link>
    </div>
  );
}
