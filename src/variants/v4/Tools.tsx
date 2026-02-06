import { motion } from 'framer-motion';
import { tools } from '../../data/tools';
import type { PageProps } from '../../types';
import './styles.css';

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const statusLabel: Record<string, string> = {
  production: 'Production',
  beta: 'Beta',
  development: 'Development',
  planned: 'Planned',
};

const statusClass: Record<string, string> = {
  production: 'status-production',
  beta: 'status-beta',
  development: 'status-development',
  planned: 'status-planned',
};

const categoryLabel: Record<string, string> = {
  'threat-hunting': 'Threat Hunting',
  siem: 'SIEM',
  'incident-response': 'Incident Response',
  'threat-intel': 'Threat Intelligence',
  'network-monitoring': 'Network Monitoring',
  'ids-ips': 'IDS/IPS',
  framework: 'Framework',
  visualization: 'Visualization',
  'threat-analysis': 'Threat Analysis',
};

export default function Tools(_props: PageProps) {
  return (
    <div className="paper-wrapper paper-body">
      {/* Section heading */}
      <motion.h2 className="paper-heading section-heading" {...fade}>
        3. Component Inventory
      </motion.h2>

      <motion.p {...fade} transition={{ delay: 0.05, duration: 0.5 }}>
        Table 1 presents a comprehensive inventory of all components comprising the SOC
        Stack. Each component is classified by functional category, underlying technology
        stack, and operational maturity status. Components marked <em>Production</em>{' '}
        have been deployed in live environments with active monitoring; <em>Beta</em>{' '}
        components are feature-complete but undergoing validation; <em>Development</em>{' '}
        components are in active implementation with partial functionality available.
      </motion.p>

      <motion.p {...fade} transition={{ delay: 0.08, duration: 0.5 }}>
        The inventory spans nine components across seven functional categories,
        reflecting the breadth of coverage required for a modern SOC deployment. Five
        of the nine components implement the Model Context Protocol, providing the AI
        bridge layer described in Section 2.2. The remaining components serve
        specialized roles in threat hunting, playbook management, and network analysis.
      </motion.p>

      {/* Table 1 */}
      <motion.div className="figure-block" {...fade} transition={{ delay: 0.12, duration: 0.5 }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="academic-table">
            <thead>
              <tr>
                <th style={{ width: '3rem' }}>ID</th>
                <th style={{ width: '8rem' }}>Component</th>
                <th>Category</th>
                <th>Technology</th>
                <th style={{ width: '6.5rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, i) => (
                <tr key={tool.id}>
                  <td className="mono" style={{ textAlign: 'center' }}>
                    {(i + 1).toString().padStart(2, '0')}
                  </td>
                  <td style={{ fontWeight: 600 }}>{tool.name}</td>
                  <td>{categoryLabel[tool.category] ?? tool.category}</td>
                  <td className="mono">{tool.techStack.join(', ')}</td>
                  <td>
                    <span className={statusClass[tool.status]}>
                      {statusLabel[tool.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="figure-caption">
          <strong>Table 1.</strong> SOC Stack component inventory. Technology column lists
          primary dependencies. Status reflects operational maturity as of February 2026.
        </div>
      </motion.div>

      {/* Component descriptions */}
      <motion.h3
        className="paper-heading subsection-heading"
        {...fade}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        3.1 Component Descriptions
      </motion.h3>

      {tools.map((tool, i) => (
        <motion.div
          key={tool.id}
          {...fade}
          transition={{ delay: 0.18 + i * 0.02, duration: 0.5 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <h4
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 700,
              fontSize: '0.95rem',
              color: '#1C1917',
              marginBottom: '0.25rem',
            }}
          >
            3.1.{i + 1} {tool.name}
          </h4>
          <p style={{ marginBottom: '0.5rem' }}>{tool.description}</p>
          <div
            style={{
              fontSize: '0.85rem',
              color: '#57534E',
              fontFamily: "'Crimson Pro', serif",
            }}
          >
            <strong>Key capabilities: </strong>
            {tool.features.join('; ')}.
          </div>
        </motion.div>
      ))}

      {/* Footnotes / cross-references */}
      <hr className="section-rule" />
      <p className="cross-ref">
        Operational results for select components are presented in Section 4 (Case Studies).
        The complete threat processing pipeline is described in Section 5.
      </p>
    </div>
  );
}
