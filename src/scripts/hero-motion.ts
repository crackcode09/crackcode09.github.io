// Home page hero motion, driven by anime.js (MIT, bundled into the site's own JS, so the
// CSP is unchanged). The inline script in index.astro adds `hero-anim` to <html> only when
// the intro should play (first visit this session, motion allowed); the CSS starting states
// hang off that class, so without it the finished hero shows straight away.
import { createTimeline, stagger, scrambleText, utils } from 'animejs';

declare global {
  interface Window { __heroStarted?: boolean }
}

const root = document.documentElement;
const hero = document.querySelector<HTMLElement>('.hero');
const term = hero?.querySelector<HTMLElement>('.hero-term');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

// The build log types out line by line (each line revealed one character-width step at a
// time, which keeps the padded columns), then each "[ok]" scrambles into place.
function buildLog(box: HTMLElement, at = 0) {
  const tl = createTimeline({ autoplay: false });
  let t = at;
  box.querySelectorAll<HTMLElement>('.tl').forEach((line) => {
    const n = line.textContent?.length || 1;
    const ok = line.querySelector('u');
    tl.add(line, { opacity: [0, 1], duration: 1 }, t)
      .add(line, { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'], duration: n * 9, ease: `steps(${n})` }, t);
    t += n * 9 + 50;
    if (ok) {
      tl.add(ok, { textContent: scrambleText({ chars: 'blocks', revealRate: 30 }) }, t - 120);
      t += 60;
    }
  });
  return tl;
}

function intro(el: HTMLElement) {
  return createTimeline({ autoplay: false })
    .add(el.querySelector('.label')!, { opacity: [0, 1], duration: 300 }, 0)
    .add(el.querySelectorAll('.hero-h1 .ln > span'), { y: ['105%', '0%'], duration: 650, ease: 'out(4)', delay: stagger(110) }, 60)
    .add(el.querySelectorAll('.hero-h1 .dot'), { opacity: [0, 1], scale: [2.6, 1], duration: 380, ease: 'outBack(2.5)', delay: stagger(90) }, 520)
    .add(el.querySelector('.hero-sub')!, { opacity: [0, 1], y: [12, 0], duration: 450, ease: 'out(3)' }, 380)
    .add(el.querySelectorAll('.hero-cta > *'), { opacity: [0, 1], y: [10, 0], duration: 380, ease: 'out(3)', delay: stagger(50) }, 500);
}

if (hero && term && root.classList.contains('hero-anim')) {
  window.__heroStarted = true;
  const tl = intro(hero);
  tl.sync(buildLog(term), 450);
  tl.then(() => root.classList.remove('hero-anim'));
  tl.play();
  try { sessionStorage.setItem('hero-played', '1'); } catch { /* storage blocked: intro just plays again */ }
}

// Hovering the terminal replays the build log (never with reduced motion).
if (term) {
  let replay: ReturnType<typeof buildLog> | null = null;
  term.addEventListener('mouseenter', () => {
    if (reduced.matches || root.classList.contains('hero-anim')) return;
    if (replay && !replay.completed) return;
    utils.set(term.querySelectorAll('.tl'), { opacity: 0 }); // clear the log before it retypes
    replay = buildLog(term);
    replay.play();
  });
}
