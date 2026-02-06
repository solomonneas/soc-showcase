import { motion } from 'framer-motion';
import { Shield, Github, Globe, Mail, Linkedin, ExternalLink } from 'lucide-react';
import type { PageProps } from '@/types';

const capabilities = [
  {
    group: 'Security Operations',
    items: ['SIEM Operations', 'Incident Response', 'Threat Hunting', 'Vulnerability Management', 'Network Forensics', 'MITRE ATT&CK'],
  },
  {
    group: 'Engineering',
    items: ['Python', 'TypeScript', 'React', 'FastAPI', 'MCP Protocol', 'Docker'],
  },
  {
    group: 'Platforms',
    items: ['Wazuh', 'TheHive', 'Cortex', 'MISP', 'Zeek', 'Suricata'],
  },
];

const links = [
  { label: 'Portfolio', url: 'https://solomonneas.dev', icon: Globe },
  { label: 'GitHub', url: 'https://github.com/solomonneas', icon: Github },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/solomonneas', icon: Linkedin },
  { label: 'Email', url: 'mailto:me@solomonneas.dev', icon: Mail },
];

export default function About({ theme: _ }: PageProps) {
  return (
    <section className="font-franklin">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="v2-section-label">About</div>
            <h1 className="font-space font-bold text-3xl md:text-4xl text-[#0F172A] mb-3">
              Solomon Neas
            </h1>
            <p className="text-[#64748B] max-w-2xl leading-relaxed">
              Security operations engineer building AI-powered tools for the modern SOC.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left: Bio */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-[#DBEAFE]">
                  <Shield size={28} className="text-[#2563EB]" />
                </div>
                <div>
                  <h2 className="font-space font-bold text-xl text-[#0F172A]">
                    Solomon Neas
                  </h2>
                  <p className="text-sm text-[#64748B]">Security Operations Engineer</p>
                </div>
              </div>

              <div className="space-y-4 text-[#64748B] leading-relaxed">
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

              {/* Divider */}
              <div className="v2-divider" />

              {/* Links */}
              <div>
                <h3 className="font-space font-semibold text-[#0F172A] mb-4">
                  Connect
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {links.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <motion.a
                        key={link.label}
                        href={link.url}
                        target={link.url.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                        className="v2-card group flex items-center gap-3 !p-4 hover:border-[#2563EB]/30"
                      >
                        <div className="p-2 rounded-lg bg-[#F1F5F9] group-hover:bg-[#DBEAFE] transition-colors">
                          <Icon size={16} className="text-[#64748B] group-hover:text-[#2563EB] transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-space text-sm font-medium text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                            {link.label}
                          </div>
                          <div className="font-fira text-[11px] text-[#94A3B8] truncate">
                            {link.url.replace('https://', '').replace('mailto:', '')}
                          </div>
                        </div>
                        <ExternalLink
                          size={14}
                          className="text-[#CBD5E1] group-hover:text-[#2563EB] shrink-0 transition-colors"
                        />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right: Skills Grid */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="lg:col-span-2"
            >
              <h3 className="font-space font-semibold text-[#0F172A] mb-5">
                Skills & Expertise
              </h3>

              <div className="space-y-6">
                {capabilities.map((group, gi) => (
                  <motion.div
                    key={group.group}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + gi * 0.1 }}
                  >
                    <h4 className="font-space text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-3">
                      {group.group}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="v2-badge">
                          {item}
                        </span>
                      ))}
                    </div>
                    {gi < capabilities.length - 1 && (
                      <div className="mt-5 h-px bg-[#E2E8F0]" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="v2-card mt-8 !bg-[#F8FAFC]"
              >
                <div className="font-fira text-[10px] uppercase tracking-wider text-[#2563EB] mb-3">
                  Mission
                </div>
                <p className="font-space text-sm font-medium text-[#0F172A] leading-relaxed">
                  "Empowering security teams with AI-augmented tooling that speaks the
                  analyst's language and respects operational reality."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
