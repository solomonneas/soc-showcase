import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Github, Shield, Crosshair, BookOpen, Globe, Brain, Target, Activity, Radar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { architectureLayers } from '../../data/architecture';
import type { PageProps } from '../../types';
import './styles.css';

/* ---- Typing effect hook ---- */
function useTypingEffect(texts: string[], typingSpeed = 50, deletingSpeed = 30, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex] ?? '';
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => setDisplayText(current.substring(0, displayText.length - 1)), deletingSpeed);
    } else {
      timeout = setTimeout(() => setDisplayText(current.substring(0, displayText.length + 1)), typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

/* ---- Count-up component ---- */
function CountUp({ target, duration = 2, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { duration, ease: 'easeOut' });
      return controls.stop;
    }
  }, [isInView, target, duration, count]);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  return (
    <span ref={ref} className="v5-metric-number">
      {display}{suffix}
    </span>
  );
}

/* ---- Word-by-word reveal ---- */
const headlineWords = ['The', 'Complete', 'SOC', 'Stack'];
const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const subtitleLines = [
  'AI-augmented threat detection and response.',
  'MCP-integrated security operations.',
  'Open-source. Production-tested. Extensible.',
];

const toolIcons = [
  { icon: Shield, label: 'Wazuh', color: '#10B981' },
  { icon: Crosshair, label: 'Bro Hunter', color: '#7C3AED' },
  { icon: BookOpen, label: 'Playbook Forge', color: '#2563EB' },
  { icon: Globe, label: 'MISP', color: '#F59E0B' },
  { icon: Brain, label: 'Cortex', color: '#8B5CF6' },
  { icon: Target, label: 'MITRE', color: '#10B981' },
  { icon: Activity, label: 'Zeek', color: '#3B82F6' },
  { icon: Radar, label: 'Suricata', color: '#EF4444' },
];

const metrics = [
  { value: 7, label: 'MCP Servers', suffix: '' },
  { value: 9, label: 'Security Tools', suffix: '' },
  { value: 580, label: 'CVEs Eliminated', suffix: '' },
];

export default function Hero(_props: PageProps) {
  const typedText = useTypingEffect(subtitleLines, 40, 25, 2500);

  return (
    <section className="relative min-h-screen flex flex-col v5-mesh-hero" style={{ backgroundColor: '#0A0A0F' }}>
      {/* Dot grid overlay */}
      <div className="absolute inset-0 v5-dot-grid pointer-events-none z-[1]" />

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 pt-24 pb-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium font-jetbrains tracking-wide v5-glass"
            style={{ color: '#7C3AED' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            Open Source Security Operations
          </span>
        </motion.div>

        {/* Headline — word by word */}
        <h1 className="font-space text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className={`inline-block mr-4 md:mr-6 ${
                word === 'SOC' ? 'v5-gradient-text' : 'text-[#FAFAFA]'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="h-8 mb-10"
        >
          <p className="font-dm-sans text-lg md:text-xl text-[#A1A1AA]">
            {typedText}
            <span className="v5-typing-cursor" />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap gap-4 mb-14"
        >
          <Link to="/5/architecture" className="v5-btn-primary">
            Explore the Stack
            <ArrowRight size={16} />
          </Link>
          <a
            href="https://github.com/solomonneas"
            target="_blank"
            rel="noopener noreferrer"
            className="v5-btn-secondary"
          >
            <Github size={16} />
            View on GitHub
          </a>
        </motion.div>

        {/* Social proof — tool icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mb-16"
        >
          <p className="font-jetbrains text-xs text-[#A1A1AA] uppercase tracking-wider mb-4">
            Integrated with
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {toolIcons.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + i * 0.06, duration: 0.3 }}
                className="flex items-center gap-2 group cursor-default"
                title={t.label}
              >
                <div
                  className="p-1.5 rounded-lg transition-colors"
                  style={{ backgroundColor: `${t.color}10` }}
                >
                  <t.icon size={16} style={{ color: t.color }} />
                </div>
                <span className="text-xs text-[#71717A] group-hover:text-[#A1A1AA] transition-colors font-dm-sans hidden sm:inline">
                  {t.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Glowing architecture preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="v5-glass rounded-2xl p-6 md:p-8 v5-glow-violet relative overflow-hidden"
        >
          {/* Subtle gradient overlay top */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(124,58,237,0.06), transparent)',
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="v5-section-label">Architecture Preview</span>
              <span className="font-jetbrains text-[10px] text-[#71717A]">
                3 LAYERS · 13 NODES · 16 EDGES
              </span>
            </div>

            <div className="space-y-4">
              {architectureLayers.map((layer, li) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + li * 0.15, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: li === 0 ? '#7C3AED' : li === 1 ? '#2563EB' : '#10B981' }}
                    />
                    <span
                      className="font-jetbrains text-[10px] tracking-wider uppercase"
                      style={{ color: li === 0 ? '#7C3AED' : li === 1 ? '#2563EB' : '#10B981' }}
                    >
                      {layer.label}
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background: `linear-gradient(90deg, ${li === 0 ? '#7C3AED' : li === 1 ? '#2563EB' : '#10B981'}33, transparent)`,
                      }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 ml-5">
                    {layer.nodes.map((node, ni) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.0 + li * 0.15 + ni * 0.04, duration: 0.3 }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: 'rgba(124,58,237,0.12)',
                          borderColor: 'rgba(124,58,237,0.4)',
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-jetbrains border cursor-default transition-colors"
                        style={{
                          borderColor: 'rgba(255,255,255,0.08)',
                          background: 'rgba(255,255,255,0.03)',
                          color: '#A1A1AA',
                        }}
                      >
                        {node.label}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Metrics banner — bottom */}
      <div className="relative z-10 border-t border-white/[0.06]" style={{ backgroundColor: 'rgba(24,24,27,0.5)' }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 v5-gradient-text font-space">
                  <CountUp target={m.value} duration={2.5} suffix={m.suffix} />
                </div>
                <div className="text-sm text-[#71717A] font-dm-sans">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
