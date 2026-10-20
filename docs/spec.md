# Tech In Rio — Especificação do site

## 1. Propósito

O site institucional da Tech In Rio (<https://www.techinrio.com.br>) é o ponto de partida para entender tudo sobre a comunidade: quem somos, o que fazemos, nossas atividades e eventos, e como participar. Ele reúne os canais oficiais e leva quem chega até eles.

Quem usa o site:
- quem quer conhecer a Tech In Rio;
- quem quer entrar na comunidade;
- quem quer contribuir com o projeto ou aparecer na lista de membros.

## 2. Escopo atual

| Rota | O que é |
|------|---------|
| `/` | Página inicial, com as seções: apresentação, quem somos, o que fazemos, conecte-se (canais), parceiros e faça parte |
| `/galeria/` | Galeria de fotos dos eventos, agrupada por ano (ver seção 9) |
| `/galeria/<slug>/` | Fotos de um evento |
| `/comunidade/` | Lista dos membros da comunidade. Pausada: fora do menu e do sitemap, sem indexação (ver seção 3) |
| `/comunidade/<slug>/` | Perfil de cada membro (pausado junto com a lista) |
| `/seliga/` | Apresentação da comunidade em slides, para eventos. Página escondida (ver seção 4) |
| `/404.html` | Página de erro |
| `/robots.txt`, `/sitemap.xml`, `/site.webmanifest` | Arquivos gerados no build para buscadores e navegadores |

Os canais e chamadas para ação ficam em `src/data/socials.js`; os metadados do site, em `src/data/site.js`.

A seção de parceiros mostra a logo, o nome e os links (site e redes) de cada parceiro, na ordem de `src/data/partners.js`. As logos ficam em `public/img/parceiros/`. Mudanças na lista passam por Pull Request e revisão de quem mantém o projeto.

## 3. Comunidade

A rota `/comunidade/` lista as pessoas que fazem a Tech In Rio, e cada pessoa tem uma página própria em `/comunidade/<slug>/`.

**Pausada por enquanto:** as páginas continuam sendo geradas e os perfis seguem valendo, mas saíram do menu e do sitemap e levam `noindex`. Para reativar, volte o link no `Nav.astro`, as rotas no `sitemap.xml.js` e tire o `noindex` das duas páginas.

- Cada membro é um arquivo Markdown `src/data/comunidade/<slug>.md`. O slug é o nome da pessoa em minúsculas, sem acento e com hífen (`maria-silva`), e é o identificador do membro.
- Campos do frontmatter: `nome` e `cargo` (obrigatórios), `github`, `foto`, `tags` e `links` (opcionais). O corpo do arquivo é um texto opcional em Markdown.
- `links` aceita `site` (URL https) e os usuários de `linkedin`, `instagram`, `youtube` e `x`. O link do GitHub vem do campo `github`.
- A foto pode ser uma URL https externa ou um arquivo em `public/img/comunidade/` (até 200 KB). Sem `foto`, usa-se a foto do GitHub, se houver `github`, ou as iniciais da pessoa.
- Cada perfil tem um menu **Compartilhar**: copiar o link, LinkedIn, X, WhatsApp e Facebook (links simples para a tela de compartilhamento de cada rede, sem scripts de terceiros), compartilhamento nativo do celular quando disponível e o download do cartão do membro em PNG.
- A lista é ordenada por nome e é totalmente estática. Cada cartão mostra foto, nome e cargo e leva ao perfil.
- A validação roda no build (`src/content.config.ts` e `src/lib/comunidade.ts`): dado inválido, arquivo com nome fora do padrão, `github` duplicado, foto fora das regras ou arquivo solto impede o build.
- Entrada, alteração e remoção de perfis acontecem **somente por Pull Request**. A revisão é aberta a qualquer pessoa da comunidade, e a aprovação e o merge são de quem mantém o projeto. O CI confere que quem não é da organização altera apenas o próprio perfil: o `github` do arquivo precisa ser o de quem abriu a PR.
- Os dados são tratados como conteúdo não confiável: o texto em Markdown não pode ter HTML, links, imagens nem títulos, e todo o resto é escapado na renderização. As URLs externas se limitam ao `site` e à `foto`, sempre em https.

Passo a passo para participar: [`CONTRIBUINDO.md`](../CONTRIBUINDO.md).

## 4. Apresentação da comunidade (`/seliga`)

Apresentação em slides usada nos eventos para contar quem somos, como nascemos, o que fazemos, nossos números, valores, parceiros, comunidades parceiras e como ser cria da Tech In Rio.

- **Página escondida:** nenhum link do site aponta para ela, ela fica fora do `sitemap.xml` e tem `noindex, nofollow`. Ela também não aparece no `robots.txt`, para não divulgar o endereço. Escondida não é secreta: o código está neste repositório público.
- **Visual:** segue a identidade do site ([`brand-reference.md`](brand/brand-reference.md)). Cada slide é um quadro 16:9 que ocupa a tela, e o texto acompanha o tamanho do slide.
- **Navegação:** setas, `Page Up`/`Page Down` (o que os passadores de slide enviam), `Espaço`, `Home` e `End`. `F` liga a tela cheia e `B` ou `.` escurecem a tela. Há botões na tela, deslizar no celular e o número do slide no endereço (`/seliga/#5`). Sem JavaScript, os slides aparecem um embaixo do outro.
- **Plano B offline:** imprimir a página em PDF gera um slide por página.
- **Conteúdo:** os encontros ficam em `src/data/events.js` (de onde saem os números de eventos, inscrições e visualizações), os números da comunidade em `src/data/stats.js` (atualize a data junto) e as pessoas que fizeram parte da nossa história em `src/data/history.js` (preencha `name` para mostrar o nome e usar como texto alternativo). Os parceiros vêm de `src/data/partners.js`, filtrados no componente, e as comunidades parceiras de `partnerCommunities`, no mesmo arquivo (logos em `public/img/comunidades-parceiras/`).
- **Fotos:** ficam em `src/assets/pitch/` (inclusive o print do FindTech) e são otimizadas no build. Os retratos são quadrados, com o rosto no centro do círculo. Antes de entrar no repositório, toda foto é aprovada por quem mantém o projeto e vai sem metadados (sem localização GPS). O QR code do último slide (`public/img/pitch/qr-beacons.svg`) aponta para o Beacons da comunidade.

## 5. Identidade visual

Cores, tipografia e regras visuais estão em [`docs/brand/brand-reference.md`](brand/brand-reference.md), que consolida o manual de identidade visual oficial da Tech In Rio. Toda mudança visual deve seguir esse guia.

## 6. Performance

- Site estático gerado pelo Astro, com HTML pronto no build e sem JS por padrão.
- O JavaScript no cliente se limita ao menu mobile, aos botões *Copiar link* e *Mais opções* do menu de compartilhar, à navegação da apresentação (`/seliga`) e ao pop-up de fotos da galeria.
- Imagens otimizadas e sem arquivos grandes desnecessários.
- Fontes carregadas com `preconnect` e `display=swap`.
- Bibliotecas apenas quando indispensáveis. Além do Astro, usamos `satori` e `sharp` apenas no build, para gerar os cartões de compartilhamento (ADR-004).

## 7. Acessibilidade

- Suporte completo a teclado, com link para pular ao conteúdo e foco sempre visível.
- Contraste adequado entre texto e fundo.
- Estrutura semântica de títulos e rótulos claros em links e botões.
- Links que abrem em nova aba avisam isso a leitores de tela.
- Textos alternativos úteis nas imagens e respeito a `prefers-reduced-motion`.
- Não depender só de cor para comunicar informação.

## 8. SEO e compartilhamento

- Idioma `pt-BR` configurado no documento.
- `title` e `description` por página, com URL canônica.
- Open Graph e Twitter Cards com imagem de 1200×630 (`public/img/og-image.jpg`, regenerada com `yarn generate:og`).
- Cada perfil de membro tem o seu próprio cartão de compartilhamento (foto, nome, cargo, tags e "Membro oficial da Tech In Rio"), gerado no build e usado em `og:image` e `twitter:image`.
- Dados estruturados (JSON-LD) da organização e do site.
- `sitemap.xml`, `robots.txt` e `site.webmanifest` gerados no build.
- A URL de produção está definida em `src/data/site.js`.

## 9. Galeria de fotos

A rota `/galeria/` mostra os eventos que têm fotos, do mais recente ao mais antigo, agrupados por ano, com atalhos para cada ano. Cada card usa a arte oficial do evento como capa. Cada evento tem uma página em `/galeria/<slug>/` com a capa, os dados do evento e a grade com todas as fotos.

- **Pop-up:** clicar numa miniatura abre a foto grande num `<dialog>` nativo, com *Anterior*/*Próxima*, setas do teclado, `Esc` para fechar e deslizar no celular. O endereço muda para o da foto enquanto ela está aberta, para dar para compartilhar.
- **Página da foto:** `/galeria/<slug>/<n>/` mostra a foto no layout do site, com *Anterior*/*Próxima* e o caminho de volta ao evento. É o que abre sem JavaScript, em nova aba ou por um link compartilhado.
- **Imagens:** servidas de `https://fotos.techinrio.com.br` (`photosCdn` em `src/data/site.js`). O repositório só guarda o índice de cada evento em `src/data/gallery/<slug>.json`: `cover` (dimensões da capa) e `photos` (lista de `file`, `width`, `height`). Para cada evento, o site usa `<slug>/cover.jpg`, `<slug>/<file>.jpg` (foto grande) e `<slug>/<file>-thumb.jpg` (miniatura). O build não baixa nem processa imagens.
- **Evento:** vem de `src/data/events.js`. A data do evento é a data das fotos. O evento entra na galeria quando ganha um `slug` (ex.: `dados-in-rio-2025`) e um índice em `src/data/gallery/`. O campo opcional `album` (URL https) mostra o botão *Ver álbum completo*.
- **Publicação:** preparar e publicar as imagens é tarefa de quem mantém o projeto e acontece fora deste repositório. Aqui entra só o índice, por Pull Request.
- **Validação no build** (`src/lib/gallery.ts`): índice sem evento correspondente, `slug` repetido, sem capa, sem fotos ou com registro inválido impede o build.
- **Direito de imagem:** antes de publicar, as fotos são revisadas por quem mantém o projeto. Quem quiser uma foto removida pede por Issue ou pelos canais oficiais; a foto sai do índice e das imagens publicadas.
