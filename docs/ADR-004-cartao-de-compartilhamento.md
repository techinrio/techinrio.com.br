# ADR-004: Cartão de compartilhamento do membro e menu de compartilhar

**Status:** Aceito
**Data:** 2026-10-03
**Contexto:** Todas as páginas compartilhavam a mesma imagem nas redes. Queremos que cada perfil de membro apareça com um cartão próprio (foto, nome, cargo, tags e "Membro oficial da Tech In Rio"), que a pessoa possa baixá-lo em PNG e compartilhar o perfil com texto pronto. O site continua estático e sem serviços externos.

## Decisão

- **Cartão gerado no build:** uma rota estática (`/comunidade/<slug>/og-<chave>.png`) monta o cartão com `satori` (layout em objetos, texto escapado, sem concatenar SVG) e `sharp` (rasteriza para PNG e prepara a foto). A fonte é a Inter, em TTF latino (licença OFL), em `src/assets/fonts/`.
- **Duas novas dependências**, usadas só no build: `satori` e `sharp` (o `sharp` já vinha como dependência opcional do Astro e passou a ser declarado). O `fflate` do `satori` é forçado para uma versão corrigida via `resolutions`. As fontes em `woff` não renderizavam com essa combinação, por isso usamos TTF.
- **Foto no cartão:** só do repositório ou do GitHub (usuário validado, timeout de 5 s, limite de 2 MB, host final conferido, até 16 megapixels). Qualquer outro endereço vira iniciais no cartão. O download nunca usa URLs livres de contribuidores.
- **Cache, para gerar cada cartão uma única vez:** a chave do arquivo vem de nome, cargo, tags, origem da foto (o conteúdo, se for arquivo do repositório) e `CARD_VERSION`. Cartões prontos ficam na branch `og-cache` e são lidos no build (`.og-cache/`). Só os cartões novos são gerados e publicados. Se a foto do GitHub falhar, o cartão sai com iniciais naquele build e **não** entra no cache.
- **Publicação do cache:** o workflow `Deploy` envia os cartões novos como artifact, e um job separado, com `contents: write` e sem executar código do repositório, valida nomes e tamanhos, publica na branch `og-cache` e remove cartões sem uso. Esse job não bloqueia o deploy. O `workflow_dispatch` aceita `refresh_cards` (`all` ou slugs) para refazer cartões. PRs só leem o cache e nunca publicam.
- **Menu Compartilhar** no perfil: `popover` nativo do HTML, com links simples para LinkedIn, X, WhatsApp e Facebook, *Copiar link* e *Mais opções* (Web Share, que cobre o Instagram no celular) como únicos usos de JavaScript, e download do cartão em PNG. Nenhum script ou botão de terceiros é carregado.

## Consequências

- O build passa a baixar fotos do GitHub, mas só para cartões novos, e uma falha não derruba o build.
- A foto do GitHub não atualiza o cartão sozinha. Para refazer, use `refresh_cards`.
- Mudar o desenho do cartão exige aumentar `CARD_VERSION`.
- LinkedIn e Facebook não aceitam texto pré-preenchido: usam o cartão e a descrição do perfil.
- A branch `og-cache` cresce com cada cartão novo (dezenas de KB por cartão).
- Caracteres fora do alfabeto latino (emojis e outros alfabetos) não aparecem no cartão.
