import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Server,
  Crosshair,
  Bug,
  Activity,
  Radar,
  Globe,
  Target,
  Brain,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PageProps } from '@/types';

/* ── Count-up hook ─────────────────────────────── */
function useCountUp(target: number, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return count;
}

/* ── Status indicator row ──────────────────────── */
const systems = [
  { label: 'Wazuh SIEM', icon: Shield, status: 'online' as const },
  { label: 'TheHive IR', icon: Bug, status: 'online' as const },
  { label: 'Cortex Analysis', icon: Brain, status: 'online' as const },
  { label: 'MISP Intel', icon: Globe, status: 'online' as const },
  { label: 'Zeek NSM', icon: Activity, status: 'standby' as const },
  { label: 'Suricata IDS', icon: Radar, status: 'standby' as const },
  { label: 'MITRE ATT&CK', icon: Target, status: 'online' as const },
  { label: 'Bro Hunter', icon: Crosshair, status: 'online' as const },
  { label: 'MCP Servers', icon: Server, status: 'online' as const },
];

export default function Hero({ theme: _ }: PageProps) {
  const mcpCount = useCountUp(7, 1800, 400);
  const toolCount = useCountUp(9, 1800, 600);
  const cveCount = useCountUp(580, 2200, 800);

  return (
    <section className="relative min-h-[calc(100vh-7.5rem)] flex flex-col justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto w-full px-6 py-16">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-px bg-cyan-500/50" />
          <span className="font-jetbrains text-[11px] tracking-[0.3em] uppercase text-cyan-500/70">
            Threat Operations Dashboard
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-chakra font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider leading-[1.1] mb-6"
          style={{ color: '#E2E8F0' }}
        >
          AI-Powered
          <br />
          <span className="text-cyan-400" style={{ textShadow: '0 0 40px rgba(6,182,212,0.3)' }}>
            Security Operations
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="font-exo text-base md:text-lg text-slate-400 max-w-2xl mb-12 leading-relaxed"
        >
          Building the bridge between AI and security operations. Nine MCP-integrated tools
          for threat hunting, incident response, and security automation.
        </motion.p>

        {/* ── Metric counters ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            { value: mcpCount, label: 'MCP Servers Online', color: '#22C55E' },
            { value: toolCount, label: 'Security Tools Deployed', color: '#06B6D4' },
            { value: cveCount, label: 'CVEs Eliminated', color: '#F59E0B' },
          ].map((metric) => (
            <div
              key={metric.label}
              className="v1-panel p-5 v1-corner-brackets"
            >
              <div
                className="font-jetbrains font-bold text-3xl md:text-4xl mb-2"
                style={{ color: metric.color, textShadow: `0 0 20px ${metric.color}40` }}
              >
                {metric.value}
              </div>
              <div className="font-chakra text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-400">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── System status grid ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="v1-panel p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="font-chakra text-xs font-semibold tracking-[0.15em] uppercase text-slate-300">
              System Status
            </span>
            <div className="flex-1 h-px bg-slate-700/50" />
            <span className="font-jetbrains text-[10px] text-green-500">ALL SYSTEMS OPERATIONAL</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {systems.map((sys, i) => {
              const Icon = sys.icon;
              const isOnline = sys.status === 'online';
              return (
                <motion.div
                  key={sys.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded bg-slate-800/40 border border-slate-700/30"
                >
                  <Icon size={14} className={isOnline ? 'text-cyan-400' : 'text-amber-400'} />
                  <div className="flex-1 min-w-0">
                    <div className="font-chakra text-[10px] font-medium uppercase tracking-wider text-slate-300 truncate">
                      {sys.label}
                    </div>
                  </div>
                  <motion.div
                    className={`w-2 h-2 rounded-full ${
                      isOnline ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]' : 'bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]'
                    }`}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── CTA buttons ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link
            to="/1/tools"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded font-chakra text-sm font-semibold uppercase tracking-wider bg-cyan-500 text-[#0A0E17] hover:bg-cyan-400 transition-colors"
          >
            View Arsenal
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/1/architecture"
            className="inline-flex items-center gap-2 px-6 py-3 rounded font-chakra text-sm font-semibold uppercase tracking-wider border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
          >
            System Architecture
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
