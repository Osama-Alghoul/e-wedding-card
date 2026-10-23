// One shared, smoothed scroll loop. Each tracked scene gets `--p` (0 → 1) as it
// scrolls through its sticky range; CSS derives every animation from that value.

type Entry = { el: HTMLElement; cur: number; target: number };

const entries = new Set<Entry>();
let raf = 0;

function measure(e: Entry) {
  const r = e.el.getBoundingClientRect();
  const range = r.height - window.innerHeight;
  e.target = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 1;
}

function paint(e: Entry) {
  e.el.style.setProperty("--p", e.cur.toFixed(4));
}

function frame() {
  raf = 0;
  let busy = false;
  for (const e of entries) {
    measure(e);
    const d = e.target - e.cur;
    const moving = Math.abs(d) > 0.0005;
    e.cur = moving ? e.cur + d * 0.12 : e.target;
    paint(e);
    e.el.toggleAttribute("data-moving", moving);
    busy ||= moving;
  }
  if (busy) raf = requestAnimationFrame(frame);
}

function kick() {
  if (!raf) raf = requestAnimationFrame(frame);
}

export function track(el: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.style.setProperty("--p", "1");
    return () => {};
  }

  const e: Entry = { el, cur: 0, target: 0 };
  measure(e);
  e.cur = e.target;
  paint(e);

  entries.add(e);
  if (entries.size === 1) {
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
  }

  return () => {
    entries.delete(e);
    if (entries.size === 0) {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    }
  };
}
