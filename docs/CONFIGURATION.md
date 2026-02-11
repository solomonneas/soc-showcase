# SOC Showcase Configuration Guide

## Customization Overview

Since SOC Showcase is a single HTML file, all customization happens through CSS variables, JavaScript constants, and SVG attribute modifications. No build step required.

## Theme Configuration

### Switching Themes

Themes are applied via CSS custom properties. Edit the `<style>` section in `index.html`:

```css
:root {
  --primary-color: #1a1a2e;
  --secondary-color: #16213e;
  --accent-color: #0f3460;
  --text-light: #eaeaea;
  --text-dark: #1a1a2e;
  --success: #00d98e;
  --warning: #ffa502;
  --danger: #ff3838;
  --border-radius: 8px;
}
```

### Available Themes

1. **Default**
   - Professional blue tones
   - Suitable for formal presentations

2. **Dark**
   - Deep blacks and grays
   - Reduced eye strain in dim environments

3. **Cyberpunk**
   - Neon accent colors
   - High contrast, modern feel
   - Primary: `#0d0221`
   - Accent: `#ff006e`

4. **Minimal**
   - Grayscale with single accent
   - Maximizes focus on data

5. **Classic**
   - Greens and blacks
   - Traditional security console aesthetic
   - Primary: `#0a0e27`
   - Success: `#00ff00`

### Theme Application

To use a theme, wrap CSS variables in a theme class:

```html
<!-- In index.html body -->
<body class="theme-cyberpunk">
  <!-- content -->
</body>
```

Then define theme-specific CSS:

```css
.theme-cyberpunk :root {
  --primary-color: #0d0221;
  --accent-color: #ff006e;
}
```

Or use JavaScript to switch at runtime:

```javascript
function setTheme(themeName) {
  document.body.className = `theme-${themeName}`;
  localStorage.setItem('soc-theme', themeName);
}
```

## Component Configuration

### Tool Integration Settings

Modify tool endpoints and polling intervals in the JavaScript section:

```javascript
const SOC_CONFIG = {
  tools: {
    wazuh: {
      endpoint: 'http://localhost:55000',
      pollInterval: 10000,
      enabled: true
    },
    zeek: {
      endpoint: 'http://localhost:9200',
      pollInterval: 15000,
      enabled: true
    },
    suricata: {
      endpoint: 'http://localhost:5000',
      pollInterval: 10000,
      enabled: true
    },
    thehive: {
      endpoint: 'http://localhost:9000',
      pollInterval: 20000,
      enabled: true
    }
  }
};
```

### Status Grid Customization

Edit the status grid cards array:

```javascript
const statusCards = [
  {
    id: 'wazuh-alerts',
    title: 'Wazuh Alerts',
    value: 1247,
    status: 'healthy',
    icon: '🛡️'
  },
  // Add or remove cards here
];
```

### Animation Speed

Adjust animation keyframes in CSS:

```css
@keyframes dataFlow {
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
}

/* Speed control */
.animated-line {
  animation: dataFlow 3s linear infinite; /* Change 3s for speed */
}
```

## Data Flow Pipeline Customization

### Adding/Removing Pipeline Stages

Edit the SVG section to add new nodes and connections:

```html
<svg class="data-flow-diagram">
  <!-- Define new nodes -->
  <circle cx="100" cy="100" r="20" class="pipeline-node" id="new-tool" />
  <text x="100" y="105" text-anchor="middle">New Tool</text>
  
  <!-- Connect with animated paths -->
  <path class="animated-line" d="M 120 100 L 200 100" stroke="#00d98e" />
</svg>
```

### Customizing Node Connections

Modify path `d` attribute to change pipeline flow:

```html
<!-- Straight line -->
<path d="M 100 100 L 200 100" />

<!-- Curve -->
<path d="M 100 100 Q 150 50 200 100" />

<!-- Multi-point path -->
<path d="M 100 100 L 150 100 L 150 150 L 200 150" />
```

## TLP Classification Customization

### Color Assignments

Edit TLP color mappings in CSS:

```css
.tlp-white { background-color: #ffffff; color: #000; }
.tlp-green { background-color: #00d98e; color: #000; }
.tlp-amber { background-color: #ffa502; color: #000; }
.tlp-red { background-color: #ff3838; color: #fff; }
```

### Adding Custom Severity Levels

Extend the classification system:

```javascript
const TLP_LEVELS = {
  white: { label: 'Unlimited Sharing', color: '#ffffff' },
  green: { label: 'Community Sharing', color: '#00d98e' },
  amber: { label: 'Limited Sharing', color: '#ffa502' },
  red: { label: 'Not For Sharing', color: '#ff3838' },
  // Custom level
  custom: { label: 'Internal Only', color: '#0f3460' }
};
```

## Deployment Options

### Option 1: Direct File Access
1. Copy `index.html` to web server root
2. Open in browser: `file:///path/to/index.html`

### Option 2: Python HTTP Server
```bash
python3 -m http.server 5175
# Access at http://localhost:5175
```

### Option 3: Node.js http-server
```bash
npm install -g http-server
http-server -p 5175
```

### Option 4: Docker Container
```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
EXPOSE 80
```

```bash
docker build -t soc-showcase .
docker run -p 5175:80 soc-showcase
```

## Performance Tuning

### Reduce Animation Complexity
Lower the number of animated lines and nodes:

```css
.animated-line {
  animation: dataFlow 5s linear infinite; /* Slower = less CPU */
  opacity: 0.7; /* Reduce visual load */
}
```

### Disable Real-time Polling
If endpoints aren't available, disable polling:

```javascript
SOC_CONFIG.tools.wazuh.enabled = false;
SOC_CONFIG.tools.zeek.enabled = false;
```

### Cache Strategy
Store theme preference:

```javascript
function saveTheme(theme) {
  localStorage.setItem('soc-showcase-theme', theme);
}

function loadTheme() {
  return localStorage.getItem('soc-showcase-theme') || 'default';
}
```

## Troubleshooting

### Animations Not Showing
- Check browser DevTools for CSS errors
- Verify `<svg>` element has class `data-flow-diagram`
- Ensure animation keyframes are defined

### Tools Not Updating
- Verify endpoint URLs are accessible
- Check browser console for CORS errors
- Confirm endpoints return expected JSON format

### Theme Not Applying
- Clear localStorage: `localStorage.clear()`
- Verify theme class matches CSS definitions
- Check for CSS specificity conflicts
