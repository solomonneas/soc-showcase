<div align="center">

# 🛡️ SOC Showcase

**AI-Powered Security Operations Center — Portfolio Demo**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Lucide](https://img.shields.io/badge/Lucide-Icons-F56565?logo=lucide&logoColor=white)](https://lucide.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

![SOC Showcase](docs/screenshots/dashboard.png)

*A frontend showcase of Security Operations Center tooling, architecture, and incident response workflows — presented through 5 distinct visual themes.*

[Live Demo](https://soc.solomonneas.dev) · [Report Bug](https://github.com/solomonneas/soc-showcase/issues) · [Request Feature](https://github.com/solomonneas/soc-showcase/issues)

</div>

---

## ✨ Features

- **9 SOC Tools** — From threat hunting to IDS/IPS, each tool has detailed specs, status, and tech stacks
- **Interactive Architecture Graph** — Three-layer visualization (AI → MCP → Security Tools) with animated data flows
- **Case Timeline** — Real-world incident response case studies with metrics and step-by-step timelines
- **Data Pipeline** — 10-stage SOC pipeline from alert ingestion to detection tuning
- **5 Visual Themes** — Each variant is a complete redesign with unique typography, colors, and aesthetics
- **Animated Data Flows** — Particle animations showing data movement through the architecture
- **Reduced Motion Support** — Respects `prefers-reduced-motion` for accessibility
- **In-App Guided Tour** — First-visit walkthrough powered by driver.js
- **Documentation Page** — Built-in help covering SOC concepts, architecture, and FAQ
- **Fully Responsive** — Mobile-first design with collapsible navigation

---

## 🎨 The 5 Variants

| # | Name | Aesthetic | Typography |
|---|------|-----------|------------|
| **V1** | Cyber Command | Military-grade dark theme with cyan accents, scanline overlays, and status bar | Chakra Petch · Rajdhani · JetBrains Mono |
| **V2** | Neural Network | Clean documentation-style with blue accents on white, structured layouts | Space Grotesk · DM Sans · Fira Code |
| **V3** | Threat Matrix | HUD overlay with hex grids, neon cyan/magenta, and persistent status bar | Audiowide · Inter · IBM Plex Mono |
| **V4** | Intelligence Brief | Academic paper format — serif typography, minimal color, section numbering | Crimson Pro · Source Serif 4 · IBM Plex Mono |
| **V5** | Neon SOC | Modern SaaS design with gradient accents, glass morphism navigation | DM Sans · Space Grotesk · JetBrains Mono |

Each variant includes: **Hero** → **Tools** → **Architecture** → **Cases** → **Pipeline** → **About** sections with the same data rendered through a completely different visual lens.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/solomonneas/soc-showcase.git
cd soc-showcase

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) to view the variant picker.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   App.tsx                        │
│  ┌─────────┐  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
│  │ Variant  │  │ V1 │ │ V2 │ │ V3 │ │ V4 │ │ V5 │
│  │ Picker   │  │    │ │    │ │    │ │    │ │    │
│  └─────────┘  │Hero│ │Hero│ │Hero│ │Hero│ │Hero│
│               │Tool│ │Tool│ │Tool│ │Tool│ │Tool│
│               │Arch│ │Arch│ │Arch│ │Arch│ │Arch│
│               │Case│ │Case│ │Case│ │Case│ │Case│
│               │Pipe│ │Pipe│ │Pipe│ │Pipe│ │Pipe│
│               │Abou│ │Abou│ │Abou│ │Abou│ │Abou│
│               └────┘ └────┘ └────┘ └────┘ └────┘
├─────────────────────────────────────────────────┤
│              Shared Components                   │
│  ArchitectureGraph · CaseTimeline · ToolCard    │
│  MetricCard · PipelineStage · AnimatedDataFlow  │
│  VariantPicker · ErrorBoundary · GuidedTour     │
├─────────────────────────────────────────────────┤
│              Shared Data Layer                   │
│  tools.ts · architecture.ts · cases.ts          │
│  pipeline.ts · themes.ts                        │
└─────────────────────────────────────────────────┘
```

**Key Design Decisions:**

- **Component-based architecture** — Shared components handle rendering logic; variants control styling via theme props and CSS
- **Shared data layer** — All 5 variants render the same underlying data (tools, cases, architecture, pipeline)
- **Per-variant layouts** — Each variant has its own `Layout.tsx` with navigation, routes, and visual chrome
- **Zero runtime dependencies on SOC tools** — This is a frontend-only demo; no backend, no APIs

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 19 | UI components and rendering |
| **Language** | TypeScript 5.7 | Type safety with strict mode |
| **Styling** | Tailwind CSS 3.4 | Utility-first styling |
| **Build** | Vite 6 | Fast dev server and bundling |
| **Routing** | React Router 7 | Client-side navigation |
| **Animation** | Framer Motion 11 | Page transitions and data flow animations |
| **Icons** | Lucide React | Consistent icon set |
| **Fonts** | Google Fonts (12 families) | Per-variant typography |
| **Tour** | driver.js (CDN) | First-visit guided walkthrough |

---

## 📁 Project Structure

```
soc-showcase/
├── index.html                    # Entry point + CDN links
├── src/
│   ├── App.tsx                   # Root router (variant picker + 5 layouts)
│   ├── main.tsx                  # React mount with ErrorBoundary
│   ├── index.css                 # Tailwind directives + global styles
│   ├── components/
│   │   └── shared/
│   │       ├── AnimatedDataFlow.tsx
│   │       ├── ArchitectureGraph.tsx
│   │       ├── CaseTimeline.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── GuidedTour.tsx    # driver.js walkthrough
│   │       ├── getLucideIcon.ts
│   │       ├── MetricCard.tsx
│   │       ├── PipelineStage.tsx
│   │       ├── ToolCard.tsx
│   │       └── VariantPicker.tsx
│   ├── data/
│   │   ├── architecture.ts       # 3-layer graph (AI → MCP → Tools)
│   │   ├── cases.ts              # 3 incident response case studies
│   │   ├── pipeline.ts           # 10-stage SOC pipeline
│   │   ├── themes.ts             # 5 variant theme configs
│   │   └── tools.ts              # 9 SOC tools with full specs
│   ├── hooks/
│   │   └── useReducedMotion.ts
│   ├── pages/
│   │   ├── DocsPage.tsx          # In-app documentation
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── index.ts              # Shared TypeScript interfaces
│   └── variants/
│       ├── v1/                   # Cyber Command
│       ├── v2/                   # Neural Network
│       ├── v3/                   # Threat Matrix
│       ├── v4/                   # Intelligence Brief
│       └── v5/                   # Neon SOC
│           ├── Layout.tsx        # Nav, routes, footer
│           ├── Hero.tsx
│           ├── Tools.tsx
│           ├── Architecture.tsx
│           ├── Cases.tsx
│           ├── Pipeline.tsx
│           ├── About.tsx
│           └── styles.css
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 🔐 SOC Concepts

### What is a SOC?

A **Security Operations Center** (SOC) is a centralized facility that monitors, detects, investigates, and responds to cybersecurity threats. This showcase demonstrates the tooling and workflows a modern SOC uses.

### Tool Categories

| Category | Description | Tools in Showcase |
|----------|-------------|-------------------|
| **Threat Hunting** | Proactive search for hidden threats | Bro Hunter |
| **SIEM** | Security event aggregation and analysis | Wazuh MCP |
| **Incident Response** | Case management and response orchestration | TheHive MCP |
| **Threat Intelligence** | IOC sharing and correlation | MISP MCP |
| **Threat Analysis** | Automated observable enrichment | Cortex MCP |
| **Network Monitoring** | Traffic inspection and logging | Zeek MCP |
| **IDS/IPS** | Intrusion detection and prevention | Suricata MCP |
| **Framework** | ATT&CK mapping and coverage analysis | MITRE MCP |
| **Visualization** | Playbook design and workflow mapping | Playbook Forge |

### Incident Response Pipeline

The showcase visualizes a 10-stage pipeline that mirrors real SOC operations:

1. **Alert Ingestion** — Normalize alerts from multiple sources
2. **Enrichment** — Add threat intel, GeoIP, and asset context
3. **Triage** — AI-assisted severity scoring and deduplication
4. **Investigation** — Deep analysis with Cortex analyzers
5. **Containment** — Isolate systems, block indicators
6. **Eradication** — Remove malware and persistence mechanisms
7. **Recovery** — Restore services and validate functionality
8. **Lessons Learned** — Post-incident review and documentation
9. **Intel Update** — Publish new IOCs to MISP
10. **Detection Tuning** — Refine rules based on findings

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built by [Solomon Neas](https://solomonneas.dev)** · soc.solomonneas.dev

</div>
