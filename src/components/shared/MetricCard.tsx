import { motion } from 'framer-motion';
import { TrendingDown, ArrowRight } from 'lucide-react';
import type { Metric } from '@/types';

interface MetricCardProps {
  metric: Metric;
  primaryColor?: string;
  accentColor?: string;
  index?: number;
  className?: string;
}

export default function MetricCard({
  metric,
  primaryColor = '#00f0ff',
  accentColor = '#00ff88',
  index = 0,
  className = '',
}: MetricCardProps) {
  return (
    <motion.div
      className={`relative rounded-lg border border-white/10 bg-white/[0.03] p-5 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      {/* Label */}
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
        {metric.label}
      </div>

      {/* Before → After */}
      <div className="flex items-center gap-3 mb-3">
        {/* Before */}
        <div className="flex-1">
          <div className="text-xs text-gray-600 mb-1">Before</div>
          <div className="text-lg font-bold text-gray-400 font-mono">
            {metric.before}
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight size={16} className="text-gray-600 shrink-0" />

        {/* After */}
        <div className="flex-1">
          <div className="text-xs text-gray-600 mb-1">After</div>
          <div
            className="text-lg font-bold font-mono"
            style={{ color: accentColor }}
          >
            {metric.after}
          </div>
        </div>
      </div>

      {/* Reduction badge */}
      <div
        className="flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1 rounded-md w-fit"
        style={{
          color: primaryColor,
          backgroundColor: `${primaryColor}15`,
        }}
      >
        <TrendingDown size={14} />
        <span>{metric.reduction}</span>
        {metric.unit && (
          <span className="text-xs text-gray-500 font-normal ml-1">
            {metric.unit}
          </span>
        )}
      </div>
    </motion.div>
  );
}
