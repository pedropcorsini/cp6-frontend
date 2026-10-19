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
| **Aprendizado** | No prompt inicial eu deveria ter descrito o hero como uma cena ("o monitor fica SEMPRE apoiado na mesa, em qualquer tela") e dito o que pode mudar de ordem no celular. A IA tratou monitor e mesa como blocos independentes e, no mobile, só empilhou tudo na ordem do HTML |

---

## Correção 2. Hierarquia e alinhamento dos textos no hero do mobile

| Campo | |
|---|---|
| **Problema** | No celular, o título "DO BACK / AO FRONT" ficava pequeno (sobrava espaço dos lados), e a meta ("DEV POR PEDRO CORSINI / SP ● 12:38 BRT") e o texto "Construo APIs..." ficavam alinhados à esquerda, sob um título centralizado. Print: `prints/correcao-02-antes-mobile.png` |
| **Prompt de correção** | "[print] na hero do mobile aumente o texto principal (do back ao front), centralize (horizontalmente) o texto inferior (construo apis...) e coloque essa parte [print da meta] no meio deles." |
| **Resultado** | Resolveu totalmente, com uma pergunta e um bug no meio. (1) "No meio deles" era ambíguo, porque a meta já ficava entre o título e o texto. A IA perguntou e eu respondi "centralizar na horizontal". (2) O título passou de `22vw` para `25vw` (cerca de 91% da largura da tela). (3) Ao aumentar, o "AO FRONT" quebrou em duas linhas a 320px. A IA achou no QA visual, travou cada linha do título sem quebra (`white-space: nowrap`) e a coluna da grade com `minmax(0, 1fr)`, para o título não empurrar o resto para fora do centro. Medido em 320, 375, 430 e 760px: tudo centralizado (0px de desvio), sem quebra, sem rolagem horizontal, e o monitor continua apoiado na mesa (Correção 1 preservada) |
| **Aprendizado** | Misturei três pedidos num prompt só, e o enunciado recomenda um por vez. Um deles ("no meio deles") ficou ambíguo e gastou uma pergunta. No prompt inicial eu deveria ter definido o alinhamento do hero no celular ("tudo centralizado") e o tamanho do título ("ocupando quase toda a largura"). E aumentar uma fonte gigante sempre pede teste na menor tela (320px), onde ela quebra primeiro |

---

## Correção 3. Meta logo acima do monitor (mobile)

| Campo | |
|---|---|
| **Problema** | No celular, a meta ("DEV POR PEDRO CORSINI / SP ● 12:45 BRT") ficava entre o título e o texto "Construo APIs...", longe do monitor. Eu queria a meta colada no monitor, como uma etiqueta dele. Print: `prints/correcao-03-trecho-meta.png` |
| **Prompt de correção** | "[print da meta] mova esse texto para alguns pixels acima do monitor. nao mexa no texto construo apis..." |
| **Resultado** | Resolveu totalmente. A meta foi para o fundo da linha flexível da grade (a que empurra o monitor até a mesa), então fica sempre colada no monitor: 11px acima da tela em 320, 375 e 430px. No meio do caminho a meta sumiu atrás do monitor, porque ao tirar a margem do monitor no mobile voltou a valer a margem negativa do desktop. A IA viu na medição (sobreposição de 30px) e zerou essa margem no mobile. A regra do "Construo APIs..." não foi alterada, mas o texto subiu e ficou 12px abaixo do título, porque a meta saiu de cima dele |
| **Aprendizado** | Este prompt teve um pedido só e uma restrição clara ("não mexa em..."), e foi a correção mais rápida até agora. No prompt inicial eu deveria ter dito que a meta é uma "etiqueta do monitor", para ela acompanhar o monitor em qualquer tela |

---

## Problemas encontrados no QA da versão 1 (ainda sem ficha)

A IA encontrou estes problemas testando a página e não corrigiu de propósito: cada um vira uma rodada de correção com prompt meu.

1. **Nav some sobre as seções claras.** As pílulas da nav têm fundo cinza translúcido com texto branco. Sobre o hero escuro funcionam, mas sobre Projetos, Skills e Trajetória (fundo `#f1f1f1`) ficam com pouco contraste, e o logo "PC" praticamente desaparece.
2. **Título da seção fica embaixo da nav.** Ao clicar em "+ Projetos" (ou num link do menu mobile), a página rola até o topo exato da seção e o título fica atrás das pílulas fixas.
3. **Espaços vazios grandes.** Há um vão grande entre os cards de Skills e a Trajetória, e outro entre o "Ver todos" e a faixa de stack.
4. **Botão "Menu" não muda de estado.** Com o menu mobile aberto, o botão continua escrito "Menu" em vez de "Fechar".
