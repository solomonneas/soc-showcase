import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import ArchitectureGraph from '@/components/shared/ArchitectureGraph';
import { architectureLayers, architectureEdges } from '@/data/architecture';
import type { PageProps, ArchitectureNode } from '@/types';

const allNodes = architectureLayers.flatMap((l) => l.nodes);

const layerDescriptions: Record<string, string> = {
  'ai-layer':
    'AI assistants and human analysts interact at this layer. Claude AI processes queries, OpenClaw orchestrates multi-step operations, and SOC analysts maintain oversight.',
  'mcp-layer':
    'Model Context Protocol servers bridge AI to security tools. Each MCP server translates natural language into tool-specific API calls.',
  'tools-layer':
    'Production security tools form the operational backbone. These platforms generate alerts, process incidents, and monitor network traffic.',
};

export default function Architecture({ theme: _ }: PageProps) {
  const prefersReduced = useReducedMotion();
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  const getNodeEdges = (nodeId: string) =>
    architectureEdges.filter((e) => e.from === nodeId || e.to === nodeId);

  const getConnectedNodeNames = (nodeId: string) => {
    const edges = getNodeEdges(nodeId);
    const ids = new Set<string>();
    edges.forEach((e) => {
      if (e.from !== nodeId) ids.add(e.from);
      if (e.to !== nodeId) ids.add(e.from === nodeId ? e.to : e.from);
    });
    return Array.from(ids).map((id) => allNodes.find((n) => n.id === id)?.label ?? id);
  };

  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[rgba(0,240,255,0.1)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="v3-section-label mb-2">// Architecture</div>
            <h1 className="font-audiowide text-3xl md:text-4xl text-[#E0F7FF] mb-3 v3-chromatic-subtle">
              System Architecture
            </h1>
            <p className="font-rajdhani text-[#5B7A8A] max-w-2xl leading-relaxed">
              A three-layer orbital integration model connecting AI assistants to security tools
              through the Model Context Protocol. Hover over nodes to explore.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Layer Legend */}
      <div className="border-b border-[rgba(0,240,255,0.05)]" style={{ background: 'rgba(0,240,255,0.02)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center gap-6"
          >
            {architectureLayers.map((layer) => (
              <div key={layer.id} className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ background: layer.color, boxShadow: `0 0 6px ${layer.color}80` }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: prefersReduced ? 0 : Infinity, delay: Math.random() }}
                />
                <span className="font-audiowide text-xs text-[#E0F7FF]">{layer.label}</span>
                <span className="font-fira text-[10px] text-[#5B7A8A]">({layer.nodes.length})</span>
              </div>
            ))}
            <span className="font-fira text-[10px] text-[#5B7A8A] ml-auto">
              {allNodes.length} nodes · {architectureEdges.length} connections
            </span>
          </motion.div>
        </div>
      </div>

      {/* Main Content: Graph + Detail Panel */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            <div className="v3-glass rounded-xl p-4 md:p-6 v3-panel-scan">
              <ArchitectureGraph
                primaryColor="#00F0FF"
                secondaryColor="#FF00FF"
                accentColor="#39FF14"
              />
            </div>
          </motion.div>

          {/* Detail Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="w-full lg:w-80 shrink-0"
          >
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="v3-glass-strong rounded-xl p-6 v3-hud-corners v3-panel-scan"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-fira text-[10px] tracking-wider text-[#00F0FF] uppercase mb-1">
                        {selectedNode.layer} layer
                      </div>
                      <h3 className="font-audiowide text-xl text-[#E0F7FF]">
                        {selectedNode.label}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="p-1 rounded text-[#5B7A8A] hover:text-[#00F0FF] transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {selectedNode.description && (
                    <p className="font-rajdhani text-sm text-[#5B7A8A] leading-relaxed mb-5 pb-5 border-b border-[rgba(0,240,255,0.1)]">
                      {selectedNode.description}
                    </p>
                  )}

                  <div className="mb-5">
                    <h4 className="font-audiowide text-[10px] tracking-wider text-[#5B7A8A] uppercase mb-3">
                      Connections
                    </h4>
                    <div className="space-y-1.5">
                      {getConnectedNodeNames(selectedNode.id).map((name) => (
                        <div key={name} className="flex items-center gap-2 text-sm font-rajdhani text-[#E0F7FF]">
                          <ChevronRight size={12} className="text-[#00F0FF]" />
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-[rgba(0,240,255,0.1)]">
                    <div className="flex items-center justify-between text-sm font-rajdhani">
                      <span className="text-[#5B7A8A]">Layer</span>
                      <span
                        className="font-fira text-[10px] px-2 py-0.5 rounded"
                        style={{
                          color: selectedNode.color,
                          background: `${selectedNode.color}15`,
                          border: `1px solid ${selectedNode.color}33`,
                        }}
                      >
                        {selectedNode.layer.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-rajdhani">
                      <span className="text-[#5B7A8A]">Edges</span>
                      <span className="font-fira text-[#E0F7FF]">{getNodeEdges(selectedNode.id).length}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="v3-glass-strong rounded-xl p-6 v3-hud-corners"
                >
                  <h3 className="font-audiowide text-sm text-[#E0F7FF] mb-3">Node Details</h3>
                  <p className="font-rajdhani text-sm text-[#5B7A8A] leading-relaxed mb-6">
                    Select a node below to view its details and connections.
                  </p>
                  <div className="space-y-4">
                    {architectureLayers.map((layer) => (
                      <div key={layer.id}>
                        <h4 className="font-audiowide text-[10px] tracking-wider uppercase mb-2" style={{ color: layer.color }}>
                          {layer.label}
                        </h4>
                        <div className="space-y-1">
                          {layer.nodes.map((node) => (
                            <button
                              key={node.id}
                              onClick={() => setSelectedNode(node)}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-left font-rajdhani text-[#5B7A8A] hover:text-[#00F0FF] hover:bg-[rgba(0,240,255,0.03)] transition-colors"
                            >
                              <ChevronRight size={12} className="shrink-0" style={{ color: `${node.color}66` }} />
                              <span>{node.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Layer Details */}
      <div className="border-t border-[rgba(0,240,255,0.1)]" style={{ background: 'rgba(0,240,255,0.01)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="v3-section-label mb-2">// Integration Layers</div>
            <h2 className="font-audiowide text-2xl text-[#E0F7FF] mb-8 v3-chromatic-subtle">
              Layer Architecture
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {architectureLayers.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="v3-glass rounded-xl p-6 v3-hud-corners group hover:bg-[rgba(0,240,255,0.03)] transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      style={{ background: layer.color, boxShadow: `0 0 8px ${layer.color}60` }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: prefersReduced ? 0 : Infinity, delay: i * 0.3 }}
                    />
                    <h3 className="font-audiowide text-sm text-[#E0F7FF]">{layer.label}</h3>
                  </div>
                  <p className="font-rajdhani text-sm text-[#5B7A8A] leading-relaxed mb-4">
                    {layerDescriptions[layer.id]}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.nodes.map((node) => (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className="font-fira text-[10px] px-2 py-0.5 rounded cursor-pointer transition-colors"
                        style={{
                          color: `${node.color}AA`,
                          background: `${node.color}10`,
                          border: `1px solid ${node.color}22`,
                        }}
                      >
                        {node.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="border-t border-[rgba(0,240,255,0.1)]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-10 text-center"
          >
            {[
              { val: architectureLayers[0]!.nodes.length, label: 'AI Nodes', color: '#FF00FF' },
              { val: architectureLayers[1]!.nodes.length, label: 'MCP Bridges', color: '#00F0FF' },
              { val: architectureLayers[2]!.nodes.length, label: 'Security Tools', color: '#39FF14' },
              { val: allNodes.length, label: 'Total Nodes', color: '#00F0FF' },
              { val: architectureEdges.length, label: 'Connections', color: '#FF00FF' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-audiowide text-2xl mb-1"
                  style={{ color: stat.color, textShadow: `0 0 15px ${stat.color}40` }}
                >
                  {stat.val}
                </div>
                <div className="font-fira text-[10px] text-[#5B7A8A] tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
