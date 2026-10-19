# 004. Menu mobile abre como cortina, a partir da nav

- **Status**: TODO
- **Commit**: sem git (repositório ainda não inicializado; plano escrito em 2026-10-19)
- **Severidade**: MEDIUM (oportunidade de animação: hoje a troca é brusca)
- **Categoria**: Oportunidade de animação
- **Escopo estimado**: 3 arquivos (`index.html`, `css/style.css`, `js/main.js`), cerca de 35 linhas

## Problema

No celular, o botão "Menu" abre um painel preto que ocupa a tela inteira **de uma vez**, sem transição. Ao fechar, ele também some de uma vez. É uma mudança de estado brusca e não mostra de onde o painel veio. O atributo `hidden` impede qualquer transição, porque vira `display: none`.

```html
<!-- index.html:39, atual -->
<div class="menu-mobile" id="menu-mobile" hidden>
```

```css
/* css/style.css:192-205, atual */
.menu-mobile {
  position: fixed; inset: 0; z-index: 40;
  background: var(--onyx);
  padding: 96px var(--gutter) var(--s48);
}
.menu-mobile nav { display: flex; flex-direction: column; }
.menu-mobile a {
  color: var(--fog);
  font-size: 36px;
  letter-spacing: -0.03em;
  text-decoration: none;
  padding: var(--s12) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
```

```js
// js/main.js:63-89, atual
const botaoMenu = document.querySelector('.nav__menu');
const menuMobile = document.getElementById('menu-mobile');

function fecharMenu() {
  botaoMenu.setAttribute('aria-expanded', 'false');
  menuMobile.hidden = true;
  document.body.style.overflow = '';
}

botaoMenu.addEventListener('click', () => {
  const abrir = botaoMenu.getAttribute('aria-expanded') !== 'true';
  botaoMenu.setAttribute('aria-expanded', String(abrir));
  menuMobile.hidden = !abrir;
  document.body.style.overflow = abrir ? 'hidden' : '';
});

menuMobile.addEventListener('click', (evento) => {
  if (evento.target.closest('a')) fecharMenu();
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && !menuMobile.hidden) {
    fecharMenu();
    botaoMenu.focus();
  }
});
```

## Alvo

- **Abrir:** o painel desce do topo como uma cortina (`clip-path: inset(0 0 100% 0)` vai para `inset(0 0 0 0)`) em **400ms** com `--entrar`. Os links sobem 16px e aparecem em sequência, com 40ms de atraso entre um e outro.
- **Fechar:** mais rápido, porque a resposta do sistema deve ser imediata. A cortina sobe em **250ms** com `--sair`, e os links somem juntos em 200ms.
- Usar **transições, não keyframes**: se a pessoa tocar "Menu" duas vezes rápido, a cortina reverte de onde está em vez de recomeçar do zero.
- Acessibilidade: trocar `hidden` por `inert` mais `visibility`, para que o painel fechado continue fora do foco do teclado e do leitor de tela.

```css
.menu-mobile {
  position: fixed; inset: 0; z-index: 40;
  background: var(--onyx);
  padding: 96px var(--gutter) var(--s48);
  clip-path: inset(0 0 100% 0);
  visibility: hidden;
  transition: clip-path 250ms var(--sair), visibility 0s linear 250ms;
}
.menu-mobile.aberto {
  clip-path: inset(0 0 0 0);
  visibility: visible;
  transition: clip-path 400ms var(--entrar), visibility 0s;
}
```

## Convenções do repo

- Tokens `--entrar` (`cubic-bezier(0.32, 0.72, 0, 1)`, a curva de gaveta estilo iOS) e `--sair` (`cubic-bezier(0.19, 1, 0.22, 1)`), em `css/style.css:42-44`. A ficha manda usar `--entrar` para entrar e `--sair` para sair.
- Estados por classe em português (`.ativa`, `.visivel`). A classe nova é `.aberto`.
- A nav (`.nav`, z-index 50) fica acima do menu (z-index 40), então o botão "Menu" continua visível e clicável com o painel aberto. Não mudar os z-index.

## Passos

1. `index.html:39`: trocar `<div class="menu-mobile" id="menu-mobile" hidden>` por `<div class="menu-mobile" id="menu-mobile" inert>`.
2. `css/style.css`: substituir o bloco `.menu-mobile { ... }` (linhas 192-196) por:
   ```css
   .menu-mobile {
     position: fixed; inset: 0; z-index: 40;
     background: var(--onyx);
     padding: 96px var(--gutter) var(--s48);
     clip-path: inset(0 0 100% 0);
     visibility: hidden;
     transition: clip-path 250ms var(--sair), visibility 0s linear 250ms;
   }
   .menu-mobile.aberto {
     clip-path: inset(0 0 0 0);
     visibility: visible;
     transition: clip-path 400ms var(--entrar), visibility 0s;
   }
   ```
3. `css/style.css`: logo depois do bloco `.menu-mobile a { ... }` (termina na linha 205), adicionar:
   ```css
   .menu-mobile a {
     opacity: 0;
     transform: translateY(16px);
     transition: opacity 200ms var(--sair), transform 200ms var(--sair);
   }
   .menu-mobile.aberto a {
     opacity: 1;
     transform: none;
     transition: opacity 400ms var(--entrar), transform 400ms var(--entrar);
   }
   .menu-mobile.aberto a:nth-child(1) { transition-delay: 80ms; }
   .menu-mobile.aberto a:nth-child(2) { transition-delay: 120ms; }
   .menu-mobile.aberto a:nth-child(3) { transition-delay: 160ms; }
   .menu-mobile.aberto a:nth-child(4) { transition-delay: 200ms; }
   .menu-mobile.aberto a:nth-child(5) { transition-delay: 240ms; }
   ```
   (Este bloco complementa o anterior. As propriedades de cor, tamanho e borda continuam no bloco original.)
4. `js/main.js`: substituir as linhas 67-78 por:
   ```js
   function fecharMenu() {
     botaoMenu.setAttribute('aria-expanded', 'false');
     menuMobile.classList.remove('aberto');
     menuMobile.inert = true;
     document.body.style.overflow = '';
   }

   botaoMenu.addEventListener('click', () => {
     const abrir = botaoMenu.getAttribute('aria-expanded') !== 'true';
     botaoMenu.setAttribute('aria-expanded', String(abrir));
     menuMobile.classList.toggle('aberto', abrir);
     menuMobile.inert = !abrir;
     document.body.style.overflow = abrir ? 'hidden' : '';
   });
   ```
5. `js/main.js:85`: trocar `if (evento.key === 'Escape' && !menuMobile.hidden) {` por `if (evento.key === 'Escape' && menuMobile.classList.contains('aberto')) {`.
6. Dentro do bloco `@media (prefers-reduced-motion: reduce)` no fim do `css/style.css` (reescrito pelo plano 001), adicionar:
   ```css
     /* menu: só fade, sem cortina nem links subindo */
     .menu-mobile { clip-path: none; opacity: 0; transition: opacity 150ms var(--sair), visibility 0s linear 150ms; }
     .menu-mobile.aberto { opacity: 1; transition: opacity 150ms var(--entrar), visibility 0s; }
     .menu-mobile a, .menu-mobile.aberto a { opacity: 1; transform: none; transition: none; }
   ```

## Limites

- NÃO mudar o texto do botão ("Menu"/"Fechar"). Isso está registrado como problema 4 em `registros/correcoes.md` e vai ser corrigido num prompt do próprio autor.
- NÃO mudar z-index, cores nem tamanhos do menu.
- NÃO usar `@keyframes` para abrir ou fechar (tem que dar para interromper no meio).
- Executar depois do plano 001.
- Se o código atual não bater com os trechos citados, PARE e reporte.

## Verificação

- **Mecânica**: servidor local, console sem erros. No DevTools, com o menu fechado, o elemento `#menu-mobile` tem `inert` e não recebe foco com Tab.
- **Feel check** (DevTools no modo dispositivo, 390 × 844):
  - Tocar em "Menu": o painel preto desce do topo como cortina e os links sobem um depois do outro.
  - Tocar em "Menu" de novo: a cortina sobe mais rápido do que desceu.
  - Tocar em "Menu" duas vezes bem rápido: a cortina **volta de onde estava**, sem piscar nem recomeçar do zero.
  - Tocar em "Projetos" dentro do menu: o menu fecha com a cortina e a página rola até Projetos.
  - Com o menu aberto, apertar Esc: fecha, e o foco volta para o botão "Menu".
  - DevTools > Animations a 10%: a borda da cortina é reta, sem quique.
  - Com reduzir movimento ligado: o menu só esmaece (150ms), sem cortina e sem links subindo.
- **Feito quando**: abrir e fechar o menu nunca é instantâneo, pode ser interrompido no meio, e o menu fechado é invisível para teclado e leitor de tela.
