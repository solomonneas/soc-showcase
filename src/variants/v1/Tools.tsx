import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getLucideIcon } from '@/components/shared/getLucideIcon';
import { tools, toolCategories } from '@/data/tools';
import type { PageProps, Tool } from '@/types';

const statusConfig: Record<Tool['status'], { label: string; dotClass: string; color: string }> = {
  production: { label: 'OPERATIONAL', dotClass: 'v1-status-dot--green', color: '#22C55E' },
  beta: { label: 'TESTING', dotClass: 'v1-status-dot--amber', color: '#F59E0B' },
  development: { label: 'IN DEV', dotClass: 'v1-status-dot--cyan', color: '#06B6D4' },
  planned: { label: 'PLANNED', dotClass: 'v1-status-dot--red', color: '#EF4444' },
};

export default function Tools({ theme: _ }: PageProps) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? tools : tools.filter((t) => t.category === filter);

  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-cyan-500/50" />
            <span className="font-jetbrains text-[11px] tracking-[0.3em] uppercase text-cyan-500/70">
              Tool Arsenal
            </span>
          </div>
          <h2 className="font-chakra font-bold text-3xl md:text-4xl uppercase tracking-wider text-slate-100 mb-3">
            Security Tools{' '}
            <span className="text-cyan-400">Status Board</span>
          </h2>
          <p className="font-exo text-slate-400 max-w-2xl">
            Nine SOC tools spanning threat hunting, incident response, and security
            automation — all built to integrate with AI through MCP.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {toolCategories.map((cat) => {
            const active = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`font-jetbrains text-[10px] px-3 py-1.5 rounded uppercase tracking-wider transition-all ${
                  active
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400'
                    : 'bg-transparent border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                } border`}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Tool grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool, i) => {
            const status = statusConfig[tool.status];
            const IconComponent = getLucideIcon(tool.icon) as React.ComponentType<{ size?: number; className?: string }>;

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="v1-tool-card rounded-lg p-5 group"
              >
                {/* Top bar with accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)`,
                    opacity: 0.4,
                  }}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded"
                      style={{ backgroundColor: `${tool.color}12` }}
                    >
                      <IconComponent
                        size={20}
                        className="transition-colors"
                        style={{ color: tool.color } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <h3 className="font-chakra font-bold text-base uppercase tracking-wider text-slate-100">
                        {tool.name}
                      </h3>
                      <p className="font-exo text-[11px] text-slate-500">{tool.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Status row */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`v1-status-dot ${status.dotClass}`} />
                  <span
                    className="font-jetbrains text-[10px] font-medium uppercase tracking-wider"
                    style={{ color: status.color }}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Description */}
                <p className="font-jetbrains text-[11px] text-slate-500 leading-relaxed mb-4 line-clamp-3">
                  {tool.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tool.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-jetbrains text-[10px] px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/30 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features preview */}
                <div className="border-t border-slate-700/30 pt-3">
                  {tool.features.slice(0, 2).map((feat) => (
                    <div key={feat} className="flex items-start gap-2 mb-1">
                      <Icons.ChevronRight
                        size={10}
                        className="mt-1 shrink-0"
                        style={{ color: tool.color }}
                      />
                      <span className="font-exo text-[11px] text-slate-500">{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { count: tools.filter((t) => t.status === 'production').length, label: 'Production', color: '#22C55E' },
            { count: tools.filter((t) => t.status === 'beta').length, label: 'Beta', color: '#F59E0B' },
            { count: tools.filter((t) => t.status === 'development').length, label: 'Development', color: '#06B6D4' },
            { count: tools.length, label: 'Total', color: '#E2E8F0' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-jetbrains font-bold text-xl" style={{ color: stat.color }}>
                {stat.count}
              </div>
              <div className="font-chakra text-[10px] font-medium uppercase tracking-wider text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
