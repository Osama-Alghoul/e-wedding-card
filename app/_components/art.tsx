import type { CSSProperties } from "react";

/** Inline style helper for custom properties. */
export const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** A scroll segment: the element animates while its scene's `--p` goes from `a` to `b`. */
export const seg = (a: number, b: number, extra: Record<string, string | number> = {}) =>
  vars({ "--a": a, "--b": b, ...extra });

// Deterministic pseudo-random (LCG) so server output is stable.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/* ------------------------------------------------------------------ */
/* Shared gradients — referenced by every inline SVG on the page.      */
/* ------------------------------------------------------------------ */

export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#F1D99B" />
          <stop offset="0.45" stopColor="#C99A45" />
          <stop offset="1" stopColor="#8A6424" />
        </linearGradient>
        <linearGradient id="gold-soft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EAD3A0" />
          <stop offset="1" stopColor="#C9A25A" />
        </linearGradient>
        <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#A89255" />
          <stop offset="1" stopColor="#D7C28E" />
        </linearGradient>
        <linearGradient id="leaf-green" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8E9A6C" />
          <stop offset="1" stopColor="#C3C99E" />
        </linearGradient>
        <radialGradient id="lantern-glow">
          <stop offset="0" stopColor="#FFF4CF" />
          <stop offset="1" stopColor="#F2C76E" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ornaments & icons                                                   */
/* ------------------------------------------------------------------ */

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={`ornament ${className}`} aria-hidden>
      <path d="M0 12H92M148 12H240" stroke="url(#gold)" strokeWidth="1.2" />
      <path d="M92 12c6-7 12-7 14 0-2 7-8 7-14 0zM148 12c-6-7-12-7-14 0 2 7 8 7 14 0z" fill="url(#gold)" />
      <path d="M120 2l10 10-10 10-10-10z" fill="url(#gold)" />
      <circle cx="120" cy="12" r="3" fill="#FBF8EC" />
      <circle cx="84" cy="12" r="2.2" fill="url(#gold)" />
      <circle cx="156" cy="12" r="2.2" fill="url(#gold)" />
    </svg>
  );
}

export function OrnamentV() {
  return (
    <svg viewBox="0 0 24 90" className="ornament-v" aria-hidden>
      <path d="M12 0V90" stroke="url(#gold)" strokeWidth="1.2" />
      <path d="M12 30l9 15-9 15-9-15z" fill="url(#gold)" />
      <path d="M12 38l4 7-4 7-4-7z" fill="#FBF8EC" />
      <circle cx="12" cy="20" r="2.5" fill="url(#gold)" />
      <circle cx="12" cy="70" r="2.5" fill="url(#gold)" />
    </svg>
  );
}

export function Heart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={className} aria-hidden>
      <path d="M12 21C5 15 1 11.3 1 6.8A5.6 5.6 0 0 1 12 4.6 5.6 5.6 0 0 1 23 6.8C23 11.3 19 15 12 21z" fill="url(#gold)" />
    </svg>
  );
}

export function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M7.5 14h1M11.5 14h1M15.5 14h1M7.5 17.5h1M11.5 17.5h1" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconClock() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="icon" aria-hidden>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Frame around the viewport, like the printed card                    */
/* ------------------------------------------------------------------ */

function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`frame-corner ${className}`} aria-hidden>
      <path d="M3 78V18C3 9.7 9.7 3 18 3h60" fill="none" stroke="url(#gold)" strokeWidth="2" />
      <path d="M10 78V22C10 15 15 10 22 10h56" fill="none" stroke="url(#gold)" strokeWidth="0.8" />
      <path d="M18 18c14 0 18 6 14 12-3 4-10 2-9-3 1-3 5-3 6 0" fill="none" stroke="url(#gold)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="18" cy="18" r="3" fill="url(#gold)" />
    </svg>
  );
}

export function Frame() {
  return (
    <div className="frame" aria-hidden>
      <Corner className="tl" />
      <Corner className="tr" />
      <Corner className="bl" />
      <Corner className="br" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Falling petals (ambient, whole page)                                */
/* ------------------------------------------------------------------ */

export function Petals({ count = 12 }: { count?: number }) {
  const rand = rng(7);
  return (
    <div className="petals" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="petal"
          style={vars({
            left: `${r1(rand() * 100)}%`,
            "--size": `${r1(9 + rand() * 9)}px`,
            "--dur": `${r1(11 + rand() * 9)}s`,
            "--delay": `${r1(-rand() * 20)}s`,
            "--sway": `${r1(30 + rand() * 60)}px`,
          })}
        >
          <i />
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Birds                                                               */
/* ------------------------------------------------------------------ */

function Bird() {
  return (
    <svg viewBox="0 0 60 30" className="bird-svg">
      <g className="wing wing-l">
        <path d="M30 16C24 6 14 2 2 6c10 2 18 6 24 12z" />
      </g>
      <g className="wing wing-r">
        <path d="M30 16C36 6 46 2 58 6c-10 2-18 6-24 12z" />
      </g>
      <ellipse cx="30" cy="17" rx="7" ry="2.8" />
    </svg>
  );
}

const FLOCK = [
  { x: 0, y: 40, s: 1 },
  { x: 18, y: 18, s: 0.8 },
  { x: 20, y: 66, s: 0.85 },
  { x: 38, y: 2, s: 0.65 },
  { x: 40, y: 86, s: 0.7 },
  { x: 58, y: 30, s: 0.55 },
  { x: 62, y: 60, s: 0.5 },
];

export function Birds({ a, b, reverse = false }: { a: number; b: number; reverse?: boolean }) {
  return (
    <div className={`birds seg ${reverse ? "birds--rev" : ""}`} style={seg(a, b)} aria-hidden>
      {FLOCK.map((f, i) => (
        <div
          key={i}
          className="bird"
          style={vars({
            left: `${f.x}%`,
            top: `${f.y}%`,
            "--s": f.s,
            "--flap": `${0.42 + i * 0.04}s`,
            "--flap-delay": `${-i * 0.13}s`,
          })}
        >
          <Bird />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doors                                                               */
/* ------------------------------------------------------------------ */

export function DoorArt({ handle }: { handle: "left" | "right" }) {
  const hx = handle === "left" ? 14 : 186;
  return (
    <svg viewBox="0 0 200 420" preserveAspectRatio="xMidYMid meet" className="door-art" aria-hidden>
      <path d="M24 404V170C24 98 62 52 100 30c38 22 76 68 76 140v234z" fill="none" stroke="url(#gold)" strokeWidth="2.4" />
      <path d="M36 392V174c0-64 32-104 64-126 32 22 64 62 64 126v218z" fill="rgba(255,250,236,.55)" stroke="url(#gold)" strokeWidth="1" />
      <g transform="translate(100 180)" fill="none" stroke="url(#gold)" strokeWidth="1.4">
        <rect x="-22" y="-22" width="44" height="44" />
        <rect x="-22" y="-22" width="44" height="44" transform="rotate(45)" />
        <circle r="12" />
        <circle r="4" fill="url(#gold)" />
      </g>
      <g stroke="url(#gold)" strokeWidth="1" fill="none">
        <rect x="52" y="262" width="96" height="110" rx="3" />
        <path d="M52 290h96M52 318h96M52 346h96M76 262v110M100 262v110M124 262v110" opacity=".55" />
      </g>
      <path d="M100 6l6 10-6 10-6-10z" fill="url(#gold)" />
      <g transform={`translate(${hx} 230)`}>
        <circle r="9" fill="none" stroke="url(#gold)" strokeWidth="2.4" />
        <circle cy="-10" r="3" fill="url(#gold)" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Bride & groom                                                       */
/* ------------------------------------------------------------------ */

export function Groom() {
  return (
    <svg viewBox="0 0 120 300" className="person-svg" aria-hidden>
      <ellipse cx="60" cy="31" rx="16.5" ry="20" fill="url(#gold)" />
      <path d="M44 24c2-12 10-17 16-17s14 5 16 17c-6-6-12-8-16-8s-10 2-16 8z" fill="#7A561C" />
      <rect x="53" y="46" width="14" height="12" fill="url(#gold)" />
      <path
        d="M60 54c-10 0-16 4-20 5l-12 6c-6 3-8 10-8 18l-4 78c0 6 6 8 10 6l4-46 2 50 4 120h20l4-100 4 100h20l4-120 2-50 4 46c4 2 10 0 10-6l-4-78c0-8-2-15-8-18l-12-6c-4-1-10-5-20-5z"
        fill="url(#gold)"
      />
      <path d="M52 58l8 28 8-28z" fill="#FBF3DF" />
      <path d="M53 61l7 3.4 7-3.4v7l-7-3.4-7 3.4z" fill="#6E4D17" />
      <path d="M52 58l-6 34M68 58l6 34M60 92v66" stroke="#7A561C" strokeWidth="1.2" fill="none" />
      <circle cx="60" cy="104" r="1.8" fill="#7A561C" />
      <circle cx="60" cy="122" r="1.8" fill="#7A561C" />
      <circle cx="80" cy="76" r="4.5" fill="#E2A8AE" />
      <circle cx="80" cy="76" r="1.8" fill="#C9787F" />
    </svg>
  );
}

export function Bride() {
  return (
    <svg viewBox="0 0 120 300" className="person-svg" aria-hidden>
      <path
        d="M60 12C34 14 26 60 22 110 16 170 6 230 2 296h44C40 220 44 140 48 70z"
        fill="url(#gold-soft)"
        opacity=".45"
      />
      <path
        d="M42 62c8-2 28-2 36 0 6 4 8 14 4 30-2 12-8 24-10 36 16 42 32 102 42 164H6c10-62 26-122 42-164-2-12-8-24-10-36-4-16-2-26 4-30z"
        fill="url(#gold)"
      />
      <path
        d="M60 10c-14 0-21 12-20 27 1 10 3 18-1 27h42c-4-9-2-17-1-27 1-15-6-27-20-27z"
        fill="url(#gold)"
      />
      <path d="M48 128c-8 40-20 100-26 160M72 128c8 40 20 100 26 160M60 132v158" stroke="#F3E2B6" strokeWidth="1" opacity=".55" fill="none" />
      <path d="M30 230c20 8 40 8 60 0M22 262c25 10 51 10 76 0" stroke="#F3E2B6" strokeWidth="1" opacity=".45" fill="none" />
      <g>
        <path d="M58 136l-6 18M62 136l2 18M60 136l8 16" stroke="#8E9A6C" strokeWidth="1.6" />
        <circle cx="53" cy="128" r="6" fill="#E9BFC1" />
        <circle cx="64" cy="125" r="6.5" fill="#DFA3A9" />
        <circle cx="59" cy="133" r="6" fill="#F0CDCD" />
        <circle cx="69" cy="132" r="5" fill="#E9BFC1" />
        <circle cx="50" cy="136" r="4.5" fill="#DFA3A9" />
        <circle cx="64" cy="125" r="2.2" fill="#C9787F" />
        <circle cx="53" cy="128" r="2" fill="#C9787F" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Lanterns                                                            */
/* ------------------------------------------------------------------ */

export function Lantern() {
  return (
    <svg viewBox="0 0 40 84" className="lantern-svg" aria-hidden>
      <circle cx="20" cy="4" r="3" fill="none" stroke="url(#gold)" strokeWidth="1.5" />
      <path d="M20 7l9 9H11z" fill="url(#gold)" />
      <path d="M10 18h20l4 26-8 18H14l-8-18z" fill="url(#gold)" />
      <path d="M14 22h12l2.5 21-5 13h-7l-5-13z" fill="url(#lantern-glow)" />
      <path d="M20 22v34M11.5 43h17" stroke="#B8893B" strokeWidth=".8" />
      <path d="M15 64h10l-5 12z" fill="url(#gold)" />
      <circle cx="20" cy="80" r="2.2" fill="url(#gold)" />
    </svg>
  );
}

const LANTERNS = [
  { x: "6%", len: 70, s: 1 },
  { x: "17%", len: 26, s: 0.72 },
  { x: "83%", len: 34, s: 0.72 },
  { x: "94%", len: 84, s: 1 },
];

export function Lanterns() {
  return (
    <div className="lanterns seg" style={seg(0, 0.16)} aria-hidden>
      {LANTERNS.map((l, i) => (
        <div key={i} className="lantern" style={vars({ left: l.x, "--s": l.s, "--sway-delay": `${-i * 0.9}s` })}>
          <span className="lantern-string" style={{ height: l.len }} />
          <Lantern />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flowers                                                             */
/* ------------------------------------------------------------------ */

export function Bloom({
  x,
  y,
  r,
  d,
  className = "",
}: {
  x: number;
  y: number;
  r: number;
  d?: number;
  className?: string;
}) {
  return (
    <g transform={`translate(${r1(x)} ${r1(y)})`}>
      <g className={className} style={d === undefined ? undefined : vars({ "--d": d })}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cy={-r * 0.55} rx={r * 0.46} ry={r * 0.62} transform={`rotate(${a})`} fill="#EFCACA" stroke="#D9A3A8" strokeWidth=".8" />
        ))}
        {[36, 108, 180, 252, 324].map((a) => (
          <ellipse key={a} cy={-r * 0.32} rx={r * 0.3} ry={r * 0.4} transform={`rotate(${a})`} fill="#E3AEB3" />
        ))}
        <circle r={r * 0.2} fill="url(#gold)" />
      </g>
    </g>
  );
}

function leafPath(len: number) {
  const w = len * 0.34;
  return `M0 0C${r1(len * 0.3)} ${r1(-w)} ${r1(len * 0.7)} ${r1(-w)} ${len} 0C${r1(len * 0.7)} ${r1(w)} ${r1(len * 0.3)} ${r1(w)} 0 0z`;
}

export function RoseCluster({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 220 220" className={`rose-cluster ${className}`} aria-hidden>
      {[
        { x: 70, y: 140, a: 120, l: 70, f: "url(#leaf)" },
        { x: 120, y: 110, a: 70, l: 64, f: "url(#leaf-green)" },
        { x: 60, y: 70, a: 200, l: 58, f: "url(#leaf-green)" },
        { x: 140, y: 60, a: 10, l: 60, f: "url(#leaf)" },
        { x: 100, y: 160, a: 95, l: 50, f: "url(#leaf)" },
      ].map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.a})`}>
          <path d={leafPath(l.l)} fill={l.f} stroke="#9C8143" strokeWidth=".6" />
          <path d={`M2 0H${l.l - 4}`} stroke="#9C8143" strokeWidth=".6" />
        </g>
      ))}
      <Bloom x={78} y={78} r={42} />
      <Bloom x={140} y={120} r={30} />
      <Bloom x={50} y={150} r={20} />
      <circle cx="170" cy="70" r="8" fill="#E3AEB3" />
      <circle cx="120" cy="40" r="6" fill="#EFCACA" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Growing vines (garden finale)                                       */
/* ------------------------------------------------------------------ */

type Pt = [number, number];
type Seg = [Pt, Pt, Pt, Pt];

function smooth(points: Pt[]): Seg[] {
  const segs: Seg[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    segs.push([
      p1,
      [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
      [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6],
      p2,
    ]);
  }
  return segs;
}

function pointAt(segs: Seg[], u: number) {
  const f = Math.min(u * segs.length, segs.length - 1e-6);
  const i = Math.floor(f);
  const t = f - i;
  const [a, b, c, d] = segs[i];
  const m = 1 - t;
  const coord = (k: 0 | 1) => m * m * m * a[k] + 3 * m * m * t * b[k] + 3 * m * t * t * c[k] + t * t * t * d[k];
  const deriv = (k: 0 | 1) => 3 * m * m * (b[k] - a[k]) + 6 * m * t * (c[k] - b[k]) + 3 * t * t * (d[k] - c[k]);
  return { x: coord(0), y: coord(1), angle: (Math.atan2(deriv(1), deriv(0)) * 180) / Math.PI };
}

const toPath = (segs: Seg[]) =>
  `M${segs[0][0].map(r1).join(" ")}` +
  segs.map((s) => `C${s[1].map(r1).join(" ")} ${s[2].map(r1).join(" ")} ${s[3].map(r1).join(" ")}`).join("");

const STEMS: { pts: Pt[]; from: number; to: number; width: number; leaves: number; leaf: number; bloom: number; mid?: number[] }[] = [
  { pts: [[14, 1000], [36, 860], [20, 700], [52, 540], [28, 380], [58, 230], [40, 80]], from: 0, to: 0.7, width: 4, leaves: 16, leaf: 40, bloom: 32, mid: [0.5] },
  { pts: [[34, 880], [70, 850], [118, 780], [146, 690], [130, 610]], from: 0.1, to: 0.45, width: 2.6, leaves: 6, leaf: 30, bloom: 28 },
  { pts: [[30, 640], [70, 610], [112, 530], [122, 440]], from: 0.28, to: 0.6, width: 2.2, leaves: 5, leaf: 28, bloom: 24 },
  { pts: [[40, 340], [76, 316], [112, 250], [110, 170]], from: 0.45, to: 0.8, width: 2, leaves: 4, leaf: 24, bloom: 22 },
];

export function Vines({ side }: { side: "left" | "right" }) {
  return (
    <svg viewBox="0 0 200 1000" preserveAspectRatio="xMinYMax meet" className={`vines vines--${side} seg`} style={seg(0.02, 0.85)} aria-hidden>
      {STEMS.map((stem, si) => {
        const segs = smooth(stem.pts);
        const tip = pointAt(segs, 1);
        return (
          <g key={si} className="stem" style={vars({ "--s0": stem.from, "--s1": stem.to })}>
            <path className="stalk" d={toPath(segs)} pathLength={1} fill="none" stroke="#9C8143" strokeWidth={stem.width} strokeLinecap="round" />
            {Array.from({ length: stem.leaves }, (_, k) => {
              const u = (k + 1) / (stem.leaves + 1);
              const p = pointAt(segs, u);
              const angle = p.angle + (k % 2 ? 52 : -52);
              const len = stem.leaf * (1 - u * 0.35);
              return (
                <g key={k} transform={`translate(${r1(p.x)} ${r1(p.y)}) rotate(${r1(angle)})`}>
                  <g className="grow" style={vars({ "--d": r1(u * 0.95 * 100) / 100 })}>
                    <path d={leafPath(r1(len))} fill={k % 3 ? "url(#leaf-green)" : "url(#leaf)"} stroke="#8D7A45" strokeWidth=".6" />
                    <path d={`M2 0H${r1(len - 4)}`} stroke="#8D7A45" strokeWidth=".6" />
                  </g>
                </g>
              );
            })}
            {stem.mid?.map((u) => {
              const p = pointAt(segs, u);
              return <Bloom key={u} x={p.x + 14} y={p.y} r={stem.bloom * 0.75} d={u + 0.05} className="grow bloom" />;
            })}
            <Bloom x={tip.x} y={tip.y} r={stem.bloom} d={0.9} className="grow bloom" />
          </g>
        );
      })}
    </svg>
  );
}

export function Foliage() {
  const rand = rng(21);
  const blades = Array.from({ length: 64 }, (_, i) => {
    const x = r1(i * 6.4 + rand() * 4);
    const h = r1(30 + rand() * 60);
    const lean = r1((rand() - 0.5) * 30);
    return { x, h, lean, fill: i % 3 ? "url(#leaf-green)" : "url(#leaf)" };
  });
  return (
    <svg viewBox="0 0 410 100" preserveAspectRatio="xMidYMax slice" className="foliage seg" style={seg(0, 0.4)} aria-hidden>
      {blades.map((b, i) => (
        <path
          key={i}
          d={`M${b.x} 100Q${r1(b.x + b.lean / 2)} ${r1(100 - b.h / 2)} ${r1(b.x + b.lean)} ${r1(100 - b.h)}Q${r1(b.x + b.lean / 2 + 4)} ${r1(100 - b.h / 2)} ${r1(b.x + 7)} 100z`}
          fill={b.fill}
          opacity={0.75 + (i % 4) * 0.06}
        />
      ))}
    </svg>
  );
}

export function Fireflies({ count = 16 }: { count?: number }) {
  const rand = rng(99);
  return (
    <div className="fireflies seg" style={seg(0.25, 0.6)} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={vars({
            left: `${r1(8 + rand() * 84)}%`,
            top: `${r1(15 + rand() * 70)}%`,
            "--dur": `${r1(5 + rand() * 6)}s`,
            "--delay": `${r1(-rand() * 8)}s`,
            "--dx": `${r1((rand() - 0.5) * 80)}px`,
            "--dy": `${r1(-20 - rand() * 60)}px`,
          })}
        />
      ))}
    </div>
  );
}

const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const dist = i % 2 ? 70 : 105;
  return { dx: Math.round(Math.cos(a) * dist), dy: Math.round(Math.sin(a) * dist * 0.8) };
});

export function Sparks() {
  return (
    <div className="sparks" aria-hidden>
      {SPARKS.map((s, i) => (
        <span key={i} style={vars({ "--dx": `${s.dx}px`, "--dy": `${s.dy}px` })} />
      ))}
    </div>
  );
}
