# Tech In Rio — Especificação do Site Institucional

## 1. Objetivo

O novo site da Tech In Rio deve funcionar como a porta de entrada institucional da organização. A primeira versão precisa ser simples, confiável e fácil de manter, mas ainda assim carregar a personalidade da marca: tecnologia com identidade carioca, proximidade com a comunidade e energia de quem constrói junto.

Este site não deve tentar repetir o site antigo. Ele deve aproveitar o tom humano, local e caloroso, mas reorganizar a narrativa para uma presença institucional mais madura e preparada para evoluir no futuro.

## 2. Direção da Marca

O tom deve ser:
- acolhedor, direto e comunitário
- carioca sem caricatura
- técnico sem ser frio
- confiante sem parecer institucional demais
- simples o suficiente para funcionar como base de longo prazo

O site precisa transmitir:
- pertencimento
- movimento
- credibilidade
- abertura para novas pessoas
- orgulho da origem local

## 3. O Que Preservar do Site Antigo

Do site legado, vale preservar principalmente:
- a noção de comunidade
- a linguagem que conecta tecnologia com Rio de Janeiro
- a ideia de energia, proximidade e participação
- a identidade visual com contrastes fortes e acento quente
- a sensação de projeto vivo, não corporativo e engessado

## 4. O Que Não Deve Entrar na Primeira Versão

A primeira versão deve desconsiderar completamente:
- lista de parceiros
- patrocinadores
- nomes de pessoas como elemento central da comunicação
- galerias extensas de eventos passados
- dependências de feed social ou conteúdo dinâmico para justificar a página

Se houver menção a eventos ou iniciativas, isso deve aparecer apenas como contexto institucional e não como catálogo completo.

## 5. Escopo da Primeira Versão

A estrutura inicial deve ser enxuta e clara:
1. Hero principal com proposta de valor da Tech In Rio.
2. Sobre a organização.
3. O que a Tech In Rio faz ou representa.
4. Como a comunidade pode se conectar ou acompanhar.
5. Chamada final com contato, canais ou próximo passo.

## 6. Mensagem Central

A página deve responder rapidamente a estas perguntas:
- O que é a Tech In Rio?
- Por que ela existe?
- Que tipo de comunidade ela constrói?
- Como alguém novo entende o valor da organização em poucos segundos?

## 7. Conteúdo e Voz

A escrita deve seguir estas regras:
- priorizar frases curtas e compreensíveis
- evitar jargões excessivos
- manter uma cadência humana
- usar expressão local com critério
- evitar excesso de emojis, piadas internas ou exagero de informalidade

## 8. Diretrizes de UX

- navegação simples e previsível
- hierarquia visual clara
- CTAs objetivos
- contraste adequado entre texto e fundo
- espaçamento generoso
- leitura confortável em mobile
- sem blocos longos demais de texto sem respiro

## 9. Diretrizes de Performance

O projeto usa Astro com entrega estática e baixo custo de execução no cliente:
- usar JS no cliente apenas quando realmente necessário
- priorizar HTML semântico e componentes leves
- otimizar imagens e evitar arquivos grandes sem necessidade
- preservar carregamento rápido do hero e do conteúdo principal
- evitar dependências pesadas para efeitos visuais simples

## 10. Acessibilidade

- suporte completo a teclado
- foco visível
- contraste adequado
- textos alternativos úteis
- estrutura semântica de headings
- rótulos claros em links e botões
- evitar depender apenas de cor para comunicar informação

## 11. SEO e Compartilhamento

- title e description consistentes com a identidade da marca
- Open Graph e Twitter Cards bem configurados
- imagem de compartilhamento alinhada ao manual de marca
- idioma pt-BR configurado corretamente
- uso de headings coerente com o conteúdo

## 12. Evolução Futura

A primeira versão deve ser pensada como fundação para:
- páginas internas mais ricas
- área de notícias ou novidades
- conteúdo editorial sobre a comunidade
- futuras seções sobre participação e projetos

## 13. Critérios de Aceite

O site será considerado pronto quando:
- apresente a Tech In Rio como uma organização institucional clara
- preserve o tom comunitário e carioca sem depender do site antigo
- remova parceiros e nomes de pessoas da narrativa inicial
- seja rápido, acessível e fácil de manter em Astro
- sirva como base confiável para futuras expansões
