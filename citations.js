'use strict';

/* ══════════════════════════════════════════════════════
   BASE DE CITATIONS — Mort & Célèbre
   ══════════════════════════════════════════════════════ */
const CITATIONS = [
  /* ── VIE & MORT ──────────────────────────────────── */
  { texte: "Mourir est peu de chose. Il faut voir disparaître avec soi tout un monde.", auteur: "Victor Hugo", theme: "vie" },
  { texte: "On ne meurt qu'une fois, et c'est pour si longtemps.", auteur: "Molière", theme: "vie" },
  { texte: "La mort n'est rien. Mais vivre vaincu et sans gloire, c'est mourir tous les jours.", auteur: "Napoléon Bonaparte", theme: "vie" },
  { texte: "La vie est une maladie mortelle sexuellement transmissible.", auteur: "R.D. Laing", theme: "vie" },
  { texte: "Naître, c'est commencer à mourir.", auteur: "Théophile Gautier", theme: "vie" },
  { texte: "La mort est un maître sévère, mais elle enseigne ce que la vie ne peut pas apprendre.", auteur: "Stefan Zweig", theme: "vie" },
  { texte: "Vivre, c'est mourir un peu à chaque instant.", auteur: "Maurice Maeterlinck", theme: "vie" },
  { texte: "La mort est la seule chose que nous n'ayons pas encore réussi à démocratiser.", auteur: "André Malraux", theme: "vie" },
  { texte: "Il faut vivre comme si on devait mourir demain, et apprendre comme si on devait vivre toujours.", auteur: "Mahatma Gandhi", theme: "vie" },
  { texte: "La mort sourit à tout le monde. Tout ce qu'un homme peut faire, c'est lui sourire en retour.", auteur: "Marc Aurèle", theme: "vie" },
  { texte: "Nous naissons tous seuls et nous mourrons tous seuls.", auteur: "Orson Welles", theme: "vie" },
  { texte: "La mort est le plus beau cadeau de la vie — elle lui donne sa valeur.", auteur: "Jean Cocteau", theme: "vie" },
  { texte: "Ce n'est pas la mort que je crains, c'est de ne pas avoir vécu.", auteur: "Woody Allen", theme: "vie" },
  { texte: "La vie est brève, l'art est long, l'occasion fugace, l'expérience trompeuse.", auteur: "Hippocrate", theme: "vie" },
  { texte: "La mort d'un homme, c'est une tragédie. La mort d'un million d'hommes, c'est une statistique.", auteur: "Joseph Staline", theme: "vie" },
  { texte: "Tout ce qui vit mérite de périr.", auteur: "Goethe", theme: "vie" },
  { texte: "La mort est la seule certitude de la vie.", auteur: "Voltaire", theme: "vie" },
  { texte: "On ne peut pas vraiment vivre sans avoir pensé à la mort.", auteur: "Simone de Beauvoir", theme: "vie" },

  /* ── LE TEMPS ────────────────────────────────────── */
  { texte: "Le temps est un grand maître, dit-on ; le malheur est qu'il tue ses élèves.", auteur: "Hector Berlioz", theme: "temps" },
  { texte: "Le temps passe, les hommes meurent, les idées restent.", auteur: "Victor Hugo", theme: "temps" },
  { texte: "Nous sommes tous des voyageurs dans le temps, progressant à la vitesse de soixante minutes par heure.", auteur: "C.S. Lewis", theme: "temps" },
  { texte: "La mort n'est que le passage du temps à l'éternité.", auteur: "Blaise Pascal", theme: "temps" },
  { texte: "Le temps dévore tout, même la mort.", auteur: "Voltaire", theme: "temps" },
  { texte: "Chaque instant qui passe est une petite mort.", auteur: "Paul Valéry", theme: "temps" },
  { texte: "Le passé ne meurt jamais vraiment. Il ne passe même pas.", auteur: "William Faulkner", theme: "temps" },
  { texte: "Le temps est la seule richesse que nous ne pouvons pas récupérer.", auteur: "Jean-Paul Sartre", theme: "temps" },
  { texte: "Hier est mort, demain n'est pas encore né. Nous n'avons que aujourd'hui.", auteur: "Mère Teresa", theme: "temps" },
  { texte: "L'heure qui passe est une heure de moins à vivre.", auteur: "Gustave Flaubert", theme: "temps" },

  /* ── MÉMOIRE ─────────────────────────────────────── */
  { texte: "On meurt deux fois : la première quand on rend le dernier soupir, la seconde quand quelqu'un prononce votre nom pour la dernière fois.", auteur: "Ernest Hemingway", theme: "memoire" },
  { texte: "Les morts ne sont réellement morts que lorsqu'on ne parle plus d'eux.", auteur: "Amadou Hampâté Bâ", theme: "memoire" },
  { texte: "La mémoire est la présence du passé.", auteur: "Henri Bergson", theme: "memoire" },
  { texte: "On n'oublie pas les gens. On s'habitue seulement à leur absence.", auteur: "Alphonse Daudet", theme: "memoire" },
  { texte: "Les absents ont toujours tort — sauf les morts.", auteur: "Pierre Dac", theme: "memoire" },
  { texte: "Ce que nous avons aimé ne peut pas mourir.", auteur: "Antoine de Saint-Exupéry", theme: "memoire" },
  { texte: "Se souvenir des morts, c'est les faire revivre.", auteur: "Marcel Proust", theme: "memoire" },
  { texte: "Un homme n'est pas mort tant qu'il reste dans la mémoire de ceux qui l'ont aimé.", auteur: "Mary Shelley", theme: "memoire" },
  { texte: "Le deuil est le prix de l'amour.", auteur: "Queen Elizabeth II", theme: "memoire" },
  { texte: "Nos morts ne sont jamais morts pour nous, tant que nous vivons.", auteur: "George Eliot", theme: "memoire" },
  { texte: "Pleurer les morts est beau. Les oublier est humain.", auteur: "Émile Zola", theme: "memoire" },

  /* ── COURAGE ─────────────────────────────────────── */
  { texte: "Un homme courageux n'est pas celui qui ne ressent pas la peur, mais celui qui triomphe de cette peur.", auteur: "Nelson Mandela", theme: "courage" },
  { texte: "La mort n'est rien. La peur de la mort est tout.", auteur: "Épictète", theme: "courage" },
  { texte: "Celui qui apprend à mourir, désapprend à servir.", auteur: "Michel de Montaigne", theme: "courage" },
  { texte: "Philosopher, c'est apprendre à mourir.", auteur: "Michel de Montaigne", theme: "courage" },
  { texte: "La mort n'est terrible que pour celui qui n'a pas vécu.", auteur: "Léon Tolstoï", theme: "courage" },
  { texte: "Il vaut mieux mourir debout que vivre à genoux.", auteur: "Emiliano Zapata", theme: "courage" },
  { texte: "La bravoure, c'est de savoir avoir peur et d'y aller quand même.", auteur: "Charles de Gaulle", theme: "courage" },
  { texte: "Mourir pour la patrie est le sort le plus beau, le plus digne d'envie.", auteur: "Corneille", theme: "courage" },
  { texte: "La peur de la mort découle de la peur de la vie. L'homme qui vit pleinement est prêt à mourir à tout moment.", auteur: "Mark Twain", theme: "courage" },

  /* ── HUMOUR NOIR ─────────────────────────────────── */
  { texte: "La mort est le seul démocrate parfait. Elle traite chacun avec une égalité absolue.", auteur: "George Bernard Shaw", theme: "humour" },
  { texte: "Je ne veux pas atteindre l'immortalité à travers mon œuvre. Je veux l'atteindre en ne mourant pas.", auteur: "Woody Allen", theme: "humour" },
  { texte: "Je ne crains pas la mort ; j'ai juste préféré ne pas être là quand ça arrivera.", auteur: "Woody Allen", theme: "humour" },
  { texte: "Mourir pour des idées, c'est une idée fort répandue.", auteur: "Georges Brassens", theme: "humour" },
  { texte: "La mort, c'est comme le boulot : on n'a vraiment envie d'y aller, mais une fois qu'on y est…", auteur: "Pierre Desproges", theme: "humour" },
  { texte: "On a tous un jour de mort. Pour l'instant, c'est tous les jours.", auteur: "Pierre Dac", theme: "humour" },
  { texte: "La vie est trop courte pour être petite. Et trop longue pour être parfaite.", auteur: "Benjamin Disraeli", theme: "humour" },
  { texte: "Je prépare ma mort depuis cinquante ans. Elle sera impeccable.", auteur: "Sacha Guitry", theme: "humour" },
  { texte: "Si tu passes ta vie à craindre la mort, tu es déjà mort.", auteur: "Proverbe russe", theme: "humour" },
  { texte: "Je veux mourir jeune, mais le plus tard possible.", auteur: "Georges Feydeau", theme: "humour" },
  { texte: "L'éternité, c'est long, surtout vers la fin.", auteur: "Woody Allen", theme: "humour" },
  { texte: "La mort n'est pas triste. Ce qui est triste, c'est que les gens ne vivent pas du tout.", auteur: "Charles Bukowski", theme: "humour" },

  /* ── PHILOSOPHIE ─────────────────────────────────── */
  { texte: "La mort n'est rien pour nous, puisque quand nous sommes, la mort n'est pas, et quand la mort est, nous ne sommes plus.", auteur: "Épicure", theme: "philosophie" },
  { texte: "Apprenons à vivre et, pour ce faire, apprenons à mourir.", auteur: "Erasme", theme: "philosophie" },
  { texte: "Être ou ne pas être, telle est la question.", auteur: "William Shakespeare", theme: "philosophie" },
  { texte: "Tout ce que je sais, c'est que je ne sais rien — y compris ce qu'est la mort.", auteur: "Socrate", theme: "philosophie" },
  { texte: "La mort est une porte que la vie a ouverte.", auteur: "Victor Hugo", theme: "philosophie" },
  { texte: "Vivre c'est mourir lentement. Il n'y a qu'un sport : résister.", auteur: "Albert Camus", theme: "philosophie" },
  { texte: "Le suicide est la seule vraie question philosophique.", auteur: "Albert Camus", theme: "philosophie" },
  { texte: "Ce n'est pas que j'aie peur de mourir. Je veux juste ne pas être là quand ça arrivera.", auteur: "Woody Allen", theme: "philosophie" },
  { texte: "La mort est la solution à tous les problèmes. Pas d'homme, pas de problème.", auteur: "Joseph Staline", theme: "philosophie" },
  { texte: "Nous ne possédons rien avec certitude, si ce n'est le passé.", auteur: "Simone Weil", theme: "philosophie" },
  { texte: "L'être-vers-la-mort est ce qui donne son sens à l'existence.", auteur: "Martin Heidegger", theme: "philosophie" },
  { texte: "La mort est une punition pour certains, pour d'autres un cadeau, et pour beaucoup une faveur.", auteur: "Sénèque", theme: "philosophie" },
  { texte: "Apprivoise la mort et tu seras libre.", auteur: "Marc Aurèle", theme: "philosophie" },
  { texte: "Il faut imaginer Sisyphe heureux.", auteur: "Albert Camus", theme: "philosophie" },
  { texte: "La mort n'est pas le pire des maux.", auteur: "Sophocle", theme: "philosophie" },
  { texte: "Toute philosophie est une méditation sur la mort.", auteur: "Paul Ricœur", theme: "philosophie" },
  { texte: "La mort est une illusion, comme le temps. Elle n'existe que dans la perception.", auteur: "Albert Einstein", theme: "philosophie" },
  { texte: "La mort est simplement le côté de la vie que l'on ne voit pas.", auteur: "Rainer Maria Rilke", theme: "philosophie" },
];

/* ══════════════════════════════════════════════════════
   STATE
   ══════════════════════════════════════════════════════ */
let currentTheme  = 'all';
let currentSearch = '';
let heroIndex     = Math.floor(Math.random() * CITATIONS.length);

/* ══════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('footer-year').textContent = new Date().getFullYear();
  renderHero(heroIndex);
  renderGrid();
});

/* ══════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════ */
function renderHero(idx) {
  const c = CITATIONS[idx];
  const textEl   = document.getElementById('hero-text');
  const authorEl = document.getElementById('hero-author');
  textEl.style.opacity   = '0';
  authorEl.style.opacity = '0';
  setTimeout(() => {
    textEl.textContent   = `« ${c.texte} »`;
    authorEl.textContent = `— ${c.auteur}`;
    textEl.style.opacity   = '1';
    authorEl.style.opacity = '1';
  }, 250);
}

function shuffleHero() {
  let next;
  do { next = Math.floor(Math.random() * CITATIONS.length); } while (next === heroIndex);
  heroIndex = next;
  renderHero(heroIndex);
}

/* ══════════════════════════════════════════════════════
   GRID
   ══════════════════════════════════════════════════════ */
function getFiltered() {
  return CITATIONS.filter((c, idx) => {
    if (idx === heroIndex) return false; // ne pas dupliquer la hero
    const matchTheme  = currentTheme === 'all' || c.theme === currentTheme;
    const q = currentSearch.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const haystack = (c.texte + ' ' + c.auteur).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const matchSearch = !currentSearch || haystack.includes(q);
    return matchTheme && matchSearch;
  });
}

function renderGrid() {
  const grid  = document.getElementById('citations-grid');
  const empty = document.getElementById('empty-citations');
  const count = document.getElementById('search-count');
  const list  = getFiltered();

  count.textContent = `${list.length} citation${list.length > 1 ? 's' : ''}`;

  if (list.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  grid.innerHTML = '';

  list.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'citation-card';
    card.style.animationDelay = `${i * 0.04}s`;
    const themeLabel = {
      vie: 'Vie & Mort', temps: 'Le Temps', memoire: 'Mémoire',
      courage: 'Courage', humour: 'Humour noir', philosophie: 'Philosophie'
    }[c.theme] || c.theme;
    card.innerHTML = `
      <div class="citation-card-quote">« ${esc(c.texte)} »</div>
      <div class="citation-card-footer">
        <span class="citation-card-author">— ${esc(c.auteur)}</span>
        <span class="card-tag">${esc(themeLabel)}</span>
      </div>`;
    card.addEventListener('click', () => {
      heroIndex = CITATIONS.indexOf(c);
      renderHero(heroIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   FILTRES
   ══════════════════════════════════════════════════════ */
function filterCitations(val) {
  currentSearch = val;
  renderGrid();
}

function filterTheme(btn, theme) {
  currentTheme = theme;
  document.querySelectorAll('#theme-filters .year-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid();
}

/* ══════════════════════════════════════════════════════
   UTILS
   ══════════════════════════════════════════════════════ */
function esc(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
