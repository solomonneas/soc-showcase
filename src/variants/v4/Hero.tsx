import { motion } from 'framer-motion';
import { architectureLayers } from '@/data/architecture';
import type { PageProps } from '@/types';
import './styles.css';

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Hero(_props: PageProps) {
  // Simple architecture preview for Figure 1
  const allNodes = architectureLayers.flatMap((l) => l.nodes);

  return (
    <div className="paper-wrapper paper-body">
      {/* Title */}
      <motion.h1 className="paper-title" {...fade}>
        Solomon's S³ Stack: An Integrated, AI-Augmented Security Operations Architecture
      </motion.h1>

      {/* Author & Date */}
      <motion.div className="author-block" {...fade} transition={{ delay: 0.1, duration: 0.5 }}>
        <div className="author-name">Solomon Neas</div>
        <div className="author-date">February 2026</div>
      </motion.div>

      {/* Abstract */}
      <motion.div className="abstract-block" {...fade} transition={{ delay: 0.15, duration: 0.5 }}>
        <div className="abstract-label">Abstract</div>
        <div className="abstract-text">
          <p>
            Modern Security Operations Centers face an escalating challenge: the volume and
            sophistication of threats continue to outpace the capacity of human analysts to
            detect, investigate, and respond in a timely manner. This paper presents
            Solomon's S³ Stack, an integrated security operations architecture that augments
            traditional SIEM, SOAR, and threat intelligence platforms with artificial
            intelligence through the Model Context Protocol (MCP). The architecture enables
            conversational AI assistants to directly query security tools, correlate alerts,
            and orchestrate incident response workflows while maintaining human oversight
            at every decision point.
          </p>
          <p>
            We describe the three-layer design — spanning AI orchestration, MCP bridge
            services, and underlying security tools — and detail the implementation of nine
            purpose-built components including MCP servers for Wazuh, TheHive, Cortex, MISP,
            and MITRE ATT&CK.<span className="footnote-ref">1</span> Through three case
            studies drawn from production deployments, we demonstrate measurable improvements
            in vulnerability remediation time (89% reduction), compliance enforcement (100%
            coverage), and patch management cadence (67% exposure window reduction).
          </p>
          <p>
            The architecture is fully open-source and designed for reproducibility. All
            components, configuration, and deployment artifacts are published under
            permissive licenses. We present this work as a practical blueprint for
            security teams seeking to integrate AI capabilities into existing SOC
            workflows without replacing established tooling or processes.
          </p>
        </div>
      </motion.div>

      {/* Keywords */}
      <motion.div className="keywords" {...fade} transition={{ delay: 0.2, duration: 0.5 }}>
        <strong>Keywords: </strong>
        <span>
          Security Operations Center, SIEM, Model Context Protocol, Incident Response,
          Threat Intelligence, AI-Augmented Security, Wazuh, TheHive, MITRE ATT&CK
        </span>
      </motion.div>

      {/* Figure 1: Architecture Overview */}
      <motion.div className="figure-block" {...fade} transition={{ delay: 0.25, duration: 0.5 }}>
        <div className="figure-content">
          <svg viewBox="0 0 680 400" className="w-full" style={{ maxHeight: 340 }}>
            {/* Layer backgrounds */}
            {architectureLayers.map((layer, li) => {
              const yOffset = li * 130 + 10;
              const labels = ['AI Orchestration Layer', 'MCP Bridge Layer', 'Security Tools Layer'];
              return (
                <g key={layer.id}>
                  <rect
                    x={10}
                    y={yOffset}
                    width={660}
                    height={110}
                    rx={3}
                    fill="#FAFAF8"
                    stroke="#D6D3D1"
                    strokeWidth={1}
                  />
                  <text
                    x={24}
                    y={yOffset + 22}
                    fontFamily="'Source Serif 4', serif"
                    fontSize={11}
                    fontWeight={700}
                    fill="#1C1917"
                  >
                    {labels[li]}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {allNodes.map((node) => {
              // Remap to fit 680-wide SVG
              const scale = 680 / 800;
              const nx = node.x * scale;
              const ny = node.y * scale - 10;
              const nw = node.width * scale;
              const nh = node.height * scale * 0.85;

              return (
                <g key={node.id}>
                  <rect
                    x={nx}
                    y={ny}
                    width={nw}
                    height={nh}
                    rx={3}
                    fill="#FFFFFF"
                    stroke="#D6D3D1"
                    strokeWidth={1}
                  />
                  <text
                    x={nx + nw / 2}
                    y={ny + nh / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="'IBM Plex Mono', monospace"
                    fontSize={9}
                    fill="#1C1917"
                    fontWeight={500}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

            {/* Vertical connection indicators between layers */}
            {[140, 270].map((baseY) => (
              <g key={`conn-${baseY}`}>
                {[120, 240, 360, 480, 580].map((cx, i) => (
                  <line
                    key={i}
                    x1={cx * 680 / 800}
                    y1={baseY - 15}
                    x2={cx * 680 / 800}
                    y2={baseY + 15}
                    stroke="#D6D3D1"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    markerEnd="url(#v4-arrow)"
                  />
                ))}
              </g>
            ))}

            <defs>
              <marker id="v4-arrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#D6D3D1" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="figure-caption">
          <strong>Figure 1.</strong> System architecture overview showing the three-layer design:
          AI orchestration (top), MCP bridge services (middle), and security tools (bottom).
          Dashed lines indicate API communication channels.
        </div>
      </motion.div>

      {/* Footnotes */}
      <div className="footnotes-section">
        <div className="footnote-item">
          <span className="footnote-number">1</span>
          MCP (Model Context Protocol) is an open standard developed by Anthropic for
          connecting AI assistants to external data sources and tools. See Section 2 for
          architectural details.
        </div>
      </div>
    </div>
  );
}