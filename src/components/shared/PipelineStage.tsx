import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getLucideIcon } from '@/components/shared/getLucideIcon';
import type { PipelineStep } from '@/types';

interface PipelineStageProps {
  step: PipelineStep;
  isActive?: boolean;
  primaryColor?: string;
  index?: number;
  className?: string;
}

export default function PipelineStage({
  step,
  isActive = false,
  primaryColor,
  index = 0,
  className = '',
}: PipelineStageProps) {
  const color = primaryColor ?? step.color;
  const IconComponent = getLucideIcon(step.icon, Icons.Circle) as React.ComponentType<{ size?: number; color?: string; className?: string }>;

  return (
    <motion.div
      className={`relative rounded-lg border p-4 transition-colors ${
        isActive
          ? 'border-white/20 bg-white/[0.06]'
          : 'border-white/5 bg-white/[0.02] hover:border-white/10'
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      {/* Step number and icon */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold"
          style={{
            backgroundColor: `${color}15`,
            color: color,
            border: `1px solid ${color}33`,
          }}
        >
          {step.order}
        </div>
        <IconComponent size={16} color={color} />
        <h4 className="text-sm font-semibold text-white flex-1">{step.name}</h4>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed ml-11">
        {step.description}
      </p>

      {/* Inputs/Outputs */}
      {(step.inputs || step.outputs) && (
        <div className="mt-3 ml-11 flex gap-4 text-xs">
          {step.inputs && step.inputs.length > 0 && (
            <div>
              <span className="text-gray-600 font-medium">In:</span>{' '}
              <span className="text-gray-500">{step.inputs.join(', ')}</span>
            </div>
          )}
          {step.outputs && step.outputs.length > 0 && (
            <div>
              <span className="text-gray-600 font-medium">Out:</span>{' '}
              <span className="text-gray-500">{step.outputs.join(', ')}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
