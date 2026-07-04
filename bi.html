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
