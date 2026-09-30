# Como contribuir

Este projeto é aberto e mantido por toda a comunidade. Você pode entrar na lista de membros, corrigir ou melhorar o site, ou sugerir ideias. Tudo acontece aqui no GitHub, por Pull Request ou Issue.

## Entrar na comunidade

A lista de [`/comunidade`](https://www.techinrio.com.br/comunidade/) é mantida neste repositório. Entrada e alteração de dados são **sempre por Pull Request**, assim tudo fica aberto e auditável.

1. Faça um fork de [techinrio/techinrio.com.br](https://github.com/techinrio/techinrio.com.br).
2. Crie o arquivo `src/data/comunidade/<seu-usuario-github>.yml`, com o username **em minúsculas**:

   ```yaml
   nome: Seu Nome
   github: seu-usuario
   bio: Uma frase curta sobre você.
   ```

3. Abra uma Pull Request para a `master` e preencha o modelo.
4. As validações automáticas rodam na PR. Se falharem, leia o erro e ajuste o arquivo.
5. Qualquer pessoa da comunidade pode revisar e comentar. A aprovação final e o merge são de quem mantém o projeto.
6. Depois do merge e do deploy, você aparece em [www.techinrio.com.br/comunidade](https://www.techinrio.com.br/comunidade/).

Para atualizar seus dados, edite o seu arquivo e abra outra PR.

### Regras do cadastro

- Só existem três campos: `nome`, `github` e `bio`. Qualquer outro campo é rejeitado.
- `github` é o seu username real do GitHub, e o nome do arquivo tem que ser `<github em minúsculas>.yml`.
- `nome`: até 80 caracteres. `bio`: até 280 caracteres.
- Uma linha só, sem HTML (`<` ou `>`) e sem links (`http://`, `https://`, `www.`).
- A PR precisa ser aberta pela própria conta cujo username está no arquivo. Cada pessoa cadastra apenas o próprio perfil.
- A PR deve alterar somente o seu arquivo.

## Contribuir com o site

### Preparar o ambiente

Você precisa de [Node.js](https://nodejs.org) 22.12 ou superior e do [yarn](https://yarnpkg.com).

```bash
git clone https://github.com/<seu-usuario>/techinrio.com.br.git
cd techinrio.com.br
yarn install
yarn dev
```

O site abre em `http://localhost:4321`. Antes de abrir a PR, rode `yarn build` e confira que ele passa.

### Como trabalhar

1. Crie uma branch a partir da `master`.
2. Siga as [boas práticas](docs/boas-praticas.md): mínimo de JavaScript, mínimo de bibliotecas, acessibilidade e identidade visual da [referência de marca](docs/brand/brand-reference.md).
3. Faça commits no padrão Conventional Commits, como descrito no [fluxo de Git](docs/git-workflow.md).
4. Abra uma Pull Request para a `master` e preencha o modelo.
5. Uma pessoa mantenedora do projeto avalia e aprova. A revisão é aberta: qualquer pessoa pode comentar.

Antes de propor algo grande, como nova página ou nova dependência, abra uma Issue para conversarmos.

## Issues

Use Issues para relatar problemas no site, tirar dúvidas, sugerir melhorias ou discutir o processo. **Não** use Issues para pedir inclusão na lista de membros: isso é feito por Pull Request.

## Sugestões de documentação

Achou algo que falta ou está errado nos documentos em [`docs/`](docs)? Abra uma PR editando o arquivo ou uma Issue.
