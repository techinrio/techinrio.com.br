# ADR-003: Perfil de membro em Markdown

**Status:** Aceito
**Data:** 2026-10-03
**Contexto:** A lista de membros mostrava só nome, usuário do GitHub e uma bio curta. Queremos uma página para cada pessoa, com cargo, texto livre, tags, links e foto, e que também sirva a quem não domina o GitHub. Tudo continua estático e versionado no repositório, com entrada somente por Pull Request.

## Decisão

- **Formato:** um arquivo Markdown com frontmatter por membro, em `src/data/comunidade/<slug>.md`. O corpo é o texto da pessoa. Não entra biblioteca nova: o Astro já lê e renderiza o arquivo.
- **Identificador:** o slug do nome do arquivo (`maria-silva`). O `github` virou opcional; quando existe, precisa ser único.
- **Campos:** `nome` e `cargo` obrigatórios; `github`, `foto`, `tags` (até 8, livres) e `links` opcionais.
- **Links por usuário:** `linkedin`, `instagram`, `youtube` e `x` guardam só o usuário, e o site monta a URL. Só `site` aceita uma URL completa, sempre em https. Não há campo de e-mail.
- **Foto:** URL https externa ou arquivo em `public/img/comunidade/` (jpg, png ou webp, até 200 KB, com o nome do slug). Sem `foto`, usa-se a foto do GitHub, se houver `github`, ou as iniciais.
- **Markdown restrito:** o texto aceita parágrafos, ênfase e listas. O build rejeita HTML (`<`, `>`), links, imagens, notas, títulos e separadores, URLs e mais de 2000 caracteres. O Astro não filtra HTML cru nem `javascript:` em Markdown, então a regra é recusar a sintaxe no build, em vez de sanitizar depois.
- **Autoria no CI** (`scripts/check-member-pr.sh`): quem não é da organização só altera um perfil, com a respectiva foto, e o `github` do arquivo (também o da versão atual na `master`, em caso de edição ou remoção) precisa ser o de quem abriu a PR.

## Consequências

- Mais liberdade para as pessoas, mas com URLs externas (`site` e `foto`). Elas passam pela revisão da PR, usam `rel="noopener noreferrer"` (e `nofollow ugc` no site), e a foto externa carrega com `referrerpolicy="no-referrer"`. Quem controla o link de uma foto externa pode trocar a imagem depois da revisão, por isso a foto no repositório é a opção recomendada.
- O GitHub Pages não permite configurar CSP, então a validação no build e a revisão humana são as defesas.
- Perfis `.yml` do formato anterior deixam de valer. O build recusa arquivos fora do padrão `<slug>.md`.
- Cada arquivo em `public/img/comunidade/` precisa ser usado por algum perfil, senão o build falha.
