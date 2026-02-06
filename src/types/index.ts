export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'threat-hunting' | 'siem' | 'incident-response' | 'threat-intel' | 'network-monitoring' | 'ids-ips' | 'framework' | 'visualization' | 'threat-analysis';
  status: 'production' | 'beta' | 'development' | 'planned';
  techStack: string[];
  features: string[];
  icon: string;
  color: string;
  repoUrl?: string;
  demoUrl?: string;
}

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  date?: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon?: string;
}

export interface Metric {
  label: string;
  before: string | number;
  after: string | number;
  reduction: string;
  unit?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  timeline: TimelineStep[];
  metrics: Metric[];
  tools: string[];
  tags: string[];
}

export interface PipelineStep {
  id: string;
  name: string;
  description: string;
  order: number;
  icon: string;
  color: string;
  inputs?: string[];
  outputs?: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  layer: 'ai' | 'mcp' | 'tools';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  description?: string;
}

export interface ArchitectureEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

export interface ArchitectureLayer {
  id: string;
  label: string;
  color: string;
  y: number;
  height: number;
  nodes: ArchitectureNode[];
}

export interface VariantTheme {
  id: number;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  fontHeading: string;
  fontBody: string;
  fontMono: string;
}

export interface PageProps {
  theme: VariantTheme;
}
