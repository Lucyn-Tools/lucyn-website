'use client';

import { useEffect, useRef, useState } from 'react';

export default function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lucynRef = useRef<HTMLSpanElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  // Lazy initializer: runs client-only (ssr: false in dynamic import), so
  // sessionStorage is always available. No useLayoutEffect needed.
  const [show, setShow] = useState(() => !sessionStorage.getItem('lucyn-intro-played'));

  useEffect(() => {
    // When show is false the component returns null so all refs are null —
    // the guard below handles that without needing show in the dep array.
    const overlay = overlayRef.current;
    const text = textRef.current;
    const lucyn = lucynRef.current;
    const period = periodRef.current;
    const circle = circleRef.current;
    if (!overlay || !text || !lucyn || !period || !circle) return;

    sessionStorage.setItem('lucyn-intro-played', 'true');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      overlay.style.transition = 'opacity 200ms ease';
      requestAnimationFrame(() => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      });
      setTimeout(() => setShow(false), 220);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1 — "Lucyn." fades up from below
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        text.style.transition = 'opacity 400ms ease-out, transform 400ms ease-out';
        text.style.opacity = '1';
        text.style.transform = 'translateY(0)';
      });
    });

    // Phase 2 — at 900ms
    timers.push(
      setTimeout(() => {
        // "Lucyn" letters fade out
        lucyn.style.transition = 'opacity 300ms ease-in';
        lucyn.style.opacity = '0';

        // Period fades out a beat later so it's the last thing visible
        timers.push(
          setTimeout(() => {
            period.style.transition = 'opacity 150ms ease-in';
            period.style.opacity = '0';
          }, 150),
        );

        // Circle starts from the period's visual center and scales to fill the screen.
        // The font glyph "." sits at the very bottom of its em-square bounding box,
        // so we use rect.bottom (not center) as the visual anchor.
        const rect = period.getBoundingClientRect();
        const dotX = rect.left + rect.width / 2;
        const dotY = rect.bottom - rect.height * 0.1; // glyph sits near the baseline

        circle.style.left = `${dotX}px`;
        circle.style.top = `${dotY}px`;

        // Scale large enough to reach every corner from this starting point
        const maxDist = Math.sqrt(
          Math.pow(Math.max(dotX, window.innerWidth - dotX), 2) +
          Math.pow(Math.max(dotY, window.innerHeight - dotY), 2),
        );
        const radius = 10; // half of 20px initial size
        const scale = Math.ceil(maxDist / radius) + 5;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            circle.style.transition = `transform 700ms cubic-bezier(0.4, 0, 0.2, 1)`;
            circle.style.transform = `translate(-50%, -50%) scale(${scale})`;
          });
        });

        // Phase 3 — overlay fades
        timers.push(
          setTimeout(() => {
            overlay.style.transition = 'opacity 250ms ease';
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            timers.push(setTimeout(() => setShow(false), 270));
          }, 700),
        );
      }, 900),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!show) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* "Lucyn." — Phase 1 */}
      <div
        ref={textRef}
        style={{
          opacity: 0,
          transform: 'translateY(16px)',
          display: 'flex',
          alignItems: 'baseline',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        } as React.CSSProperties}
      >
        <span
          ref={lucynRef}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(64px, 12vw, 140px)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Lucyn
        </span>
        <span
          ref={periodRef}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(64px, 12vw, 140px)',
            color: '#ffffff',
            letterSpacing: 0,
            lineHeight: 1,
          }}
        >
          .
        </span>
      </div>

      {/*
        The expanding circle. Positioned absolutely at the period glyph's
        visual center (set by JS), scales to fill the viewport from there.
        Using a proper circle element sidesteps font-metric issues entirely.
      */}
      <div
        ref={circleRef}
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#ffffff',
          transform: 'translate(-50%, -50%) scale(0)',
          transformOrigin: '50% 50%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
}
