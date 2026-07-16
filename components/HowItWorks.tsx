'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    num: '01',
    title: 'Ingests',
    body: 'GitHub, Discord, and Google Meet. Lucyn reads commits, PRs, meetings, and conversations continuously.',
  },
  {
    num: '02',
    title: 'Maps',
    body: 'Every signal is classified, embedded, and written into a structured knowledge graph. Repos, developers, decisions — all connected.',
  },
  {
    num: '03',
    title: 'Answers',
    body: 'Ask anything about your company in plain English and get a grounded, cited answer. In seconds, not sprint reviews.',
  },
];

const RESPONSE_WORDS = [
  { text: 'Based', bold: false },
  { text: 'on', bold: false },
  { text: 'commit', bold: false },
  { text: 'history', bold: false },
  { text: 'over', bold: false },
  { text: 'the', bold: false },
  { text: 'last', bold: false },
  { text: '90', bold: false },
  { text: 'days,', bold: false },
  { text: 'Sarah', bold: true },
  { text: 'has', bold: false },
  { text: 'the', bold: false },
  { text: 'deepest', bold: false },
  { text: 'context', bold: false },
  { text: 'on', bold: false },
  { text: 'the', bold: false },
  { text: 'payments', bold: false },
  { text: 'module', bold: false },
  { text: '—', bold: false },
  { text: '34', bold: false },
  { text: 'commits,', bold: false },
  { text: 'primary', bold: false },
  { text: 'reviewer', bold: false },
  { text: 'on', bold: false },
  { text: 'the', bold: false },
  { text: 'last', bold: false },
  { text: '3', bold: false },
  { text: 'payments', bold: false },
  { text: 'PRs.', bold: false },
  { text: 'James', bold: true },
  { text: 'has', bold: false },
  { text: 'contributed', bold: false },
  { text: 'to', bold: false },
  { text: 'the', bold: false },
  { text: 'billing', bold: false },
  { text: 'module.', bold: false },
  { text: 'Recommend', bold: false },
  { text: 'pairing', bold: false },
  { text: 'them.', bold: false },
];

export default function HowItWorks() {
  const chatRef = useRef<HTMLDivElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const streamedRef = useRef(false);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !streamedRef.current) {
          streamedRef.current = true;
          observer.disconnect();
          setStreaming(true);

          let i = 0;
          const tick = () => {
            i++;
            setWordCount(i);
            if (i < RESPONSE_WORDS.length) {
              setTimeout(tick, 30);
            }
          };
          setTimeout(tick, 400);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: '160px 0', background: 'var(--bg-subtle)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <p
          className="reveal"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-faint)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          How It Works
        </p>

        <h2
          className="reveal"
          data-delay="1"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 700,
            color: 'var(--white)',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            marginBottom: '80px',
          }}
        >
          Ingests. Maps. Answers.
        </h2>

        {/* Steps row */}
        <div
          className="hiw-steps"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 0,
            marginBottom: '64px',
          }}
        >
          {steps.map((step, i) => (
            <StepWithConnector
              key={step.num}
              step={step}
              isLast={i === steps.length - 1}
              delay={i + 1}
            />
          ))}
        </div>

        {/* Chat demo */}
        <div
          ref={chatRef}
          className="reveal"
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
          }}
        >
          {/* User message */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
            <div
              style={{
                background: 'var(--bg-hover)',
                border: '1px solid var(--border)',
                borderRadius: '8px 8px 2px 8px',
                padding: '10px 14px',
                fontSize: '14px',
                color: 'var(--text)',
                maxWidth: '60%',
              }}
            >
              Who should review the payments PR?
            </div>
          </div>

          {/* Lucyn response */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--purple)',
                marginBottom: '8px',
                letterSpacing: '0.04em',
              }}
            >
              ✦ Lucyn
            </div>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text)',
                lineHeight: 1.65,
                marginBottom: '16px',
              }}
            >
              {streaming
                ? RESPONSE_WORDS.slice(0, wordCount).map((w, i) => (
                    <span key={i}>
                      <span
                        style={{
                          fontWeight: w.bold ? 600 : 400,
                          opacity: 1,
                          animation: 'fadeInWord 150ms ease forwards',
                        }}
                      >
                        {w.text}
                      </span>
                      {' '}
                    </span>
                  ))
                : null}
              {streaming && wordCount < RESPONSE_WORDS.length && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '14px',
                    background: 'var(--blue)',
                    marginLeft: '1px',
                    verticalAlign: 'middle',
                    animation: 'blink 0.8s step-end infinite',
                  }}
                />
              )}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-faint)',
                opacity: wordCount >= RESPONSE_WORDS.length ? 1 : 0,
                transition: 'opacity 400ms ease',
              }}
            >
              Based on: packages/payments/billing.ts (34 commits), PR #142, PR #138
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInWord {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @media (max-width: 768px) {
          .hiw-steps { flex-direction: column !important; gap: 32px !important; }
          .hiw-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function StepWithConnector({
  step,
  isLast,
  delay,
}: {
  step: (typeof steps)[0];
  isLast: boolean;
  delay: number;
}) {
  return (
    <>
      <div
        className="reveal"
        data-delay={`${delay}`}
        style={{ flex: 1, padding: '0 20px' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-xfaint)',
            marginBottom: '12px',
            letterSpacing: '0.04em',
          }}
        >
          {step.num}
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--white)',
            marginBottom: '10px',
            letterSpacing: '-0.01em',
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
          }}
        >
          {step.body}
        </p>
      </div>

      {!isLast && (
        <div
          className="hiw-connector"
          style={{
            flexShrink: 0,
            width: '40px',
            position: 'relative',
            top: '44px',
            height: '1px',
            background: 'var(--border)',
            overflow: 'visible',
          }}
        >
          <div
            className="pipeline-dot"
            style={{
              position: 'absolute',
              top: '-2px',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'var(--blue)',
            }}
          />
        </div>
      )}
    </>
  );
}
