import { motion } from 'framer-motion';
import { caseStudies } from '@/data/cases';
import type { PageProps } from '@/types';
import './styles.css';

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Cases(_props: PageProps) {
  return (
    <div className="paper-wrapper paper-body">
      {/* Section heading */}
      <motion.h2 className="paper-heading section-heading" {...fade}>
        4. Case Studies
      </motion.h2>

      <motion.p {...fade} transition={{ delay: 0.05, duration: 0.5 }}>
        To evaluate the practical efficacy of the SOC Stack architecture, we present
        three case studies drawn from production deployments. Each case follows a
        structured methodology: we describe the initial challenge, the tools and
        procedures applied, quantitative outcomes, and a timeline of key events. Metrics
        are reported as before/after comparisons with percentage improvements where
        applicable.
      </motion.p>

      {caseStudies.map((cs, ci) => {
        const sectionNum = `4.${ci + 1}`;
        const tableNum = ci + 2; // Table 2, 3, 4

        return (
          <motion.div
            key={cs.id}
            {...fade}
            transition={{ delay: 0.1 + ci * 0.05, duration: 0.5 }}
          >
            {/* Subsection heading */}
            <h3 className="paper-heading subsection-heading">
              {sectionNum} {cs.title}
            </h3>

            {/* Subtitle / summary */}
            <p style={{ fontStyle: 'italic', color: '#57534E', marginBottom: '1rem' }}>
              {cs.subtitle}
            </p>

            {/* Methodology: Challenge */}
            <h4
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                color: '#1C1917',
                marginBottom: '0.25rem',
                marginTop: '1rem',
              }}
            >
              {sectionNum}.1 Challenge
            </h4>
            <p>{cs.challenge}</p>

            {/* Methodology: Solution */}
            <h4
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                color: '#1C1917',
                marginBottom: '0.25rem',
                marginTop: '1rem',
              }}
            >
              {sectionNum}.2 Methodology
            </h4>
            <p>{cs.solution}</p>

            {/* Timeline Figure */}
            <div className="figure-block">
              <div className="figure-content" style={{ textAlign: 'left', padding: '1rem 1.25rem' }}>
                {cs.timeline.map((step, si) => (
                  <div
                    key={step.id}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      marginBottom: si < cs.timeline.length - 1 ? '0.625rem' : 0,
                      alignItems: 'flex-start',
                    }}
                  >
                    <span className="pipeline-step-num">{si + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          gap: '0.5rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Source Serif 4', serif",
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            color: '#1C1917',
                          }}
                        >
                          {step.title}
                        </span>
                        {step.date && (
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: '0.7rem',
                              color: '#57534E',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {step.date}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: '0.825rem',
                          color: '#57534E',
                          lineHeight: 1.5,
                          marginTop: '0.125rem',
                        }}
                      >
                        {step.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="figure-caption">
                <strong>Figure {ci + 3}.</strong> Timeline of key events for{' '}
                {cs.title.toLowerCase()}.
              </div>
            </div>

            {/* Results */}
            <h4
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                color: '#1C1917',
                marginBottom: '0.25rem',
                marginTop: '1rem',
              }}
            >
              {sectionNum}.3 Results
            </h4>
            <p>{cs.outcome}</p>

            {/* Metrics table */}
            <div className="figure-block">
              <table className="metrics-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Before</th>
                    <th>After</th>
                    <th>Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {cs.metrics.map((m, mi) => (
                    <tr key={mi}>
                      <td>{m.label}</td>
                      <td className="mono-cell">{String(m.before)}</td>
                      <td className="mono-cell">{String(m.after)}</td>
                      <td className="mono-cell">
                        {m.reduction}
                        {m.unit ? ` (${m.unit})` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="figure-caption">
                <strong>Table {tableNum}.</strong> Quantitative outcomes for{' '}
                {cs.title.toLowerCase()}.
              </div>
            </div>

            {/* Tools used */}
            <div
              style={{
                fontSize: '0.85rem',
                color: '#57534E',
                marginBottom: '1.5rem',
              }}
            >
              <strong
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  color: '#1C1917',
                }}
              >
                Tools employed:{' '}
              </strong>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.8rem',
                }}
              >
                {cs.tools.join(', ')}
              </span>
              . Tags:{' '}
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.8rem',
                }}
              >
                {cs.tags.join(', ')}
              </span>
              .
            </div>

            {ci < caseStudies.length - 1 && <hr className="section-rule" />}
          </motion.div>
        );
      })}

      {/* Summary */}
      <motion.div {...fade} transition={{ delay: 0.3, duration: 0.5 }}>
        <h3 className="paper-heading subsection-heading">4.4 Summary of Findings</h3>
        <p>
          Across all three case studies, the AI-augmented SOC Stack demonstrated
          significant improvements in operational efficiency. Vulnerability remediation
          time decreased by over 60%, compliance enforcement achieved full coverage, and
          patch management cadence improved by 67%. These results support the hypothesis
          that MCP-bridged AI integration can meaningfully augment — without replacing —
          established security operations workflows.
        </p>
        <p className="cross-ref">
          The automated threat processing pipeline underlying these case studies is
          described in detail in Section 5.
        </p>
      </motion.div>
    </div>
  );
}
