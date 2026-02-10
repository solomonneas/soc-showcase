# SOC Showcase

![MIT License](https://img.shields.io/badge/license-MIT-green) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

> Unified SOC stack portfolio showcase with animated data flow pipelines, real-time status grids, and interactive architecture diagrams.

![SOC Showcase Hero](./docs/hero-placeholder.png)

## Quick Start

```bash
git clone https://github.com/solomonneas/soc-showcase.git
cd soc-showcase
python3 -m http.server 5175
```

Then open `http://localhost:5175` in your browser.

## Features

- **Animated Data Flow Visualization**: Real-time animated pipelines showing data movement through SOC components
- **Component Status Grid**: Live status indicators for Wazuh, Zeek, Suricata, and TheHive integration points
- **Interactive Architecture Diagram**: Clickable diagram revealing tool details and integration paths
- **TLP Classification System**: Traffic Light Protocol labeling for alert severity and sharing guidelines
- **5 Theme Variants**: Multiple color schemes for different presentation contexts
- **Zero Build Step**: Single HTML file. No Node, no build tools, no setup headaches

## Tech Stack

- Vanilla JavaScript (ES6+)
- CSS3 with Grid and Flexbox
- SVG animations for data flow visualization
- No external dependencies

## Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System design, component layout, data flow |
| [CONFIGURATION.md](./docs/CONFIGURATION.md) | Customization guide, theme variants, tool integration |

## Live Features

### Wazuh Integration
- Alert aggregation display
- Rule compliance tracking

### Zeek Monitoring
- Network traffic analysis visualization
- Protocol breakdown charts

### Suricata IDS/IPS
- Intrusion detection status
- Alert frequency metrics

### TheHive Case Management
- Active case counter
- Alert-to-case workflow

## Themes

Choose from 5 curated theme variants:
- **Default**: Clean, professional SOC aesthetic
- **Dark**: Low-light operational center feel
- **Cyberpunk**: High-contrast, futuristic look
- **Minimal**: Stripped down, data-focused
- **Classic**: Traditional security console style

## License

MIT. See [LICENSE](./LICENSE) for details.
