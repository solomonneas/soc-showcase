import { motion } from 'framer-motion';
import { Shield, Github, Globe, Mail } from 'lucide-react';
import type { PageProps } from '@/types';

export default function About({ theme }: PageProps) {
  return (
    <section className="px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield size={28} style={{ color: theme.primaryColor }} />
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: theme.fontHeading, color: theme.primaryColor }}
            >
              About
            </h2>
          </div>

          <div className="space-y-6 text-gray-400 leading-relaxed" style={{ fontFamily: theme.fontBody }}>
            <p className="text-lg">
              <span className="text-white font-semibold">Solomon Neas</span> is a
              security operations engineer building AI-powered tools for the modern SOC.
            </p>

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

          {/* Links */}
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="https://solomonneas.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <Globe size={16} />
              solomonneas.dev
            </a>
            <a
              href="https://github.com/solomonneas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="mailto:me@solomonneas.dev"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <Mail size={16} />
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
