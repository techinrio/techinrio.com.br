# Como entrar na comunidade

A lista de `/comunidade` é mantida aqui no GitHub. Entrada e alteração de dados são **sempre por Pull Request** — assim tudo fica aberto e auditável.

## Passo a passo

1. Faça um fork de [techinrio/techinrio.com.br](https://github.com/techinrio/techinrio.com.br).
2. Crie o arquivo `src/data/comunidade/<seu-usuario-github>.yml`, com o username **em minúsculas**:

   ```yaml
   nome: Seu Nome
   github: seu-usuario
   bio: Uma frase curta sobre você.
   ```

3. Abra uma Pull Request para a `master` e preencha o checklist.
4. As validações automáticas rodam na PR. Se falharem, leia o erro e ajuste o arquivo.
5. Qualquer pessoa da comunidade pode revisar e comentar. A aprovação final e o merge são dos administradores.
6. Depois do merge e do deploy, você aparece em [www.techinrio.com.br/comunidade](https://www.techinrio.com.br/comunidade/).

Para atualizar seus dados, edite o seu arquivo e abra outra PR.

## Regras

- Só existem três campos: `nome`, `github` e `bio`. Qualquer outro campo é rejeitado.
- `github` é o seu username real do GitHub e o nome do arquivo tem que ser `<github em minúsculas>.yml`.
- `nome`: até 80 caracteres. `bio`: até 280 caracteres.
- Uma linha só, sem HTML (`<` ou `>`) e sem links (`http://`, `https://`, `www.`).
- A PR precisa ser aberta pela própria conta cujo username está no arquivo. Cada pessoa cadastra apenas o próprio perfil.
- A PR deve alterar somente o seu arquivo.

## Issues

Use Issues para relatar problemas, tirar dúvidas, sugerir melhorias ou discutir o processo. **Não** use Issues para pedir inclusão na lista: isso é feito por Pull Request.
