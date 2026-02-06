import { motion } from 'framer-motion';
import { tools } from '@/data/tools';
import ToolCard from '@/components/shared/ToolCard';
import type { PageProps } from '@/types';

export default function Tools({ theme }: PageProps) {
  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: theme.fontHeading, color: theme.primaryColor }}
          >
            Tools
          </h2>
          <p className="text-gray-400 max-w-2xl" style={{ fontFamily: theme.fontBody }}>
            Nine SOC tools spanning threat hunting, incident response, and security
            automation — all built to integrate with AI through MCP.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} primaryColor={theme.primaryColor} />
          ))}
        </div>
      </div>
    </section>
  );
}
