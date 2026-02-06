import { motion } from 'framer-motion';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import type { TimelineStep } from '@/types';

interface CaseTimelineProps {
  steps: TimelineStep[];
  primaryColor?: string;
  className?: string;
}

const statusIcons = {
  completed: CheckCircle,
  'in-progress': Clock,
  pending: Circle,
};

export default function CaseTimeline({
  steps,
  primaryColor = '#00f0ff',
  className = '',
}: CaseTimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div
        className="absolute left-5 top-0 bottom-0 w-px"
        style={{ backgroundColor: `${primaryColor}22` }}
      />

      <div className="space-y-6">
        {steps.map((step, index) => {
          const StatusIcon = statusIcons[step.status];
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'in-progress';

          return (
            <motion.div
              key={step.id}
              className="relative flex gap-4 pl-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {/* Status icon */}
              <div className="relative z-10 flex-shrink-0 w-10 flex justify-center">
                <div
                  className="p-1 rounded-full"
                  style={{
                    backgroundColor: isActive ? `${primaryColor}22` : 'transparent',
                  }}
                >
                  <StatusIcon
                    size={18}
                    style={{
                      color: isCompleted
                        ? primaryColor
                        : isActive
                          ? primaryColor
                          : '#475569',
                    }}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-baseline gap-3">
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: isCompleted || isActive ? '#e2e8f0' : '#64748b' }}
                  >
                    {step.title}
                  </h4>
                  {step.date && (
                    <span className="text-xs text-gray-600 font-mono">{step.date}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
