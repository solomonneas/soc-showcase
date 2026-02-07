import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getLucideIcon } from '@/components/shared/getLucideIcon';
import type { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
  primaryColor?: string;
  className?: string;
}

const statusConfig: Record<Tool['status'], { label: string; color: string }> = {
  production: { label: 'Production', color: '#00ff88' },
  beta: { label: 'Beta', color: '#ffaa00' },
  development: { label: 'In Development', color: '#00f0ff' },
  planned: { label: 'Planned', color: '#666666' },
};

export default function ToolCard({ tool, primaryColor, className = '' }: ToolCardProps) {
  const status = statusConfig[tool.status];
  const iconColor = primaryColor ?? tool.color;

  // Dynamic icon lookup
  const IconComponent = getLucideIcon(tool.icon) as React.ComponentType<{ size?: number; color?: string; className?: string }>;

  return (
    <motion.div
      className={`relative group rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 transition-colors ${className}`}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${tool.color}08, transparent 40%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${iconColor}15` }}
          >
            <IconComponent size={22} color={iconColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
            <p className="text-sm text-gray-400">{tool.tagline}</p>
          </div>
        </div>

        {/* Status badge */}
        <span
          className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
          style={{
            color: status.color,
            backgroundColor: `${status.color}15`,
            border: `1px solid ${status.color}33`,
          }}
        >
          {status.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
        {tool.description}
      </p>

      {/* Features */}
      <ul className="space-y-1 mb-4">
        {tool.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-xs text-gray-500">
            <Icons.ChevronRight size={12} className="mt-0.5 shrink-0" style={{ color: tool.color }} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-1.5">
        {tool.techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/5"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
