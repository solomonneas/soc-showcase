import { motion } from 'framer-motion';
import { Github, ExternalLink, Shield, Server, Code2, Brain, Network, Lock, Terminal, Cpu } from 'lucide-react';
import type { PageProps } from '@/types';
import './styles.css';

const skills = [
  { label: 'Python', icon: Code2 },
  { label: 'TypeScript', icon: Terminal },
  { label: 'React', icon: Cpu },
  { label: 'Wazuh', icon: Shield },
  { label: 'TheHive', icon: Lock },
  { label: 'MISP', icon: Network },
  { label: 'Zeek', icon: Server },
  { label: 'Suricata', icon: Server },
  { label: 'MITRE ATT&CK', icon: Brain },
  { label: 'MCP Protocol', icon: Cpu },
  { label: 'Docker', icon: Server },
  { label: 'FastAPI', icon: Code2 },
];

const highlights = [
  { value: '9', label: 'Security Tools Built' },
  { value: '7', label: 'MCP Servers Deployed' },
  { value: '3+', label: 'Years in Security Ops' },
  { value: '100%', label: 'Open Source' },
];

export default function About(_props: PageProps) {
  return (
    <section className="v5-mesh-bg min-h-screen py-24 px-6" style={{ backgroundColor: '#0A0A0F' }}>
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Avatar + Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Gradient ring avatar placeholder */}
          <div className="inline-flex mb-6">
            <div className="v5-avatar-ring">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#18181B' }}
              >
                <Shield size={40} className="text-[#7C3AED]" />
              </div>
            </div>
          </div>

          <h1 className="font-space text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-3">
            Solomon Neas
          </h1>
          <p className="font-dm-sans text-xl text-[#A1A1AA] mb-2">
            Security Operations Engineer — S³ Stack Creator
          </p>
          <p className="font-jetbrains text-sm text-[#71717A]">
            Building the bridge between AI and security operations
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="v5-glass rounded-2xl p-8 mb-10"
        >
          <p className="font-dm-sans text-[#A1A1AA] leading-relaxed text-lg mb-4">
            I specialize in integrating AI capabilities into Security Operations Center workflows.
            Solomon's S³ Stack represents my approach to the challenge every security team faces: too many
            alerts, too little context, and not enough hours in the day.
          </p>
          <p className="font-dm-sans text-[#A1A1AA] leading-relaxed text-lg mb-4">
            Through the Model Context Protocol, I've built Solomon's S³ Stack — bridges that let AI assistants
            directly query and operate security tools — Wazuh, TheHive, Cortex, MISP, and
            more — while keeping human analysts in control of every decision.
          </p>
          <p className="font-dm-sans text-[#A1A1AA] leading-relaxed text-lg">
            Everything is open source. The tools, the MCP servers, the playbooks, the
            documentation. If it helps a single SOC team to leverage Solomon's S³ Stack and work smarter, it was worth building.
          </p>
        </motion.div>

        {/* Highlight Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
              className="v5-glass-hover rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-bold font-space v5-gradient-text mb-1">
                {h.value}
              </div>
              <div className="text-xs text-[#71717A] font-dm-sans">{h.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="font-space text-lg font-semibold text-[#FAFAFA] mb-4 text-center">
            Technical Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={skill.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.04, duration: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(124,58,237,0.12)',
                  borderColor: 'rgba(124,58,237,0.3)',
                }}
                className="v5-skill-pill cursor-default"
              >
                <skill.icon size={14} className="text-[#7C3AED]" />
                {skill.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://solomonneas.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="v5-btn-primary"
          >
            View Full Portfolio
            <ExternalLink size={16} />
          </a>
          <a
            href="https://github.com/solomonneas"
            target="_blank"
            rel="noopener noreferrer"
            className="v5-btn-secondary"
          >
            <Github size={16} />
            Connect on GitHub
          </a>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="font-jetbrains text-xs text-[#3F3F46]">
            Solomon's S³ Stack · Built with React, TypeScript & Tailwind · Open Source
          </p>
        </motion.div>
      </div>
    </section>
  );
}