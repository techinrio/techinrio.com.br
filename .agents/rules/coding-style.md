# Coding Style — Astro + HTML/CSS/JS

## General

- Semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`, etc.)
- Accessibility is a requirement, not a differentiator (aria-*, roles, skip-link)
- Zero client JS dependencies whenever possible
- CSS custom properties only, no pre-processors
- Responsive design without CSS frameworks

## Astro

- Components in `.astro` files with scoped `<style>` and `<script>`
- Base layout in `src/layouts/` for shared structure
- Page sections in `src/components/` as reusable blocks
- Static assets in `public/`
- Static data in `src/data/` when needed

## CSS

- Use `clamp()` for fluid font sizes
- Prefer `grid` and `flexbox` for layout
- Transitions with `200ms ease`
- `prefers-reduced-motion` for accessibility
- `:focus-visible` for visible focus indicators

## JavaScript

- ES modules with `type="module"` when in separate files
- Inline for small scripts in HTML
- `const` by default, `let` only when reassignment is needed
- `addEventListener` instead of `on*` attributes
- No external libraries without prior discussion
