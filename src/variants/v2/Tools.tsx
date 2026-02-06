import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { tools, toolCategories } from '@/data/tools';
import type { PageProps, Tool } from '@/types';

const statusConfig: Record<Tool['status'], { label: string; cssClass: string }> = {
  production: { label: 'Production', cssClass: 'v2-status--production' },
  beta: { label: 'Beta', cssClass: 'v2-status--beta' },
  development: { label: 'Development', cssClass: 'v2-status--development' },
  planned: { label: 'Planned', cssClass: 'v2-status--planned' },
};

export default function Tools({ theme: _ }: PageProps) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? tools : tools.filter((t) => t.category === filter);

  return (
    <section className="font-franklin">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="v2-section-label">Tools</div>
            <h1 className="font-space font-bold text-3xl md:text-4xl text-[#0F172A] mb-3">
              Security Tool Suite
            </h1>
            <p className="text-[#64748B] max-w-2xl leading-relaxed">
              Nine security tools spanning threat hunting, incident response, and automation.
              All built to integrate with AI through the Model Context Protocol.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {toolCategories.map((cat) => {
              const active = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`font-space text-xs font-medium px-3 py-1.5 rounded-md border transition-all ${
                    active
                      ? 'bg-[#DBEAFE] border-[#BFDBFE] text-[#2563EB]'
                      : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:border-[#CBD5E1]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Tool Grid */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool, i) => {
              const status = statusConfig[tool.status];
              const IconComponent = (
                Icons as Record<string, React.ComponentType<{ size?: number; className?: string }>>
              )[tool.icon] ?? Icons.Box;

              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="v2-card group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-[#F1F5F9] group-hover:bg-[#DBEAFE] transition-colors">
                        <IconComponent size={20} className="text-[#2563EB]" />
                      </div>
                      <div>
                        <h3 className="font-space font-semibold text-[#0F172A]">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-[#94A3B8]">{tool.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mb-4">
                    <span className={`v2-status ${status.cssClass}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#64748B] leading-relaxed mb-4 line-clamp-3">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {tool.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-xs text-[#64748B]"
                      >
                        <Icons.ChevronRight
                          size={12}
                          className="mt-0.5 shrink-0 text-[#2563EB]"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Badges */}
                  <div className="pt-4 border-t border-[#F1F5F9]">
                    <div className="flex flex-wrap gap-1.5">
                      {tool.techStack.map((tech) => (
                        <span key={tech} className="v2-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-10 text-center"
          >
            {[
              { count: tools.filter((t) => t.status === 'production').length, label: 'Production' },
              { count: tools.filter((t) => t.status === 'beta').length, label: 'Beta' },
              { count: tools.filter((t) => t.status === 'development').length, label: 'Development' },
              { count: tools.length, label: 'Total Tools' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-space font-bold text-2xl text-[#0F172A]">
                  {stat.count}
                </div>
                <div className="font-fira text-xs text-[#64748B] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
