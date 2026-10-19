# cp6-frontend

Checkpoint 6 de Front-End (vibecoding): meu portfólio pessoal, construído com IA generativa, com skills, projetos de 2026, experiência e eventos. Como pede o enunciado, o processo (referências, identidade visual, prompts e correções) está documentado junto com o código.

## A página

**DO BACK / AO FRONT.** O portfólio trata a página como um monumento tipográfico e vai do escuro (o back-end, que ninguém vê) ao claro (a interface que o cliente usa). O estilo foi inspirado no portfólio de Dylan Brouwer, tirado do [styles.refero.design](https://styles.refero.design).

- **Hero:** título gigante em degradê e um monitor em CSS 3D que alterna prints dos meus sites no ar, com relógio ao vivo de São Paulo.
- **Sobre**, **Projetos de 2026** (clientes, faculdade e estudos, com link para o site e o repositório), **faixa de stack**, **Skills**, **Trajetória** e **rodapé** com contato.
- HTML, CSS e JavaScript puros, sem build. Fontes: Anton, Inter e IBM Plex Mono (Google Fonts).

Para ver localmente, sirva a pasta com qualquer servidor estático, por exemplo `python3 -m http.server`, e abra `http://localhost:8000`.

## Estrutura

- `index.html`, `css/style.css`, `js/main.js`: a página.
- `img/`: prints dos projetos (tirados dos sites no ar), foto e favicon.
- `registros/`: o processo da atividade.
  - `prompts.md`: log de cada rodada da conversa com a IA, com os prompts literais.
  - `correcoes.md`: uma ficha por rodada de correção (problema, prompt, resultado e aprendizado).
  - `idv.md`: paleta, tipografia, tom, estrutura das seções e onde a página diverge da ficha de estilo.
  - `referencias.md` e `referencias/`: ficha de estilo, vídeo e quadros do site de referência.
  - `prints/`: os prints usados nos prompts de correção.
- `plans/`: planos de melhoria das animações, gerados por uma auditoria de movimento (ainda não aplicados).

## Histórico

Os commits seguem o processo: a primeira versão da página e depois um commit `fix` para cada ficha de correção em `registros/correcoes.md`.
