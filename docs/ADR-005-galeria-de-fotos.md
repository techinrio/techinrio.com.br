# ADR-005: Galeria de fotos dos eventos

**Status:** Aceito
**Data:** 2026-10-20
**Contexto:** Queremos mostrar todas as fotos de cada evento da Tech In Rio, com navegação por evento e por data, a arte oficial do evento como capa e um pop-up para ver as fotos. São centenas de fotos por evento, o que não cabe bem no repositório nem no limite de 1 GB do GitHub Pages. A página de membros (`/comunidade/`) fica pausada por enquanto e a galeria ocupa o lugar dela no menu.

## Decisão

- **Imagens fora do repositório:** servidas de `https://fotos.techinrio.com.br`. O site continua estático: o HTML só aponta para as imagens.
- **Repositório guarda só o índice:** `src/data/gallery/<slug>.json`, com as dimensões da capa e das fotos. Os eventos vêm de `src/data/events.js`, ligados pelo `slug`; a data do evento é a data das fotos. Inconsistências quebram o build (`src/lib/gallery.ts`).
- **Publicação fora do repositório:** preparar, otimizar e publicar as imagens é tarefa de quem mantém o projeto, com ferramentas que não são versionadas aqui. O site não sabe como as imagens foram feitas, só os nomes que segue (`cover.jpg`, `<file>.jpg`, `<file>-thumb.jpg`).
- **Pop-up com `<dialog>` nativo** e cerca de 80 linhas de JavaScript vanilla: é a exceção justificada à regra de mínimo JS, porque navegar por centenas de fotos abrindo uma página por clique é ruim. Sem JS, cada miniatura leva à **página da foto** (`/galeria/<slug>/<n>/`), com o layout do site, que também serve para compartilhar.
- **Comunidade pausada, não removida:** páginas seguem geradas, com `noindex`, fora do menu e do sitemap. Schema, validações e regras de CI dos perfis não mudam.

## Consequências

- Publicar fotos depende de quem mantém o projeto; contribuidores mandam as fotos para a organização.
- Uma foto removida das imagens publicadas some do site mesmo antes do próximo deploy; uma foto nova só aparece depois que o índice entra na `master`.
- O build gera uma página por foto (centenas de HTMLs pequenos); o tempo de build segue baixo porque não há processamento de imagem.
- Vídeos dos eventos ficam fora por enquanto.
