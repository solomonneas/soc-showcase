import type { CaseStudy } from '@/types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'python-vuln-remediation',
    title: 'Python Vulnerability Remediation',
    subtitle: 'CVE patching across 12 hosts in under 48 hours',
    description:
      'Critical Python vulnerabilities were identified across the infrastructure requiring coordinated patching. Using Wazuh SCA scanning, AI-assisted triage, and automated deployment, all 12 affected hosts were remediated with an 89% reduction in vulnerability exposure.',
    challenge:
      'Multiple CVEs affecting Python installations across 12 production and development hosts. Manual patching would take days, and each host had different Python versions, virtual environments, and dependency chains. Risk of breaking application dependencies during upgrades.',
    solution:
      'Leveraged Wazuh MCP to scan all agents for Python-related vulnerabilities, then used AI analysis to prioritize by CVSS score and exploitability. Built automated remediation playbooks in Playbook Forge that handled version-specific upgrade paths while preserving virtual environments.',
    outcome:
      'All 12 hosts patched within 48 hours. Zero application breakages due to dependency-aware upgrade paths. Vulnerability count reduced from 47 to 5 (residual low-severity items with no available patches). Process documented as repeatable playbook for future CVE responses.',
    timeline: [
      {
        id: 'py-1',
        title: 'Vulnerability Discovery',
        description: 'Wazuh SCA scan identifies 47 Python-related CVEs across 12 hosts',
        date: 'Day 1, 09:00',
        status: 'completed',
      },
      {
        id: 'py-2',
        title: 'AI-Assisted Triage',
        description: 'Wazuh MCP used to correlate CVEs with CVSS scores, prioritize critical/high findings',
        date: 'Day 1, 11:00',
        status: 'completed',
      },
      {
        id: 'py-3',
        title: 'Remediation Planning',
        description: 'Playbook Forge generates host-specific upgrade paths preserving dependencies',
        date: 'Day 1, 14:00',
        status: 'completed',
      },
      {
        id: 'py-4',
        title: 'Staged Rollout',
        description: 'Automated patching deployed to dev hosts first, then staging, then production',
        date: 'Day 1, 16:00',
        status: 'completed',
      },
      {
        id: 'py-5',
        title: 'Verification & Reporting',
        description: 'Post-patch SCA scan confirms 89% reduction, remaining items documented',
        date: 'Day 2, 10:00',
        status: 'completed',
      },
    ],
    metrics: [
      {
        label: 'Vulnerabilities Found',
        before: 47,
        after: 5,
        reduction: '89%',
      },
      {
        label: 'Hosts Affected',
        before: 12,
        after: 0,
        reduction: '100%',
        unit: 'hosts',
      },
      {
        label: 'Time to Remediate',
        before: '5+ days',
        after: '48 hours',
        reduction: '60%+',
        unit: 'estimated',
      },
      {
        label: 'Application Breakages',
        before: 'N/A',
        after: 0,
        reduction: '0 incidents',
      },
    ],
    tools: ['wazuh-mcp', 'playbook-forge'],
    tags: ['vulnerability-management', 'patching', 'python', 'automation'],
  },
  {
    id: 'virtualbox-removal',
    title: 'VirtualBox Removal Campaign',
    subtitle: 'Compliance enforcement with 100% removal rate',
    description:
      'Unauthorized VirtualBox installations were discovered across the environment, violating security policy. Orchestrated a targeted removal campaign using Wazuh inventory scanning and automated uninstallation, achieving complete compliance.',
    challenge:
      'VirtualBox installations found on multiple endpoints violated organizational security policy due to VM escape vulnerabilities and unauthorized network bridging risks. No centralized software inventory existed, making scope assessment difficult.',
    solution:
      'Used Wazuh MCP to query system inventory across all agents, identifying every VirtualBox installation with version details. Created a phased removal plan that notified affected users, migrated necessary VMs to approved platforms, and executed automated uninstallation scripts.',
    outcome:
      'Complete removal of all unauthorized VirtualBox installations. Zero user productivity impact due to proactive VM migration support. Established ongoing compliance monitoring rule in Wazuh to detect future unauthorized installations.',
    timeline: [
      {
        id: 'vb-1',
        title: 'Discovery & Scope',
        description: 'Wazuh syscollector inventory reveals VirtualBox on 8 endpoints',
        date: 'Day 1',
        status: 'completed',
      },
      {
        id: 'vb-2',
        title: 'Impact Assessment',
        description: 'AI analysis identifies 3 users with active VMs requiring migration',
        date: 'Day 2',
        status: 'completed',
      },
      {
        id: 'vb-3',
        title: 'User Notification',
        description: 'Affected users notified with migration timeline and support resources',
        date: 'Day 3',
        status: 'completed',
      },
      {
        id: 'vb-4',
        title: 'VM Migration',
        description: 'Active VMs migrated to approved Hyper-V/KVM platforms',
        date: 'Day 4-5',
        status: 'completed',
      },
      {
        id: 'vb-5',
        title: 'Automated Removal',
        description: 'Scripted uninstallation deployed across all 8 endpoints',
        date: 'Day 6',
        status: 'completed',
      },
      {
        id: 'vb-6',
        title: 'Compliance Verification',
        description: 'Follow-up scan confirms 100% removal, monitoring rule deployed',
        date: 'Day 7',
        status: 'completed',
      },
    ],
    metrics: [
      {
        label: 'Unauthorized Installations',
        before: 8,
        after: 0,
        reduction: '100%',
      },
      {
        label: 'Policy Violations',
        before: 8,
        after: 0,
        reduction: '100%',
      },
      {
        label: 'User Productivity Impact',
        before: 'N/A',
        after: 0,
        reduction: '0 disruptions',
      },
      {
        label: 'Time to Compliance',
        before: 'Unknown exposure',
        after: '7 days',
        reduction: 'Full remediation',
      },
    ],
    tools: ['wazuh-mcp'],
    tags: ['compliance', 'software-removal', 'policy-enforcement', 'inventory'],
  },
  {
    id: 'software-lifecycle',
    title: 'Software Lifecycle Management',
    subtitle: 'Patch cadence optimization reducing exposure by 67%',
    description:
      'Implemented a comprehensive software lifecycle management program using AI-assisted vulnerability scanning and automated patch scheduling. Reduced the average vulnerability exposure window from 21 days to 7 days across the entire infrastructure.',
    challenge:
      'Inconsistent patching schedules across teams led to an average 21-day vulnerability exposure window. No centralized visibility into patch status, and manual tracking spreadsheets were perpetually outdated. Critical patches sometimes took weeks to deploy.',
    solution:
      'Built an integrated patch management workflow combining Wazuh vulnerability detection with AI-prioritized scheduling. Automated patch testing pipelines validate updates against application dependencies before deployment. Real-time dashboards replaced spreadsheet tracking.',
    outcome:
      'Average exposure window reduced from 21 days to 7 days (67% improvement). Critical patches now deployed within 72 hours. Automated reporting gives leadership real-time visibility into organizational patch posture.',
    timeline: [
      {
        id: 'sl-1',
        title: 'Baseline Assessment',
        description: 'Full infrastructure vulnerability scan establishes 21-day average exposure',
        date: 'Week 1',
        status: 'completed',
      },
      {
        id: 'sl-2',
        title: 'Pipeline Design',
        description: 'Automated patch testing and deployment pipeline architected',
        date: 'Week 2-3',
        status: 'completed',
      },
      {
        id: 'sl-3',
        title: 'AI Prioritization Engine',
        description: 'Wazuh MCP integrated with CVSS scoring for intelligent patch scheduling',
        date: 'Week 4',
        status: 'completed',
      },
      {
        id: 'sl-4',
        title: 'Staged Rollout',
        description: 'New patch cadence deployed team by team with feedback loops',
        date: 'Week 5-8',
        status: 'completed',
      },
      {
        id: 'sl-5',
        title: 'Monitoring & Optimization',
        description: 'Real-time dashboards deployed, continuous improvement cycle established',
        date: 'Ongoing',
        status: 'completed',
      },
    ],
    metrics: [
      {
        label: 'Avg. Exposure Window',
        before: '21 days',
        after: '7 days',
        reduction: '67%',
      },
      {
        label: 'Critical Patch SLA',
        before: '14+ days',
        after: '72 hours',
        reduction: '78%',
      },
      {
        label: 'Patch Visibility',
        before: 'Manual spreadsheets',
        after: 'Real-time dashboard',
        reduction: 'Full automation',
      },
      {
        label: 'Compliance Score',
        before: '64%',
        after: '94%',
        reduction: '+30 points',
      },
    ],
    tools: ['wazuh-mcp', 'playbook-forge'],
    tags: ['patch-management', 'lifecycle', 'automation', 'compliance'],
  },
];
