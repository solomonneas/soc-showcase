import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Layers, Server, Shield, Brain } from 'lucide-react';
import ArchitectureGraph from '@/components/shared/ArchitectureGraph';
import { architectureLayers, architectureEdges } from '@/data/architecture';
import type { PageProps, ArchitectureNode } from '@/types';

const allNodes = architectureLayers.flatMap((l) => l.nodes);

const layerDescriptions: Record<string, string> = {
  'ai-layer':
    'AI assistants and human analysts interact at this layer. Claude AI processes queries, OpenClaw orchestrates multi-step operations, and SOC analysts maintain oversight of all automated actions.',
  'mcp-layer':
    'Model Context Protocol servers bridge AI to security tools. Each MCP server translates natural language into tool-specific API calls, handling authentication, rate limiting, and response normalization.',
  'tools-layer':
    'Production security tools form the operational backbone. These platforms generate alerts, process incidents, analyze threats, and monitor network traffic continuously.',
};

const layerIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'ai-layer': Brain,
  'mcp-layer': Server,
  'tools-layer': Shield,
};

export default function Architecture({ theme: _ }: PageProps) {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  // Find edges connected to a node
  const getNodeEdges = (nodeId: string) =>
    architectureEdges.filter((e) => e.from === nodeId || e.to === nodeId);

  // Find connected node names
  const getConnectedNodeNames = (nodeId: string) => {
    const edges = getNodeEdges(nodeId);
    const ids = new Set<string>();
    edges.forEach((e) => {
      if (e.from !== nodeId) ids.add(e.from);
      if (e.to !== nodeId) ids.add(e.to);
    });
    return Array.from(ids).map((id) => allNodes.find((n) => n.id === id)?.label ?? id);
  };

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
            <div className="v2-section-label">Architecture</div>
            <h1 className="font-space font-bold text-3xl md:text-4xl text-[#0F172A] mb-3">
              System Architecture
            </h1>
            <p className="text-[#64748B] max-w-2xl leading-relaxed">
              A three-layer integration model connecting AI assistants to security tools
              through the Model Context Protocol. Hover over nodes to explore connections.
              Click any node for details.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Layer Legend */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-6"
          >
            {architectureLayers.map((layer) => {
              const Icon = layerIcons[layer.id] ?? Layers;
              return (
                <div key={layer.id} className="flex items-center gap-2">
                  <Icon size={14} className="text-[#2563EB]" />
                  <span className="font-space text-sm font-medium text-[#1E293B]">
                    {layer.label}
                  </span>
                  <span className="font-fira text-xs text-[#94A3B8]">
                    ({layer.nodes.length})
                  </span>
                </div>
              );
            })}
            <div className="flex items-center gap-2 ml-auto">
              <span className="font-fira text-xs text-[#94A3B8]">
                {allNodes.length} nodes · {architectureEdges.length} connections
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content: Graph + Detail Panel */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex-1 min-w-0"
            >
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 md:p-6">
                <ArchitectureGraph
                  primaryColor="#2563EB"
                  secondaryColor="#1E293B"
                  accentColor="#2563EB"
                />
              </div>
            </motion.div>

            {/* Right-side Detail Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="w-full lg:w-80 shrink-0"
            >
              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="v2-card"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-fira text-[10px] uppercase tracking-wider text-[#2563EB] mb-1">
                          {selectedNode.layer} layer
                        </div>
                        <h3 className="font-space font-bold text-xl text-[#0F172A]">
                          {selectedNode.label}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedNode(null)}
                        className="p-1 rounded text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F1F5F9] transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {selectedNode.description && (
                      <p className="text-sm text-[#64748B] leading-relaxed mb-5 pb-5 border-b border-[#E2E8F0]">
                        {selectedNode.description}
                      </p>
                    )}

                    {/* Connections */}
                    <div className="mb-5">
                      <h4 className="font-space text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-3">
                        Connections
                      </h4>
                      <div className="space-y-1.5">
                        {getConnectedNodeNames(selectedNode.id).map((name) => (
                          <div
                            key={name}
                            className="flex items-center gap-2 text-sm text-[#1E293B]"
                          >
                            <ChevronRight size={12} className="text-[#2563EB]" />
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#64748B]">Layer</span>
                        <span className="v2-badge v2-badge--blue">
                          {selectedNode.layer.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#64748B]">Edges</span>
                        <span className="font-fira text-[#1E293B]">
                          {getNodeEdges(selectedNode.id).length}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="v2-card"
                  >
                    <h3 className="font-space font-semibold text-[#0F172A] mb-3">
                      Node Details
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                      Click a node in the list below to view its details and connections.
                    </p>

                    {/* Node List */}
                    <div className="space-y-4">
                      {architectureLayers.map((layer) => (
                        <div key={layer.id}>
                          <h4 className="font-space text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">
                            {layer.label}
                          </h4>
                          <div className="space-y-1">
                            {layer.nodes.map((node) => (
                              <button
                                key={node.id}
                                onClick={() => setSelectedNode(node)}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left text-[#1E293B] hover:bg-[#F8FAFC] hover:text-[#2563EB] transition-colors"
                              >
                                <ChevronRight size={12} className="text-[#CBD5E1] shrink-0" />
                                <span className="font-medium">{node.label}</span>
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
      </div>

      {/* Layer Details */}
      <div className="bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="v2-section-label">Layer Details</div>
            <h2 className="font-space font-bold text-2xl text-[#0F172A] mb-8">
              Integration Layers
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {architectureLayers.map((layer, i) => {
                const Icon = layerIcons[layer.id] ?? Layers;
                return (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="v2-card"
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="p-2 rounded-lg bg-[#DBEAFE]">
                        <Icon size={16} className="text-[#2563EB]" />
                      </div>
                      <h3 className="font-space font-semibold text-[#0F172A]">
                        {layer.label}
                      </h3>
                    </div>
                    <p className="text-sm text-[#64748B] leading-relaxed mb-4">
                      {layerDescriptions[layer.id]}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {layer.nodes.map((node) => (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          className="v2-badge hover:bg-[#DBEAFE] hover:text-[#2563EB] hover:border-[#BFDBFE] transition-colors cursor-pointer"
                        >
                          {node.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-10 text-center"
          >
            {[
              { val: architectureLayers[0]!.nodes.length, label: 'AI Nodes' },
              { val: architectureLayers[1]!.nodes.length, label: 'MCP Bridges' },
              { val: architectureLayers[2]!.nodes.length, label: 'Security Tools' },
              { val: allNodes.length, label: 'Total Nodes' },
              { val: architectureEdges.length, label: 'Connections' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-space font-bold text-2xl text-[#0F172A]">
                  {stat.val}
                </div>
                <div className="font-fira text-xs text-[#64748B] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
