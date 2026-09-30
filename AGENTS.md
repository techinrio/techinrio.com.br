# Tech In Rio — AI Agent Guide

This file indexes the `.agents/` directory. AI agents MUST read this first to discover available rules, agent profiles, and how to operate in this project.

## Agent System

```text
.agents/
├── manifest.json              — machine-readable index
├── rules/
│   ├── ai-working-style.md    — how agents should operate
│   ├── coding-style.md        — Astro/HTML/CSS/JS patterns
│   └── git-workflow.md        — Conventional Commits and PRs
├── agents/
│   ├── orchestrator.md        — task breakdown and delegation
│   ├── frontend.md            — UI, components, accessibility
│   └── qa.md                  — validation and quality checks
└── skills/
    ├── caveman/SKILL.md       — terse mode for token efficiency
    └── gsd/SKILL.md           — structured spec-driven planning
```

## Mandatory Reading Order

Before any implementation task:

1. `.agents/rules/ai-working-style.md` — operating principles
2. `.agents/rules/coding-style.md` — code standards
3. `docs/spec.md` — product specification
4. `docs/brand/brand-reference.md` — visual identity
5. `docs/content-guidelines.md` — copy and tone

## Project Context

- **Stack:** Astro 7 (static generation), pure CSS with custom properties, vanilla JS
- **Scope:** Landing page + `/comunidade` (members from YAML in `src/data/comunidade/`, added only by Pull Request); no SSR, no SPA, no backend
- **Language:** pt-BR (site content), English (agent documentation)
- **Package manager:** yarn (`yarn.lock`)
- **Build:** `yarn build` — static output to `dist/`
- **Dev server:** `yarn dev` — local at `localhost:4321`
- **Hosting:** GitHub Pages via GitHub Actions, domain `techinrio.com.br`

## Definition of Done

- [ ] Build passes (`yarn build`)
- [ ] Responsive layout verified
- [ ] Accessibility validated (keyboard, focus, contrast, semantic HTML)
- [ ] Colors and copy follow documentation
- [ ] Commit follows `.agents/rules/git-workflow.md`
