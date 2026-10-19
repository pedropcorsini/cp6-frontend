# 001. Reduzir movimento sem apagar todo o feedback

- **Status**: TODO
- **Commit**: sem git (repositório ainda não inicializado; plano escrito em 2026-10-19)
- **Severidade**: MEDIUM
- **Categoria**: Acessibilidade
- **Escopo estimado**: 1 arquivo (`css/style.css`), cerca de 20 linhas

## Problema

Quem ativa "reduzir movimento" no sistema perde **todo** o feedback visual da página, não só o deslocamento. O reset global zera transições de cor (hover das pílulas, tags e links) e também o fade das seções que surgem no scroll:

```css
/* css/style.css:677-685, atual */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .js [data-revelar] { opacity: 1; transform: none; }
  .js .ver-todos[data-revelar] { transform: skewX(-6deg); }
  .faixa { flex-wrap: wrap; }
  .faixa__trilho[aria-hidden="true"] { display: none; }
  .faixa__trilho { flex-wrap: wrap; flex-shrink: 1; }
}
```

Reduzir movimento significa menos animações e mais suaves, **não zero**. A regra é tirar mudança de posição e manter opacidade e cor, que ajudam a entender a interface.

## Alvo

Com reduzir movimento ligado:

- As seções com `data-revelar` continuam surgindo, mas **só com fade** (sem subir 32px), em 0.4s.
- A entrada do hero (classe `.entra`) vira só fade, mantendo a sequência.
- Hover de cor (pílulas, tags, links, "Ver todos") **continua com transição**.
- Somem: a faixa rolando, o pulso do relógio, o zoom da imagem dos projetos e a inclinação dos ícones de skill.
- O monitor e o crachá já são desligados no JS (`js/main.js:34` e `js/main.js:95`). Não mexer.

## Convenções do repo

- Curvas ficam em `:root`, em `css/style.css:42-44`: `--entrar: cubic-bezier(0.32, 0.72, 0, 1);` e `--sair: cubic-bezier(0.19, 1, 0.22, 1);`. Usar só esses tokens.
- Nomes de classes e keyframes em português (`subir`, `subir-inclinado`, `rolar`, `pulsar`). O keyframe novo se chama `esmaecer`.
- Exemplo a imitar (keyframe já existente), em `css/style.css:325-328`:
  ```css
  @keyframes subir {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: none; }
  }
  ```

## Passos

1. Em `css/style.css`, logo depois do bloco `@keyframes subir-inclinado { ... }` (termina na linha 332), adicionar:
   ```css
   @keyframes esmaecer {
     from { opacity: 0; }
     to { opacity: 1; }
   }
   ```
2. Substituir o bloco inteiro `@media (prefers-reduced-motion: reduce) { ... }` (linhas 677-685) por:
   ```css
   @media (prefers-reduced-motion: reduce) {
     html { scroll-behavior: auto; }

     /* hero: só fade, sem subir */
     .js .entra,
     .js .hero__linha--inclinada.entra { animation-name: esmaecer; animation-duration: 0.4s; }

     /* seções: só fade, sem subir */
     .js [data-revelar] { transform: none; transition: opacity 0.4s var(--entrar); }
     .js .ver-todos[data-revelar] { transform: skewX(-6deg); transition: opacity 0.4s var(--entrar), color 0.3s var(--entrar), border-color 0.3s var(--entrar); }

     /* movimento contínuo ou decorativo: desligado */
     .ponto--vivo { animation: none; }
     .projeto__midia:hover img { transform: none; }
     .skill:hover .skill__icone { transform: none; }

     /* faixa de stack: parada e quebrando linha */
     .faixa__trilho { animation: none; flex-wrap: wrap; flex-shrink: 1; }
     .faixa { flex-wrap: wrap; }
     .faixa__trilho[aria-hidden="true"] { display: none; }
   }
   ```
3. Não mexer em `js/main.js`. Hoje, com reduzir movimento ligado, ele já adiciona `.visivel` em tudo de uma vez (`js/main.js:48-49`). Com o passo 2, isso vira um fade de 0.4s em todas as seções logo no carregamento, o que é aceitável.

## Limites

- NÃO tocar no `js/main.js`.
- NÃO mudar HTML.
- NÃO mudar as regras fora do bloco `@media (prefers-reduced-motion: reduce)`, exceto adicionar o `@keyframes esmaecer` do passo 1.
- Se o bloco nas linhas 677-685 não estiver igual ao trecho citado (o código mudou desde este plano), PARE e reporte em vez de improvisar.
- Os planos 002, 003 e 004 adicionam linhas a este mesmo bloco. Este plano tem que ser executado antes deles.

## Verificação

- **Mecânica**: abrir `index.html` por um servidor local (`python3 -m http.server`) e conferir que o console não mostra erros.
- **Feel check** (DevTools > Rendering > "Emulate CSS media feature prefers-reduced-motion: reduce"):
  - Recarregar: as linhas do hero aparecem **só com fade**, sem subir, mantendo a sequência.
  - Passar o mouse nas pílulas da nav: o fundo **ainda muda com transição suave** (antes era instantâneo).
  - Rolar a página: nenhuma seção se desloca, todas já estão visíveis ou só esmaecem.
  - A faixa de stack está parada e quebra em várias linhas, sem itens duplicados.
  - O pontinho laranja do relógio não pisca.
  - Passar o mouse num card de projeto: a imagem **não** dá zoom.
- **Feito quando**: com reduzir movimento ligado, nada muda de posição, mas os hovers de cor continuam suaves. Com ele desligado, a página fica idêntica a antes.
