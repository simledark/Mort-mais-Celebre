'use strict';

/* ══════════════════════════════════════════════════════
   COMPTEURS VITAUX — Mort & Célèbre
   Basé sur les statistiques officielles OMS / INSEE / UICN
   ══════════════════════════════════════════════════════ */

/* ── DONNÉES STATISTIQUES ───────────────────────────── */
const STATS = {
  world:   { perYear: 63_600_000,  perSec: 63_600_000 / 31_536_000 },
  species: { perYear: 1_000,       perSec: 1_000 / 31_536_000 },
  france:  { perYear: 680_000,     perSec: 680_000 / 31_536_000 },
};

// Données régionales INSEE (décès/an estimés)
const REGIONS = {
  'ile-de-france':          { label: 'Île-de-France',               perYear: 86_000  },
  'auvergne-rhone-alpes':   { label: 'Auvergne-Rhône-Alpes',        perYear: 65_000  },
  'nouvelle-aquitaine':     { label: 'Nouvelle-Aquitaine',           perYear: 62_000  },
  'occitanie':              { label: 'Occitanie',                    perYear: 58_000  },
  'hauts-de-france':        { label: 'Hauts-de-France',             perYear: 62_000  },
  'grand-est':              { label: 'Grand Est',                    perYear: 58_000  },
  'paca':                   { label: 'Provence-Alpes-Côte d\'Azur', perYear: 56_000  },
  'pays-de-la-loire':       { label: 'Pays de la Loire',            perYear: 37_000  },
  'normandie':              { label: 'Normandie',                    perYear: 36_000  },
  'bretagne':               { label: 'Bretagne',                     perYear: 34_000  },
  'bourgogne-franche-comte':{ label: 'Bourgogne-Franche-Comté',     perYear: 31_000  },
  'centre-val-de-loire':    { label: 'Centre-Val de Loire',         perYear: 28_000  },
  'corse':                  { label: 'Corse',                        perYear: 4_500   },
  // Villes (mortalité estimée)
  'paris':       { label: 'Paris',       perYear: 18_000 },
  'marseille':   { label: 'Marseille',   perYear: 9_200  },
  'lyon':        { label: 'Lyon',        perYear: 5_800  },
  'toulouse':    { label: 'Toulouse',    perYear: 5_200  },
  'nice':        { label: 'Nice',        perYear: 5_500  },
  'nantes':      { label: 'Nantes',      perYear: 4_100  },
  'bordeaux':    { label: 'Bordeaux',    perYear: 3_900  },
  'lille':       { label: 'Lille',       perYear: 3_600  },
  'strasbourg':  { label: 'Strasbourg',  perYear: 3_200  },
  'rennes':      { label: 'Rennes',      perYear: 2_900  },
};

/* ── CALCUL : secondes écoulées depuis le 1er jan ───── */
function secondsSinceJan1() {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  return (now - jan1) / 1000;
}

function valueAtNow(perSec) {
  return Math.floor(secondsSinceJan1() * perSec);
}

/* ── FORMAT NOMBRE ───────────────────────────────────── */
function fmt(n) {
  return Math.floor(n).toLocaleString('fr-FR');
}

/* ── ANIMATION COMPTEUR ──────────────────────────────── */
function animateCounter(el, targetVal, duration = 1200) {
  const start = performance.now();
  const from  = parseInt(el.textContent.replace(/\s/g, '')) || 0;
  const diff  = targetVal - from;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = fmt(from + diff * ease);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = fmt(targetVal);
  }
  requestAnimationFrame(step);
}

/* ── BARRE DE PROGRESSION (% de l'année) ────────────── */
function yearProgress() {
  const now  = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const jan1next = new Date(now.getFullYear() + 1, 0, 1);
  return ((now - jan1) / (jan1next - jan1)) * 100;
}

/* ── INIT ────────────────────────────────────────────── */
let localPerSec = 0;
let localKey    = '';
let initialized = false;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('footer-year').textContent = new Date().getFullYear();
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const pct = yearProgress();

  // Barre de progression commune
  ['world','species','france'].forEach(k => {
    const bar = document.getElementById('b-' + k);
    if (bar) setTimeout(() => { bar.style.width = pct + '%'; }, 400);
  });

  // Valeurs initiales avec animation
  const secs = secondsSinceJan1();

  animateCounter(document.getElementById('c-world'),   Math.floor(secs * STATS.world.perSec), 1500);
  animateCounter(document.getElementById('c-species'), Math.floor(secs * STATS.species.perSec), 1500);
  animateCounter(document.getElementById('c-france'),  Math.floor(secs * STATS.france.perSec), 1500);

  initialized = true;
  tick();
});

/* ── TICK : mise à jour chaque seconde ───────────────── */
function tick() {
  const secs = secondsSinceJan1();

  document.getElementById('c-world').textContent   = fmt(secs * STATS.world.perSec);
  document.getElementById('c-species').textContent = fmt(secs * STATS.species.perSec);
  document.getElementById('c-france').textContent  = fmt(secs * STATS.france.perSec);

  if (localPerSec > 0) {
    document.getElementById('c-local').textContent = fmt(secs * localPerSec);
  }

  // Taux live
  document.getElementById('r-world').textContent   = `≈ ${(STATS.world.perSec * 60).toFixed(1)} morts / minute`;
  document.getElementById('r-france').textContent  = `≈ 1 mort toutes les ${Math.round(1 / STATS.france.perSec)}s`;
  document.getElementById('r-species').textContent = `≈ ${(STATS.species.perSec * 86400).toFixed(1)} espèces / jour`;

  setTimeout(tick, 1000);
}

/* ── SÉLECTION LOCALE ────────────────────────────────── */
function updateLocal() {
  const sel = document.getElementById('local-select').value;
  const cEl = document.getElementById('c-local');
  const rEl = document.getElementById('r-local');
  const bEl = document.getElementById('b-local');

  if (!sel || !REGIONS[sel]) {
    cEl.textContent = '–';
    rEl.textContent = 'Sélectionnez une zone';
    localPerSec = 0;
    return;
  }

  const region = REGIONS[sel];
  localPerSec  = region.perYear / 31_536_000;
  localKey     = sel;

  const secs = secondsSinceJan1();
  animateCounter(cEl, Math.floor(secs * localPerSec), 1000);
  rEl.textContent = `≈ 1 mort toutes les ${Math.round(1 / localPerSec)}s — ${region.label}`;
  setTimeout(() => { bEl.style.width = yearProgress() + '%'; }, 400);
}
