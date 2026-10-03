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
| `/` | Página inicial, com as seções: apresentação, quem somos, o que fazemos, conecte-se (canais) e faça parte |
| `/comunidade/` | Lista dos membros da comunidade |
| `/comunidade/<slug>/` | Perfil de cada membro |
| `/404.html` | Página de erro |
| `/robots.txt`, `/sitemap.xml`, `/site.webmanifest` | Arquivos gerados no build para buscadores e navegadores |

Os canais e chamadas para ação ficam em `src/data/socials.js`; os metadados do site, em `src/data/site.js`.

## 3. Comunidade

A rota `/comunidade/` lista as pessoas que fazem a Tech In Rio, e cada pessoa tem uma página própria em `/comunidade/<slug>/`.

- Cada membro é um arquivo Markdown `src/data/comunidade/<slug>.md`. O slug é o nome da pessoa em minúsculas, sem acento e com hífen (`maria-silva`), e é o identificador do membro.
- Campos do frontmatter: `nome` e `cargo` (obrigatórios), `github`, `foto`, `tags` e `links` (opcionais). O corpo do arquivo é um texto opcional em Markdown.
- `links` aceita `site` (URL https) e os usuários de `linkedin`, `instagram`, `youtube` e `x`. O link do GitHub vem do campo `github`.
- A foto pode ser uma URL https externa ou um arquivo em `public/img/comunidade/` (até 200 KB). Sem `foto`, usa-se a foto do GitHub, se houver `github`, ou as iniciais da pessoa.
- A lista é ordenada por nome e é totalmente estática. Cada cartão mostra foto, nome e cargo e leva ao perfil.
- A validação roda no build (`src/content.config.ts` e `src/lib/comunidade.ts`): dado inválido, arquivo com nome fora do padrão, `github` duplicado, foto fora das regras ou arquivo solto impede o build.
- Entrada, alteração e remoção de perfis acontecem **somente por Pull Request**. A revisão é aberta a qualquer pessoa da comunidade, e a aprovação e o merge são de quem mantém o projeto. O CI confere que quem não é da organização altera apenas o próprio perfil: o `github` do arquivo precisa ser o de quem abriu a PR.
- Os dados são tratados como conteúdo não confiável: o texto em Markdown não pode ter HTML, links, imagens nem títulos, e todo o resto é escapado na renderização. As URLs externas se limitam ao `site` e à `foto`, sempre em https.

Passo a passo para participar: [`CONTRIBUINDO.md`](../CONTRIBUINDO.md).

## 4. Identidade visual

Cores, tipografia e regras visuais estão em [`docs/brand/brand-reference.md`](brand/brand-reference.md), que consolida o manual de identidade visual oficial da Tech In Rio. Toda mudança visual deve seguir esse guia.

## 5. Performance

- Site estático gerado pelo Astro, com HTML pronto no build e sem JS por padrão.
- O único JavaScript no cliente é o do menu mobile.
- Imagens otimizadas e sem arquivos grandes desnecessários.
- Fontes carregadas com `preconnect` e `display=swap`.
- Bibliotecas apenas quando indispensáveis. Hoje a única dependência é o próprio Astro.

## 6. Acessibilidade

- Suporte completo a teclado, com link para pular ao conteúdo e foco sempre visível.
- Contraste adequado entre texto e fundo.
- Estrutura semântica de títulos e rótulos claros em links e botões.
- Links que abrem em nova aba avisam isso a leitores de tela.
- Textos alternativos úteis nas imagens e respeito a `prefers-reduced-motion`.
- Não depender só de cor para comunicar informação.

## 7. SEO e compartilhamento

- Idioma `pt-BR` configurado no documento.
- `title` e `description` por página, com URL canônica.
- Open Graph e Twitter Cards com imagem de 1200×630 (`public/img/og-image.jpg`, regenerada com `yarn generate:og`).
- Dados estruturados (JSON-LD) da organização e do site.
- `sitemap.xml`, `robots.txt` e `site.webmanifest` gerados no build.
- A URL de produção está definida em `src/data/site.js`.
