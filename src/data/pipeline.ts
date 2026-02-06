import type { PipelineStep } from '@/types';

export const pipelineSteps: PipelineStep[] = [
  {
    id: 'alert-ingestion',
    name: 'Alert Ingestion',
    description:
      'Raw alerts flow in from Wazuh, Suricata, Zeek, and third-party feeds. Normalized into a common schema for downstream processing.',
    order: 1,
    icon: 'Download',
    color: '#00f0ff',
    inputs: ['Wazuh Alerts', 'Suricata EVE', 'Zeek Logs', 'External Feeds'],
    outputs: ['Normalized Alert Queue'],
  },
  {
    id: 'enrichment',
    name: 'Enrichment',
    description:
      'Alerts enriched with threat intelligence from MISP, GeoIP data, asset inventory context, and historical correlation data.',
    order: 2,
    icon: 'Database',
    color: '#33ccff',
    inputs: ['Normalized Alert Queue'],
    outputs: ['Enriched Alerts'],
  },
  {
    id: 'triage',
    name: 'Triage',
    description:
      'AI-assisted severity scoring and deduplication. Alerts categorized by type, prioritized by risk, and grouped by related indicators.',
    order: 3,
    icon: 'Filter',
    color: '#66aaff',
    inputs: ['Enriched Alerts'],
    outputs: ['Prioritized Incidents'],
  },
  {
    id: 'investigation',
    name: 'Investigation',
    description:
      'Deep-dive analysis using Cortex analyzers, TheHive case management, and AI-powered threat hunting across network telemetry.',
    order: 4,
    icon: 'Search',
    color: '#aa66ff',
    inputs: ['Prioritized Incidents'],
    outputs: ['Investigation Findings'],
  },
  {
    id: 'containment',
    name: 'Containment',
    description:
      'Isolate affected systems, block malicious IPs/domains, disable compromised accounts. Automated via Cortex responders or manual playbook steps.',
    order: 5,
    icon: 'ShieldAlert',
    color: '#ff4466',
    inputs: ['Investigation Findings'],
    outputs: ['Containment Actions'],
  },
  {
    id: 'eradication',
    name: 'Eradication',
    description:
      'Remove threat artifacts — malware, persistence mechanisms, unauthorized accounts. Verify complete removal through forensic validation.',
    order: 6,
    icon: 'Trash2',
    color: '#ff6633',
    inputs: ['Containment Actions'],
    outputs: ['Clean Systems'],
  },
  {
    id: 'recovery',
    name: 'Recovery',
    description:
      'Restore systems to normal operations. Re-enable services, validate functionality, and monitor for threat recurrence during stabilization period.',
    order: 7,
    icon: 'RotateCcw',
    color: '#ffaa00',
    inputs: ['Clean Systems'],
    outputs: ['Restored Operations'],
  },
  {
    id: 'lessons-learned',
    name: 'Lessons Learned',
    description:
      'Post-incident review documenting root cause, timeline, response effectiveness, and improvement opportunities. Feeds into playbook updates.',
    order: 8,
    icon: 'BookOpen',
    color: '#00ff88',
    inputs: ['Restored Operations', 'Case Documentation'],
    outputs: ['Incident Report', 'Improvement Items'],
  },
  {
    id: 'intel-update',
    name: 'Intel Update',
    description:
      'New indicators of compromise published to MISP. Threat actor profiles updated. Intelligence shared with community via STIX/TAXII.',
    order: 9,
    icon: 'Globe',
    color: '#33ffaa',
    inputs: ['Incident Report', 'New IOCs'],
    outputs: ['Updated Threat Intel'],
  },
  {
    id: 'detection-tuning',
    name: 'Detection Tuning',
    description:
      'Detection rules refined based on incident learnings. New signatures deployed to Suricata, Wazuh rules updated, Zeek scripts enhanced.',
    order: 10,
    icon: 'Settings',
    color: '#66ffcc',
    inputs: ['Improvement Items', 'Updated Threat Intel'],
    outputs: ['Enhanced Detections'],
  },
];
