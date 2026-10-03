# Tech In Rio — Site institucional

Código-fonte de [www.techinrio.com.br](https://www.techinrio.com.br), o site da Tech In Rio, a comunidade de tecnologia mais carioca de todo Brasil.

O site é o ponto de partida para conhecer a comunidade, as atividades e os eventos, e tem uma página com os membros da comunidade em [`/comunidade/`](https://www.techinrio.com.br/comunidade/).

## Stack

- [Astro](https://astro.build) 7, com geração estática e zero JavaScript por padrão
- CSS puro com custom properties (um CSS Module por componente)
- JavaScript vanilla, só onde não há alternativa (hoje, o menu mobile e o menu de compartilhar)
- Hospedagem no GitHub Pages, com deploy por GitHub Actions

Mantemos o mínimo de JavaScript e de bibliotecas possível. Além do Astro, só usamos `satori` e `sharp` para gerar, no build, o cartão de compartilhamento de cada membro. As decisões estão em [`docs/`](docs).

## Como rodar

Você precisa de [Node.js](https://nodejs.org) 22.12 ou superior e do [yarn](https://yarnpkg.com).

```bash
yarn install
yarn dev
```

O site abre em `http://localhost:4321`.

| Comando | O que faz |
|---------|-----------|
| `yarn dev` | Servidor local com recarga automática |
| `yarn build` | Gera o site estático em `dist/` (também valida os dados da comunidade) |
| `yarn preview` | Serve o build de `dist/` localmente |
| `yarn generate:og` | Regenera a imagem de compartilhamento (`public/img/og-image.jpg`) |

## Estrutura

```text
src/
├── components/   seções e blocos das páginas
├── data/         metadados, canais e membros da comunidade (data/comunidade/)
├── layouts/      estrutura base das páginas
├── lib/          leitura e validação dos dados da comunidade
├── pages/        rotas do site
└── styles/       estilos globais e um CSS Module por componente

public/           imagens e outros arquivos estáticos
scripts/          utilitários de desenvolvimento
docs/             documentação do projeto
.github/          workflows, templates e regras de revisão
```

## Comunidade

Cada membro é um arquivo Markdown em `src/data/comunidade/<nome-sobrenome>.md`, com `nome`, `cargo`, foto, tags, links e um texto livre, e ganha uma página em `/comunidade/<nome-sobrenome>/`. Para criar ou alterar o seu perfil, abra uma Pull Request: na página da comunidade, o botão **Criar meu perfil** abre o editor do GitHub com um modelo. O passo a passo está em [`CONTRIBUINDO.md`](CONTRIBUINDO.md).

## Deploy

Cada merge na `master` roda o build no GitHub Actions e publica o resultado no GitHub Pages. Pull Requests rodam só o build e as validações, sem publicar.

## Documentação

- [`docs/spec.md`](docs/spec.md): especificação do site
- [`docs/brand/brand-reference.md`](docs/brand/brand-reference.md): identidade visual
- [`docs/boas-praticas.md`](docs/boas-praticas.md): boas práticas de código
- [`docs/git-workflow.md`](docs/git-workflow.md): fluxo de Git, commits e Pull Requests
- [`docs/ADR-001-stack.md`](docs/ADR-001-stack.md), [`docs/ADR-002-comunidade-e-github-pages.md`](docs/ADR-002-comunidade-e-github-pages.md) e [`docs/ADR-003-perfil-de-membro.md`](docs/ADR-003-perfil-de-membro.md) e [`docs/ADR-004-cartao-de-compartilhamento.md`](docs/ADR-004-cartao-de-compartilhamento.md): decisões de arquitetura

## Contribuindo

Toda contribuição é bem-vinda: entrar na comunidade, corrigir algo no site ou sugerir melhorias. Veja o [`CONTRIBUINDO.md`](CONTRIBUINDO.md).

## Links

- [Site](https://www.techinrio.com.br)
- [WhatsApp](https://chat.whatsapp.com/I2qMkQsEZakHxNAkDQ8HuC)
- [Instagram](https://www.instagram.com/techinrio/)
- [YouTube](https://www.youtube.com/@techinrio)
- [GitHub](https://github.com/techinrio)
- [LinkedIn](https://www.linkedin.com/company/tech-in-rio/)
- [X](https://x.com/techinrio)
