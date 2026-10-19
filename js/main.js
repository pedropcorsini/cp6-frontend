// Portfólio Pedro Corsini · Checkpoint 6

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Relógio ao vivo no hero (horário de São Paulo)
const relogio = document.getElementById('relogio');
const formatoHora = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
});

function atualizarRelogio() {
  const agora = new Date();
  relogio.textContent = formatoHora.format(agora);
  relogio.dateTime = agora.toISOString();
}
atualizarRelogio();
setInterval(atualizarRelogio, 15000);

// Monitor: troca o print do projeto a cada 3,2 s, só enquanto o hero está na tela
const telas = [...document.querySelectorAll('#monitor-tela img')];
const nomeTela = document.getElementById('monitor-nome');
let telaAtual = 0;
let timerMonitor = null;

function proximaTela() {
  telas[telaAtual].classList.remove('ativa');
  telaAtual = (telaAtual + 1) % telas.length;
  telas[telaAtual].classList.add('ativa');
  nomeTela.textContent = telas[telaAtual].dataset.nome;
}

if (!reduzMovimento && telas.length > 1) {
  new IntersectionObserver(([entrada]) => {
    if (entrada.isIntersecting && !timerMonitor) {
      timerMonitor = setInterval(proximaTela, 3200);
    } else if (!entrada.isIntersecting && timerMonitor) {
      clearInterval(timerMonitor);
      timerMonitor = null;
    }
  }).observe(document.getElementById('monitor-tela'));
}

// Elementos aparecem conforme o scroll
const revelaveis = document.querySelectorAll('[data-revelar]');

if (reduzMovimento || !('IntersectionObserver' in window)) {
  revelaveis.forEach((el) => el.classList.add('visivel'));
} else {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observador.unobserve(entrada.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  revelaveis.forEach((el) => observador.observe(el));
}

// Menu mobile
const botaoMenu = document.querySelector('.nav__menu');
const textoMenu = botaoMenu.querySelector('.nav__menu-texto');
const menuMobile = document.getElementById('menu-mobile');

function definirMenu(aberto) {
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  textoMenu.textContent = aberto ? 'Fechar' : 'Menu';
  menuMobile.hidden = !aberto;
  document.body.style.overflow = aberto ? 'hidden' : '';
}

function fecharMenu() {
  definirMenu(false);
}

botaoMenu.addEventListener('click', () => {
  definirMenu(botaoMenu.getAttribute('aria-expanded') !== 'true');
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

// Crachá do rodapé inclina na direção do mouse
const cracha = document.getElementById('cracha');
const rodape = document.querySelector('.rodape');

if (!reduzMovimento && window.matchMedia('(hover: hover)').matches) {
  rodape.addEventListener('mousemove', (evento) => {
    const caixa = cracha.getBoundingClientRect();
    const centro = caixa.left + caixa.width / 2;
    const distancia = (evento.clientX - centro) / window.innerWidth;
    cracha.style.transform = `rotate(${distancia * -18}deg)`;
  });
  rodape.addEventListener('mouseleave', () => {
    cracha.style.transform = '';
  });
}

// Nav troca para a versão clara quando passa sobre uma seção de fundo claro
const nav = document.querySelector('.nav');
const observadorNav = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      nav.classList.toggle('nav--clara', entrada.target.dataset.nav === 'claro');
    }
  });
}, { rootMargin: '0px 0px -94% 0px' }); // faixa de observação: os ~6% do topo, onde a nav fica

document.querySelectorAll('[data-nav]').forEach((secao) => observadorNav.observe(secao));
