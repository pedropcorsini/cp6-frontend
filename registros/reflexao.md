# Reflexão final

- **Repositório:** https://github.com/pedropcorsini/cp6-frontend
- **Deploy:** https://cp6-frontend-nine.vercel.app

## O que ficou como eu imaginei

O conceito "do back ao front" funcionou do jeito que eu queria. A página começa no escuro, como o back-end que ninguém vê, e termina no claro, onde fica a interface que o cliente usa. Isso amarrou a paleta, a tipografia e a ordem das seções. O hero ficou muito perto da referência: o título gigante saindo do escuro e o monitor mostrando sites reais que eu fiz para clientes, e não imagens genéricas. Também gostei de manter o laranja só no que está "vivo" (o relógio, o site no ar, o que estou estudando), porque a cor ganhou significado em vez de ser só estética.

O processo também ficou como eu queria. Cada correção virou um commit próprio, então o histórico do Git mostra a mesma história dos registros.

## O que eu mudaria

Na página, pouca coisa. Futuramente, implementaria várias páginas e rotas, como /trajetoria, /stacks e /skills, para o site não ser uma one-page. E, se fosse para publicar de verdade, aplicaria técnicas de SEO para ajudar na divulgação e na visibilidade no Google.

No processo, mudaria bastante:

**O prompt inicial foi uma escolha.** Ele foi basicamente a ficha de estilo colada, o vídeo e o link do meu GitHub, sem muitas informações concretas. Fiz assim de propósito: partir de uma referência pronta e ir ajustando ao meu gosto. Eu manteria essa estratégia, mas sei o custo dela: quem preencheu as lacunas (seções, tom, comportamento no celular) foram as perguntas da IA, e boa parte das correções veio daí.

**Como eu escreveria o prompt inicial hoje.** Eu manteria a ficha de estilo, o vídeo e o GitHub como base, e acrescentaria este bloco:

> **Contexto:** portfólio pessoal para o Checkpoint 6 da FIAP. Sou estudante de Engenharia de Software e dev freelancer, com foco em back-end Python.
> **Seções, nesta ordem:** hero, sobre, projetos de 2026 (clientes e estudos, com link do site e do repositório; repositório privado aparece só com o site), stack, skills (back-end, front-end e DevOps), trajetória (formação, experiência e eventos) e contato.
> **Textos:** em português, primeira pessoa, frases curtas, sem jargão de vendas.
> **Celular:** no hero, tudo centralizado e o título ocupando quase toda a largura. O monitor fica sempre apoiado na mesa, e o metadado com o relógio é uma etiqueta do monitor, logo acima dele.
> **Nav:** fixa e legível tanto sobre as seções escuras quanto sobre as claras.
> **Tecnologia:** HTML, CSS e JavaScript puros, sem build.
> **Antes de codar:** me pergunte o que faltar e me mostre a proposta de seções para eu aprovar.

| Linha acrescentada | O que teria evitado |
|---|---|
| Contexto, seções e textos | As 4 perguntas da IA na rodada 2 |
| Celular: monitor apoiado na mesa | Correção 1 |
| Celular: centralizado e título largo | Correção 2 |
| Celular: metadado como etiqueta do monitor | Correção 3 |
| Nav legível sobre seções escuras e claras | Correção 4 |

**O celular desde o começo.** As três primeiras correções foram todas no hero do mobile. A IA montou pensando no desktop e, no celular, só empilhou os blocos na ordem do HTML. Se eu tivesse descrito o hero como uma cena ("o monitor fica sempre apoiado na mesa, a meta é uma etiqueta do monitor"), boa parte desses ajustes não teria sido necessária.

**Um problema por prompt.** Na correção 2 misturei três pedidos e um deles ficou ambíguo. Na correção 3 fiz um pedido só, com uma restrição clara, e foi a mais rápida. Essa foi a lição mais prática do checkpoint.

**O que ainda falta na página.** As animações têm oito planos de melhoria prontos em `plans/`, que ainda não apliquei (o principal é o menu do celular, que hoje aparece de uma vez, sem transição). E a parte de eventos ficou fraca: só a Global Solution da FIAP. Conforme eu participar de mais eventos, essa seção deve crescer.
