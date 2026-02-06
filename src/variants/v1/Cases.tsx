import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Circle, FileText, TrendingDown, ArrowRight } from 'lucide-react';
import { caseStudies } from '@/data/cases';
import { tools } from '@/data/tools';
import type { PageProps, TimelineStep } from '@/types';

/* ── Animated counter ──────────────────────────── */
function AnimatedNumber({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setDisplay(0);
    const timeout = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(eased * value));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 200);
    return () => clearTimeout(timeout);
  }, [value, duration]);

  return <>{display}</>;
}

/* ── Status icon helper ────────────────────────── */
const statusIcons = {
  completed: CheckCircle,
  'in-progress': Clock,
  pending: Circle,
};

export default function Cases({ theme: _ }: PageProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const cs = caseStudies[activeIdx]!;

  // Resolve tool names from IDs
  const caseTools = cs.tools
    .map((tid) => tools.find((t) => t.id === tid))
    .filter(Boolean);

  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-cyan-500/50" />
            <span className="font-jetbrains text-[11px] tracking-[0.3em] uppercase text-cyan-500/70">
              After-Action Reports
            </span>
          </div>
          <h2 className="font-chakra font-bold text-3xl md:text-4xl uppercase tracking-wider text-slate-100 mb-3">
            Operation{' '}
            <span className="text-cyan-400">Case Files</span>
          </h2>
          <p className="font-exo text-slate-400 max-w-2xl">
            Real-world security operations demonstrating measurable impact through
            AI-assisted tools and automated workflows.
          </p>
        </motion.div>

        {/* Case selector tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {caseStudies.map((c, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={c.id}
                onClick={() => setActiveIdx(i)}
                className={`font-chakra text-xs font-semibold px-4 py-2.5 rounded uppercase tracking-wider transition-all border ${
                  active
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                    : 'bg-transparent border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FileText size={12} />
                  {c.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Case content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cs.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {/* Case title block */}
            <div className="v1-panel p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-jetbrains text-[10px] tracking-wider text-cyan-500/70 uppercase">
                  Case #{String(activeIdx + 1).padStart(3, '0')}
                </span>
                <div className="flex-1 h-px bg-slate-700/40" />
                <span className="font-jetbrains text-[10px] text-green-500 uppercase">
                  Resolved
                </span>
              </div>
              <h3 className="font-chakra font-bold text-2xl md:text-3xl uppercase tracking-wider text-slate-100 mb-2">
                {cs.title}
              </h3>
              <p className="font-exo text-sm text-slate-400 mb-4">{cs.subtitle}</p>

              {/* Tool badges */}
              <div className="flex flex-wrap gap-2">
                {caseTools.map((tool) =>
                  tool ? (
                    <span
                      key={tool.id}
                      className="v1-badge rounded flex items-center gap-1.5"
                      style={{
                        borderColor: `${tool.color}30`,
                        backgroundColor: `${tool.color}10`,
                        color: tool.color,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: tool.color }}
                      />
                      {tool.name}
                    </span>
                  ) : null,
                )}
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
              {cs.metrics.map((metric, mi) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: mi * 0.08 }}
                  className="v1-panel p-4"
                >
                  <div className="font-chakra text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
                    {metric.label}
                  </div>

                  {/* Before → After */}
                  <div className="flex items-center gap-2 mb-3">
                    <div>
                      <div className="font-jetbrains text-[9px] text-slate-600 mb-0.5">BEFORE</div>
                      <div className="font-jetbrains text-lg font-bold text-slate-400">
                        {typeof metric.before === 'number' ? (
                          <AnimatedNumber value={metric.before} />
                        ) : (
                          metric.before
                        )}
                      </div>
                    </div>
                    <ArrowRight size={12} className="text-slate-600 shrink-0" />
                    <div>
                      <div className="font-jetbrains text-[9px] text-slate-600 mb-0.5">AFTER</div>
                      <div className="font-jetbrains text-lg font-bold text-green-400">
                        {typeof metric.after === 'number' ? (
                          <AnimatedNumber value={metric.after} />
                        ) : (
                          metric.after
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-jetbrains text-xs font-semibold text-cyan-400">
                    <TrendingDown size={12} />
                    <span>{metric.reduction}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Challenge / Solution / Outcome */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              {[
                { title: 'Challenge', text: cs.challenge, accent: '#EF4444' },
                { title: 'Solution', text: cs.solution, accent: '#06B6D4' },
                { title: 'Outcome', text: cs.outcome, accent: '#22C55E' },
              ].map((block) => (
                <div key={block.title} className="v1-panel p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: block.accent }}
                    />
                    <h4
                      className="font-chakra text-xs font-semibold uppercase tracking-wider"
                      style={{ color: block.accent }}
                    >
                      {block.title}
                    </h4>
                  </div>
                  <p className="font-exo text-xs text-slate-400 leading-relaxed">
                    {block.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Operation timeline */}
            <div className="v1-panel p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="font-chakra text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Operation Timeline
                </span>
                <div className="flex-1 h-px bg-slate-700/40" />
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/40 to-cyan-500/5" />

                <div className="space-y-5">
                  {cs.timeline.map((step: TimelineStep, si: number) => {
                    const StatusIcon = statusIcons[step.status];
                    const isCompleted = step.status === 'completed';
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: si * 0.08 }}
                        className="flex gap-4"
                      >
                        <div className="relative z-10 flex-shrink-0 w-[30px] flex justify-center">
                          <StatusIcon
                            size={16}
                            className={isCompleted ? 'text-cyan-400' : 'text-slate-600'}
                          />
                        </div>
                        <div className="flex-1 pb-1">
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <h5 className="font-chakra text-sm font-semibold uppercase tracking-wider text-slate-200">
                              {step.title}
                            </h5>
                            {step.date && (
                              <span className="font-jetbrains text-[10px] text-cyan-500/60">
                                {step.date}
                              </span>
                            )}
                          </div>
                          <p className="font-exo text-xs text-slate-500 mt-1 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
