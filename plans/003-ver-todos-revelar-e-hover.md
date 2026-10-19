# 003. "Ver todos": surgir já inclinado e manter a transição do hover

- **Status**: TODO
- **Commit**: sem git (repositório ainda não inicializado; plano escrito em 2026-10-19)
- **Severidade**: LOW
- **Categoria**: Coesão
- **Escopo estimado**: 1 arquivo (`css/style.css`), cerca de 6 linhas

## Problema

O link "Ver todos®" (`<a class="ver-todos" ... data-revelar>` no fim da seção Projetos) tem dois bugs de movimento causados pela mesma colisão de regras:

```css
/* css/style.css:445-446, atual */
.ver-todos {
  /* ... */
  transform: skewX(-6deg);
  transition: color 0.3s var(--entrar), border-color 0.3s var(--entrar);
}
```

```css
/* css/style.css:625-631, atual */
.js [data-revelar] {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.75s var(--entrar), transform 0.75s var(--entrar);
}
.js [data-revelar].visivel { opacity: 1; transform: none; }
.js .ver-todos[data-revelar].visivel { transform: skewX(-6deg); }
```

1. **Hover sem transição.** `.js [data-revelar]` tem especificidade maior que `.ver-todos`, então o `transition` dele vence e só lista `opacity` e `transform`. Resultado: no hover, a cor e a borda do "Ver todos" mudam de uma vez.
2. **Surge reto e entorta.** No estado escondido, `transform: translateY(32px)` substitui o `skewX(-6deg)`. Ao surgir, o texto anima de reto para inclinado: dá para ver a palavra "entortando" durante a subida.

## Alvo

- O estado escondido já está inclinado: `transform: translateY(32px) skewX(-6deg)`. Ao surgir, só a subida anima.
- Uma única regra de `transition` com as quatro propriedades: opacidade e transform (0.75s, da ficha) e cor e borda (0.3s, da ficha).

```css
.js .ver-todos[data-revelar] {
  transform: translateY(32px) skewX(-6deg);
  transition: opacity 0.75s var(--entrar), transform 0.75s var(--entrar), color 0.3s var(--entrar), border-color 0.3s var(--entrar);
}
.js .ver-todos[data-revelar].visivel { transform: skewX(-6deg); }
```

## Convenções do repo

- Tokens `--entrar` e `--sair` em `css/style.css:42-44`.
- As durações 0.75s (aparecer no scroll) e 0.3s (hover) vieram da ficha de estilo (`registros/referencias/dylanbrouwer-style-reference.md`, seção "Motion System"). Não mudar.

## Passos

1. Em `css/style.css`, substituir a linha 631
   `.js .ver-todos[data-revelar].visivel { transform: skewX(-6deg); }`
   por:
   ```css
   .js .ver-todos[data-revelar] {
     transform: translateY(32px) skewX(-6deg);
     transition: opacity 0.75s var(--entrar), transform 0.75s var(--entrar), color 0.3s var(--entrar), border-color 0.3s var(--entrar);
   }
   .js .ver-todos[data-revelar].visivel { transform: skewX(-6deg); }
   ```
2. Conferir que o bloco `@media (prefers-reduced-motion: reduce)` no fim do arquivo (reescrito pelo plano 001) contém esta linha, e adicioná-la se não tiver:
   ```css
     .js .ver-todos[data-revelar] { transform: skewX(-6deg); transition: opacity 0.4s var(--entrar), color 0.3s var(--entrar), border-color 0.3s var(--entrar); }
   ```

## Limites

- NÃO mudar a regra genérica `.js [data-revelar]` (linhas 625-630). Ela serve a todos os outros elementos.
- NÃO mudar a regra `.ver-todos` das linhas 435-449.
- NÃO mexer em HTML nem em JS.
- Executar depois do plano 001.

## Verificação

- **Mecânica**: servidor local, console sem erros.
- **Feel check**:
  - Recarregar e rolar devagar até o fim de Projetos. Em DevTools > Animations a 10%: o "Ver todos" sobe **já inclinado**, sem nenhum momento reto.
  - Passar o mouse no "Ver todos": a cor vai para cinza e a borda para laranja **com transição suave** de 0.3s (antes era instantâneo).
  - Com reduzir movimento ligado: o texto aparece inclinado, sem subir, e o hover continua suave.
- **Feito quando**: em nenhum quadro da entrada o "Ver todos" aparece sem inclinação, e o hover dele tem transição.
