# 007. Troca de tela do monitor sem escurecer no meio

- **Status**: TODO
- **Commit**: sem git (repositório ainda não inicializado; plano escrito em 2026-10-19)
- **Severidade**: LOW
- **Categoria**: Coesão
- **Escopo estimado**: 2 arquivos (`css/style.css`, `js/main.js`), cerca de 20 linhas

## Problema

O monitor do hero troca o print do projeto a cada 3,2s. Hoje a imagem que sai e a que entra fazem fade **ao mesmo tempo**: no meio da troca as duas estão parcialmente transparentes e o fundo preto da tela (`#050505`) aparece, o que dá uma piscada escura a cada troca. A legenda "No ar: …" troca o texto de uma vez, no início do fade.

**Observação honesta:** a piscada vem da matemática do CSS (duas opacidades parciais empilhadas), mas o quanto ela incomoda só dá para julgar vendo. O feel check abaixo é obrigatório.

```css
/* css/style.css:290-298, atual */
.monitor__tela img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: top;
  opacity: 0;
  transition: opacity 0.6s var(--sair);
}
.monitor__tela img.ativa { opacity: 1; }
.monitor__legenda { position: absolute; left: 10px; bottom: 10px; z-index: 2; }
```

```js
// js/main.js:27-32, atual
function proximaTela() {
  telas[telaAtual].classList.remove('ativa');
  telaAtual = (telaAtual + 1) % telas.length;
  telas[telaAtual].classList.add('ativa');
  nomeTela.textContent = telas[telaAtual].dataset.nome;
}
```

## Alvo

- A imagem que **sai** fica 100% opaca, por baixo (`.saindo`, z-index 0, sem transição).
- A imagem que **entra** vem por cima (`.ativa`, z-index 1) fazendo fade de 0 a 1 em 0.6s com `--sair`, e com um desfoque leve que vai de `blur(2px)` a nenhum. O desfoque disfarça o momento em que as duas telas se sobrepõem.
- A `.saindo` antiga é limpa na troca seguinte, já escondida pela tela de cima.
- A legenda faz fade-out em 150ms, troca o texto e faz fade-in.

```css
.monitor__tela img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: top;
  opacity: 0;
  filter: blur(2px);
  transition: opacity 0.6s var(--sair), filter 0.6s var(--sair);
}
.monitor__tela img.ativa { opacity: 1; filter: none; z-index: 1; }
.monitor__tela img.saindo { opacity: 1; filter: none; z-index: 0; transition: none; }
.monitor__legenda { position: absolute; left: 10px; bottom: 10px; z-index: 2; transition: opacity 150ms var(--sair); }
.monitor__legenda.trocando { opacity: 0; }
```

## Convenções do repo

- Estado por classe em português (`.ativa`, `.visivel`, `.aberto`). As classes novas são `.saindo` e `.trocando`.
- Tokens de curva `--entrar` e `--sair` em `css/style.css:42-44`. A ficha usa `--sair` para troca e morph.
- Blur durante a transição tem que ficar abaixo de 20px. Aqui é 2px.
- A legenda é o `<span class="tag tag--escura monitor__legenda">` dentro de `#monitor-tela`, e o texto fica em `<span id="monitor-nome">` (`index.html`, seção hero).

## Passos

1. `css/style.css`: substituir as linhas 290-298 (do `.monitor__tela img {` até a regra `.monitor__legenda`) pelo bloco do Alvo acima, completo.
2. `js/main.js`: substituir a função `proximaTela` (linhas 27-32) por:
   ```js
   const legenda = nomeTela.closest('.monitor__legenda');

   function proximaTela() {
     const anterior = telas[telaAtual];
     telas.forEach((img) => img.classList.remove('saindo'));
     anterior.classList.replace('ativa', 'saindo');
     telaAtual = (telaAtual + 1) % telas.length;
     telas[telaAtual].classList.add('ativa');

     legenda.classList.add('trocando');
     setTimeout(() => {
       nomeTela.textContent = telas[telaAtual].dataset.nome;
       legenda.classList.remove('trocando');
     }, 150);
   }
   ```

## Limites

- NÃO mudar o intervalo de 3200ms nem a lógica do IntersectionObserver que pausa o monitor fora da tela (`js/main.js:34-43`).
- NÃO mudar a ordem das imagens nem o HTML.
- NÃO aumentar o blur além de 2px.
- Se `proximaTela` ou o bloco CSS não baterem com os trechos citados, PARE e reporte.

## Verificação

- **Mecânica**: servidor local, console sem erros. No DevTools > Elements, durante a rotação, nunca há mais de uma imagem com `.ativa` e no máximo uma com `.saindo`.
- **Feel check**:
  - Olhar o monitor por umas 4 trocas: nenhuma piscada escura entre uma tela e outra.
  - DevTools > Animations a 10%: a tela nova aparece por cima com um leve desfoque que some, e a de baixo fica 100% visível até ser coberta.
  - A legenda "No ar: …" some rapidamente, troca o nome e volta, sem pular.
  - Se o desfoque parecer "sujo" em câmera lenta, reportar ao autor em vez de remover por conta própria.
  - Rolar para fora do hero e voltar: a rotação pausa e retoma normalmente.
- **Feito quando**: nas trocas o fundo preto nunca aparece, e a legenda troca com fade.
