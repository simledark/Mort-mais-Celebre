/* ============================================================
   MORT & CÉLÈBRE — Actualités
   Lit le fichier articles.json généré automatiquement
   toutes les 6h par GitHub Actions (gratuit, sans API)
   ============================================================ */

'use strict';

const PER_PAGE = 9;

let allArticles      = [];
let filteredArticles = [];
let currentTab       = 'all';
let visibleCount     = PER_PAGE;

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('footer-year').textContent = new Date().getFullYear();
  await loadArticles();
});

/* ── CHARGEMENT DU JSON STATIQUE ─────────────────────────── */
async function loadArticles() {
  showLoading();
  try {
    // Cache-busting : forcer le rechargement si le fichier a changé
    const res = await fetch('articles.json?v=' + Date.now(), {
      cache: 'no-cache'
    });

    if (!res.ok) throw new Error('HTTP ' + res.status);

    const data = await res.json();
    allArticles = data.articles || [];

    if (allArticles.length === 0) {
      showEmpty();
      return;
    }

    // Afficher la date de dernière mise à jour
    if (data.generated_at) {
      const updateEl = document.getElementById('actu-update-time');
      if (updateEl) {
        const d = new Date(data.generated_at);
        updateEl.textContent = 'Mis à jour le ' + d.toLocaleDateString('fr-FR', {
          day: 'numeric', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });
      }
    }

    applyTab('all');

  } catch (e) {
    console.error('Erreur chargement articles:', e);
    showError();
  }
}

/* ── ONGLETS ─────────────────────────────────────────────── */
function setTab(tab) {
  currentTab   = tab;
  visibleCount = PER_PAGE;
  document.querySelectorAll('.actu-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  applyTab(tab);
}

function applyTab(tab) {
  filteredArticles = tab === 'all'
    ? allArticles
    : allArticles.filter(a => a.type === tab);
  renderUne();
  renderGrid();
}

/* ── RENDU À LA UNE ──────────────────────────────────────── */
function renderUne() {
  const uneEl = document.getElementById('actu-une');
  const art   = filteredArticles[0];

  if (!art) {
    uneEl.innerHTML = '<div class="actu-loading"><p>Aucun article disponible.</p></div>';
    return;
  }

  const imgHtml = art.image
    ? `<img class="actu-une-img" src="${esc(art.image)}" alt="${esc(art.title)}"
         onerror="this.parentNode.innerHTML='<div class=\\'actu-une-img-placeholder\\'>✦</div>'">`
    : `<div class="actu-une-img-placeholder">✦</div>`;

  const badgeClass = art.type === 'science' ? 'badge-science' : 'badge-presse';
  const icon       = art.type === 'science' ? '🔬' : '📰';

  uneEl.innerHTML = `
    <a class="actu-une-card" href="${esc(art.url)}" target="_blank" rel="noopener">
      <div class="actu-une-body">
        <div>
          <div class="actu-une-badge ${badgeClass}">${icon} ${esc(art.source)}</div>
          <div class="actu-une-title">${esc(art.title)}</div>
          <div class="actu-une-desc">${esc(art.desc)}</div>
        </div>
        <div class="actu-une-meta">
          <span class="actu-une-source">${esc(art.source)}</span>
          <span class="actu-une-date">${esc(art.date_formatted || '')}</span>
          <span class="actu-une-lire">Lire l'article →</span>
        </div>
      </div>
      <div class="actu-une-img-wrap">${imgHtml}</div>
    </a>`;
}

/* ── RENDU GRILLE ────────────────────────────────────────── */
function renderGrid() {
  const gridEl  = document.getElementById('actu-grid');
  const emptyEl = document.getElementById('actu-empty');
  const moreBtn = document.getElementById('actu-voir-plus');
  const countEl = document.getElementById('actu-count');

  const gridArticles = filteredArticles.slice(1);
  const total        = gridArticles.length;

  countEl.textContent = total > 0
    ? total + ' article' + (total > 1 ? 's' : '')
    : '';

  if (total === 0) {
    gridEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    moreBtn.classList.add('hidden');
    return;
  }
  emptyEl.classList.add('hidden');
  gridEl.innerHTML = '';

  gridArticles.slice(0, visibleCount).forEach((art, i) => {
    const card = document.createElement('a');
    card.className = 'actu-card';
    card.href      = art.url;
    card.target    = '_blank';
    card.rel       = 'noopener';
    card.style.animationDelay = (i * 0.05) + 's';

    const badgeClass = art.type === 'science' ? 'badge-science' : 'badge-presse';
    const icon       = art.type === 'science' ? '🔬' : '📰';

    const imgHtml = art.image
      ? `<img class="actu-card-img" src="${esc(art.image)}" alt="${esc(art.title)}"
           onerror="this.parentNode.innerHTML='<div class=\\'actu-card-img-placeholder\\'>✦</div>'">`
      : `<div class="actu-card-img-placeholder">✦</div>`;

    card.innerHTML = `
      <div class="actu-card-img-wrap">${imgHtml}</div>
      <div class="actu-card-body">
        <div class="actu-card-badge ${badgeClass}">${icon} ${esc(art.source)}</div>
        <div class="actu-card-title">${esc(art.title)}</div>
        <div class="actu-card-desc">${esc(art.desc)}</div>
        <div class="actu-card-footer">
          <span class="actu-card-source">${esc(art.source)}</span>
          <span class="actu-card-date">${esc(art.date_formatted || '')}</span>
        </div>
      </div>`;

    gridEl.appendChild(card);
  });

  if (visibleCount < total) {
    moreBtn.classList.remove('hidden');
    moreBtn.textContent = 'Voir '
      + Math.min(PER_PAGE, total - visibleCount)
      + ' articles de plus';
  } else {
    moreBtn.classList.add('hidden');
  }
}

function loadMore() {
  visibleCount += PER_PAGE;
  renderGrid();
}

/* ── UI HELPERS ──────────────────────────────────────────── */
function showLoading() {
  document.getElementById('actu-une').innerHTML = `
    <div class="actu-loading">
      <div class="coffin-spinner"></div>
      <p>Chargement des actualités…</p>
    </div>`;
}

function showEmpty() {
  document.getElementById('actu-une').innerHTML =
    `<div class="actu-loading">
      <p>Les articles seront disponibles lors de la prochaine mise à jour automatique.</p>
      <p style="font-size:0.85rem;margin-top:0.5rem;opacity:0.7">
        Mise à jour toutes les 6h via GitHub Actions.
      </p>
    </div>`;
}

function showError() {
  document.getElementById('actu-une').innerHTML =
    `<div class="actu-loading">
      <p>Impossible de charger les articles. Réessayez dans quelques instants.</p>
    </div>`;
}

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}
