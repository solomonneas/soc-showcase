# SOC Showcase

A portfolio showcase for Security Operations Center (SOC) tools and architecture, featuring five distinct design variants. Built to demonstrate modern web development approaches to cybersecurity tooling presentation.

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type-safe development
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations and transitions
- **React Router v7** — Client-side routing
- **Lucide React** — Icon library

## Design Variants

| Variant | Name | Description |
|---------|------|-------------|
| **V1** | Cyber Command | Military-grade dark theme with cyan accents, scanline overlays, and monospace typography (Chakra Petch / JetBrains Mono) |
| **V2** | Clean Docs | Light, documentation-style layout with blue accents, clean typography (Space Grotesk / Franklin Gothic), and structured navigation |
| **V3** | Threat Matrix | HUD-style dark theme with neon cyan/magenta accents, hex grid backgrounds, and persistent status bar (Audiowide / Fira Code) |
| **V4** | Academic Paper | Scholarly white layout styled like an academic publication with serif typography (Crimson Pro / Source Serif 4) and section numbering |
| **V5** | Modern Minimal | Contemporary dark theme with purple-blue gradients, glassmorphism navigation, and clean sans-serif typography (Space Grotesk / DM Sans) |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## Project Structure

```
src/
├── App.tsx                     # Root router with variant routes
├── main.tsx                    # Entry point with ErrorBoundary
├── index.css                   # Global styles and Tailwind config
├── components/
│   └── shared/                 # Reusable components across variants
│       ├── AnimatedDataFlow.tsx # Animated pipeline visualization
│       ├── ArchitectureGraph.tsx# Interactive architecture diagram
│       ├── CaseTimeline.tsx    # Case study timeline component
│       ├── ErrorBoundary.tsx   # React error boundary
│       ├── MetricCard.tsx      # Before/after metric display
│       ├── PipelineStage.tsx   # Pipeline step card
│       ├── ToolCard.tsx        # Tool showcase card
│       └── VariantPicker.tsx   # Landing page variant selector
├── data/                       # Static data (tools, cases, architecture)
├── hooks/                      # Custom React hooks
├── pages/
│   └── NotFound.tsx            # 404 page
├── types/
│   └── index.ts                # TypeScript interfaces
└── variants/
    ├── v1/                     # Cyber Command variant
    ├── v2/                     # Clean Docs variant
    ├── v3/                     # Threat Matrix variant
    ├── v4/                     # Academic Paper variant
    └── v5/                     # Modern Minimal variant
```

Each variant directory contains:
- `Layout.tsx` — Navigation shell and routing
- `Hero.tsx` — Landing/hero section
- `Architecture.tsx` — System architecture view
- `Tools.tsx` — Tool showcase grid
- `Cases.tsx` — Case studies with timelines
- `Pipeline.tsx` — Data pipeline visualization
- `About.tsx` — About/contact section
- `styles.css` — Variant-specific styles

## License

MIT
