import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Shield,
  Layers,
  Wrench,
  FileText,
  GitBranch,
  User,
  ArrowRight,
  Server,
  Brain,
  Globe,
} from 'lucide-react';
import ArchitectureGraph from '@/components/shared/ArchitectureGraph';
import { tools } from '@/data/tools';
import { architectureLayers } from '@/data/architecture';
import type { PageProps } from '@/types';

const tableOfContents = [
  { label: 'Architecture', path: '/architecture', icon: Layers, description: 'Three-layer system architecture with MCP integration' },
  { label: 'Tools', path: '/tools', icon: Wrench, description: 'Nine security tools spanning detection to response' },
  { label: 'Case Studies', path: '/cases', icon: FileText, description: 'Real-world remediation and compliance operations' },
  { label: 'Pipeline', path: '/pipeline', icon: GitBranch, description: 'Ten-stage incident response data flow' },
  { label: 'About', path: '/about', icon: User, description: 'Built by Solomon Neas — builder profile and contact information' },
];

const metrics = [
  { value: '9', label: 'Security Tools', sublabel: 'deployed' },
  { value: '7', label: 'MCP Servers', sublabel: 'operational' },
  { value: '89%', label: 'Vuln Reduction', sublabel: 'across fleet' },
  { value: '3', label: 'Architecture Layers', sublabel: 'AI → MCP → Tools' },
];

export default function Hero({ theme: _ }: PageProps) {
  const totalNodes = architectureLayers.reduce((sum, l) => sum + l.nodes.length, 0);
  const productionTools = tools.filter((t) => t.status === 'production').length;

  return (
    <section className="font-franklin">
      {/* Hero Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="v2-section-label">Documentation</div>
            <h1 className="font-space font-bold text-4xl sm:text-5xl md:text-[3.25rem] text-[#0F172A] leading-[1.15] mb-5 max-w-3xl">
              Solomon's S³ Stack: A Unified Security Operations Platform
            </h1>
            <p className="text-lg text-[#64748B] max-w-2xl leading-relaxed mb-8">
              An integrated suite of AI-powered tools bridging security operations platforms
              through the Model Context Protocol. Purpose-built for threat hunting, incident
              response, and security automation. Built by Solomon Neas.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/architecture"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] text-white text-sm font-space font-medium hover:bg-[#1D4ED8] transition-colors"
              >
                Explore Architecture
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E2E8F0] text-[#1E293B] text-sm font-space font-medium hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors"
              >
                View Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <div className="font-space font-bold text-2xl md:text-3xl text-[#0F172A]">
                  {m.value}
                </div>
                <div className="text-sm font-medium text-[#1E293B] mt-1">{m.label}</div>
                <div className="text-xs text-[#94A3B8] font-fira">{m.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Architecture Preview */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="v2-section-label">System Overview</div>
                <h2 className="font-space font-bold text-2xl text-[#0F172A]">
                  Architecture Diagram
                </h2>
              </div>
              <Link
                to="/architecture"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#2563EB] font-space font-medium hover:underline"
              >
                Full details <ArrowRight size={14} />
              </Link>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 md:p-6">
              <ArchitectureGraph
                primaryColor="#2563EB"
                secondaryColor="#1E293B"
                accentColor="#2563EB"
              />
            </div>

            {/* Layer summary chips */}
            <div className="flex flex-wrap gap-4 mt-6">
              {architectureLayers.map((layer) => (
                <div
                  key={layer.id}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"
                >
                  {layer.id === 'ai-layer' && <Brain size={14} className="text-[#2563EB]" />}
                  {layer.id === 'mcp-layer' && <Server size={14} className="text-[#2563EB]" />}
                  {layer.id === 'tools-layer' && <Shield size={14} className="text-[#2563EB]" />}
                  <span className="font-space text-sm font-medium text-[#1E293B]">
                    {layer.label}
                  </span>
                  <span className="font-fira text-xs text-[#94A3B8]">
                    {layer.nodes.length} nodes
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <div className="v2-section-label">Contents</div>
            <h2 className="font-space font-bold text-2xl text-[#0F172A] mb-8">
              Documentation Sections
            </h2>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {tableOfContents.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                  >
                    <Link
                      to={item.path}
                      className="v2-card group flex items-start gap-4 hover:border-[#2563EB]/30"
                    >
                      <div className="p-2.5 rounded-lg bg-[#DBEAFE] text-[#2563EB] shrink-0 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-space font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                          {item.label}
                        </h3>
                        <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-[#CBD5E1] group-hover:text-[#2563EB] shrink-0 mt-1 transition-colors"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="bg-white border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-[#64748B]"
          >
            <span className="flex items-center gap-1.5">
              <Globe size={14} className="text-[#2563EB]" />
              <span className="font-fira">{totalNodes}</span> architecture nodes
            </span>
            <span className="text-[#E2E8F0]">·</span>
            <span className="flex items-center gap-1.5">
              <Wrench size={14} className="text-[#2563EB]" />
              <span className="font-fira">{productionTools}</span> production tools
            </span>
            <span className="text-[#E2E8F0]">·</span>
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-[#2563EB]" />
              <span className="font-fira">3</span> case studies
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}