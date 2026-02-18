# CLAUDE.md

## Project
- **Name:** SOC Showcase
- **Stack:** React 18, TypeScript, Vite, Framer Motion, Lucide React, React Router
- **Root:** This directory
- **Deploy:** Caddy static (serves dist/)

## Architecture
- Frontend only (SPA): `src/` (React 18 + TypeScript + Vite)
- Framer Motion for animations
- Entry: `src/main.tsx`

## Build & Test
```bash
npm install
npm run dev          # Dev server
npm run build        # Build to dist/
```

## Key Files
- `src/App.tsx` - Router and main layout
- `src/` - All source

## Gotchas
- **Framer Motion** for page transitions and component animations.
- **Showcase/demo project.** Meant to demonstrate SOC analyst workflows visually.

## Style Guide
- Dark theme, cybersecurity aesthetic
- Framer Motion animations (tasteful, not excessive)
- Lucide React icons
- No em dashes. Ever.

## Git Rules
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- Never add Co-Authored-By lines or mention AI in commits
- No em dashes in commit messages

---

## OpenClaw Sync Protocol

An AI assistant (clawdbot) runs in OpenClaw and manages this workspace. It reads memory files on every session start. Follow this protocol so it stays in the loop about your changes.

### After completing a task, append to:
`~/.openclaw/workspace/memory/YYYY-MM-DD.md`

Use today's date. Create the file if it doesn't exist.

### Format:
```markdown
## Claude Code Session - [HH:MM AM/PM EST]
**Project:** SOC Showcase
**Branch:** [branch name]

### What changed
- [Bullet list of features/fixes/refactors]
- [Files added/modified/deleted]

### Decisions made
- [Any architectural choices, tradeoffs, library picks]

### Issues / TODO
- [Anything incomplete, broken, or needing follow-up]

### Git
- [Commit hashes or "pushed to main" / "on branch X"]
```

### Rules:
1. Always write the summary. Even for small changes.
2. Be specific about files.
3. Note decisions and why.
4. Don't edit MEMORY.md (clawdbot's long-term memory).
5. Don't edit other memory/ files. Only append to today's date file.
6. Commit and push your work.
