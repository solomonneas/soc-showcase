import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { architectureLayers, architectureEdges } from '@/data/architecture';
import type { PageProps, ArchitectureNode } from '@/types';
import './styles.css';

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const layerDescriptions: Record<string, { title: string; prose: string }> = {
  'ai-layer': {
    title: 'AI Orchestration Layer',
    prose:
      'The topmost layer comprises the AI reasoning engine (Claude), the agent orchestration platform (OpenClaw), and the human SOC analyst. Claude serves as the primary analytical interface, receiving structured context from MCP servers and producing natural-language assessments, queries, and response recommendations. OpenClaw manages session state, tool routing, and multi-agent coordination, ensuring that AI interactions remain bounded and auditable. The SOC analyst retains final authority over all containment and remediation actions, enforcing a human-in-the-loop model consistent with responsible AI deployment in security-critical environments.',
  },
  'mcp-layer': {
    title: 'MCP Bridge Layer',
    prose:
      'The middle layer consists of five Model Context Protocol servers, each providing a typed, schema-validated interface between the AI layer and a specific security tool. MCP servers translate natural-language intent into structured API calls, handle authentication and rate limiting, and normalize tool-specific response formats into a consistent schema consumable by the AI. This abstraction layer allows security tools to be upgraded, replaced, or extended without modifying AI-layer logic. Each MCP server exposes a declarative tool manifest describing available operations, required parameters, and expected output schemas.',
  },
  'tools-layer': {
    title: 'Security Tools Layer',
    prose:
      'The foundation layer comprises the production security tools that generate, process, and store security telemetry. Wazuh provides SIEM and XDR capabilities including log aggregation, vulnerability scanning, and compliance monitoring. TheHive manages incident response cases, tasks, and observables. Cortex executes automated analysis through configurable analyzers and responders. MISP serves as the threat intelligence platform for indicator management and community sharing. Zeek and Suricata provide network-level visibility through protocol analysis and signature-based intrusion detection, respectively.',
  },
};

export default function Architecture(_props: PageProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const allNodes = architectureLayers.flatMap((l) => l.nodes);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="paper-wrapper paper-body">
      {/* Section heading */}
      <motion.h2 className="paper-heading section-heading" {...fade}>
        2. Architecture
      </motion.h2>

      <motion.p {...fade} transition={{ delay: 0.05, duration: 0.5 }}>
        The SOC Stack follows a three-layer architecture designed to separate concerns
        between AI reasoning, protocol bridging, and security tool operation. This
        separation ensures that each layer can be developed, tested, and upgraded
        independently. Figure 2 presents the full architecture graph with inter-layer
        communication paths.
      </motion.p>

      {/* Figure 2: Architecture Graph */}
      <motion.div className="figure-block" {...fade} transition={{ delay: 0.1, duration: 0.5 }}>
        <div className="figure-content">
          <svg viewBox="0 0 680 420" className="w-full" style={{ maxHeight: 380 }}>
            <defs>
              <marker id="v4-arch-arrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
                <polygon points="0 0, 6 2, 0 4" fill="#57534E" />
              </marker>
            </defs>

            {/* Layer backgrounds */}
            {architectureLayers.map((layer, li) => {
              const yOffset = li * 140 + 5;
              return (
                <g key={layer.id}>
                  <rect
                    x={8}
                    y={yOffset}
                    width={664}
                    height={125}
                    rx={2}
                    fill={li % 2 === 0 ? '#FAFAF8' : '#FFFFFF'}
                    stroke="#D6D3D1"
                    strokeWidth={0.75}
                  />
                  <text
                    x={20}
                    y={yOffset + 18}
                    fontFamily="'Source Serif 4', serif"
                    fontSize={10}
                    fontWeight={700}
                    fill="#1C1917"
                    opacity={0.7}
                  >
                    {layer.label}
                  </text>
                </g>
              );
            })}

            {/* Edges */}
            {architectureEdges.map((edge) => {
              const fromNode = allNodes.find((n) => n.id === edge.from);
              const toNode = allNodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const s = 680 / 800;
              const fx = fromNode.x * s + (fromNode.width * s) / 2;
              const fy = fromNode.y * s - 8;
              const tx = toNode.x * s + (toNode.width * s) / 2;
              const ty = toNode.y * s - 8;
              const my = (fy + ty) / 2;

              return (
                <path
                  key={edge.id}
                  d={`M ${fx} ${fy} C ${fx} ${my}, ${tx} ${my}, ${tx} ${ty}`}
                  fill="none"
                  stroke="#D6D3D1"
                  strokeWidth={0.75}
                  strokeDasharray={edge.animated ? '4 3' : undefined}
                  markerEnd="url(#v4-arch-arrow)"
                />
              );
            })}

            {/* Nodes */}
            {allNodes.map((node) => {
              const s = 680 / 800;
              const nx = node.x * s;
              const ny = node.y * s - 8;
              const nw = node.width * s;
              const nh = node.height * s * 0.8;

              return (
                <g key={node.id}>
                  <rect
                    x={nx}
                    y={ny}
                    width={nw}
                    height={nh}
                    rx={2}
                    fill="#FFFFFF"
                    stroke="#1C1917"
                    strokeWidth={0.75}
                  />
                  <text
                    x={nx + nw / 2}
                    y={ny + nh / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="'IBM Plex Mono', monospace"
                    fontSize={8.5}
                    fill="#1C1917"
                    fontWeight={500}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="figure-caption">
          <strong>Figure 2.</strong> Complete architecture graph showing all nodes and
          inter-component communication paths. Dashed edges indicate MCP protocol
          connections; solid edges represent direct API or command interfaces.
        </div>
      </motion.div>

      {/* Subsections for each layer */}
      {architectureLayers.map((layer, li) => {
        const desc = layerDescriptions[layer.id];
        if (!desc) return null;
        const sectionNum = `2.${li + 1}`;

        return (
          <motion.div
            key={layer.id}
            {...fade}
            transition={{ delay: 0.15 + li * 0.05, duration: 0.5 }}
          >
            <h3 className="paper-heading subsection-heading">
              {sectionNum} {desc.title}
            </h3>
            <p>{desc.prose}</p>

            {/* Expandable node details */}
            <div style={{ marginTop: '0.75rem' }}>
              {layer.nodes.map((node: ArchitectureNode) => {
                const isOpen = expandedNodes.has(node.id);
                // Find connected nodes
                const connections = architectureEdges
                  .filter((e) => e.from === node.id || e.to === node.id)
                  .map((e) => {
                    const targetId = e.from === node.id ? e.to : e.from;
                    const target = allNodes.find((n) => n.id === targetId);
                    return { label: e.label ?? 'connects to', target: target?.label ?? targetId };
                  });

                return (
                  <div key={node.id} style={{ marginBottom: '0.5rem' }}>
                    <button className="expand-toggle" onClick={() => toggleNode(node.id)}>
                      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      <span style={{ fontWeight: 600 }}>{node.label}</span>
                      {node.description && (
                        <span style={{ fontWeight: 400, marginLeft: '0.25rem' }}>
                          — {node.description}
                        </span>
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{
                            overflow: 'hidden',
                            paddingLeft: '1.25rem',
                            marginTop: '0.25rem',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '0.85rem',
                              color: '#57534E',
                              lineHeight: 1.6,
                              borderLeft: '2px solid #D6D3D1',
                              paddingLeft: '0.75rem',
                              paddingBottom: '0.5rem',
                            }}
                          >
                            {connections.length > 0 && (
                              <>
                                <div
                                  style={{
                                    fontFamily: "'Source Serif 4', serif",
                                    fontWeight: 600,
                                    color: '#1C1917',
                                    fontSize: '0.8rem',
                                    marginBottom: '0.25rem',
                                  }}
                                >
                                  Connections:
                                </div>
                                <ul
                                  style={{
                                    margin: 0,
                                    paddingLeft: '1.25rem',
                                    listStyleType: 'disc',
                                  }}
                                >
                                  {connections.map((c, ci) => (
                                    <li key={ci}>
                                      <span
                                        style={{
                                          fontFamily: "'IBM Plex Mono', monospace",
                                          fontSize: '0.75rem',
                                        }}
                                      >
                                        {c.label}
                                      </span>{' '}
                                      → {c.target}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                            <p
                              className="cross-ref"
                              style={{ marginTop: '0.5rem', marginBottom: 0 }}
                            >
                              See Table 1 (Section 3) for full component specifications.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}

      {/* Cross-reference to next section */}
      <hr className="section-rule" />
      <p className="cross-ref">
        A comprehensive inventory of all components with technology stacks and operational
        status is provided in Section 3.
      </p>
    </div>
  );
}
