# 002. Feedback ao pressionar pílulas e tags clicáveis

- **Status**: TODO
- **Commit**: sem git (repositório ainda não inicializado; plano escrito em 2026-10-19)
- **Severidade**: MEDIUM
- **Categoria**: Física e origem
- **Escopo estimado**: 1 arquivo (`css/style.css`), cerca de 8 linhas

## Problema

Nenhum elemento clicável responde ao toque ou ao clique. As pílulas (nav, botão "Menu" do celular, "Contato" e o botão ↑ do rodapé) e as tags clicáveis ("GitHub" na foto, "Fale comigo") só mudam de cor no hover. No celular não existe hover, então o botão "Menu", que é o controle principal, não dá nenhum sinal de que foi apertado.

```css
/* css/style.css:115-132, atual */
.pilula {
  display: inline-flex; align-items: center; gap: var(--s6);
  /* ... */
  cursor: pointer;
  transition: background-color 0.3s var(--entrar), color 0.3s var(--entrar);
}
.pilula:hover { background: var(--fog); color: var(--onyx); }
```

```css
/* css/style.css:148-149, atual */
a.tag--escura { transition: background-color 0.3s var(--entrar); }
a.tag--escura:hover { background: var(--graphite); }
```

## Alvo

Ao pressionar, o elemento encolhe para `scale(0.97)` em 160ms e volta ao soltar. É sutil (entre 0.95 e 0.98), só o suficiente para parecer físico.

```css
.pilula {
  /* ...resto igual... */
  transition: background-color 0.3s var(--entrar), color 0.3s var(--entrar), transform 160ms var(--entrar);
}
.pilula:active { transform: scale(0.97); }

a.tag--escura { transition: background-color 0.3s var(--entrar), transform 160ms var(--entrar); }
a.tag--escura:active { transform: scale(0.97); }
```

A curva é a `--entrar` do repo (`cubic-bezier(0.32, 0.72, 0, 1)`), uma ease-out forte: o encolhimento começa rápido e assenta suave.

## Convenções do repo

- Tokens de curva em `css/style.css:42-44`: `--entrar` e `--sair`. Não criar curva nova.
- As transições listam propriedade por propriedade, nunca `transition: all` (ver `css/style.css:130`). Manter assim.

## Passos

1. Em `css/style.css:130`, trocar
   `  transition: background-color 0.3s var(--entrar), color 0.3s var(--entrar);`
   por
   `  transition: background-color 0.3s var(--entrar), color 0.3s var(--entrar), transform 160ms var(--entrar);`
2. Logo depois de `.pilula:hover { background: var(--fog); color: var(--onyx); }` (linha 132), adicionar:
   ```css
   .pilula:active { transform: scale(0.97); }
   ```
3. Em `css/style.css:148`, trocar
   `a.tag--escura { transition: background-color 0.3s var(--entrar); }`
   por
   `a.tag--escura { transition: background-color 0.3s var(--entrar), transform 160ms var(--entrar); }`
4. Logo depois de `a.tag--escura:hover { background: var(--graphite); }` (linha 149), adicionar:
   ```css
   a.tag--escura:active { transform: scale(0.97); }
   ```
5. Dentro do bloco `@media (prefers-reduced-motion: reduce) { ... }` no fim do arquivo (já reescrito pelo plano 001), adicionar no final:
   ```css
     /* pressionar: troca o encolher por escurecer */
     .pilula:active, a.tag--escura:active { transform: none; opacity: 0.7; }
   ```

## Limites

- NÃO adicionar `:active` em links de texto (`.projeto__links a`, `.rodape__col a`), no `.ver-todos` nem nos cards de projeto.
- NÃO mudar a duração nem a curva das transições de cor (0.3s `--entrar`). Elas vieram da ficha de estilo.
- NÃO mexer em HTML nem em JS.
- Executar depois do plano 001. Se o bloco de reduzir movimento ainda for o reset global com `* { animation: none !important; transition: none !important; }`, PARE e reporte.

## Verificação

- **Mecânica**: servidor local, console sem erros.
- **Feel check**:
  - Segurar o clique em "+ Projetos": a pílula encolhe um pouco e volta ao soltar. Nada pula de lugar ao redor (é `transform`, não muda layout).
  - Celular (ou DevTools no modo dispositivo, 390px): tocar em "Menu" mostra o encolhimento.
  - Segurar o clique em "Fale comigo" no rodapé e na tag "GitHub" sobre a foto: encolhem igual.
  - DevTools > Animations com a velocidade em 10%: o encolhimento começa rápido e assenta, sem quique.
  - Com reduzir movimento ligado: pressionar escurece (opacidade 0.7) em vez de encolher.
- **Feito quando**: toda pílula e toda tag clicável encolhem para 0.97 ao serem pressionadas, e nenhum outro elemento ganhou esse efeito.
