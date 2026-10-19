# Log de prompts

Registro da conversa com a IA (Claude Code) durante o Checkpoint 6. Cada rodada tem o que eu pedi (prompt literal, sem edição), o que a IA entregou, o que estava errado ou o que eu quis mudar, e como corrigimos.

## Rodada 0. Leitura do enunciado

**Pedi:**
> leia o checkpoint6.pdf e veja oque será preciso ser feito. eu tenho um design.md pronto, uma ref com imagens tbm. veja ai

**IA fez:**
- Leu o PDF e resumiu os entregáveis (referências, IDV, prompts, fichas de correção, repo + deploy + reflexão) e os pesos da avaliação.
- Avisou que o design.md e as imagens não estavam na pasta do projeto e pediu os arquivos.

## Rodada 1. Prompt inicial

**Pedi:**
> prompt: [ficha de estilo "Dylanbrouwer — Style Reference", colada inteira no chat e guardada completa, do jeito que veio, em `referencias/dylanbrouwer-style-reference.md`]
>
> , video: https://images.refero.design/styles/refero.design/video/01c409c2-9f05-476d-a80d-5bbc45e2a92f.mp4, dados podem ser extraidos do github: https://github.com/pedropcorsini

**IA fez:**
- Guardou a ficha de estilo e baixou o vídeo do site de referência (`referencias/dylanbrouwer-video-site.mp4`, 34 s).
- Sem ffmpeg na máquina, extraiu um quadro a cada 1,5 s com um script em Swift (AVFoundation) e montou duas folhas de contato (`referencias/dylanbrouwer-video-frames-1.jpg` e `-2.jpg`).
- Puxou do GitHub o perfil, o README do perfil (stacks, projetos comerciais, contato) e a lista de repositórios com descrição, linguagem e link de deploy.
- Antes de codar, fez perguntas sobre o que o GitHub não responde (eventos, experiências, projetos privados, stack).

## Rodada 2. Perguntas sobre conteúdo e stack

**IA perguntou** (4 perguntas de uma vez, com uma opção recomendada em cada):

| Pergunta | Opções | Decidi |
|---|---|---|
| Como preencher experiências e eventos, já que o GitHub quase não mostra isso | Usar o que o GitHub mostra (recomendado) ou passar uma lista | Usar o que o GitHub mostra: freelancer de sites e sistemas, Engenharia de Software na FIAP e a Global Solution FIAP 2026 (Orbitrace). Completo depois se precisar |
| Como mostrar projetos de clientes com repositório privado | Mostrar com link do site (recomendado) ou só repos públicos | Mostrar com print e link do deploy, marcado como "repo privado" |
| Stack da página | HTML, CSS e JS puros (recomendado), Vite + React, Next.js + Tailwind | HTML, CSS e JS puros |
| Frase do texto gigante do hero (na referência é "SITES THAT / MOVE") | DO BACK / AO FRONT (recomendado), CÓDIGO QUE / ENTREGA, PEDRO / CORSINI | DO BACK / AO FRONT |

**IA conferiu:** quais deploys estão no ar. O `rmf-autopecas.vercel.app` responde 404, então fica fora da página.

## Rodada 3. Proposta de design

**IA entregou:** uma proposta completa antes de qualquer código: fontes substitutas (Anton no lugar da ABC Gravity, Inter 500 no lugar da Die Grotesk B, IBM Plex Mono original), a paleta da ficha sem mudanças, 8 blocos na ordem do vídeo da referência (nav, hero com monitor, sobre, projetos, faixa de stack, skills, trajetória, rodapé), o comportamento de movimento e a estrutura de arquivos.

**Pedi:**
> Aprovado, pode seguir com o código

**IA entregou (versão 1):**
- `index.html`, `css/style.css`, `js/main.js`, `img/favicon.svg`.
- Prints dos 7 sites no ar tirados com o Chrome headless (1440×900) em `img/projetos/`, e a foto do perfil do GitHub em `img/pedro.jpg`.
- Antes de escrever os textos, conferiu no `package.json` de cada repo de cliente qual stack ele usa (ELO: Vite + React; Renata e Tati: Next.js), para não inventar tecnologia nos cards.

**IA corrigiu sozinha durante o QA, antes de me entregar** (não foram prompts meus, mas ficam registrados):
1. O hero tinha 911 px de altura numa tela de 722 px: o monitor estourava a tela e o pé dele não aparecia. Correção: o tamanho do título, do monitor, do pé e da mesa passou a depender também da altura da tela (`svh`), não só da largura.
2. No tablet (820 px) a tagline do hero ficava espremida numa coluna estreita, porque a coluna do monitor reservava 560 px mesmo com o monitor menor. Correção: a coluna do meio passou a ter largura automática.

**QA feito pela IA:** desktop 1434 px, tablet 820 px e celular 390 px; menu mobile (abre, fecha ao clicar num link, rola até a seção); console sem erros; 15 imagens carregando; 4 fontes carregadas; nenhuma âncora quebrada; sem rolagem horizontal.

## Rodada 4. Auditoria de animações

**Pedi:**
> /improve-animations rode o improve animations e faça um plano para essa lp.

**IA fez:** rodou a skill `improve-animations` (auditoria de movimento baseada na filosofia de animação do Emil Kowalski). Ela só lê o código e escreve planos em `plans/`, sem alterar a página. Mapeou todo o movimento (CSS puro e JS vanilla, curvas `--entrar` e `--sair` vindas da ficha), conferiu cada achado no arquivo e na linha, apresentou uma tabela por prioridade e perguntou quais achados viram plano.

**Escolhi:** transformar todos os achados em plano (7 achados + a oportunidade do menu mobile).

**IA entregou:** 8 planos em `plans/` (001 a 008) e um `plans/README.md` com a ordem de execução e as dependências. O 001 (reduzir movimento) vem primeiro porque os planos 002 a 005 mexem no mesmo bloco CSS. Os problemas de nav e do botão "Menu" que já estão em `registros/correcoes.md` ficaram fora dos planos de propósito, para serem corrigidos por prompts meus.

## Rodada 5. Correção 1: monitor e mesa separados no mobile

**Pedi:**
> [print do hero no celular, guardado em `prints/correcao-01-antes-mobile.png`] o monitor e a mesa se separaram no mobile, ajuste isso. resultado esperado: ficar da mesma forma que em grandes telas[print do hero no desktop, guardado em `prints/correcao-01-esperado-desktop.png`]

**IA fez:** achou a causa (ordem das linhas da grade do hero no mobile e a altura que sobrava da tela dividida entre as linhas), subiu o metadado e a tagline para baixo do título e deixou o monitor na linha flexível, encostado na mesa. Mediu em 320, 370 e 430px: vão de 0px. Ficha em `correcoes.md` (Correção 1).

## Rodada 6. Correção 2: ajustes de texto no hero do mobile

**Pedi:**
> [print do hero no celular, guardado em `prints/correcao-02-antes-mobile.png`] na hero do mobile aumente o texto principal (do back ao front), centralize (horizontalmente) o texto inferior (construo apis...) e coloque essa parte [print do "DEV POR PEDRO CORSINI / SP ● 12:39 BRT", guardado em `prints/correcao-02-trecho-meta.png`] no meio deles.

**IA perguntou:** o que "no meio deles" queria dizer, já que a meta já ficava entre o título e o texto. Opções: centralizar na horizontal ou inverter a ordem (texto antes da meta).

**Decidi:** centralizar na horizontal.

**IA fez:** aumentou o título de `22vw` para `25vw` (medindo antes que a linha mais larga ocupa 3,65 vezes o tamanho da fonte) e centralizou a meta e o texto. No QA visual achou um bug causado pela própria mudança: a 320px o "AO FRONT" quebrava em duas linhas e tudo saía 2 a 4px do centro. Corrigiu com `white-space: nowrap` nas linhas do título e `minmax(0, 1fr)` na coluna da grade. Mediu em 320, 375, 430 e 760px. Ficha em `correcoes.md` (Correção 2).

## Rodada 7. Correção 3: meta logo acima do monitor (mobile)

**Pedi:**
> [print do "DEV POR PEDRO CORSINI / SP ● 12:45 BRT", guardado em `prints/correcao-03-trecho-meta.png`] mova esse texto para alguns pixels acima do monitor. nao mexa no texto construo apis...

**IA fez:** colocou a meta no fundo da linha flexível da grade do hero no mobile, logo acima do monitor, sem tocar na regra do "Construo APIs...". Na medição viu que a meta tinha ido para trás do monitor (a margem negativa do desktop voltou a valer quando a margem do mobile foi removida) e zerou essa margem no mobile. Resultado: meta 11px acima da tela do monitor em 320, 375 e 430px. Efeito colateral avisado: o "Construo APIs..." subiu e ficou 12px abaixo do título. Ficha em `correcoes.md` (Correção 3).
