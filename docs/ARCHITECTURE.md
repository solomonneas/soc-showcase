# SOC Showcase Architecture

## Overview

SOC Showcase is a single-page visualization application built entirely in vanilla HTML, CSS, and JavaScript. It demonstrates a modern SOC tech stack through animated pipelines, status grids, and interactive diagrams.

## File Structure

```
soc-showcase/
├── index.html          # Main entry point with embedded CSS and JS
├── README.md           # User-facing documentation
├── docs/
│   ├── ARCHITECTURE.md # This file
│   └── CONFIGURATION.md# Customization guide
└── LICENSE             # MIT license
```

## Core Components

### 1. Data Flow Pipeline
- **Visualization**: SVG-based animated lines and nodes
- **Animation**: CSS keyframes for continuous flow
- **Data representation**: Shows movement from data sources to analytics engines to alerting

### 2. Component Status Grid
- **Layout**: CSS Grid with 4x3 card layout
- **Data points**: Status indicator, last update time, metric value
- **Real-time updates**: JavaScript polls component endpoints (if available) or demonstrates static states
- **Color coding**: Green (healthy), yellow (warning), red (critical)

### 3. Interactive Architecture Diagram
- **Format**: SVG with embedded interactivity
- **Hover states**: Tool names and details appear on hover
- **Click handlers**: Routes to respective tool information panels
- **Responsive**: Scales to viewport while maintaining proportions

### 4. Tool Integration Details
- **Wazuh**: SIEM and XDR platform, processes logs and generates alerts
- **Zeek**: Network security monitoring, analyzes network traffic at scale
- **Suricata**: Open-source IDS/IPS, inspects traffic in real-time
- **TheHive**: Incident response and case management, tracks alert-to-resolution workflows

### 5. TLP Classification Display
- **Color system**: Red (TLP:Red), Amber (TLP:Amber), Green (TLP:Green), White (TLP:White)
- **Purpose**: Educates viewers on alert sharing guidelines and severity levels
- **Integration**: Shows how each tool classifies alerts using TLP framework

## JavaScript Architecture

### Modules
- **Animation Engine**: Handles SVG animations and data flow visualization
- **Status Poller**: Optional module to fetch real-time status from endpoints
- **Theme Manager**: Switches CSS classes for theme variants
- **Event Handlers**: Manages user interactions (clicks, hovers, tool tips)

### Data Flow

```
User Opens Page
    ↓
Load index.html (CSS + JS embedded)
    ↓
Initialize Theme (read localStorage or default)
    ↓
Render SVG diagrams
    ↓
Start Animation loops
    ↓
Initialize event listeners
    ↓
Optional: Poll status endpoints
    ↓
Update UI with real-time data (if available)
```

## Styling Strategy

- **CSS Scope**: Single stylesheet with class-based namespacing
- **Theme Variables**: CSS custom properties (variables) for quick theme switching
- **Responsive**: Media queries for mobile, tablet, and desktop views
- **Performance**: GPU-accelerated animations using `transform` and `opacity`

## Performance Considerations

- **No external dependencies**: Reduces file size and load time
- **Minimal reflows**: CSS animations avoid layout recalculations
- **Event delegation**: Parent handlers manage clicks on child elements
- **Lazy initialization**: Components initialize on-demand, not on page load

## Extension Points

1. **Adding new tools**: Update architecture diagram SVG, add status grid card, connect to integration details
2. **Custom themes**: Define new CSS variable sets in theme manager
3. **Live data**: Implement endpoint polling in status poller module
4. **Export functionality**: Add canvas/SVG export for presentations
5. **Dark mode toggle**: Auto-detect system preference or manual switch

## Browser Compatibility

- Chrome/Edge: Full support (ES6+, CSS Grid, SVG)
- Firefox: Full support
- Safari: Full support (13+)
- IE 11: Not supported (no ES6, no CSS Grid)

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation for tool cards
- Sufficient color contrast in all themes
- Alt text for SVG diagrams (when exported)
