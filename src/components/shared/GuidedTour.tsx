import { useEffect, useState, useCallback } from 'react';
import { HelpCircle } from 'lucide-react';

/* ── driver.js CDN types ───────────────────────── */
interface DriverStep {
  element?: string;
  popover: {
    title: string;
    description: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
  };
}

interface DriverConfig {
  showProgress: boolean;
  steps: DriverStep[];
  onDestroyed?: () => void;
  animate?: boolean;
  overlayColor?: string;
  stagePadding?: number;
  stageRadius?: number;
  popoverClass?: string;
}

interface DriverInstance {
  drive: () => void;
  destroy: () => void;
}

interface DriverConstructor {
  new (config: DriverConfig): DriverInstance;
}

declare global {
  interface Window {
    driver?: {
      js: {
        driver: DriverConstructor;
      };
    };
  }
}

/* ── Constants ─────────────────────────────────── */
const STORAGE_KEY = 'soc-showcase-tour-complete';

const tourSteps: DriverStep[] = [
  {
    element: '[data-tour="hero"]',
    popover: {
      title: 'Welcome to SOC Showcase',
      description:
        'This is a portfolio demo of Security Operations Center tools and workflows. Each section highlights a different aspect of modern SOC operations.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '[data-tour="tools"]',
    popover: {
      title: 'Security Tools',
      description:
        '9 SOC tools covering threat hunting, SIEM, incident response, threat intelligence, and more. Each tool has status, tech stack, and feature details.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '[data-tour="architecture"]',
    popover: {
      title: 'Architecture Graph',
      description:
        'A three-layer architecture: AI assistants at the top, MCP protocol bridges in the middle, and security tools at the base. Animated data flows show how they connect.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '[data-tour="cases"]',
    popover: {
      title: 'Case Studies',
      description:
        'Real-world incident response scenarios with step-by-step timelines, before/after metrics, and the tools used to resolve each case.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '[data-tour="pipeline"]',
    popover: {
      title: 'SOC Pipeline',
      description:
        'A 10-stage incident response pipeline from alert ingestion through detection tuning. Watch the animated data flow between stages.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '[data-tour="variant-picker"]',
    popover: {
      title: 'Choose a Theme',
      description:
        'Switch between 5 visual variants — each renders the same SOC data with a completely different aesthetic. Try them all!',
      side: 'bottom',
      align: 'center',
    },
  },
];

/* ── Hook: check if driver.js is loaded ────────── */
function useDriverReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check immediately
    if (window.driver?.js?.driver) {
      setReady(true);
      return;
    }

    // Poll for CDN load (max 10s)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.driver?.js?.driver) {
        setReady(true);
        clearInterval(interval);
      } else if (attempts > 40) {
        clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return ready;
}

/* ── Component ─────────────────────────────────── */
export default function GuidedTour() {
  const driverReady = useDriverReady();
  const [tourComplete, setTourComplete] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const startTour = useCallback(() => {
    if (!window.driver?.js?.driver) return;

    const { driver: Driver } = window.driver.js;
    const instance = new Driver({
      showProgress: true,
      animate: true,
      overlayColor: 'rgba(0, 0, 0, 0.75)',
      stagePadding: 8,
      stageRadius: 8,
      popoverClass: 'soc-tour-popover',
      steps: tourSteps,
      onDestroyed: () => {
        try {
          localStorage.setItem(STORAGE_KEY, 'true');
        } catch {
          // localStorage unavailable
        }
        setTourComplete(true);
      },
    });

    instance.drive();
  }, []);

  // Auto-start on first visit
  useEffect(() => {
    if (driverReady && !tourComplete) {
      // Delay slightly so the page renders first
      const timeout = setTimeout(startTour, 1200);
      return () => clearTimeout(timeout);
    }
  }, [driverReady, tourComplete, startTour]);

  // Don't render button if driver.js failed to load
  if (!driverReady) return null;

  return (
    <button
      onClick={startTour}
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-gray-950 font-semibold text-sm shadow-lg shadow-cyan-500/20 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
      aria-label="Take guided tour"
      title="Take Tour"
    >
      <HelpCircle size={18} />
      <span className="hidden sm:inline">Take Tour</span>
    </button>
  );
}
