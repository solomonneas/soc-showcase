import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getLucideIcon } from '@/components/shared/getLucideIcon';
import { tools, toolCategories } from '@/data/tools';
import type { PageProps, Tool } from '@/types';
import './styles.css';

const statusConfig: Record<Tool['status'], { label: string; dotColor: string }> = {
  production: { label: 'Production', dotColor: '#10B981' },
  beta: { label: 'Beta', dotColor: '#F59E0B' },
  development: { label: 'In Development', dotColor: '#3B82F6' },
  planned: { label: 'Planned', dotColor: '#71717A' },
};

const featuredTools = ['bro-hunter', 'playbook-forge'];

function ToolBentoCard({ tool, featured }: { tool: Tool; featured: boolean }) {
  const status = statusConfig[tool.status];
  const IconComponent = getLucideIcon(tool.icon) as React.ComponentType<{ size?: number; className?: string }>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative v5-gradient-border rounded-2xl overflow-hidden ${featured ? 'v5-bento-featured' : ''}`}
    >
      {/* Glass body */}
      <div className="relative h-full v5-glass-hover rounded-2xl p-6 flex flex-col">
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at 50% 30%, rgba(124,58,237,0.06), transparent 60%)`,
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.08))' }}
            >
              <IconComponent size={featured ? 24 : 20} className="text-[#7C3AED]" />
            </div>
            <div>
              <h3 className="font-space text-lg font-semibold text-[#FAFAFA] group-hover:text-white transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-[#71717A] font-dm-sans">{tool.tagline}</p>
            </div>
          </div>

          {/* Status badge */}
          <span className="inline-flex items-center gap-1.5 text-xs font-jetbrains px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#A1A1AA] whitespace-nowrap">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: status.dotColor }}
            />
            {status.label}
          </span>
        </div>

        {/* Description */}
        <p className={`relative z-10 text-sm text-[#A1A1AA] font-dm-sans leading-relaxed mb-5 ${featured ? '' : 'line-clamp-3'}`}>
          {tool.description}
        </p>

        {/* Features (only on featured) */}
        {featured && (
          <ul className="relative z-10 space-y-2 mb-5">
            {tool.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[#A1A1AA] font-dm-sans">
                <Icons.ChevronRight size={14} className="mt-0.5 shrink-0 text-[#7C3AED]" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Tech stack pills */}
        <div className="relative z-10 flex flex-wrap gap-1.5 mt-auto">
          {tool.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-jetbrains px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[#71717A]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Tools(_props: PageProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  // Sort: featured first, then the rest
  const sorted = [...filtered].sort((a, b) => {
    const aFeat = featuredTools.includes(a.id) ? -1 : 0;
    const bFeat = featuredTools.includes(b.id) ? -1 : 0;
    return aFeat - bFeat;
  });

  return (
    <section className="v5-mesh-bg min-h-screen py-24 px-6" style={{ backgroundColor: '#0A0A0F' }}>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="v5-section-label justify-center mb-4">Security Arsenal</span>
          <h2 className="font-space text-4xl md:text-5xl font-bold text-[#FAFAFA] mt-4 mb-4">
            Purpose-Built <span className="v5-gradient-text">Tools</span>
          </h2>
          <p className="font-dm-sans text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            Nine specialized security tools covering threat hunting, incident response,
            threat intelligence, and network monitoring.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {toolCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-dm-sans font-medium transition-all ${
                  isActive
                    ? 'text-[#FAFAFA] border-[#7C3AED]/50'
                    : 'text-[#71717A] border-white/[0.06] hover:text-[#A1A1AA] hover:border-white/[0.12]'
                } border`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.1))',
                } : { background: 'rgba(255,255,255,0.02)' }}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Bento Grid */}
        <div className="v5-bento-grid">
          {sorted.map((tool) => (
            <ToolBentoCard
              key={tool.id}
              tool={tool}
              featured={featuredTools.includes(tool.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
