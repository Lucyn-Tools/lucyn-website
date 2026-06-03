'use client';

import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration: number, delay: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return value;
}

const NATURAL_W = 900;
const NATURAL_H = 396; // 36px chrome + 360px content

export default function DashboardMockup() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const delivery = useCountUp(84, 1200, 400);
  const prs = useCountUp(12, 1200, 500);
  const risks = useCountUp(2, 800, 600);

  // Responsive scale
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(el.offsetWidth / NATURAL_W, 1));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Load animation
  useEffect(() => {
    const el = animRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.98)';
    const t = setTimeout(() => {
      el.style.transition =
        'opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // Scroll parallax
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const fn = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${window.scrollY * 0.12}px)`;
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scaledH = Math.round(NATURAL_H * scale);

  return (
    <div ref={wrapRef} style={{ width: '100%', maxWidth: `${NATURAL_W}px`, margin: '0 auto' }}>
      <div ref={parallaxRef}>
        <div ref={animRef}>
          <div
            style={{
              height: `${scaledH}px`,
              overflow: 'hidden',
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: `${NATURAL_W}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <MockupInner delivery={delivery} prs={prs} risks={risks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupInner({ delivery, prs, risks }: { delivery: number; prs: number; risks: number }) {
  return (
    <div style={{ background: 'var(--bg-subtle)' }}>
      {/* Browser chrome */}
      <div
        style={{
          height: '36px',
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '6px',
          position: 'relative',
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', flexShrink: 0 }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '2px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-faint)',
            whiteSpace: 'nowrap',
          }}
        >
          lucyn.app/dashboard
        </div>
      </div>

      {/* Dashboard body */}
      <div style={{ display: 'flex', height: '360px' }}>
        {/* Sidebar */}
        <div
          style={{
            width: '200px',
            flexShrink: 0,
            borderRight: '1px solid var(--border)',
            padding: '16px 0',
          }}
        >
          <div
            style={{
              padding: '0 16px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--purple)',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            ✦ LUCYN
          </div>
          {[
            { label: 'Dashboard', active: true },
            { label: 'Chat', active: false },
            { label: 'Developers', active: false },
            { label: 'Repos', active: false },
            { label: 'Tasks', active: false },
            { label: 'Settings', active: false },
          ].map(item => (
            <div
              key={item.label}
              style={{
                padding: '7px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: item.active ? 'var(--text)' : 'var(--text-muted)',
                background: item.active ? 'var(--bg-hover)' : 'transparent',
                borderLeft: `2px solid ${item.active ? 'var(--blue)' : 'transparent'}`,
                cursor: 'default',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '20px', minWidth: 0 }}>
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: 'var(--text)',
                fontWeight: 600,
              }}
            >
              Engineering Health
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Last updated 2 minutes ago
            </div>
          </div>

          {/* Metric cards */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            {/* Delivery Confidence */}
            <div
              style={{
                flex: 1,
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                background: 'var(--bg-elevated)',
                position: 'relative',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.06em', marginBottom: '6px' }}>
                DELIVERY CONFIDENCE
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 600, color: 'var(--white)', lineHeight: 1 }}>
                  {delivery}%
                </div>
                <SparklineSVG />
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--green)', marginTop: '6px' }}>
                +3% this week
              </div>
            </div>

            {/* Open PRs */}
            <div
              style={{
                flex: 1,
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                background: 'var(--bg-elevated)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.06em', marginBottom: '6px' }}>
                OPEN PRS
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 600, color: 'var(--white)', lineHeight: 1 }}>
                {prs}
              </div>
              <div style={{ marginTop: '10px', height: '2px', background: 'var(--border-mid)', borderRadius: '1px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(prs / 20) * 100}%`, background: 'var(--blue)', transition: 'width 1.2s ease-out' }} />
              </div>
            </div>

            {/* Risk Signals */}
            <div
              style={{
                flex: 1,
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                background: 'var(--bg-elevated)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.06em', marginBottom: '6px' }}>
                RISK SIGNALS
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 600, color: 'var(--red)', lineHeight: 1 }}>
                {risks}
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              background: 'var(--bg-elevated)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-faint)', letterSpacing: '0.06em', marginBottom: '10px' }}>
              RECENT ACTIVITY
            </div>
            {[
              { text: 'auth-service merged — 10m ago', color: 'var(--green)' },
              { text: 'sprint goal updated — 2h ago', color: 'var(--blue)' },
              { text: 'blocker flagged — 7h ago', color: 'var(--red)' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <span style={{ color: item.color, fontSize: '8px', lineHeight: 1, flexShrink: 0 }}>●</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklineSVG() {
  // Points trending upward: x from 0 to 56, y from 24 down to 4 (SVG y-axis inverted)
  const pts: [number, number][] = [[0, 24], [8, 20], [16, 22], [24, 16], [32, 18], [40, 11], [48, 7], [56, 4]];
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');

  return (
    <svg width="60" height="28" viewBox="0 0 60 28" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d={d} className="sparkline-path" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
