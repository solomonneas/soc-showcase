import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Shield, Server, Activity, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { architectureLayers } from '@/data/architecture';
import type { PageProps } from '@/types';

const bootLines = [
  { text: '> INITIALIZING SOLOMON\'S S³ STACK...', delay: 0 },
  { text: '> LOADING ARCHITECTURE MODULES...', delay: 400 },
  { text: '> CONNECTING MCP SERVERS [7/7]...', delay: 800 },
  { text: '> THREAT DETECTION ENGINES: ONLINE', delay: 1200 },
  { text: '> SYSTEM BOOT COMPLETE', delay: 1600 },
];

const statusItems = [
  { label: 'SYSTEMS', value: 'ONLINE', color: '#39FF14' },
  { label: 'MCP SERVERS', value: '7/7', color: '#00F0FF' },
  { label: 'THREAT LEVEL', value: 'NOMINAL', color: '#39FF14' },
  { label: 'UPTIME', value: '99.97%', color: '#00F0FF' },
];

export default function Hero({ theme: _ }: PageProps) {
  const prefersReduced = useReducedMotion();
  const [bootStage, setBootStage] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => setBootStage(i + 1), line.delay + 200)
    );
    const completeTimer = setTimeout(() => setBootComplete(true), 2200);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-7rem)] flex flex-col justify-center overflow-hidden">
      {/* Radial glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.04) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,0,255,0.03) 0%, transparent 60%)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto w-full px-6 py-16">
        {/* Boot Sequence */}
        <AnimatePresence>
          {!bootComplete && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="v3-glass-strong rounded-lg p-8 max-w-md w-full v3-hud-corners">
                <div className="font-fira text-xs text-[#5B7A8A] mb-4 tracking-wider">
                  SYSTEM BOOT v3.7.1
                </div>
                <div className="space-y-2">
                  {bootLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={bootStage > i ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3 }}
                      className="font-fira text-xs"
                      style={{ color: i === bootLines.length - 1 ? '#39FF14' : '#00F0FF' }}
                    >
                      {bootStage > i ? line.text : ''}
                    </motion.div>
                  ))}
                </div>
                {/* Progress bar */}
                <div className="mt-4 h-1 rounded-full bg-[rgba(0,240,255,0.1)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #00F0FF, #FF00FF)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${(bootStage / bootLines.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content (appears after boot) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={bootComplete ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Section tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={bootComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00F0FF)' }} />
            <span className="v3-section-label">Threat Operations Interface — Built by Solomon Neas</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={bootComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-audiowide text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider leading-[1.1] mb-6"
          >
            <span className="text-[#E0F7FF]">Solomon's</span>
            <br />
            <span className="v3-chromatic" style={{ color: '#00F0FF' }}>
              S³ Stack
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={bootComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55 }}
            className="font-rajdhani text-lg md:text-xl text-[#5B7A8A] max-w-2xl mb-12 leading-relaxed"
          >
            Building the bridge between AI and security operations. Nine MCP-integrated tools
            for threat hunting, incident response, and security automation.
          </motion.p>

          {/* Status Readouts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={bootComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap gap-6 mb-12 font-fira text-xs tracking-wider"
          >
            {statusItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={bootComplete ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <span className="text-[#5B7A8A]">{item.label}:</span>
                <span style={{ color: item.color, textShadow: `0 0 8px ${item.color}50` }}>
                  {item.value}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Holographic Architecture Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={bootComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="v3-glass rounded-xl p-6 md:p-8 v3-hud-corners v3-panel-scan mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-audiowide text-xs tracking-wider text-[#00F0FF]">
                ARCHITECTURE OVERVIEW
              </span>
              <span className="font-fira text-[10px] text-[#5B7A8A]">
                3 LAYERS · 13 NODES · 16 EDGES
              </span>
            </div>

            {/* Layer preview with parallax depth */}
            <div className="space-y-4">
              {architectureLayers.map((layer, layerIdx) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={bootComplete ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 + layerIdx * 0.15 }}
                  className="relative"
                  style={{ transform: `perspective(800px) rotateX(${2 - layerIdx}deg)` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full v3-pulse-cyan" style={{ background: layer.color }} />
                    <span className="font-audiowide text-[10px] tracking-wider" style={{ color: layer.color }}>
                      {layer.label.toUpperCase()}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${layer.color}33, transparent)` }} />
                  </div>
                  <div className="flex flex-wrap gap-2 ml-5">
                    {layer.nodes.map((node, nodeIdx) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={bootComplete ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1.0 + layerIdx * 0.15 + nodeIdx * 0.05 }}
                        whileHover={{ scale: 1.05, borderColor: node.color }}
                        className="px-3 py-1.5 rounded text-[11px] font-fira border transition-colors cursor-default"
                        style={{
                          borderColor: `${node.color}33`,
                          background: `${node.color}08`,
                          color: `${node.color}CC`,
                        }}
                      >
                        {node.label}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Animated beam lines connecting layers */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
              <motion.line
                x1="10%" y1="33%" x2="90%" y2="33%"
                stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -16] }}
                transition={{ duration: 2, repeat: prefersReduced ? 0 : Infinity, ease: 'linear' }}
              />
              <motion.line
                x1="10%" y1="66%" x2="90%" y2="66%"
                stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -16] }}
                transition={{ duration: 2, repeat: prefersReduced ? 0 : Infinity, ease: 'linear', delay: 0.5 }}
              />
            </svg>
          </motion.div>

          {/* Quick stat icons row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={bootComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
          >
            {[
              { icon: Server, label: 'MCP Bridges', value: '7', color: '#00F0FF' },
              { icon: Shield, label: 'Tools Deployed', value: '9', color: '#39FF14' },
              { icon: Activity, label: 'Pipeline Stages', value: '10', color: '#FF00FF' },
              { icon: Target, label: 'ATT&CK Coverage', value: '86%', color: '#00F0FF' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={bootComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="v3-glass rounded-lg p-4 v3-hud-corners group hover:bg-[rgba(0,240,255,0.03)] transition-colors"
              >
                <stat.icon
                  size={16}
                  className="mb-2"
                  style={{ color: stat.color, filter: `drop-shadow(0 0 4px ${stat.color}50)` }}
                />
                <div
                  className="font-audiowide text-2xl md:text-3xl mb-1"
                  style={{ color: stat.color, textShadow: `0 0 15px ${stat.color}40` }}
                >
                  {stat.value}
                </div>
                <div className="font-fira text-[10px] text-[#5B7A8A] tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={bootComplete ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/3/tools"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded font-audiowide text-xs tracking-wider uppercase transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,0,255,0.1))',
                border: '1px solid rgba(0,240,255,0.3)',
                color: '#00F0FF',
                textShadow: '0 0 10px rgba(0,240,255,0.3)',
              }}
            >
              Access Arsenal
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/3/architecture"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-audiowide text-xs tracking-wider uppercase border border-[rgba(0,240,255,0.15)] text-[#5B7A8A] hover:text-[#00F0FF] hover:border-[rgba(0,240,255,0.3)] transition-colors"
            >
              View Architecture
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}