# 008. Curva de vai e volta no pulso do relógio

- **Status**: TODO
- **Commit**: sem git (repositório ainda não inicializado; plano escrito em 2026-10-19)
- **Severidade**: LOW
- **Categoria**: Curva e duração
- **Escopo estimado**: 1 arquivo (`css/style.css`), 2 linhas

## Problema

O pontinho laranja ao lado do relógio do hero pisca sem parar (`.ponto--vivo`). O loop usa a curva de entrada `--entrar` (`cubic-bezier(0.32, 0.72, 0, 1)`), que começa rápido e freia devagar. Num vai e volta contínuo isso deixa o piscar desigual: apaga de repente e demora para acender. Para movimento contínuo de ida e volta, a curva certa é ease-in-out.

```css
/* css/style.css:108-113, atual */
.ponto--vivo { animation: pulsar 1.6s var(--entrar) infinite; }

@keyframes pulsar {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}
```

## Alvo

Um token novo de ease-in-out forte, aplicado ao pulso. Com keyframes em 0%, 50% e 100%, a curva vale para cada metade, então o ponto apaga e acende com a mesma suavidade.

```css
--vaivem: cubic-bezier(0.77, 0, 0.175, 1);
```
```css
.ponto--vivo { animation: pulsar 1.6s var(--vaivem) infinite; }
```

## Convenções do repo

- Tokens de movimento ficam em `:root`, no comentário `/* Movimento */` (`css/style.css:42-44`), com nomes em português (`--entrar`, `--sair`). O novo se chama `--vaivem`.

## Passos

1. `css/style.css`: logo depois da linha `  --sair: cubic-bezier(0.19, 1, 0.22, 1);` (linha 44), adicionar:
   ```css
     --vaivem: cubic-bezier(0.77, 0, 0.175, 1);
   ```
2. `css/style.css:108`: trocar
   `.ponto--vivo { animation: pulsar 1.6s var(--entrar) infinite; }`
   por
   `.ponto--vivo { animation: pulsar 1.6s var(--vaivem) infinite; }`

## Limites

- NÃO mudar a duração (1.6s) nem os keyframes `pulsar`.
- NÃO aplicar `--vaivem` em nenhum outro lugar.
- NÃO mexer no bloco de reduzir movimento (o plano 001 já desliga esse pulso lá).

## Verificação

- **Mecânica**: servidor local, console sem erros.
- **Feel check**:
  - Olhar o ponto ao lado do relógio por uns 5 ciclos: ele apaga e acende com a mesma suavidade, como uma respiração, sem "cair" de repente.
  - DevTools > Animations: a curva mostrada é `cubic-bezier(0.77, 0, 0.175, 1)`.
- **Feito quando**: o pulso usa `--vaivem` e o piscar fica simétrico.
