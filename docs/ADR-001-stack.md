# ADR-001: Stack — Astro com HTML, CSS e JS puros

**Status:** Aceito
**Data:** 2025-06-22
**Contexto:** Site institucional estático da Tech In Rio, sem necessidade de SSR, SPA ou estado complexo. Queremos um front-end enxuto, rápido, bom para SEO e fácil de desenvolver.

## Decisão

- **Framework:** Astro 7, com geração estática e zero JavaScript por padrão.
- **Estilos:** CSS puro com custom properties, em CSS Modules por componente (sem Tailwind e sem CSS-in-JS).
- **Scripts:** JavaScript vanilla no cliente, no mínimo possível (hoje, só o menu mobile). Sem React nem outros frameworks JS.
- **Ícones:** SVG inline para as redes sociais e Unicode/emoji no restante, sem biblioteca de ícones.
- **Dependências:** o mínimo possível. Hoje só o Astro.

## Motivação

1. O Astro gera HTML estático e não envia JS ao navegador por padrão, o que favorece performance e SEO.
2. Com pouco JS e poucas bibliotecas, o site fica leve, previsível e barato de manter.
3. CSS puro com custom properties é suficiente para o tema escuro com acento laranja da marca.
4. Uma stack pequena facilita a contribuição de quem tem experiência básica em front-end, sem ferramentas específicas.

## Tradeoffs

- Sem framework JS, interações ricas exigem mais trabalho manual. Se algum dia forem necessárias, avaliamos ilhas do Astro, sempre com o menor impacto possível.
- CSS puro pede disciplina com espaçamento e responsividade.

## Consequências

- Build totalmente estático, publicável em qualquer CDN ou hospedagem de arquivos estáticos.
- Manutenção de baixo custo: HTML, CSS e JS sem etapas extras de transpilação.
- Toda nova dependência precisa de justificativa e da aprovação de quem mantém o projeto.
