import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { caseStudies } from '@/data/cases';
import type { PageProps, Metric, CaseStudy, TimelineStep } from '@/types';
import './styles.css';

/* ---- Animated metric value ---- */
function AnimatedReduction({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  // Try to extract numeric value for count-up
  const numMatch = value.match(/^(\d+(?:\.\d+)?)/);
  const numericVal = numMatch ? parseFloat(numMatch[1]!) : null;
  const suffix = numMatch ? value.slice(numMatch[1]!.length) : value;

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    numericVal !== null && numericVal % 1 !== 0 ? v.toFixed(1) : Math.round(v).toString()
  );
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (isInView && numericVal !== null) {
      const controls = animate(count, numericVal, { duration: 2, ease: 'easeOut' });
      return controls.stop;
    }
  }, [isInView, numericVal, count]);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  if (numericVal === null) {
    return <span ref={ref} className="v5-gradient-text">{value}</span>;
  }

  return (
    <span ref={ref}>
      <span className="v5-gradient-text">{display}{suffix}</span>
    </span>
  );
}

/* ---- Metric Card ---- */
function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Parse reduction percentage for progress bar
  const percentMatch = metric.reduction.match(/(\d+(?:\.\d+)?)%/);
  const percent = percentMatch ? parseFloat(percentMatch[1]!) : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="v5-glass-hover rounded-xl p-5"
    >
      <div className="font-jetbrains text-[10px] uppercase tracking-wider text-[#71717A] mb-3">
        {metric.label}
      </div>

      {/* Before → After */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1">
          <div className="text-[10px] text-[#52525B] font-jetbrains mb-0.5">Before</div>
          <div className="text-base font-bold text-[#71717A] font-jetbrains">{metric.before}</div>
        </div>
        <ArrowRight size={14} className="text-[#3F3F46] shrink-0" />
        <div className="flex-1">
          <div className="text-[10px] text-[#52525B] font-jetbrains mb-0.5">After</div>
          <div className="text-base font-bold text-[#10B981] font-jetbrains">{metric.after}</div>
        </div>
      </div>

      {/* Progress bar */}
      {percent !== null && (
        <div className="v5-progress-bar mb-3">
          <motion.div
            className="v5-progress-fill"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${percent}%` } : {}}
            transition={{ delay: 0.3 + index * 0.08, duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      )}

      {/* Reduction badge */}
      <div className="text-3xl font-bold font-space">
        <AnimatedReduction value={metric.reduction} />
      </div>
    </motion.div>
  );
}

/* ---- Timeline ---- */
function ModernTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="relative">
      {/* Horizontal line */}
      <div className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED33] to-transparent" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {steps.slice(0, 5).map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="relative text-center pt-10"
          >
            {/* Step dot */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
              <div className="w-5 h-5 rounded-full bg-[#18181B] border-2 border-[#7C3AED] flex items-center justify-center">
                <CheckCircle2 size={10} className="text-[#10B981]" />
              </div>
            </div>

            {/* Step number */}
            <div className="font-jetbrains text-[10px] text-[#7C3AED] mb-1">
              STEP {i + 1}
            </div>

            <h4 className="font-space text-sm font-semibold text-[#FAFAFA] mb-1">
              {step.title}
            </h4>

            <p className="text-xs text-[#71717A] font-dm-sans line-clamp-2">
              {step.description}
            </p>

            {step.date && (
              <div className="font-jetbrains text-[10px] text-[#52525B] mt-1.5">{step.date}</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---- Case Study Card ---- */
function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="mb-24 last:mb-0"
    >
      {/* Title */}
      <div className="mb-8">
        <span className="v5-section-label mb-3">Case Study {index + 1}</span>
        <h3 className="font-space text-3xl md:text-4xl font-bold text-[#FAFAFA] mt-3 mb-2">
          {study.title}
        </h3>
        <p className="font-dm-sans text-lg text-[#A1A1AA]">{study.subtitle}</p>
      </div>

      {/* Before / After cards side by side */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {/* Challenge (Before) */}
        <div className="v5-glass rounded-2xl p-6 border-l-2 border-l-[#EF4444]/30">
          <div className="font-jetbrains text-xs uppercase tracking-wider text-[#EF4444] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
            Challenge
          </div>
          <p className="text-sm text-[#A1A1AA] font-dm-sans leading-relaxed">{study.challenge}</p>
        </div>

        {/* Solution (After) */}
        <div className="v5-glass rounded-2xl p-6 border-l-2 border-l-[#10B981]/30">
          <div className="font-jetbrains text-xs uppercase tracking-wider text-[#10B981] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Solution
          </div>
          <p className="text-sm text-[#A1A1AA] font-dm-sans leading-relaxed">{study.solution}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {study.metrics.map((metric, mi) => (
          <MetricCard key={metric.label} metric={metric} index={mi} />
        ))}
      </div>

      {/* Tools used */}
      <div className="flex flex-wrap gap-2 mb-8">
        {study.tags.map((tag) => (
          <span key={tag} className="v5-skill-pill">#{tag}</span>
        ))}
      </div>

      {/* Timeline */}
      <div className="v5-glass rounded-2xl p-6 md:p-8">
        <h4 className="font-space text-lg font-semibold text-[#FAFAFA] mb-6">Response Timeline</h4>
        <ModernTimeline steps={study.timeline} />
      </div>
    </motion.div>
  );
}

export default function Cases(_props: PageProps) {
  return (
    <section className="v5-mesh-bg min-h-screen py-24 px-6" style={{ backgroundColor: '#0A0A0F' }}>
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="v5-section-label justify-center mb-4">Impact</span>
          <h2 className="font-space text-4xl md:text-5xl font-bold text-[#FAFAFA] mt-4 mb-4">
            Real-World <span className="v5-gradient-text">Results</span>
          </h2>
          <p className="font-dm-sans text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            Production deployments demonstrating measurable security improvements
            through AI-augmented operations.
          </p>
        </motion.div>

        {/* Case Studies */}
        {caseStudies.map((study, i) => (
          <CaseCard key={study.id} study={study} index={i} />
        ))}
      </div>
    </section>
  );
}
