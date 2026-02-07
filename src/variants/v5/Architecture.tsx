import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { architectureLayers, architectureEdges } from '@/data/architecture';
import type { PageProps, ArchitectureNode } from '@/types';
import './styles.css';

const layerColors = ['#7C3AED', '#2563EB', '#10B981'];
const layerLabels = ['AI Orchestration', 'MCP Bridge Layer', 'Security Tools'];

export default function Architecture(_props: PageProps) {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  // Flatten all nodes for lookup
  const nodeMap = new Map<string, ArchitectureNode>();
  architectureLayers.forEach((l) => l.nodes.forEach((n) => nodeMap.set(n.id, n)));

  // SVG layout constants
  const svgW = 960;
  const svgH = 520;
  const layerH = 140;
  const layerGap = 30;
  const layerStartY = 30;

  // Compute positions for each layer
  const nodePositions = new Map<string, { cx: number; cy: number }>();
  architectureLayers.forEach((layer, li) => {
    const yCenter = layerStartY + li * (layerH + layerGap) + layerH / 2;
    const count = layer.nodes.length;
    const totalW = svgW - 120;
    const spacing = totalW / (count + 1);
    layer.nodes.forEach((node, ni) => {
      nodePositions.set(node.id, { cx: 60 + spacing * (ni + 1), cy: yCenter });
    });
  });

  return (
    <section className="v5-mesh-bg min-h-screen py-24 px-6" style={{ backgroundColor: '#0A0A0F' }}>
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="v5-section-label justify-center mb-4">System Architecture</span>
          <h2 className="font-space text-4xl md:text-5xl font-bold text-[#FAFAFA] mt-4 mb-4">
            Three-Layer <span className="v5-gradient-text">Architecture</span>
          </h2>
          <p className="font-dm-sans text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            AI orchestration, MCP bridge services, and security tools working together through
            standardized protocols.
          </p>
        </motion.div>

        {/* Interactive Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="v5-glass rounded-2xl p-4 md:p-8 v5-glow-violet overflow-x-auto"
        >
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full min-w-[640px]" style={{ maxHeight: 520 }}>
            <defs>
              {/* Gradient for edges */}
              <linearGradient id="v5-edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="v5-edge-grad-dim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.15" />
              </linearGradient>
              {/* Glow filter */}
              <filter id="v5-node-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Arrow marker */}
              <marker id="v5-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#7C3AED" opacity="0.6" />
              </marker>
            </defs>

            {/* Layer backgrounds */}
            {architectureLayers.map((_, li) => {
              const y = layerStartY + li * (layerH + layerGap);
              return (
                <g key={`layer-bg-${li}`}>
                  <rect
                    x={20} y={y}
                    width={svgW - 40} height={layerH}
                    rx={12}
                    fill={`${layerColors[li]}06`}
                    stroke={`${layerColors[li]}18`}
                    strokeWidth={1}
                  />
                  <text
                    x={40} y={y + 20}
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize={10}
                    fill={layerColors[li]}
                    opacity={0.7}
                    fontWeight={500}
                    letterSpacing="0.08em"
                  >
                    {layerLabels[li]?.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {/* Connection edges */}
            {architectureEdges.map((edge) => {
              const from = nodePositions.get(edge.from);
              const to = nodePositions.get(edge.to);
              if (!from || !to) return null;

              return (
                <g key={edge.id}>
                  <line
                    x1={from.cx} y1={from.cy}
                    x2={to.cx} y2={to.cy}
                    stroke="url(#v5-edge-grad-dim)"
                    strokeWidth={1.5}
                    markerEnd="url(#v5-arrow)"
                  />
                  {edge.animated && (
                    <line
                      x1={from.cx} y1={from.cy}
                      x2={to.cx} y2={to.cy}
                      stroke="url(#v5-edge-grad)"
                      strokeWidth={1.5}
                      strokeDasharray="6 6"
                      opacity={0.5}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;-24"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </line>
                  )}
                </g>
              );
            })}

            {/* Nodes as glass cards */}
            {architectureLayers.map((layer, li) =>
              layer.nodes.map((node) => {
                const pos = nodePositions.get(node.id);
                if (!pos) return null;
                const cardW = 110;
                const cardH = 48;
                const color = layerColors[li] ?? '#7C3AED';

                return (
                  <g
                    key={node.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedNode(node)}
                  >
                    {/* Hover glow */}
                    <rect
                      x={pos.cx - cardW / 2 - 4}
                      y={pos.cy - cardH / 2 - 4}
                      width={cardW + 8}
                      height={cardH + 8}
                      rx={14}
                      fill="transparent"
                      stroke={`${color}00`}
                      strokeWidth={1}
                      className="transition-all duration-300"
                    >
                      <set attributeName="stroke" to={`${color}30`} begin="mouseover" end="mouseout" />
                    </rect>

                    {/* Card body */}
                    <rect
                      x={pos.cx - cardW / 2}
                      y={pos.cy - cardH / 2}
                      width={cardW}
                      height={cardH}
                      rx={10}
                      fill="rgba(255,255,255,0.04)"
                      stroke={`${color}33`}
                      strokeWidth={1}
                    >
                      <set attributeName="fill" to="rgba(255,255,255,0.08)" begin="mouseover" end="mouseout" />
                      <set attributeName="stroke" to={`${color}66`} begin="mouseover" end="mouseout" />
                    </rect>

                    {/* Small color pip */}
                    <circle cx={pos.cx - cardW / 2 + 14} cy={pos.cy} r={3} fill={color} opacity={0.8} />

                    {/* Label */}
                    <text
                      x={pos.cx + 4}
                      y={pos.cy + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontFamily="'DM Sans', sans-serif"
                      fontSize={11}
                      fill="#FAFAFA"
                      fontWeight={500}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })
            )}
          </svg>
        </motion.div>

        {/* Layer cards below */}
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {architectureLayers.map((layer, li) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: li * 0.1, duration: 0.5 }}
              className="v5-glass-hover rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layerColors[li] }} />
                <h3 className="font-space text-lg font-semibold text-[#FAFAFA]">
                  {layerLabels[li]}
                </h3>
              </div>
              <p className="text-sm text-[#A1A1AA] font-dm-sans mb-4">
                {li === 0 && 'Claude AI, OpenClaw orchestration, and human analyst oversight for decision-making.'}
                {li === 1 && 'Model Context Protocol servers bridging AI to security tools via standardized APIs.'}
                {li === 2 && 'Wazuh, TheHive, Cortex, MISP, Zeek, and Suricata for detection and response.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {layer.nodes.map((node) => (
                  <span
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="text-xs font-jetbrains px-2.5 py-1 rounded-md cursor-pointer transition-colors"
                    style={{
                      background: `${layerColors[li]}10`,
                      color: layerColors[li],
                      border: `1px solid ${layerColors[li]}22`,
                    }}
                  >
                    {node.label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="v5-modal-overlay"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="bg-[#18181B] border border-white/10 rounded-2xl max-w-lg w-[90%] p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 text-[#71717A] hover:text-[#FAFAFA] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      selectedNode.layer === 'ai' ? '#7C3AED' :
                      selectedNode.layer === 'mcp' ? '#2563EB' : '#10B981',
                  }}
                />
                <span className="font-jetbrains text-xs uppercase tracking-wider text-[#71717A]">
                  {selectedNode.layer === 'ai' ? 'AI Layer' : selectedNode.layer === 'mcp' ? 'MCP Layer' : 'Tools Layer'}
                </span>
              </div>

              <h3 className="font-space text-2xl font-bold text-[#FAFAFA] mb-3">
                {selectedNode.label}
              </h3>

              <p className="font-dm-sans text-[#A1A1AA] leading-relaxed mb-6">
                {selectedNode.description}
              </p>

              {/* Connected edges */}
              <div className="space-y-3">
                <h4 className="font-jetbrains text-xs uppercase tracking-wider text-[#71717A]">
                  Connections
                </h4>
                <div className="flex flex-wrap gap-2">
                  {architectureEdges
                    .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                    .map((edge) => {
                      const otherId = edge.from === selectedNode.id ? edge.to : edge.from;
                      const otherNode = nodeMap.get(otherId);
                      return (
                        <span
                          key={edge.id}
                          onClick={() => otherNode && setSelectedNode(otherNode)}
                          className="text-xs font-jetbrains px-3 py-1.5 rounded-lg v5-glass cursor-pointer hover:bg-white/[0.08] transition-colors text-[#A1A1AA]"
                        >
                          {edge.from === selectedNode.id ? '→' : '←'} {otherNode?.label ?? otherId}
                          {edge.label && <span className="text-[#71717A] ml-1.5">({edge.label})</span>}
                        </span>
                      );
                    })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
