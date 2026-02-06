import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { architectureLayers, architectureEdges } from '@/data/architecture';
import type { ArchitectureNode } from '@/types';

interface ArchitectureGraphProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  className?: string;
}

export default function ArchitectureGraph({
  primaryColor = '#00f0ff',
  secondaryColor = '#aa66ff',
  accentColor = '#00ff88',
  className = '',
}: ArchitectureGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const width = 800;
  const height = 520;

  // All nodes flat
  const allNodes = useMemo(
    () => architectureLayers.flatMap((layer) => layer.nodes),
    [],
  );

  // Find connected edges for a node
  const connectedEdges = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    return new Set(
      architectureEdges
        .filter((e) => e.from === hoveredNode || e.to === hoveredNode)
        .map((e) => e.id),
    );
  }, [hoveredNode]);

  // Find connected nodes
  const connectedNodes = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    const nodes = new Set<string>([hoveredNode]);
    architectureEdges.forEach((e) => {
      if (e.from === hoveredNode) nodes.add(e.to);
      if (e.to === hoveredNode) nodes.add(e.from);
    });
    return nodes;
  }, [hoveredNode]);

  const getNodeCenter = (nodeId: string): { x: number; y: number } => {
    const node = allNodes.find((n) => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    return { x: node.x + node.width / 2, y: node.y + node.height / 2 };
  };

  const layerColors: Record<string, string> = {
    'ai-layer': secondaryColor,
    'mcp-layer': primaryColor,
    'tools-layer': accentColor,
  };

  return (
    <div className={`relative ${className}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <filter id="arch-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={primaryColor} opacity="0.6" />
          </marker>
        </defs>

        {/* Layer backgrounds */}
        {architectureLayers.map((layer) => (
          <g key={layer.id}>
            <rect
              x="10"
              y={layer.y}
              width={width - 20}
              height={layer.height}
              rx="8"
              fill={`${layerColors[layer.id] ?? '#333'}08`}
              stroke={`${layerColors[layer.id] ?? '#333'}33`}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="24"
              y={layer.y + 24}
              fill={layerColors[layer.id] ?? '#666'}
              fontSize="13"
              fontWeight="600"
              opacity="0.7"
            >
              {layer.label}
            </text>
          </g>
        ))}

        {/* Edges */}
        {architectureEdges.map((edge) => {
          const from = getNodeCenter(edge.from);
          const to = getNodeCenter(edge.to);
          const isHighlighted = connectedEdges.has(edge.id);
          const isDimmed = hoveredNode !== null && !isHighlighted;

          // Curved path
          const midY = (from.y + to.y) / 2;
          const dx = Math.abs(from.x - to.x);
          const curveOffset = Math.min(dx * 0.15, 30);
          const pathD = `M ${from.x} ${from.y} C ${from.x} ${midY + curveOffset}, ${to.x} ${midY - curveOffset}, ${to.x} ${to.y}`;

          return (
            <g key={edge.id}>
              <motion.path
                d={pathD}
                fill="none"
                stroke={isHighlighted ? primaryColor : '#475569'}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeDasharray={edge.animated ? '6 4' : undefined}
                opacity={isDimmed ? 0.15 : isHighlighted ? 0.9 : 0.35}
                markerEnd="url(#arrowhead)"
                animate={
                  edge.animated && isHighlighted
                    ? { strokeDashoffset: [0, -20] }
                    : {}
                }
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              {edge.label && isHighlighted && (
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 8}
                  textAnchor="middle"
                  fill={primaryColor}
                  fontSize="9"
                  fontWeight="500"
                  opacity="0.8"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {allNodes.map((node: ArchitectureNode) => {
          const isHovered = hoveredNode === node.id;
          const isConnected = connectedNodes.has(node.id);
          const isDimmed = hoveredNode !== null && !isConnected;

          return (
            <motion.g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
              animate={{ opacity: isDimmed ? 0.3 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Node rectangle */}
              <motion.rect
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                rx="6"
                fill={isHovered ? `${node.color}33` : `${node.color}11`}
                stroke={node.color}
                strokeWidth={isHovered ? 2 : 1}
                filter={isHovered ? 'url(#arch-glow)' : undefined}
                animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                style={{ transformOrigin: `${node.x + node.width / 2}px ${node.y + node.height / 2}px` }}
              />

              {/* Node label */}
              <text
                x={node.x + node.width / 2}
                y={node.y + node.height / 2 - (node.description ? 4 : 0)}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHovered ? '#ffffff' : node.color}
                fontSize="12"
                fontWeight="600"
              >
                {node.label}
              </text>

              {/* Description on hover */}
              {isHovered && node.description && (
                <text
                  x={node.x + node.width / 2}
                  y={node.y + node.height / 2 + 14}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#94a3b8"
                  fontSize="9"
                >
                  {node.description}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
