import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';
import ArchitectureGraph from '@/components/shared/ArchitectureGraph';
import { architectureLayers } from '@/data/architecture';
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

export default function Architecture({ theme: _theme }: PageProps) {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  return (
    <section className="px-6 py-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-cyan-500/50" />
            <span className="font-jetbrains text-[11px] tracking-[0.3em] uppercase text-cyan-500/70">
              System Architecture
            </span>
          </div>
          <h2 className="font-chakra font-bold text-3xl md:text-4xl uppercase tracking-wider text-slate-100 mb-3">
            Three-Layer{' '}
            <span className="text-cyan-400">Integration</span>
          </h2>
          <p className="font-exo text-slate-400 max-w-2xl">
            AI assistants connect to security tools through the Model Context Protocol.
            Hover over nodes to explore connections. Click for details.
          </p>
        </motion.div>

        {/* Layer legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-6 mb-8"
        >
          {architectureLayers.map((layer) => (
            <div key={layer.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: layer.color, opacity: 0.7 }}
              />
              <span className="font-chakra text-xs font-medium uppercase tracking-wider text-slate-400">
                {layer.label}
              </span>
              <span className="font-jetbrains text-[10px] text-slate-600">
                ({layer.nodes.length})
              </span>
            </div>
          ))}
        </motion.div>

        {/* Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="v1-panel p-4 md:p-6 mb-10"
        >
          <ArchitectureGraph
            primaryColor="#06B6D4"
            secondaryColor="#8B5CF6"
            accentColor="#22C55E"
          />
        </motion.div>

        {/* Layer details */}
        <div className="grid gap-4 md:grid-cols-3 mb-10">
          {architectureLayers.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="v1-panel p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: layer.color,
                    boxShadow: `0 0 8px ${layer.color}80`,
                  }}
                />
                <h3 className="font-chakra font-semibold text-sm uppercase tracking-wider text-slate-200">
                  {layer.label}
                </h3>
              </div>
              <p className="font-exo text-xs text-slate-500 leading-relaxed mb-4">
                {layerDescriptions[layer.id]}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {layer.nodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="font-jetbrains text-[10px] px-2 py-1 rounded border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors cursor-pointer"
                  >
                    {node.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Node counts summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { label: 'AI Nodes', count: architectureLayers[0]!.nodes.length, color: '#8B5CF6' },
            { label: 'MCP Bridges', count: architectureLayers[1]!.nodes.length, color: '#06B6D4' },
            { label: 'Security Tools', count: architectureLayers[2]!.nodes.length, color: '#22C55E' },
            { label: 'Total Nodes', count: allNodes.length, color: '#E2E8F0' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-jetbrains font-bold text-2xl mb-1"
                style={{ color: stat.color }}
              >
                {stat.count}
              </div>
              <div className="font-chakra text-[10px] font-medium uppercase tracking-wider text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Slide-out detail panel ────────────────── */}
      <AnimatePresence>
        {selectedNode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedNode(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-[#111827] border-l border-cyan-500/15 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: selectedNode.color,
                          boxShadow: `0 0 8px ${selectedNode.color}80`,
                        }}
                      />
                      <span className="font-jetbrains text-[10px] uppercase tracking-wider text-slate-500">
                        {selectedNode.layer} layer
                      </span>
                    </div>
                    <h3 className="font-chakra font-bold text-xl uppercase tracking-wider text-slate-100">
                      {selectedNode.label}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="p-1.5 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {selectedNode.description && (
                  <div className="flex items-start gap-2 p-3 rounded bg-slate-800/50 border border-slate-700/50 mb-6">
                    <Info size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                    <p className="font-exo text-sm text-slate-400 leading-relaxed">
                      {selectedNode.description}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <div className="font-chakra text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Position
                    </div>
                    <div className="font-jetbrains text-xs text-slate-400">
                      x: {selectedNode.x}, y: {selectedNode.y} — {selectedNode.width}×{selectedNode.height}
                    </div>
                  </div>

                  <div>
                    <div className="font-chakra text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Color Code
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: selectedNode.color }}
                      />
                      <span className="font-jetbrains text-xs text-slate-400">
                        {selectedNode.color}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="font-chakra text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Layer
                    </div>
                    <span
                      className="v1-badge rounded"
                      style={{
                        borderColor: `${selectedNode.color}40`,
                        backgroundColor: `${selectedNode.color}15`,
                        color: selectedNode.color,
                      }}
                    >
                      {selectedNode.layer.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
