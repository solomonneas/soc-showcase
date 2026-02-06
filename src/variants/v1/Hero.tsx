import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedDataFlow from '@/components/shared/AnimatedDataFlow';
import type { PageProps } from '@/types';

export default function Hero({ theme }: PageProps) {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center px-6">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield size={32} style={{ color: theme.primaryColor }} />
            <span
              className="text-sm font-mono tracking-widest uppercase"
              style={{ color: theme.secondaryColor }}
            >
              Security Operations Center
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: theme.fontHeading, color: '#ffffff' }}
          >
            AI-Powered{' '}
            <span style={{ color: theme.primaryColor }}>SOC Tools</span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
            style={{ fontFamily: theme.fontBody, color: '#94a3b8' }}
          >
            Building the bridge between AI and security operations. Nine MCP-integrated
            tools for threat hunting, incident response, and security automation.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/1/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all"
              style={{
                backgroundColor: theme.primaryColor,
                color: theme.bgColor,
              }}
            >
              Explore Tools
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/1/architecture"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border transition-colors"
              style={{
                borderColor: `${theme.primaryColor}44`,
                color: theme.primaryColor,
              }}
            >
              View Architecture
            </Link>
          </div>
        </motion.div>

        {/* Data flow visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <AnimatedDataFlow
            primaryColor={theme.primaryColor}
            secondaryColor={theme.secondaryColor}
            accentColor={theme.accentColor}
          />
        </motion.div>
      </div>
    </section>
  );
}
