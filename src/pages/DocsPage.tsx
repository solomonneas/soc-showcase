import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Shield,
  ArrowLeft,
  BookOpen,
  Server,
  Network,
  FileSearch,
  Palette,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Activity,
  Target,
  Bug,
  Globe,
  Brain,
  Crosshair,
  Radar,
} from 'lucide-react';

/* ── FAQ Data ──────────────────────────────────── */
const faqItems: { q: string; a: string }[] = [
  {
    q: 'Is this a real SOC platform?',
    a: 'No — this is a frontend-only portfolio demo. It showcases the tools, architecture, and workflows of a modern Security Operations Center, but does not connect to live security infrastructure.',
  },
  {
    q: 'What are MCP Servers?',
    a: 'Model Context Protocol (MCP) servers are bridges that connect AI assistants to security tools via standardized APIs. They translate natural language queries into tool-specific API calls.',
  },
  {
    q: 'Can I use these tools in my own SOC?',
    a: 'The individual MCP servers (Wazuh MCP, TheHive MCP, etc.) are separate open-source projects that can integrate with real security deployments. This showcase demonstrates their capabilities.',
  },
  {
    q: 'Why 5 different themes?',
    a: 'Each variant demonstrates how the same data and components can be presented through radically different visual designs — from military-grade terminals to academic papers to modern SaaS.',
  },
  {
    q: 'What does the guided tour cover?',
    a: 'The tour walks through each major section: Hero overview, Tools gallery, Architecture graph, Case studies timeline, Pipeline stages, and the Variant picker.',
  },
];

/* ── FAQ Item Component ────────────────────────── */
function FaqItem({ item }: { item: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-medium text-gray-200">{item.q}</span>
        {open ? (
          <ChevronDown size={18} className="text-gray-500 shrink-0 ml-4" />
        ) : (
          <ChevronRight size={18} className="text-gray-500 shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
          {item.a}
        </div>
      )}
    </div>
  );
}

/* ── Section heading ───────────────────────────── */
function SectionHeading({
  icon: Icon,
  title,
  id,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  id: string;
}) {
  return (
    <h2 id={id} className="flex items-center gap-3 text-2xl font-bold text-white mt-16 mb-6 scroll-mt-24">
      <Icon size={24} className="text-cyan-400 shrink-0" />
      {title}
    </h2>
  );
}

/* ── Main Component ────────────────────────────── */
export default function DocsPage() {
  const location = useLocation();

  // Determine variant prefix from URL for back navigation
  const pathParts = location.pathname.split('/');
  const variantNum = pathParts[1] ?? '';
  const backPath = variantNum && /^[1-5]$/.test(variantNum) ? `/${variantNum}` : '/';

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-gray-950/90">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to={backPath}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-cyan-400" />
            <span className="font-semibold text-white text-sm">S³ Stack Docs</span>
          </div>
          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Variants
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Overview */}
        <SectionHeading icon={BookOpen} title="Overview" id="overview" />
        <p className="text-gray-400 leading-relaxed mb-4">
          Solomon's S³ Stack is a unified security operations platform demonstrating SOC tooling,
          architecture, and incident response workflows. Built with React, TypeScript, and
          Tailwind CSS, it presents 9 SOC tools through 5 visually distinct theme variants.
        </p>
        <p className="text-gray-400 leading-relaxed mb-4">
          Each variant renders the same underlying data — tools, architecture graphs, case studies,
          and pipeline stages — through a completely different design language. This showcases
          both the SOC domain expertise and the frontend engineering approach of separating data
          from presentation.
        </p>

        {/* SOC Operations */}
        <SectionHeading icon={Server} title="SOC Operations" id="soc-operations" />
        <p className="text-gray-400 leading-relaxed mb-4">
          A <strong className="text-white">Security Operations Center (SOC)</strong> is a
          centralized facility where information security teams monitor, detect, analyze, and
          respond to cybersecurity incidents. Modern SOCs combine human expertise with automated
          tooling to maintain 24/7 vigilance over an organization&apos;s digital assets.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: 'Monitor', desc: 'Continuous surveillance of network traffic, endpoints, and cloud services' },
            { label: 'Detect', desc: 'Identify anomalies, policy violations, and known threat signatures' },
            { label: 'Investigate', desc: 'Deep analysis of alerts to determine scope and impact' },
            { label: 'Respond', desc: 'Contain threats, eradicate malware, and restore operations' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-lg border border-white/10 bg-white/[0.02]"
            >
              <h4 className="text-sm font-semibold text-cyan-400 mb-1">{item.label}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Tool Categories */}
        <SectionHeading icon={Target} title="Tool Categories" id="tool-categories" />
        <p className="text-gray-400 leading-relaxed mb-4">
          The showcase includes 9 tools spanning the full SOC technology stack:
        </p>
        <div className="space-y-3 mb-6">
          {[
            { icon: Crosshair, name: 'Bro Hunter', cat: 'Threat Hunting', desc: 'AI-powered network threat hunting with Zeek log analysis' },
            { icon: Shield, name: 'Wazuh MCP', cat: 'SIEM', desc: 'AI bridge to Wazuh for alerts, agents, and compliance' },
            { icon: Bug, name: 'TheHive MCP', cat: 'Incident Response', desc: 'Case management and response orchestration via AI' },
            { icon: Brain, name: 'Cortex MCP', cat: 'Threat Analysis', desc: 'Multi-analyzer observable submission and enrichment' },
            { icon: Globe, name: 'MISP MCP', cat: 'Threat Intelligence', desc: 'IOC sharing, event management, and correlation' },
            { icon: Activity, name: 'Zeek MCP', cat: 'Network Monitoring', desc: 'Connection logs, DNS, HTTP, and SSL traffic inspection' },
            { icon: Radar, name: 'Suricata MCP', cat: 'IDS/IPS', desc: 'EVE JSON alerts, rule management, and engine monitoring' },
            { icon: Target, name: 'MITRE MCP', cat: 'Framework', desc: 'ATT&CK technique browsing and detection coverage analysis' },
            { icon: BookOpen, name: 'Playbook Forge', cat: 'Visualization', desc: 'Drag-and-drop playbook builder for SOC procedures' },
          ].map((tool) => (
            <div
              key={tool.name}
              className="flex items-start gap-3 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
            >
              <tool.icon size={18} className="text-cyan-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-medium text-white text-sm">{tool.name}</span>
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">{tool.cat}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Explained */}
        <SectionHeading icon={Network} title="Architecture Explained" id="architecture" />
        <p className="text-gray-400 leading-relaxed mb-4">
          The architecture visualization shows a three-layer system:
        </p>
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-lg border-l-4 border-purple-500 bg-purple-500/5">
            <h4 className="text-sm font-semibold text-purple-400 mb-1">AI Layer</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              The LLM processes queries, the AI orchestrator coordinates multi-step operations, and SOC
              analysts maintain human-in-the-loop oversight. This layer generates the intent that
              flows down to security tools.
            </p>
          </div>
          <div className="p-4 rounded-lg border-l-4 border-cyan-500 bg-cyan-500/5">
            <h4 className="text-sm font-semibold text-cyan-400 mb-1">MCP Layer</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Model Context Protocol servers act as bridges between AI and security tools. Each MCP
              server translates natural language into tool-specific API calls, handling authentication,
              rate limiting, and response normalization.
            </p>
          </div>
          <div className="p-4 rounded-lg border-l-4 border-green-500 bg-green-500/5">
            <h4 className="text-sm font-semibold text-green-400 mb-1">Security Tools Layer</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Production security platforms form the operational backbone: Wazuh for SIEM/XDR,
              TheHive for incident response, Cortex for analysis, MISP for threat intel, and
              Zeek/Suricata for network monitoring.
            </p>
          </div>
        </div>

        {/* Incident Response Pipeline */}
        <SectionHeading icon={FileSearch} title="Incident Response Pipeline" id="pipeline" />
        <p className="text-gray-400 leading-relaxed mb-4">
          The pipeline section visualizes the 10 stages of a modern SOC incident response workflow:
        </p>
        <ol className="space-y-2 mb-6">
          {[
            { stage: 'Alert Ingestion', desc: 'Raw alerts from Wazuh, Suricata, Zeek, and external feeds normalized into a common schema' },
            { stage: 'Enrichment', desc: 'Alerts enriched with MISP threat intel, GeoIP, asset inventory, and historical data' },
            { stage: 'Triage', desc: 'AI-assisted severity scoring, deduplication, and categorization by risk' },
            { stage: 'Investigation', desc: 'Deep analysis using Cortex analyzers, TheHive case management, and threat hunting' },
            { stage: 'Containment', desc: 'Isolate affected systems, block malicious indicators, disable compromised accounts' },
            { stage: 'Eradication', desc: 'Remove malware, persistence mechanisms, and unauthorized artifacts' },
            { stage: 'Recovery', desc: 'Restore services, validate functionality, monitor for recurrence' },
            { stage: 'Lessons Learned', desc: 'Post-incident review documenting root cause and improvement opportunities' },
            { stage: 'Intel Update', desc: 'Publish new IOCs to MISP and share intelligence via STIX/TAXII' },
            { stage: 'Detection Tuning', desc: 'Refine Suricata signatures, Wazuh rules, and Zeek scripts based on findings' },
          ].map((item, i) => (
            <li key={item.stage} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <span className="font-medium text-white text-sm">{item.stage}</span>
                <span className="text-gray-500 text-sm"> — {item.desc}</span>
              </div>
            </li>
          ))}
        </ol>

        {/* Visual Themes */}
        <SectionHeading icon={Palette} title="Visual Themes" id="themes" />
        <p className="text-gray-400 leading-relaxed mb-4">
          Each variant demonstrates a different design philosophy:
        </p>
        <div className="space-y-3 mb-6">
          {[
            {
              num: 1,
              name: 'Cyber Command',
              desc: 'Military-grade dark theme with cyan accents, scanline overlays, a real-time status bar, and JetBrains Mono for that terminal feel.',
              colors: ['#00f0ff', '#0066ff', '#ff00aa'],
            },
            {
              num: 2,
              name: 'Neural Network',
              desc: 'Clean, documentation-style light theme with blue accents on white. Space Grotesk headings with structured, readable layouts.',
              colors: ['#00ff88', '#00ccaa', '#aa66ff'],
            },
            {
              num: 3,
              name: 'Threat Matrix',
              desc: 'Sci-fi HUD with hex grid backgrounds, neon cyan/magenta gradients, rotating shield icon, and persistent status bar.',
              colors: ['#ffaa00', '#ff6633', '#00f0ff'],
            },
            {
              num: 4,
              name: 'Intelligence Brief',
              desc: 'Academic paper format with serif typography, section numbering, minimal color, and margin annotations.',
              colors: ['#6688ff', '#4466dd', '#ff4466'],
            },
            {
              num: 5,
              name: 'Neon SOC',
              desc: 'Modern SaaS-style with purple-to-blue gradient accents, glass morphism navigation, and smooth micro-interactions.',
              colors: ['#ff00aa', '#aa00ff', '#00f0ff'],
            },
          ].map((variant) => (
            <div
              key={variant.num}
              className="p-4 rounded-lg border border-white/10 bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1">
                  {variant.colors.map((c) => (
                    <div
                      key={c}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-white">
                  V{variant.num} — {variant.name}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{variant.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <SectionHeading icon={HelpCircle} title="FAQ" id="faq" />
        <div className="space-y-2 mb-16">
          {faqItems.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 text-center">
        <p className="text-xs text-gray-600">
          Solomon's S³ Stack — soc.solomonneas.dev — Built by Solomon Neas
        </p>
      </footer>
    </div>
  );
}
