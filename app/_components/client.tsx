"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { track } from "./scroll-engine";

export function ScrollScene({
  className,
  length,
  children,
}: {
  className: string;
  length: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => (ref.current ? track(ref.current) : undefined), []);

  return (
    <section
      ref={ref}
      className={`scene ${className}`}
      style={{ "--len": length } as CSSProperties}
    >
      <div className="scene-sticky">{children}</div>
    </section>
  );
}

/** Adds `.is-in` to every `[data-reveal]` element once it scrolls into view. */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (list) => {
        for (const entry of list) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

const subscribeSeconds = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};
const nowSeconds = () => Math.floor(Date.now() / 1000);

export function Countdown({ target }: { target: string }) {
  const now = useSyncExternalStore(subscribeSeconds, nowSeconds, () => null);
  const left = now === null ? null : Math.max(0, Math.floor(Date.parse(target) / 1000) - now);

  if (left === 0) {
    return <p className="countdown-done">بارك الله لهما وبارك عليهما وجمع بينهما في خير</p>;
  }

  const parts = [
    { label: "يوم", value: left === null ? null : Math.floor(left / 86400) },
    { label: "ساعة", value: left === null ? null : Math.floor(left / 3600) % 24 },
    { label: "دقيقة", value: left === null ? null : Math.floor(left / 60) % 60 },
    { label: "ثانية", value: left === null ? null : left % 60 },
  ];

  return (
    <div className="countdown" aria-label="العد التنازلي لموعد الحفل">
      {parts.map((p) => (
        <div key={p.label} className="countdown-cell">
          <span className="countdown-num">{p.value === null ? "–" : p.value}</span>
          <span className="countdown-label">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ShareButton({ text }: { text: string }) {
  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, text, url });
      } catch {
        // dismissed by the user
      }
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank", "noopener");
  }

  return (
    <button type="button" className="btn btn-ghost" onClick={share}>
      مشاركة الدعوة
    </button>
  );
}
