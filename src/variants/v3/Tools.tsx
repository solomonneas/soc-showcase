import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { tools, toolCategories } from '@/data/tools';
import type { PageProps, Tool } from '@/types';

const statusConfig: Record<Tool['status'], { label: string; color: string }> = {
  production: { label: 'ONLINE', color: '#39FF14' },
  beta: { label: 'BETA', color: '#FFAA00' },
  development: { label: 'DEV', color: '#00F0FF' },
  planned: { label: 'PLANNED', color: '#5B7A8A' },
};

export default function Tools({ theme: _ }: PageProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[rgba(0,240,255,0.1)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="v3-section-label mb-2">// Arsenal</div>
            <h1 className="font-audiowide text-3xl md:text-4xl text-[#E0F7FF] mb-3 v3-chromatic-subtle">
              Security Tools
            </h1>
            <p className="font-rajdhani text-[#5B7A8A] max-w-2xl leading-relaxed">
              Nine MCP-integrated tools for threat detection, incident response, and security automation.
              Each tool bridges AI directly to security operations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-[rgba(0,240,255,0.05)]" style={{ background: 'rgba(0,240,255,0.02)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex flex-wrap gap-2">
            {toolCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="font-fira text-[10px] tracking-wider uppercase px-3 py-1.5 rounded transition-all"
                  style={{
                    color: isActive ? '#00F0FF' : '#5B7A8A',
                    background: isActive ? 'rgba(0,240,255,0.08)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(0,240,255,0.3)' : 'rgba(0,240,255,0.08)'}`,
                    textShadow: isActive ? '0 0 8px rgba(0,240,255,0.3)' : 'none',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tool Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((tool, i) => {
              const IconComponent = (
                Icons as Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>>
              )[tool.icon] ?? Icons.Box;
              const status = statusConfig[tool.status];

              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="v3-glass rounded-xl p-6 v3-gradient-border group relative overflow-hidden"
                >
                  {/* Scan line on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${tool.color}66, transparent)`,
                        animation: 'v3-scan-line 3s ease-in-out infinite',
                      }}
                    />
                  </div>

                  {/* Header: Icon + Name + Status */}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-lg"
                        style={{
                          background: `${tool.color}12`,
                          border: `1px solid ${tool.color}25`,
                        }}
                      >
                        <IconComponent
                          size={20}
                          style={{
                            color: tool.color,
                            filter: `drop-shadow(0 0 6px ${tool.color}60)`,
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-audiowide text-sm text-[#E0F7FF]">{tool.name}</h3>
                        <p className="font-rajdhani text-xs text-[#5B7A8A]">{tool.tagline}</p>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ background: status.color, boxShadow: `0 0 6px ${status.color}80` }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="font-fira text-[9px] tracking-wider" style={{ color: status.color }}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-rajdhani text-sm text-[#5B7A8A] leading-relaxed mb-4 line-clamp-3 relative z-10">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1 mb-4 relative z-10">
                    {tool.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 font-rajdhani text-xs text-[#5B7A8A]">
                        <Icons.ChevronRight
                          size={10}
                          className="mt-0.5 shrink-0"
                          style={{ color: tool.color }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 relative z-10">
                    {tool.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-fira text-[9px] px-2 py-0.5 rounded"
                        style={{
                          color: '#5B7A8A',
                          background: 'rgba(0,240,255,0.04)',
                          border: '1px solid rgba(0,240,255,0.08)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="border-t border-[rgba(0,240,255,0.1)]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-10 text-center"
          >
            {[
              { val: tools.filter((t) => t.status === 'production').length, label: 'Production', color: '#39FF14' },
              { val: tools.filter((t) => t.status === 'beta').length, label: 'Beta', color: '#FFAA00' },
              { val: tools.filter((t) => t.status === 'development').length, label: 'Development', color: '#00F0FF' },
              { val: tools.length, label: 'Total Tools', color: '#FF00FF' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-audiowide text-2xl mb-1"
                  style={{ color: stat.color, textShadow: `0 0 15px ${stat.color}40` }}
                >
                  {stat.val}
                </div>
                <div className="font-fira text-[10px] text-[#5B7A8A] tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
