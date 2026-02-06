import { motion } from 'framer-motion';
import { Shield, Github, Globe, Mail, Linkedin, ExternalLink } from 'lucide-react';
import type { PageProps } from '@/types';

const capabilities = [
  { group: 'Security', items: ['SIEM Operations', 'Incident Response', 'Threat Hunting', 'Vulnerability Mgmt', 'Network Forensics', 'MITRE ATT&CK'] },
  { group: 'Engineering', items: ['Python', 'TypeScript', 'React', 'FastAPI', 'MCP Protocol', 'Docker'] },
  { group: 'Platforms', items: ['Wazuh', 'TheHive', 'Cortex', 'MISP', 'Zeek', 'Suricata'] },
];

const resources = [
  { label: 'Portfolio', url: 'https://solomonneas.dev', icon: Globe },
  { label: 'GitHub', url: 'https://github.com/solomonneas', icon: Github },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/solomonneas', icon: Linkedin },
  { label: 'Contact', url: 'mailto:me@solomonneas.dev', icon: Mail },
];

export default function About({ theme: _ }: PageProps) {
  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
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
              Operator Profile
            </span>
          </div>
          <h2 className="font-chakra font-bold text-3xl md:text-4xl uppercase tracking-wider text-slate-100 mb-3">
            Solomon{' '}
            <span className="text-cyan-400">Neas</span>
          </h2>
          <p className="font-exo text-slate-400 max-w-2xl">
            Security operations engineer building AI-powered tools for the modern SOC.
          </p>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="v1-panel p-6 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded bg-cyan-500/10 border border-cyan-500/20">
              <Shield size={28} className="text-cyan-400" />
            </div>
            <div>
              <div className="font-jetbrains text-[10px] text-cyan-500/60 uppercase tracking-wider mb-1">
                Callsign: SOL-OPS
              </div>
              <h3 className="font-chakra font-bold text-xl uppercase tracking-wider text-slate-100">
                Solomon Neas
              </h3>
              <p className="font-exo text-sm text-slate-400">
                Security Operations Engineer
              </p>
            </div>
          </div>

          <div className="space-y-4 font-exo text-sm text-slate-400 leading-relaxed">
            <p>
              This showcase presents a suite of tools designed to bridge the gap between
              AI assistants and security platforms. Using the Model Context Protocol (MCP),
              these tools enable natural language interaction with complex security systems —
              from SIEM queries to incident response orchestration.
            </p>
            <p>
              The philosophy is simple: security analysts should spend their time on
              analysis, not on wrestling with APIs and query languages. AI bridges that gap,
              and MCP provides the standardized protocol to make it work reliably.
            </p>
            <p>
              Every tool in this showcase is built for real-world SOC workflows, tested
              against production data, and designed to integrate into existing security
              stacks without disruption.
            </p>
          </div>
        </motion.div>

        {/* Capability matrix */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="font-chakra text-xs font-semibold uppercase tracking-wider text-slate-300">
              Capability Matrix
            </span>
            <div className="flex-1 h-px bg-slate-700/40" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map((group, gi) => (
              <motion.div
                key={group.group}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + gi * 0.1 }}
                className="v1-panel p-5"
              >
                <h4 className="font-chakra text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
                  {group.group}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="v1-badge rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission-critical resources */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="font-chakra text-xs font-semibold uppercase tracking-wider text-slate-300">
              Mission-Critical Resources
            </span>
            <div className="flex-1 h-px bg-slate-700/40" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {resources.map((res, ri) => {
              const Icon = res.icon;
              return (
                <motion.a
                  key={res.label}
                  href={res.url}
                  target={res.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + ri * 0.08 }}
                  className="v1-panel p-4 group flex items-center gap-3 hover:border-cyan-500/30 transition-colors cursor-pointer"
                >
                  <div className="p-2 rounded bg-slate-800/60 group-hover:bg-cyan-500/10 transition-colors">
                    <Icon size={16} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-chakra text-sm font-semibold uppercase tracking-wider text-slate-300 group-hover:text-slate-100 transition-colors">
                      {res.label}
                    </div>
                    <div className="font-jetbrains text-[10px] text-slate-600 truncate">
                      {res.url.replace('https://', '').replace('mailto:', '')}
                    </div>
                  </div>
                  <ExternalLink size={12} className="text-slate-600 group-hover:text-cyan-500/60 transition-colors shrink-0" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="v1-panel p-6 text-center"
        >
          <div className="font-jetbrains text-[10px] text-cyan-500/50 uppercase tracking-wider mb-3">
            Mission Statement
          </div>
          <p className="font-chakra text-lg md:text-xl font-semibold uppercase tracking-wider text-slate-200 max-w-2xl mx-auto leading-relaxed">
            "Empowering security teams with AI-augmented tooling that speaks the
            analyst's language and respects operational reality."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
