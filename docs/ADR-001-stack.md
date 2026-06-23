# ADR-001: Stack Tecnológica — Astro + HTML/CSS/JS Puro

**Status:** Aceito  
**Data:** 2025-06-22
**Contexto:** Site institucional landing page, uma página, sem necessidade de SSR, SPA ou estado complexo.

## Decisão

- **Framework:** Astro 7 (geração estática, zero JS por padrão)
- **Estilos:** CSS puro com variáveis customizadas (sem Tailwind, sem CSS-in-JS)
- **Scripts:** JavaScript vanilla no cliente (sem React, sem frameworks JS)
- **Ícones:** Unicode/emoji (sem bibliotecas de ícones)

## Motivação

1. Landing page institucional tem escopo pequeno e bem definido — frameworks JS trazem complexidade sem benefício real.
2. Astro entrega HTML estático com zero JS por padrão, alinhado às metas de performance.
3. CSS puro com custom properties é suficiente para o tema escuro com acento laranja.
4. Menos dependências = menos manutenção futura.

## Tradeoffs

- Sem React, componentes não são reutilizáveis em potencial futuro app SPA — mas o escopo atual não justifica essa preocupação.
- CSS puro sem utility-first exige mais disciplina manual de espaçamento e responsividade.
- Se no futuro o site crescer para múltiplas páginas com estado complexo, pode valer migrar para React dentro do Astro.

## Consequências

- Build puramente estático, deployável em qualquer CDN.
- Manutenção de baixo custo: só HTML, CSS e JS sem transpilação.
- Facilidade para qualquer pessoa desenvolvedora frontend contribuir sem conhecer ferramentas específicas.
