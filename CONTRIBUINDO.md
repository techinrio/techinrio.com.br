# Como contribuir

Este projeto é aberto e mantido por toda a comunidade. Você pode entrar na lista de membros, corrigir ou melhorar o site, ou sugerir ideias. Tudo acontece aqui no GitHub, por Pull Request ou Issue.

## Entrar na comunidade

Cada pessoa da comunidade pode ter um perfil em [`/comunidade`](https://www.techinrio.com.br/comunidade/), com foto, cargo, tags, links e um texto sobre si. Os perfis são mantidos neste repositório. Criar, alterar e remover um perfil acontece **sempre por Pull Request**, assim tudo fica aberto e auditável.

### Pelo navegador, sem terminal

1. Você precisa de uma conta no GitHub.
2. Em [www.techinrio.com.br/comunidade](https://www.techinrio.com.br/comunidade/), clique em **Criar meu perfil**. O GitHub abre o editor já com um modelo.
3. Troque o nome do arquivo `seu-nome.md` pelo seu nome, em minúsculas, sem acento e com hífen (por exemplo, `maria-silva.md`), e preencha o modelo.
4. Clique em **Commit changes** (ou **Propose new file**) e depois em **Create pull request**, com um título curto e a descrição preenchida.
5. As validações automáticas rodam na PR. Se falharem, leia o erro e ajuste o arquivo.
6. Qualquer pessoa da comunidade pode revisar e comentar. A aprovação final e o merge são de quem mantém o projeto.
7. Depois do merge e do deploy, o seu perfil aparece em [www.techinrio.com.br/comunidade](https://www.techinrio.com.br/comunidade/).

Se preferir usar Git, faça um fork do repositório, crie `src/data/comunidade/<nome-sobrenome>.md` e abra a PR para a `master`.

### Modelo do arquivo

```markdown
---
nome: Maria Silva
cargo: Estudante de Análise e Desenvolvimento de Sistemas
github: maria-silva
foto: https://github.com/maria-silva.png
tags: [Front-end, React, Mentoria]
links:
  site: https://maria.dev
  linkedin: maria-silva
  instagram: maria.silva
  youtube: "@maria"
  x: maria_silva
---

Escreva aqui um texto sobre você. Pode usar **negrito**, *itálico* e listas:

- primeira coisa
- segunda coisa
```

### Regras do perfil

- **Obrigatórios:** `nome` e `cargo`, de até 80 caracteres, em uma linha, sem HTML (`<` ou `>`) e sem links. Se o cargo tiver `:`, coloque entre aspas.
- **Nome do arquivo:** `<nome-sobrenome>.md`, em minúsculas, sem acento e com hífen. Se já existir uma pessoa com o mesmo nome, acrescente um número (`maria-silva-2`).
- **`github`:** o seu usuário no GitHub. Ao abrir a PR pela sua conta, ele é obrigatório e precisa ser o seu. Também serve para mostrar a sua foto do GitHub, quando você não informa `foto`.
- **`foto`:** uma URL `https://…` ou o nome de um arquivo que você adicionou em `public/img/comunidade/`. Quem quiser a foto do GitHub pode usar `https://github.com/<usuario>.png`. **Recomendamos o arquivo no repositório:** nomeie como `<nome-sobrenome>.jpg` (ou `.png`, `.webp`), com até 200 KB, e escreva `foto: <nome-sobrenome>.jpg`. Um link externo pode mudar de conteúdo depois da revisão. Sem `foto`, usamos a foto do GitHub, se houver `github`, ou as suas iniciais.
- **`tags`:** até 8, livres, com até 24 caracteres cada. Servem para tecnologias, áreas e interesses.
- **`links`:** `site` recebe uma URL `https://…`. `linkedin`, `instagram`, `youtube` e `x` recebem só o usuário. O link do GitHub aparece sozinho, a partir do campo `github`.
- **Texto:** até 2000 caracteres, só com parágrafos, negrito, itálico e listas. Não pode ter HTML, links, imagens, títulos nem linhas separadoras. Os links ficam no campo `links`.
- **Só o seu perfil:** a PR deve alterar apenas o seu arquivo e a sua foto.

### Atualizar ou remover o seu perfil

Para atualizar, edite o seu arquivo e abra outra PR. Para sair da lista, abra uma PR que apaga o seu arquivo (e a sua foto, se tiver). Só a própria pessoa pode alterar ou remover o seu perfil.

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
