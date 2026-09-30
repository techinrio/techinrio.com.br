# Fluxo de Git

Usamos **trunk-based development**: a branch principal é sempre a `master`, e todo trabalho novo sai dela e volta para ela por Pull Request. Cada merge na `master` publica o site automaticamente, então ela deve estar sempre pronta para ir ao ar.

## Passo a passo

1. Atualize a `master` local.
2. Crie uma branch a partir da `master`, curta e com um nome descritivo, por exemplo `feat/pagina-eventos` ou `fix/menu-mobile`. Quem não é da organização trabalha em um fork.
3. Faça commits pequenos, seguindo o padrão abaixo.
4. Abra uma Pull Request para a `master`.
5. Aguarde as validações automáticas e a revisão.
6. Uma pessoa mantenedora do projeto avalia e aprova. A revisão é aberta para qualquer pessoa da comunidade comentar.
7. Depois da aprovação, quem mantém o projeto faz o merge. Apague a branch.

## Regras

- Nada é enviado direto para a `master`: toda alteração entra por Pull Request.
- Toda PR precisa ser avaliada e aprovada por uma **pessoa mantenedora**. Agentes de IA podem propor PRs, mas não aprovam nem fazem merge.
- Prefira PRs pequenas, com um único objetivo.

## Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `refactor:` mudança de código sem mudar comportamento
- `style:` formatação, espaçamento, indentação
- `perf:` melhoria de desempenho
- `chore:` tarefas de manutenção

Formato: `tipo(escopo): mensagem no imperativo`, com até 72 caracteres.

Exemplo: `feat(hero): add carioca welcome text`

## Pull Requests

- **Título:** curto, no mesmo formato dos commits.
- **Descrição:** preencha o modelo em [`.github/PULL_REQUEST_TEMPLATE.md`](../.github/PULL_REQUEST_TEMPLATE.md), que vale para pessoas e para agentes de IA.
