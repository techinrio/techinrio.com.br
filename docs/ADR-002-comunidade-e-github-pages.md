# ADR-002: Módulo Comunidade e hospedagem no GitHub Pages

**Status:** Aceito
**Data:** 2026-09-29
**Contexto:** O repositório foi transferido para a organização `techinrio`. Queremos um portal comunitário mantido pelo próprio GitHub e sem custo de plataforma extra.

## Decisão

- **Dados da comunidade** em arquivos YAML por membro (`src/data/comunidade/<github>.yml`), versionados no repositório, validados por schema Zod via Astro Content Collections.
- **Cadastro e alterações só por Pull Request**: revisão aberta, merge dos administradores (CODEOWNERS + proteção da `master`). Issues ficam para problemas, dúvidas e sugestões.
- **Regra de autoria no CI**: o autor da PR precisa ser o dono do perfil (`github` do arquivo), exceto administradores.
- **Hospedagem**: GitHub Pages com deploy via GitHub Actions (`push` na `master`), domínio canônico `www.techinrio.com.br` (`productionUrl` em `src/data/site.js`); o apex `techinrio.com.br` redireciona para o www (comportamento do GitHub Pages). DNS na Cloudflare. Saiu da Vercel; a lógica de env da Vercel foi removida do `astro.config.mjs`.
- **Gerenciador de pacotes**: yarn (o `yarn.lock` é a fonte de verdade).

## Consequências

- Sem backend, banco ou API; o membro só aparece após merge e deploy.
- Sem preview deploy por PR; o check de build da PR é a validação.
- PRs de fork rodam com `pull_request` (token só leitura, sem secrets); o deploy roda apenas após merge.
- Migração de DNS documentada em `docs/deploy/MIGRACAO.md`.
