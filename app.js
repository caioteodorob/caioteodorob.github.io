/* =========================================================
   Caio Teodoro — script compartilhado
   Menu mobile + envio de formulários (Supabase) com honeypot
   ========================================================= */

const SUPABASE_URL = 'https://loxntuqsxaqgpchkeeid.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxveG50dXFzeGFxZ3BjaGtlZWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NDgyNzcsImV4cCI6MjA5ODQyNDI3N30.rALGSYv6US59_H2OLfeDSr1AaRvznVjb0YDfvGZeFj4';

/* ---- Menu mobile ---- */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Fecha o menu ao clicar em um link
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
})();

/* ---- Formulários Supabase ---- */
document.querySelectorAll('form[data-supabase]').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: se o campo oculto veio preenchido, é bot. Aborta em silêncio.
    const trap = form.querySelector('.hp-field input');
    if (trap && trap.value.trim() !== '') return;

    const btn = form.querySelector('button[type="submit"]');
    const confirmBox = form.querySelector('.confirm-msg');
    const original = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Monta o payload a partir dos campos nomeados (ignora o honeypot)
    const payload = { tipo: form.dataset.tipo };
    new FormData(form).forEach((value, key) => {
      if (key !== 'website') payload[key] = value;
    });

    try {
      const res = await fetch(SUPABASE_URL + '/rest/v1/solicitacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_KEY,
          Authorization: 'Bearer ' + SUPABASE_KEY,
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok || res.status === 201) {
        if (confirmBox) confirmBox.classList.add('show');
        form.reset();
        btn.textContent = 'Enviado';
      } else {
        console.error('Erro Supabase:', res.status, await res.text());
        btn.textContent = 'Erro ao enviar, tente novamente';
        btn.disabled = false;
        setTimeout(() => (btn.textContent = original), 3000);
      }
    } catch (err) {
      console.error('Erro de rede:', err);
      btn.textContent = 'Erro ao enviar, tente novamente';
      btn.disabled = false;
      setTimeout(() => (btn.textContent = original), 3000);
    }
  });
});

/* ---- Busca simples do site (client-side) ---- */
(function () {
  const input = document.getElementById('siteSearch');
  const box = document.getElementById('siteSearchResults');
  if (!input || !box) return;

  // Indice das seucoes e paginas. Links relativos a raiz, funcionam de qualquer pagina.
  const INDEX = [
    { t: 'Início / Portfólio', k: 'home inicio portfolio caio teodoro analista', u: 'index.html' },
    { t: 'Sobre mim / Trajetória', k: 'sobre mim trajetoria historia siemens unicamp campinas experiencia campo manutencao', u: 'index.html#sobre' },
    { t: 'Contato', k: 'contato falar email linkedin diagnostico gratuito mensagem', u: 'index.html#contato' },
    { t: 'Serviços de BI', k: 'bi business intelligence power bi dashboard servico dados', u: 'bi.html' },
    { t: 'O que eu faço em BI', k: 'dax modelagem semantico governanca rls tracking frentes relatorio', u: 'bi.html#servicos' },
    { t: 'Estudo de caso (agro)', k: 'estudo de caso agro rls projeto exemplo prova nota fiscal transporte', u: 'bi.html#estudo-de-caso' },
    { t: 'Demonstração / Dashboard', k: 'demonstracao dashboard grafico painel sla nf chart interativo regional', u: 'bi.html#dashboard' },
    { t: 'Investimento / Preço', k: 'investimento preco valor diagnostico pacote orcamento quanto custa contratar', u: 'bi.html#investimento' },
    { t: 'Solicitar proposta de BI', k: 'solicitar proposta contato bi formulario projeto', u: 'bi.html#contato' },
    { t: 'Serviços de Currículo', k: 'curriculo ats recolocacao emprego triagem vaga promocao', u: 'curriculos.html' },
    { t: 'Como funciona o currículo', k: 'processo curriculo etapas levantamento estruturacao revisao', u: 'curriculos.html#processo' }
  ];

  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let results = [];
  function render() {
    const q = norm(input.value.trim());
    box.innerHTML = '';
    if (!q) { box.classList.remove('is-open'); return; }
    results = INDEX.filter((e) => norm(e.t + ' ' + e.k).includes(q)).slice(0, 6);
    if (!results.length) {
      box.innerHTML = '<li class="nsr-empty">Nada encontrado</li>';
      box.classList.add('is-open');
      return;
    }
    results.forEach((e) => {
      const li = document.createElement('li');
      li.textContent = e.t;
      li.addEventListener('mousedown', (ev) => { ev.preventDefault(); window.location.href = e.u; });
      box.appendChild(li);
    });
    box.classList.add('is-open');
  }

  input.addEventListener('input', render);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && results.length) { window.location.href = results[0].u; }
    if (e.key === 'Escape') { input.value = ''; box.classList.remove('is-open'); input.blur(); }
  });
  document.addEventListener('click', (e) => {
    if (!box.contains(e.target) && e.target !== input) box.classList.remove('is-open');
  });
})();
