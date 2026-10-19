# Registro de correções

Uma ficha por rodada de ajuste, sempre um problema por vez. O prompt de correção é copiado literalmente.

## Modelo

| Campo | |
|---|---|
| **Problema** | |
| **Prompt de correção** | |
| **Resultado** | Resolveu totalmente / em parte / não resolveu |
| **Aprendizado** | O que eu faria diferente no prompt inicial |

---

## Correção 1. Monitor e mesa separados no mobile

| Campo | |
|---|---|
| **Problema** | No celular, o monitor do hero ficava "flutuando": entre o pé dele e a mesa apareciam o metadado ("Dev por Pedro Corsini / SP 12:35 BRT") e a tagline, com um vão grande. No desktop o monitor fica apoiado na mesa. Print: `prints/correcao-01-antes-mobile.png` |
| **Prompt de correção** | "[print do mobile] o monitor e a mesa se separaram no mobile, ajuste isso. resultado esperado: ficar da mesma forma que em grandes telas[print do desktop]" |
| **Resultado** | Resolveu totalmente. Causa: no mobile a grade do hero empilhava título, monitor, metadado, tagline e mesa, nessa ordem, e a altura que sobrava da tela era dividida entre as linhas. Agora a ordem é título, metadado, tagline, monitor e mesa, e a linha do monitor é a flexível (`1fr`), o que empurra o monitor até a mesa. Medido em 320, 370 e 430px: vão de 0px entre o pé e a mesa. O desktop não mudou |
| **Aprendizado** | Comecei com um prompt enxuto de propósito: peguei uma referência pronta para ir ajustando ao meu gosto, sem muitas informações concretas. O custo disso apareceu aqui: como eu não falei nada do celular, a IA só empilhou os blocos. O que funcionou foi mandar o print do problema junto com o print do resultado que eu queria, e a correção saiu certa de primeira |

---

## Correção 2. Hierarquia e alinhamento dos textos no hero do mobile

| Campo | |
|---|---|
| **Problema** | No celular, o título "DO BACK / AO FRONT" ficava pequeno (sobrava espaço dos lados), e a meta ("DEV POR PEDRO CORSINI / SP ● 12:38 BRT") e o texto "Construo APIs..." ficavam alinhados à esquerda, sob um título centralizado. Print: `prints/correcao-02-antes-mobile.png` |
| **Prompt de correção** | "[print] na hero do mobile aumente o texto principal (do back ao front), centralize (horizontalmente) o texto inferior (construo apis...) e coloque essa parte [print da meta] no meio deles." |
| **Resultado** | Resolveu totalmente, com uma pergunta e um bug no meio. (1) "No meio deles" era ambíguo, porque a meta já ficava entre o título e o texto. A IA perguntou e eu respondi "centralizar na horizontal". (2) O título passou de `22vw` para `25vw` (cerca de 91% da largura da tela). (3) Ao aumentar, o "AO FRONT" quebrou em duas linhas a 320px. A IA achou no QA visual, travou cada linha do título sem quebra (`white-space: nowrap`) e a coluna da grade com `minmax(0, 1fr)`, para o título não empurrar o resto para fora do centro. Medido em 320, 375, 430 e 760px: tudo centralizado (0px de desvio), sem quebra, sem rolagem horizontal, e o monitor continua apoiado na mesa (Correção 1 preservada) |
| **Aprendizado** | Aqui eu misturei três pedidos num prompt só, e um deles ("no meio deles") ficou ambíguo: a IA teve que me perguntar o que eu queria dizer. Aprendi que correção precisa é um pedido por vez, com palavras que não deixem dúvida |

---

## Correção 3. Meta logo acima do monitor (mobile)

| Campo | |
|---|---|
| **Problema** | No celular, a meta ("DEV POR PEDRO CORSINI / SP ● 12:45 BRT") ficava entre o título e o texto "Construo APIs...", longe do monitor. Eu queria a meta colada no monitor, como uma etiqueta dele. Print: `prints/correcao-03-trecho-meta.png` |
| **Prompt de correção** | "[print da meta] mova esse texto para alguns pixels acima do monitor. nao mexa no texto construo apis..." |
| **Resultado** | Resolveu totalmente. A meta foi para o fundo da linha flexível da grade (a que empurra o monitor até a mesa), então fica sempre colada no monitor: 11px acima da tela em 320, 375 e 430px. No meio do caminho a meta sumiu atrás do monitor, porque ao tirar a margem do monitor no mobile voltou a valer a margem negativa do desktop. A IA viu na medição (sobreposição de 30px) e zerou essa margem no mobile. A regra do "Construo APIs..." não foi alterada, mas o texto subiu e ficou 12px abaixo do título, porque a meta saiu de cima dele |
| **Aprendizado** | Apliquei o que aprendi na correção 2: um pedido só e uma restrição clara ("não mexa em..."). Foi a correção mais rápida. Dizer o que eu quero e também o que não pode mudar dá um resultado melhor |

---

## Correção 4. Nav ilegível sobre as seções claras

| Campo | |
|---|---|
| **Problema** | As pílulas da nav têm fundo cinza translúcido e texto branco. Sobre o hero escuro funcionavam, mas sobre Projetos, Skills, Trajetória e rodapé (fundo `#f1f1f1`) quase sumiam, e o logo "PC" praticamente desaparecia. A IA encontrou esse problema no QA da versão 1 (item 1 da lista abaixo) e eu decidi corrigir |
| **Prompt de correção** | "3. correcao, pode fzr" (respondendo à lista de pendências da IA, em que o item 3 era "Correção 4: contraste da nav") |
| **Resultado** | Resolveu totalmente. Cada seção foi marcada como clara ou escura, e a nav troca para a versão clara da ficha de estilo (fundo claro, borda fina e texto grafite) quando passa sobre fundo claro, com transição de 0,3s. Com o menu do celular aberto, a nav volta para a versão escura, porque o fundo do menu é preto. Testado em 29 posições de rolagem (a nav bateu com a seção embaixo dela em todas) e no celular com o menu aberto e fechado |
| **Aprendizado** | Esse problema eu não tinha visto, foi a IA que encontrou no teste. Como usei uma referência pronta, a nav seguiu a ficha, que só mostra ela sobre fundo escuro. Aprendi a não avaliar só pelo hero: tenho que rolar a página inteira e testar cada parte, como o enunciado pede |

---

## Correção 5. Título escondido atrás da nav e botão "Menu" sem estado

| Campo | |
|---|---|
| **Problema** | Dois ajustes pequenos de navegação que a IA tinha encontrado no QA da versão 1 (itens 2 e 4 da lista abaixo). (1) Ao clicar num link da nav ou do menu do celular, a página rolava até o topo exato da seção e o título ficava atrás das pílulas fixas. (2) Com o menu do celular aberto, o botão continuava escrito "Menu" em vez de "Fechar" |
| **Prompt de correção** | "2. pode ajustar isso e ja subir, ai tudo ok" (respondendo à revisão de requisitos da IA, em que o item 2 eram essas duas pendências) |
| **Resultado** | Resolveu totalmente. (1) As seções ganharam uma margem de rolagem de 72px, então o título para abaixo da nav: testado clicando nos 5 links do desktop (título entre 27px e 123px abaixo da nav) e no link Skills do menu do celular (28px abaixo). (2) O botão mostra "Fechar" com o menu aberto e volta para "Menu" ao fechar pelo botão, por um link ou pela tecla Esc |
| **Aprendizado** | Aqui juntei dois ajustes num pedido só, mas eram pequenos, independentes e já estavam bem descritos pela IA, então não houve ambiguidade como na correção 2. Aprendi que a regra de um pedido por vez vale mais quando o pedido é vago: quando o problema já está claro, dá para agrupar sem perder precisão |

---

## Problemas encontrados no QA da versão 1 (ainda sem ficha)

A IA encontrou estes problemas testando a página e não corrigiu de propósito: cada um vira uma rodada de correção com prompt meu.

1. ✅ *Resolvido na Correção 4.* **Nav some sobre as seções claras.** As pílulas da nav têm fundo cinza translúcido com texto branco. Sobre o hero escuro funcionam, mas sobre Projetos, Skills e Trajetória (fundo `#f1f1f1`) ficam com pouco contraste, e o logo "PC" praticamente desaparece.
2. ✅ *Resolvido na Correção 5.* **Título da seção fica embaixo da nav.** Ao clicar em "+ Projetos" (ou num link do menu mobile), a página rola até o topo exato da seção e o título fica atrás das pílulas fixas.
3. **Espaços vazios grandes.** Há um vão grande entre os cards de Skills e a Trajetória, e outro entre o "Ver todos" e a faixa de stack.
4. ✅ *Resolvido na Correção 5.* **Botão "Menu" não muda de estado.** Com o menu mobile aberto, o botão continua escrito "Menu" em vez de "Fechar".
