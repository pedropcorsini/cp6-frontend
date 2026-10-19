# Identidade visual

**Conceito:** "do back ao front". O portfólio trata a página como um monumento tipográfico, do mesmo jeito que a referência principal (Dylanbrouwer), e conta a mesma história que o meu perfil: começo no escuro (backend, banco de dados, coisas que ninguém vê) e termino na luz (a interface que o cliente usa). Por isso a página vai do escuro ao claro de cima para baixo, e o título gigante sai do escuro para o claro.

## Paleta

| Cor | Hex | Papel | Por quê |
|---|---|---|---|
| Onyx | `#161616` | Fundo do hero e do Sobre, tags | O "back": o lado escuro, técnico, invisível para o usuário |
| Graphite | `#3c3a3e` | Texto principal | Quase preto, mas com um leve tom frio, menos duro que o preto puro |
| Stone | `#7b7a7c` | Texto de apoio, descrições | Hierarquia por cor em vez de peso de fonte |
| Silver Mist | `#c9c7cc` | Linhas finas, divisórias, grade | Estrutura sem peso visual |
| Fog / Paper | `#f1f1f1` / `#f8f8f8` | Fundo das seções claras | O "front": a parte clara, onde o trabalho aparece |
| Ember | `#ff6436` | Pontinhos de status, "em estudo", "no ar" | Única cor da página. Por ser rara, marca o que está vivo (relógio, site no ar, tecnologia que estou estudando) |

Tudo é monocromático para que a cor venha dos **próprios projetos** (os prints dos sites dos clientes no monitor e nos cards).

## Tipografia

| Fonte | Uso | Sensação |
|---|---|---|
| **Anton** (no lugar da ABC Gravity Variable, que é paga) | Títulos gigantes: hero, "Ver todos", "Skills", rodapé | Monumento, cartaz. Condensada e pesada, as letras quase se encostam |
| **Inter 500** (no lugar da Die Grotesk B, que é paga) | Todo o texto corrido e títulos médios | Neutra e firme. Sempre peso 500, a hierarquia vem só de tamanho e cor |
| **IBM Plex Mono** (a mesma da ficha) | Nav, tags, datas, metadados | Camada de "sistema", com cara de terminal. Combina com quem é dev |

## Tom e personalidade

Moderno, técnico e direto. No layout aparece como cantos retos nos cards, pílulas só no que é clicável, linhas finas no lugar de sombras e muito espaço. Nos textos aparece como frases curtas, em primeira pessoa e sem jargão de vendedor ("Construo APIs em Python e sites que viram cliente").

## Estrutura da página

| Seção | Por quê |
|---|---|
| Hero ("Do back / ao front" + monitor) | Mostra em 3 segundos quem eu sou e já mostra trabalho real no monitor |
| Sobre | Quem sou, com números rápidos (sites no ar, repositórios, semestre) |
| Projetos de 2026 | O que o enunciado mais pede: projetos do ano, com link para o site e para o repo |
| Faixa de stack | Leitura rápida das ferramentas, no lugar da faixa de marcas da referência |
| Skills | Skills agrupadas em back-end, front-end e DevOps, com o que estou estudando |
| Trajetória | Formação, experiência e eventos (pedido do enunciado) |
| Rodapé / contato | Chamada para contato e links |

## Onde a página diverge da ficha (e por quê)

- **Degradê do título:** a ficha manda o degradê ir do preto para o claro sobre fundo `#161616`. Seguindo isso ao pé da letra, o topo das letras (preto) sumiria no fundo preto. Segui o que o vídeo da referência mostra de fato: letras claras no topo escurecendo para baixo.
- **Laranja no rodapé:** a ficha diz para nunca usar o laranja como fundo, mas o vídeo mostra o rodapé com um degradê laranja. Segui o vídeo, só no rodapé, como fechamento.
- **Itálico do "AO FRONT":** o Anton não tem itálico, então a inclinação é feita com `skewX(-1