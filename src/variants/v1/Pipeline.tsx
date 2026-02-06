import { useState } from 'react';
import { motion } from 'framer-motion';
import { pipelineSteps } from '@/data/pipeline';
import AnimatedDataFlow from '@/components/shared/AnimatedDataFlow';
import PipelineStage from '@/components/shared/PipelineStage';
import type { PageProps } from '@/types';

export default function Pipeline({ theme }: PageProps) {
  const [_activeStep, _setActiveStep] = useState<number | null>(null);

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
            SOC Pipeline
          </h2>
          <p className="text-gray-400 max-w-2xl" style={{ fontFamily: theme.fontBody }}>
            Ten-stage incident response pipeline from alert ingestion through
            detection tuning. Each stage is AI-augmented for speed and accuracy.
          </p>
        </motion.div>

        {/* Visual flow */}
        <div className="mb-12">
          <AnimatedDataFlow
            primaryColor={theme.primaryColor}
            secondaryColor={theme.secondaryColor}
            accentColor={theme.accentColor}
          />
        </div>

        {/* Stage cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {pipelineSteps.map((step, i) => (
            <PipelineStage
              key={step.id}
              step={step}
              primaryColor={theme.primaryColor}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
