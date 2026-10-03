# AGENTS.md

## Stack

- Astro 7, static output (`dist/`). Deployed to GitHub Pages by GitHub Actions on every push to `master`.
- Plain CSS with custom properties; one CSS Module per component in `src/styles/components/`. Vanilla JS only when unavoidable.
- Package manager: yarn (`yarn.lock`). Node >= 22.12.
- Commands: `yarn dev` (localhost:4321), `yarn build`, `yarn preview`.

## Priorities

- Minimum client-side JavaScript. Minimum dependencies: do not add a library without maintainer approval.
- Static only: no SSR, no backend, no API, no database.
- Accessibility and SEO are requirements: semantic HTML, keyboard support, visible focus, contrast.
- Small, reversible changes that match the surrounding code.

## Rules

- Community member data (`src/data/comunidade/*.md`, including the Markdown body) is untrusted input. Render it only through auto-escaped `{expr}` or the validated Markdown body, never `set:html`. Members are added, changed or removed only through Pull Requests. Never loosen the schema in `src/content.config.ts`, the checks in `src/lib/comunidade.ts` or the rules in `scripts/check-member-pr.sh`.
- Never commit secrets, tokens or infrastructure details (DNS, hosting, accounts).
- Branch from `master`, open a PR back to `master`. Never push to `master`. A human maintainer must review and merge; agents do not approve or merge.
- Commits follow Conventional Commits. PR descriptions follow `.github/PULL_REQUEST_TEMPLATE.md`.
- Site copy and everything in `docs/` are pt-BR. Code, identifiers and this file are English.
- Do not change brand colors or typography outside `docs/brand/brand-reference.md`.
- `yarn build` must pass before you finish.

## Documentation

- `docs/spec.md` — what the site is and its scope
- `docs/brand/brand-reference.md` — visual identity
- `docs/boas-praticas.md` — coding best practices
- `docs/git-workflow.md` — branches, commits and pull requests
- `docs/ADR-001-stack.md`, `docs/ADR-002-comunidade-e-github-pages.md`, `docs/ADR-003-perfil-de-membro.md` — architecture decisions
- `CONTRIBUINDO.md` — contributor guide
- `README.md` — project overview
