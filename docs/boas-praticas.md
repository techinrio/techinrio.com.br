# Boas práticas

Como escrevemos código neste projeto. O objetivo é manter o site rápido, acessível e fácil de manter.

## Princípios

- **Mínimo de JavaScript.** O Astro entrega HTML estático sem JS por padrão. Só adicionamos JS no cliente quando não há alternativa em HTML ou CSS.
- **Mínimo de bibliotecas.** Antes de adicionar uma dependência, veja se HTML, CSS ou o próprio Astro resolvem. Dependência nova só com aprovação de quem mantém o projeto.
- **Tudo estático.** Sem SSR, sem backend, sem API, sem banco de dados.
- **Mudanças pequenas e reversíveis.** Prefira PRs curtas e fáceis de revisar.

## HTML e acessibilidade

- Use HTML semântico (`<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`) e uma hierarquia de títulos coerente.
- Acessibilidade é requisito, não diferencial: navegação por teclado, foco visível, contraste adequado, `alt` útil nas imagens e `aria-*` quando o HTML sozinho não basta.
- Links que abrem em nova aba usam `rel="noopener noreferrer"` e avisam isso para leitores de tela.
- Não dependa só de cor para comunicar informação.

## Astro

- Seções da página ficam em `src/components/`, o esqueleto compartilhado em `src/layouts/` e as rotas em `src/pages/`.
- Estilos de cada componente ficam em um CSS Module em `src/styles/components/`. Estilos globais e variáveis ficam em `src/styles/global.css`.
- Dados estáticos ficam em `src/data/` (metadados do site, canais, membros da comunidade). Assets estáticos ficam em `public/`.
- Scripts pequenos podem ficar no próprio componente, dentro de `<script>`.

## CSS

- Só CSS puro, com custom properties (cores e medidas em `:root`). Sem pré-processadores e sem frameworks de CSS.
- Use as cores e a tipografia definidas em [`docs/brand/brand-reference.md`](brand/brand-reference.md).
- Use `clamp()` para tamanhos de fonte fluidos e `grid` e `flexbox` para layout.
- Transições de `200ms ease`. Respeite `prefers-reduced-motion`.
- Mantenha `:focus-visible` sempre visível.
- Layout responsivo, pensando primeiro em telas pequenas.

## JavaScript

- Módulos ES, `const` por padrão e `let` só quando houver reatribuição.
- `addEventListener` no lugar de atributos `on*`.
- Sem bibliotecas externas.

## Dados da comunidade

Os arquivos em `src/data/comunidade/` são conteúdo enviado por outras pessoas e devem ser tratados como **não confiáveis**:

- Renderize sempre com `{expressão}` do Astro, que faz o escaping. Nunca use `set:html` com esses dados.
- Monte links apenas a partir de campos já validados (por exemplo, o link do GitHub sai do username).
- Não afrouxe o schema em `src/content.config.ts` nem as checagens em `src/lib/comunidade.ts` para aceitar HTML, links ou campos extras.

## Antes de abrir a PR

- `yarn build` precisa passar.
- Teste o layout em tela pequena e grande, e navegue só com o teclado.
- Confira o [fluxo de Git](git-workflow.md).

## Tem uma sugestão?

Se você tem uma sugestão de boa prática que ainda não está aqui, inclua neste arquivo: abra uma Pull Request editando `docs/boas-praticas.md` ou, se preferir conversar antes, abra uma Issue.
