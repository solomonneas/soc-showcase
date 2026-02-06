import { useState } from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '@/data/cases';
import CaseTimeline from '@/components/shared/CaseTimeline';
import MetricCard from '@/components/shared/MetricCard';
import type { PageProps } from '@/types';

export default function Cases({ theme }: PageProps) {
  const [activeCase, setActiveCase] = useState(0);
  const currentCase = caseStudies[activeCase]!;

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
            Case Studies
          </h2>
          <p className="text-gray-400 max-w-2xl" style={{ fontFamily: theme.fontBody }}>
            Real-world security operations demonstrating measurable impact through
            AI-assisted tools and automated workflows.
          </p>
        </motion.div>

        {/* Case selector */}
        <div className="flex flex-wrap gap-3 mb-10">
          {caseStudies.map((cs, i) => (
            <button
              key={cs.id}
              onClick={() => setActiveCase(i)}
              className="text-sm px-4 py-2 rounded-lg border transition-all"
              style={{
                borderColor: i === activeCase ? theme.primaryColor : 'rgba(255,255,255,0.1)',
                color: i === activeCase ? theme.primaryColor : '#94a3b8',
                backgroundColor: i === activeCase ? `${theme.primaryColor}11` : 'transparent',
              }}
            >
              {cs.title}
            </button>
          ))}
        </div>

        {/* Case content */}
        <motion.div
          key={currentCase.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8">
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: theme.fontHeading }}
            >
              {currentCase.title}
            </h3>
            <p className="text-gray-400" style={{ fontFamily: theme.fontBody }}>
              {currentCase.subtitle}
            </p>
          </div>

          {/* Metrics grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
            {currentCase.metrics.map((metric, i) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                primaryColor={theme.primaryColor}
                accentColor={theme.accentColor}
                index={i}
              />
            ))}
          </div>

          {/* Timeline */}
          <div className="max-w-2xl">
            <h4
              className="text-lg font-semibold text-white mb-6"
              style={{ fontFamily: theme.fontHeading }}
            >
              Timeline
            </h4>
            <CaseTimeline
              steps={currentCase.timeline}
              primaryColor={theme.primaryColor}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
