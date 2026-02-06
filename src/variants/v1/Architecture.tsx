import { motion } from 'framer-motion';
import ArchitectureGraph from '@/components/shared/ArchitectureGraph';
import type { PageProps } from '@/types';

export default function Architecture({ theme }: PageProps) {
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fontHeading, color: theme.primaryColor }}
          >
            Architecture
          </h2>
          <p className="text-gray-400 max-w-2xl" style={{ fontFamily: theme.fontBody }}>
            Three-layer architecture connecting AI assistants to security tools through
            the Model Context Protocol. Hover over nodes to explore connections.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ArchitectureGraph
            primaryColor={theme.primaryColor}
            secondaryColor={theme.secondaryColor}
            accentColor={theme.accentColor}
          />
        </motion.div>
      </div>
    </section>
  );
}
