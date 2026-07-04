/* =========================================================
   Caio Teodoro — dashboard de exemplo (dados fictícios)
   Tracking de notas fiscais e SLA. Usa Chart.js (CDN).
   Nenhum dado real de cliente é utilizado.
   ========================================================= */
(function () {
  if (typeof Chart === 'undefined') return;
  if (!document.getElementById('dash')) return;

  // Paleta alinhada às variáveis do styles.css
  const C = {
    ink2: '#9BA4B5', line: '#1E2330',
    electric: '#2D7FFF', electric2: '#5B9AFF', electricDim: 'rgba(45,127,255,0.15)',
    ok: '#3DDC97', risco: '#F5A623', atraso: '#E24B4A'
  };

  Chart.defaults.color = C.ink2;
  Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;

  const regionais = ['Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste'];

  // PRNG determinístico para os números ficarem estáveis a cada carregamento
  function rng(seed) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function gerarDados() {
    const dias = 14;
    const hoje = new Date();
    const labels = [];
    for (let i = dias - 1; i >= 0; i--) {
      const d = new Date(hoje);
      d.setDate(hoje.getDate() - i);
      labels.push(d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
    }
    const base = { Sudeste: 320, Sul: 180, Nordeste: 140, 'Centro-Oeste': 90 };
    const slaBase = { Sudeste: 96, Sul: 94, Nordeste: 89, 'Centro-Oeste': 92 };
    const dados = {};
    regionais.forEach((r, idx) => {
      const rand = rng(1000 + idx * 97);
      dados[r] = {
        emitidas: labels.map(() => Math.round(base[r] * (0.8 + rand() * 0.5))),
        sla: labels.map(() => Math.min(99, Math.max(78, Math.round(slaBase[r] + (rand() * 8 - 4)))))
      };
    });
    return { labels, dados };
  }

  const D = gerarDados();

  function agrega(sel) {
    const rs = sel === 'Todas' ? regionais : [sel];
    const emitidas = D.labels.map((_, i) => rs.reduce((s, r) => s + D.dados[r].emitidas[i], 0));
    const sla = D.labels.map((_, i) => {
      let vol = 0, acc = 0;
      rs.forEach((r) => { const v = D.dados[r].emitidas[i]; vol += v; acc += v * D.dados[r].sla[i]; });
      return vol ? +(acc / vol).toFixed(1) : 0;
    });
    return { emitidas, sla };
  }

  function slaPorRegional() {
    return regionais.map((r) => {
      const arr = D.dados[r].sla;
      return +(arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(1);
    });
  }

  function kpis(sel) {
    const a = agrega(sel);
    const totalNF = a.emitidas.reduce((s, v) => s + v, 0);
    const slaMedio = +(a.sla.reduce((s, v) => s + v, 0) / a.sla.length).toFixed(1);
    const atrasadas = Math.round((totalNF * (100 - slaMedio)) / 100);
    const tmedio = +(24 + (100 - slaMedio) * 1.6).toFixed(1);
    return { totalNF, slaMedio, atrasadas, tmedio };
  }

  function statusSplit(sel) {
    const { totalNF, slaMedio } = kpis(sel);
    const atrasada = Math.round((totalNF * (100 - slaMedio)) / 100);
    const emRisco = Math.round(totalNF * 0.07);
    const noPrazo = totalNF - atrasada - emRisco;
    return [noPrazo, emRisco, atrasada];
  }

  const eixoGrid = { color: C.line, drawBorder: false };
  const eixoTick = { color: C.ink2 };

  // ---- Gráfico 1: volume e SLA por dia ----
  const ctxLinha = document.getElementById('dashLinha').getContext('2d');
  const grad = ctxLinha.createLinearGradient(0, 0, 0, 260);
  grad.addColorStop(0, 'rgba(45,127,255,0.35)');
  grad.addColorStop(1, 'rgba(45,127,255,0)');
  const a0 = agrega('Todas');
  const chartLinha = new Chart(ctxLinha, {
    data: {
      labels: D.labels,
      datasets: [
        { type: 'line', label: 'NF emitidas', data: a0.emitidas, borderColor: C.electric, backgroundColor: grad, fill: true, tension: 0.35, pointRadius: 0, borderWidth: 2, yAxisID: 'y' },
        { type: 'line', label: 'SLA (%)', data: a0.sla, borderColor: C.ok, backgroundColor: 'transparent', fill: false, tension: 0.35, pointRadius: 0, borderWidth: 2, borderDash: [4, 4], yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
      scales: {
        x: { grid: { display: false }, ticks: eixoTick },
        y: { position: 'left', grid: eixoGrid, ticks: eixoTick, title: { display: true, text: 'NF/dia', color: C.ink2 } },
        y1: { position: 'right', min: 70, max: 100, grid: { display: false }, ticks: { color: C.ok }, title: { display: true, text: 'SLA %', color: C.ok } }
      }
    }
  });

  // ---- Gráfico 2: SLA por regional ----
  const chartBarra = new Chart(document.getElementById('dashBarra').getContext('2d'), {
    type: 'bar',
    data: { labels: regionais, datasets: [{ label: 'SLA médio (%)', data: slaPorRegional(), backgroundColor: regionais.map(() => C.electricDim), borderColor: regionais.map(() => C.electric), borderWidth: 1, borderRadius: 4 }] },
    options: {
      responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false }, ticks: eixoTick }, y: { min: 70, max: 100, grid: eixoGrid, ticks: eixoTick } }
    }
  });

  // ---- Gráfico 3: distribuição por status ----
  const chartRosca = new Chart(document.getElementById('dashRosca').getContext('2d'), {
    type: 'doughnut',
    data: { labels: ['No prazo', 'Em risco', 'Atrasada'], datasets: [{ data: statusSplit('Todas'), backgroundColor: [C.ok, C.risco, C.atraso], borderColor: '#10141F', borderWidth: 3 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '62%', plugins: { legend: { position: 'bottom' } } }
  });

  // ---- Atualização por filtro ----
  function setText(id, v) { const e = document.getElementById(id); if (e) e.textContent = v; }
  function atualizar(sel) {
    const k = kpis(sel);
    setText('kpiTotal', k.totalNF.toLocaleString('pt-BR'));
    setText('kpiSla', k.slaMedio + '%');
    setText('kpiAtraso', k.atrasadas.toLocaleString('pt-BR'));
    setText('kpiTempo', k.tmedio + 'h');

    const a = agrega(sel);
    chartLinha.data.datasets[0].data = a.emitidas;
    chartLinha.data.datasets[1].data = a.sla;
    chartLinha.update();

    chartRosca.data.datasets[0].data = statusSplit(sel);
    chartRosca.update();

    chartBarra.data.datasets[0].backgroundColor = regionais.map((r) => (sel === 'Todas' || r === sel ? C.electricDim : 'rgba(45,127,255,0.04)'));
    chartBarra.data.datasets[0].borderColor = regionais.map((r) => (sel === 'Todas' || r === sel ? C.electric : C.line));
    chartBarra.update();
  }

  const filtro = document.getElementById('dashRegional');
  if (filtro) filtro.addEventListener('change', (e) => atualizar(e.target.value));
  atualizar('Todas');
})();
