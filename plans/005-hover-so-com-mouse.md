# 005. Efeitos de hover só em dispositivos com mouse

- **Status**: TODO
- **Commit**: sem git (repositório ainda não inicializado; plano escrito em 2026-10-19)
- **Severidade**: LOW
- **Categoria**: Acessibilidade
- **Escopo estimado**: 1 arquivo (`css/style.css`), cerca de 10 linhas

## Problema

Telas de toque disparam um "hover falso" no toque, e ele fica preso até a pessoa tocar em outro lugar. Na página isso causa:

- O zoom da imagem do projeto fica preso depois do toque.
- O ícone do card de skill fica inclinado e levantado depois do toque.
- A faixa de stack para de rolar quando é tocada e só volta ao tocar fora dela.
- O botão "Menu" do celular fica branco depois do toque (visto no QA a 390px), parecendo que continua pressionado.

```css
/* css/style.css:132, atual */
.pilula:hover { background: var(--fog); color: var(--onyx); }
```
```css
/* css/style.css:409, atual */
.projeto__midia:hover img { transform: scale(1.03); }
```
```css
/* css/style.css:465, atual */
.faixa:hover .faixa__trilho { animation-play-state: paused; }
```
```css
/* css/style.css:524, atual */
.skill:hover .skill__icone { transform: translateY(-6px) rotate(-4deg); }
```

## Alvo

Os quatro hovers só valem quando o aparelho tem mouse de verdade:

```css
@media (hover: hover) and (pointer: fine) {
  .elemento:hover { /* ... */ }
}
```

Os hovers que só mudam a borda de links de texto (`.projeto__links a:hover`, `.rodape__col a:hover`), o das tags e o do "Ver todos" ficam como estão: são só cor e não grudam de forma que atrapalhe.

## Convenções do repo

- Media queries ficam junto da regra que alteram ou no bloco "Responsivo" do fim do arquivo. Aqui, cada hover é envolvido **no mesmo lugar** em que está hoje, para não mudar a ordem da cascata.
- O JS já faz essa checagem para o crachá: `window.matchMedia('(hover: hover)')` em `js/main.js:95`.

## Passos

1. `css/style.css:132`: trocar
   `.pilula:hover { background: var(--fog); color: var(--onyx); }`
   por
   ```css
   @media (hover: hover) and (pointer: fine) {
     .pilula:hover { background: var(--fog); color: var(--onyx); }
   }
   ```
2. `css/style.css:409`: trocar
   `.projeto__midia:hover img { transform: scale(1.03); }`
   por
   ```css
   @media (hover: hover) and (pointer: fine) {
     .projeto__midia:hover img { transform: scale(1.03); }
   }
   ```
3. `css/style.css:465`: trocar
   `.faixa:hover .faixa__trilho { animation-play-state: paused; }`
   por
   ```css
   @media (hover: hover) and (pointer: fine) {
     .faixa:hover .faixa__trilho { animation-play-state: paused; }
   }
   ```
4. `css/style.css:524`: trocar
   `.skill:hover .skill__icone { transform: translateY(-6px) rotate(-4deg); }`
   por
   ```css
   @media (hover: hover) and (pointer: fine) {
     .skill:hover .skill__icone { transform: translateY(-6px) rotate(-4deg); }
   }
   ```
5. Não mexer no bloco de reduzir movimento. As linhas `.projeto__midia:hover img { transform: none; }` e `.skill:hover .skill__icone { transform: none; }` que o plano 001 colocou lá continuam funcionando, porque esse bloco vem depois no arquivo.

## Limites

- NÃO mudar valores (escala, rotação, cores, durações). Só envolver as regras.
- NÃO envolver os hovers de links de texto, tags e "Ver todos".
- NÃO mexer em HTML nem em JS.
- Se as linhas citadas não baterem com o código, procure a regra pelo seletor exato. Se não encontrar, PARE e reporte.

## Verificação

- **Mecânica**: servidor local, console sem erros.
- **Feel check**:
  - Desktop com mouse: os quatro hovers funcionam como antes (zoom no projeto, ícone de skill levantando, faixa pausando, pílula ficando branca).
  - DevTools no modo dispositivo (390px, toque ligado): tocar num card de skill não deixa o ícone torto; tocar no "Menu" e fechar o menu não deixa o botão branco; tocar na faixa de stack não a faz parar.
- **Feito quando**: em toque nenhum desses quatro efeitos fica preso, e no mouse tudo continua igual.
