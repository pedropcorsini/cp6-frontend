# Planos de animação

Gerados pela skill `improve-animations` em 2026-10-19, a partir de uma auditoria de todo o movimento da página (`css/style.css` e `js/main.js`). Cada plano é autocontido: qualquer agente consegue executá-lo sem o contexto da conversa.

Ficaram fora da auditoria, por serem decisões da ficha de estilo (`registros/referencias/dylanbrouwer-style-reference.md`): as curvas `--entrar` e `--sair`, as durações de 0.3s no hover e 0.75s ao surgir no scroll, e a ausência de efeito de mola.

| # | Plano | Severidade | Categoria | Status |
|---|---|---|---|---|
| 001 | [Reduzir movimento sem apagar todo o feedback](001-reduced-motion-sem-zerar-tudo.md) | MEDIUM | Acessibilidade | TODO |
| 002 | [Feedback ao pressionar pílulas e tags clicáveis](002-feedback-ao-pressionar.md) | MEDIUM | Física e origem | TODO |
| 003 | ["Ver todos": surgir já inclinado e manter a transição do hover](003-ver-todos-revelar-e-hover.md) | LOW | Coesão | TODO |
| 004 | [Menu mobile abre como cortina, a partir da nav](004-menu-mobile-com-transicao.md) | MEDIUM | Oportunidade | TODO |
| 005 | [Efeitos de hover só em dispositivos com mouse](005-hover-so-com-mouse.md) | LOW | Acessibilidade | TODO |
| 006 | [Cards de Skills surgem em sequência, não em bloco](006-escalonar-cards-de-skills.md) | LOW | Coesão | TODO |
| 007 | [Troca de tela do monitor sem escurecer no meio](007-troca-do-monitor-sem-escurecer.md) | LOW | Coesão | TODO |
| 008 | [Curva de vai e volta no pulso do relógio](008-curva-do-pulso-do-relogio.md) | LOW | Curva e duração | TODO |

## Ordem recomendada

1. **001 primeiro.** Ele reescreve o bloco `@media (prefers-reduced-motion: reduce)`, e os planos 002, 003 e 004 adicionam linhas a esse bloco.
2. **002, 003 e 004** em qualquer ordem, depois do 001.
3. **005** depois do 001. Os overrides de reduzir movimento continuam funcionando porque ficam no fim do arquivo.
4. **006, 007 e 008** são independentes e podem ir a qualquer momento.

## Dependências

- 002 → depende de 001
- 003 → depende de 001
- 004 → depende de 001
- 005 → depende de 001
- 006, 007, 008 → nenhuma

## Fora destes planos (de propósito)

- **Cor da nav sobre seções claras** e **título escondido atrás da nav ao clicar num link**: são os problemas 1 e 2 de `registros/correcoes.md` e serão corrigidos por prompts do próprio autor, para entrar no registro do Checkpoint 6.
- **Texto do botão "Menu" virar "Fechar"**: problema 4 de `registros/correcoes.md`, pelo mesmo motivo.
