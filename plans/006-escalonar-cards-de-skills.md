# 006. Cards de Skills surgem em sequência, não em bloco

- **Status**: TODO
- **Commit**: sem git (repositório ainda não inicializado; plano escrito em 2026-10-19)
- **Severidade**: LOW
- **Categoria**: Coesão
- **Escopo estimado**: 1 arquivo (`css/style.css`), cerca de 4 linhas

## Problema

Os três cards de Skills (Back-end, Front-end, DevOps) ficam na mesma linha no desktop e no tablet, e todos têm `data-revelar`. Eles entram na tela juntos e surgem exatamente no mesmo quadro, como um bloco só. O resto da página tem ritmo (o hero entra em sequência, os projetos estão desencontrados no grid), e esse bloco quebra o ritmo.

```css
/* css/style.css:625-630, atual (regra genérica que os cards usam) */
.js [data-revelar] {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.75s var(--entrar), transform 0.75s var(--entrar);
}
.js [data-revelar].visivel { opacity: 1; transform: none; }
```

Marcação (`index.html`, seção `#skills`): `<div class="skills__grade">` com três `<article class="skill" data-revelar>`.

## Alvo

Atraso de **60ms** entre um card e o próximo (0, 60 e 120ms), dentro da faixa de 30 a 80ms recomendada para grupos. O atraso é só decorativo: o card fica clicável e legível o tempo todo. Só vale com duas ou mais colunas (acima de 760px). No celular os cards estão empilhados e o próprio scroll já cria a sequência.

```css
@media (min-width: 761px) {
  .js .skills__grade > [data-revelar]:nth-child(2) { transition-delay: 60ms; }
  .js .skills__grade > [data-revelar]:nth-child(3) { transition-delay: 120ms; }
}
```

## Convenções do repo

- O hero já usa sequência com `animation-delay: calc(var(--i) * 110ms + 100ms)` (`css/style.css:320-321`). Aqui o atraso é menor de propósito, porque são cards irmãos e não a abertura da página.
- O breakpoint mobile do arquivo é `@media (max-width: 760px)`, então o complemento é `min-width: 761px`.

## Passos

1. Em `css/style.css`, logo depois da linha `.js .ver-todos[data-revelar].visivel { transform: skewX(-6deg); }` (no bloco "Revelar no scroll"), adicionar:
   ```css
   /* cards de skills lado a lado surgem em sequência */
   @media (min-width: 761px) {
     .js .skills__grade > [data-revelar]:nth-child(2) { transition-delay: 60ms; }
     .js .skills__grade > [data-revelar]:nth-child(3) { transition-delay: 120ms; }
   }
   ```

## Limites

- NÃO aplicar em outros grupos (projetos, trajetória, números do Sobre).
- NÃO mudar a duração (0.75s) nem a curva da regra genérica.
- NÃO mexer em HTML nem em JS.
- O hover do card (ícone levantando) usa transição no filho `.skill__icone`, não no `.skill`, então o atraso não afeta o hover. Se encontrar alguma transição de hover definida direto em `.skill`, PARE e reporte.

## Verificação

- **Mecânica**: servidor local, console sem erros.
- **Feel check** (desktop, 1440px):
  - Recarregar, rolar devagar até Skills: os cards surgem da esquerda para a direita, um logo depois do outro, e não como um bloco.
  - DevTools > Animations a 10%: o segundo card começa 60ms depois do primeiro e o terceiro 120ms depois.
  - Passar o mouse num card logo depois que ele surgir: o ícone reage sem atraso.
  - Celular (390px): os cards empilhados surgem conforme o scroll, sem atraso extra.
- **Feito quando**: no desktop os três cards nunca surgem no mesmo quadro, e no celular nada mudou.
