import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { variantThemes } from '@/data/themes';

export default function VariantPicker() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Shield size={28} className="text-cyan-400" />
            <h1 className="text-3xl font-bold text-white font-inter">
              Solomon's S³ Stack
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            Security Operations Center tools built by{' '}
            <span className="text-white font-medium">Solomon Neas</span>.
            Choose a design variant to explore.
          </motion.p>
        </div>
      </header>

      {/* Variant cards */}
      <main className="flex-1 px-6 py-12" data-tour="variant-picker">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {variantThemes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <Link
                to={`/${theme.id}`}
                className="group block rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-200"
              >
                {/* Color preview strip */}
                <div className="flex gap-1.5 mb-4">
                  <div
                    className="h-2 flex-1 rounded-full"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <div
                    className="h-2 flex-1 rounded-full"
                    style={{ backgroundColor: theme.secondaryColor }}
                  />
                  <div
                    className="h-2 flex-1 rounded-full"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                </div>

                {/* Variant info */}
                <div className="flex items-baseline justify-between mb-2">
                  <h2
                    className="text-lg font-bold"
                    style={{
                      color: theme.primaryColor,
                      fontFamily: theme.fontHeading,
                    }}
                  >
                    V{theme.id}
                  </h2>
                  <span className="text-xs text-gray-600 font-mono">
                    {theme.fontHeading}
                  </span>
                </div>

                <h3 className="text-white font-medium mb-1">{theme.name}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {theme.description}
                </p>

                {/* Font preview */}
                <div className="space-y-1 mb-4">
                  <div
                    className="text-xs text-gray-500"
                    style={{ fontFamily: theme.fontHeading }}
                  >
                    Heading: {theme.fontHeading}
                  </div>
                  <div
                    className="text-xs text-gray-500"
                    style={{ fontFamily: theme.fontBody }}
                  >
                    Body: {theme.fontBody}
                  </div>
                  <div
                    className="text-xs text-gray-500"
                    style={{ fontFamily: theme.fontMono }}
                  >
                    Mono: {theme.fontMono}
                  </div>
                </div>

                {/* Enter link */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                    style={{ color: theme.primaryColor }}
                  >
                    <span>Explore variant</span>
                    <ArrowRight size={16} />
                  </div>
                  <kbd className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-600 group-hover:text-gray-400 transition-colors">
                    {theme.id}
                  </kbd>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-6 text-center">
        <p className="text-sm text-gray-600">
          soc.solomonneas.dev — Built for the SOC community
        </p>
      </footer>
    </div>
  );
}
