# ADR-002: Módulo Comunidade e hospedagem no GitHub Pages

**Status:** Aceito
**Data:** 2026-09-29
**Contexto:** O repositório pertence à organização `techinrio` no GitHub. Queremos um portal comunitário mantido no próprio GitHub, com hospedagem simples e sem custo extra de plataforma.

## Decisão

- **Dados da comunidade** em um arquivo por membro (`src/data/comunidade/<slug>.md`), versionados no repositório e validados por schema Zod via Astro Content Collections. O formato está detalhado no [ADR-003](ADR-003-perfil-de-membro.md).
- **Cadastro e alterações somente por Pull Request:** revisão aberta, aprovação e merge de quem mantém o projeto (CODEOWNERS e proteção da `master`). Issues ficam para problemas, dúvidas e sugestões.
- **Regra de autoria no CI:** quem não é da organização só altera o próprio perfil: o `github` do arquivo precisa ser o usuário de quem abriu a PR.
- **Hospedagem:** GitHub Pages, com build e deploy por GitHub Actions a cada push na `master`. O domínio canônico é `www.techinrio.com.br` (`productionUrl` em `src/data/site.js`), e o domínio sem `www` redireciona para ele.
- **Gerenciador de pacotes:** yarn (o `yarn.lock` é a fonte de verdade).

## Consequências

- Sem backend, banco ou API: o membro só aparece depois do merge e do deploy.
- Sem preview por PR: o check de build da PR é a validação.
- PRs de fork rodam com `pull_request` (token somente leitura e sem secrets). O deploy roda apenas depois do merge.
