<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-11-FF0050?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="MIT License" />

  <a href="https://solomonneas.dev/projects/soc-showcase"><img src="https://img.shields.io/badge/Portfolio-solomonneas.dev-22c55e?style=flat-square" alt="Portfolio" /></a>
</p>

# 🛡️ SOC Showcase

**Interactive portfolio site for the S3 Stack security operations toolkit.**

SOC Showcase is a React-based portfolio that presents the full S3 Stack through animated data flow pipelines, case study walkthroughs, interactive architecture diagrams, and a tools catalog. Five visual variants let you switch the entire look with one click.

![SOC Showcase](docs/screenshots/dashboard.png)

---

## Features

- **Tools Catalog** - Browse all S3 Stack tools with tech stack, features, and status indicators
- **Case Studies** - Step-by-step incident response walkthroughs with timelines and metrics
- **Architecture Diagram** - Interactive layered view of the AI, MCP, and security tool layers
- **Data Flow Pipeline** - Animated visualization showing how data moves through the SOC stack
- **5 Visual Variants** - Each variant has its own layout, color scheme, and typography
- **Animated Transitions** - Framer Motion page transitions and scroll-triggered animations
- **In-App Documentation** - Architecture and configuration docs rendered inline
- **Responsive Design** - Desktop and mobile layouts

---

## Quick Start

```bash
git clone https://github.com/solomonneas/soc-showcase.git
cd soc-showcase
npm install
npm run dev
```

Open **http://localhost:5175**

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 | Component UI |
| **Language** | TypeScript 5 | Type safety |
| **Styling** | Tailwind CSS 3 | Utility-first CSS |
| **Animation** | Framer Motion 11 | Page transitions and scroll effects |
| **Routing** | React Router 7 | Client-side navigation |
| **Icons** | Lucide React | Consistent icon set |
| **Bundler** | Vite 6 | Dev server and build |

---

## Sections

Each variant renders the same data through five page sections:

| Section | Content |
|---------|---------|
| **Hero** | Intro with animated tagline and call-to-action |
| **About** | Overview of the S3 Stack and its purpose |
| **Tools** | Card grid of all SOC tools with category filters |
| **Cases** | Detailed case studies with timelines and outcome metrics |
| **Pipeline** | Step-by-step data flow through the detection pipeline |
| **Architecture** | Layered diagram of AI, MCP servers, and security tools |

---

## 5 Variants

| Variant | Aesthetic |
|---------|-----------|
| **v1** | Dark professional with blue accents |
| **v2** | Clean light theme with card layouts |
| **v3** | Terminal-inspired with green on black |
| **v4** | Military command with OD green and amber |
| **v5** | Cyberpunk with neon accents and glass effects |

All variants share the same data layer (`src/data/`) and type definitions.

---

## Project Structure

```text
soc-showcase/
├── src/
│   ├── data/
│   │   ├── tools.ts           # SOC tool catalog
│   │   ├── cases.ts           # Case study data
│   │   ├── pipeline.ts        # Data flow steps
│   │   ├── architecture.ts    # Architecture nodes and edges
│   │   └── themes.ts          # Variant theme definitions
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── pages/
│   │   ├── DocsPage.tsx       # In-app documentation
│   │   └── NotFound.tsx       # 404 page
│   └── variants/
│       ├── v1/                # Each variant has:
│       │   ├── Layout.tsx     #   Main layout wrapper
│       │   ├── Hero.tsx       #   Hero section
│       │   ├── About.tsx      #   About section
│       │   ├── Tools.tsx      #   Tools catalog
│       │   ├── Cases.tsx      #   Case studies
│       │   ├── Pipeline.tsx   #   Data flow visualization
│       │   ├── Architecture.tsx # Architecture diagram
│       │   └── styles.css     #   Variant-specific styles
│       ├── v2/
│       ├── v3/
│       ├── v4/
│       └── v5/
├── docs/
│   ├── ARCHITECTURE.md
│   └── CONFIGURATION.md
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design, component layout, data flow |
| [CONFIGURATION.md](docs/CONFIGURATION.md) | Customization guide, theme variants, tool integration |

---

## License

MIT. See [LICENSE](LICENSE) for details.
