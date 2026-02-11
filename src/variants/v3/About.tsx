import { motion, useReducedMotion } from 'framer-motion';
import { Shield, Github, Linkedin, Globe, Mail, ExternalLink } from 'lucide-react';
import { tools } from '@/data/tools';
import type { PageProps } from '@/types';

const skills = [
  { name: 'Threat Hunting', color: '#00F0FF' },
  { name: 'Incident Response', color: '#FF00FF' },
  { name: 'SIEM Engineering', color: '#39FF14' },
  { name: 'Network Security', color: '#00F0FF' },
  { name: 'Python', color: '#FF00FF' },
  { name: 'TypeScript', color: '#00F0FF' },
  { name: 'React', color: '#39FF14' },
  { name: 'MCP / AI Integration', color: '#FF00FF' },
  { name: 'Wazuh', color: '#39FF14' },
  { name: 'TheHive / Cortex', color: '#00F0FF' },
  { name: 'MITRE ATT&CK', color: '#FF00FF' },
  { name: 'Zeek / Suricata', color: '#39FF14' },
];

const links = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/solomonneas', color: '#E0F7FF' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/solomonneas', color: '#00F0FF' },
  { icon: Globe, label: 'Website', href: 'https://solomonneas.dev', color: '#39FF14' },
  { icon: Mail, label: 'Email', href: 'mailto:me@solomonneas.dev', color: '#FF00FF' },
];

export default function About({ theme: _ }: PageProps) {
  const prefersReduced = useReducedMotion();
  return (
    <section className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b border-[rgba(0,240,255,0.1)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="v3-section-label mb-2">// About</div>
            <h1 className="font-audiowide text-3xl md:text-4xl text-[#E0F7FF] mb-3 v3-chromatic-subtle">
              Operator Profile — Solomon's S³ Stack
            </h1>
            <p className="font-rajdhani text-[#5B7A8A] max-w-2xl leading-relaxed">
              Security operations engineer and builder of Solomon's S³ Stack.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left column: Profile */}
          <div className="lg:col-span-3 space-y-8">
            {/* Bio Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="v3-glass rounded-xl p-6 md:p-8 v3-hud-corners v3-panel-scan"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(0,240,255,0.08)',
                    border: '1px solid rgba(0,240,255,0.2)',
                  }}
                  animate={{ boxShadow: ['0 0 10px rgba(0,240,255,0.1)', '0 0 20px rgba(0,240,255,0.2)', '0 0 10px rgba(0,240,255,0.1)'] }}
                  transition={{ duration: 3, repeat: prefersReduced ? 0 : Infinity }}
                >
                  <Shield size={28} className="text-[#00F0FF]" style={{ filter: 'drop-shadow(0 0 6px rgba(0,240,255,0.5))' }} />
                </motion.div>
                <div>
                  <h2
                    className="font-audiowide text-xl text-[#E0F7FF] v3-chromatic-subtle"
                  >
                    Solomon Neas
                  </h2>
                  <p className="font-fira text-[10px] text-[#00F0FF] tracking-wider">
                    S³ STACK CREATOR
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-rajdhani text-sm text-[#5B7A8A] leading-relaxed">
                <p>
                  Building the bridge between artificial intelligence and security operations.
                  Focused on creating tools that enable SOC analysts to leverage Solomon's S³ Stack for faster,
                  more accurate threat detection and response.
                </p>
                <p>
                  Creator of Solomon's S³ Stack — a suite of {tools.length} security tools including
                  MCP servers for Wazuh, TheHive, Cortex, MISP, and more. Each tool is designed
                  to integrate AI into the security workflow without replacing human judgment.
                </p>
                <p>
                  The Solomon's S³ Stack Showcase demonstrates how these tools work together in a
                  cohesive security architecture, from alert ingestion through detection tuning.
                </p>
              </div>
            </motion.div>

            {/* Skill Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="v3-glass rounded-xl p-6 v3-hud-corners"
            >
              <div className="font-fira text-[10px] text-[#00F0FF] tracking-wider uppercase mb-4 flex items-center gap-2">
                <div className="w-6 h-px bg-[#00F0FF]" />
                SKILL MATRIX
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 12px ${skill.color}40`,
                    }}
                    className="font-fira text-[10px] px-3 py-1.5 rounded cursor-default"
                    style={{
                      color: skill.color,
                      background: `${skill.color}10`,
                      border: `1px solid ${skill.color}25`,
                    }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Tools Deployed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="v3-glass rounded-xl p-6 v3-hud-corners"
            >
              <div className="font-fira text-[10px] text-[#00F0FF] tracking-wider uppercase mb-4 flex items-center gap-2">
                <div className="w-6 h-px bg-[#00F0FF]" />
                S³ STACK TOOLS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tools.slice(0, 6).map((tool, i) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.05 }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                    style={{
                      background: 'rgba(0,240,255,0.02)',
                      border: '1px solid rgba(0,240,255,0.06)',
                    }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        background: tool.status === 'production' ? '#39FF14' : tool.status === 'beta' ? '#FFAA00' : '#00F0FF',
                        boxShadow: `0 0 4px ${tool.status === 'production' ? '#39FF14' : '#00F0FF'}80`,
                      }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: prefersReduced ? 0 : Infinity, delay: i * 0.3 }}
                    />
                    <span className="font-audiowide text-[11px] text-[#E0F7FF]">{tool.name}</span>
                    <span className="font-fira text-[8px] text-[#5B7A8A] ml-auto uppercase">
                      {tool.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column: Links + HUD */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="v3-glass rounded-xl p-6 v3-hud-corners"
            >
              <div className="font-fira text-[10px] text-[#00F0FF] tracking-wider uppercase mb-4 flex items-center gap-2">
                <div className="w-6 h-px bg-[#00F0FF]" />
                COMM CHANNELS
              </div>
              <div className="space-y-2">
                {links.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                    whileHover={{ x: 4, borderColor: `${link.color}50` }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                    style={{
                      background: 'rgba(0,240,255,0.02)',
                      border: '1px solid rgba(0,240,255,0.08)',
                    }}
                  >
                    <link.icon
                      size={16}
                      style={{ color: link.color, filter: `drop-shadow(0 0 4px ${link.color}40)` }}
                    />
                    <span className="font-audiowide text-xs text-[#E0F7FF] flex-1">{link.label}</span>
                    <ExternalLink size={12} className="text-[#5B7A8A]" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* HUD Overlay Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="v3-glass-strong rounded-xl p-6 v3-hud-corners v3-panel-scan"
            >
              <div className="font-fira text-[10px] text-[#00F0FF] tracking-wider uppercase mb-4 flex items-center gap-2">
                <div className="w-6 h-px bg-[#00F0FF]" />
                SYSTEM STATUS
              </div>

              <div className="space-y-3">
                {[
                  { label: 'SYSTEMS', value: 'ONLINE', color: '#39FF14' },
                  { label: 'THREAT LEVEL', value: 'NOMINAL', color: '#39FF14' },
                  { label: 'MCP SERVERS', value: '7 / 7', color: '#00F0FF' },
                  { label: 'S³ TOOLS', value: `${tools.filter(t => t.status === 'production').length} / ${tools.length}`, color: '#00F0FF' },
                  { label: 'AI ENGINE', value: 'CLAUDE', color: '#FF00FF' },
                  { label: 'ORCHESTRATOR', value: 'OPENCLAW', color: '#FF00FF' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <span className="font-fira text-[10px] text-[#5B7A8A] tracking-wider">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: item.color, boxShadow: `0 0 4px ${item.color}80` }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2.5, repeat: prefersReduced ? 0 : Infinity, delay: i * 0.2 }}
                      />
                      <span
                        className="font-fira text-[10px] tracking-wider"
                        style={{ color: item.color, textShadow: `0 0 8px ${item.color}30` }}
                      >
                        {item.value}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Separator */}
              <div className="my-4 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.2), transparent)' }} />

              {/* Uptime */}
              <div className="flex items-center justify-between">
                <span className="font-fira text-[10px] text-[#5B7A8A] tracking-wider">UPTIME</span>
                <span className="font-audiowide text-sm text-[#00F0FF]" style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}>
                  99.97%
                </span>
              </div>
            </motion.div>

            {/* Site info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <div className="font-fira text-[10px] text-[#5B7A8A] tracking-wider">
                soc.solomonneas.dev
              </div>
              <div className="font-fira text-[9px] text-[#5B7A8A] mt-1 opacity-60">
                BUILT FOR THE SOC COMMUNITY — SOLOMON'S S³ STACK
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}