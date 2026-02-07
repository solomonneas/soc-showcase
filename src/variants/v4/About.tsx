import { motion } from 'framer-motion';
import { tools } from '@/data/tools';
import type { PageProps } from '@/types';
import './styles.css';

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Build references list from tools + key technologies
const toolRefs = tools.map((t, i) => ({
  num: i + 1,
  label: t.name,
  desc: t.tagline,
  tech: t.techStack.join(', '),
}));

const additionalRefs = [
  {
    num: tools.length + 1,
    label: 'Wazuh',
    desc: 'Open source security monitoring platform.',
    url: 'https://wazuh.com',
  },
  {
    num: tools.length + 2,
    label: 'TheHive Project',
    desc: 'A scalable, open source security incident response platform.',
    url: 'https://thehive-project.org',
  },
  {
    num: tools.length + 3,
    label: 'MISP Project',
    desc: 'Open source threat intelligence platform.',
    url: 'https://www.misp-project.org',
  },
  {
    num: tools.length + 4,
    label: 'Cortex',
    desc: 'Observable analysis and active response engine.',
    url: 'https://github.com/TheHive-Project/Cortex',
  },
  {
    num: tools.length + 5,
    label: 'MITRE ATT&CK',
    desc: 'Adversarial tactics, techniques, and common knowledge framework.',
    url: 'https://attack.mitre.org',
  },
  {
    num: tools.length + 6,
    label: 'Zeek',
    desc: 'Open source network security monitoring tool.',
    url: 'https://zeek.org',
  },
  {
    num: tools.length + 7,
    label: 'Suricata',
    desc: 'Open source IDS, IPS, and network security monitoring engine.',
    url: 'https://suricata.io',
  },
  {
    num: tools.length + 8,
    label: 'Anthropic',
    desc: 'Model Context Protocol (MCP) specification.',
    url: 'https://modelcontextprotocol.io',
  },
  {
    num: tools.length + 9,
    label: 'OpenClaw',
    desc: 'AI agent orchestration platform for tool integration.',
    url: 'https://github.com/openclaw',
  },
];

export default function About(_props: PageProps) {
  return (
    <div className="paper-wrapper paper-body">
      {/* Section heading */}
      <motion.h2 className="paper-heading section-heading" {...fade}>
        6. Author & References
      </motion.h2>

      {/* Author section */}
      <motion.div {...fade} transition={{ delay: 0.05, duration: 0.5 }}>
        <h3 className="paper-heading subsection-heading">6.1 Author</h3>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: '#F5F5F4',
              border: '1px solid #D6D3D1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#1C1917',
              flexShrink: 0,
            }}
          >
            SN
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontWeight: 700,
                fontSize: '1.05rem',
                color: '#1C1917',
                marginBottom: '0.25rem',
              }}
            >
              Solomon Neas
            </div>
            <p style={{ marginBottom: '0.5rem' }}>
              Security operations engineer and builder of AI-augmented defense tools.
              Focused on bridging the gap between large language models and production
              security infrastructure through open protocols and reproducible
              architectures. Creator of the SOC Stack and its constituent MCP
              integrations.
            </p>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.8rem',
                color: '#57534E',
              }}
            >
              <div>me@solomonneas.dev</div>
              <div>solomonneas.dev</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* References section */}
      <motion.div {...fade} transition={{ delay: 0.1, duration: 0.5 }}>
        <h3 className="paper-heading subsection-heading">6.2 References</h3>
        <p style={{ marginBottom: '1rem' }}>
          The following references document the tools, platforms, and protocols cited
          throughout this paper. Items [1]–[{tools.length}] refer to SOC Stack
          components developed by the author; items [{tools.length + 1}]–[
          {tools.length + additionalRefs.length}] refer to external open-source
          projects and specifications.
        </p>

        <ol className="references-list">
          {/* Tool references */}
          {toolRefs.map((ref) => (
            <li key={ref.num}>
              <span className="ref-number">[{ref.num}]</span>
              S. Neas, "<span className="ref-title">{ref.label}</span>: {ref.desc}"{' '}
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.75rem',
                  color: '#57534E',
                }}
              >
                [{ref.tech}]
              </span>
              , 2025–2026.
            </li>
          ))}

          {/* External references */}
          {additionalRefs.map((ref) => (
            <li key={ref.num}>
              <span className="ref-number">[{ref.num}]</span>
              <span className="ref-title">{ref.label}</span>. {ref.desc}{' '}
              <span className="ref-url">{ref.url}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Acknowledgments */}
      <motion.div {...fade} transition={{ delay: 0.15, duration: 0.5 }}>
        <h3 className="paper-heading subsection-heading">6.3 Acknowledgments</h3>
        <p>
          The author acknowledges the open-source security community whose foundational
          tools — Wazuh, TheHive, MISP, Cortex, Zeek, and Suricata — make architectures
          like the SOC Stack possible. Special recognition is due to the Anthropic team
          for the Model Context Protocol specification, which provides the interoperability
          standard upon which the MCP bridge layer is built.
        </p>
      </motion.div>

      {/* License */}
      <motion.div {...fade} transition={{ delay: 0.2, duration: 0.5 }}>
        <h3 className="paper-heading subsection-heading">6.4 License & Availability</h3>
        <p>
          All SOC Stack components are released under permissive open-source licenses.
          Source code, documentation, and deployment artifacts are available at{' '}
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.9rem',
            }}
          >
            github.com/soloneas
          </span>
          . This paper and its accompanying showcase application are published under
          the MIT License.
        </p>
      </motion.div>

      {/* Footnotes */}
      <div className="footnotes-section">
        <div className="footnote-item">
          <span className="footnote-number">†</span>
          Correspondence: me@solomonneas.dev. This paper was prepared in February 2026
          and reflects the state of the SOC Stack at that time. Component status and
          capabilities may have evolved since publication.
        </div>
      </div>
    </div>
  );
}
