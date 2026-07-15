'use client';

import { useState } from 'react';
import DashboardMockup from './DashboardMockup';
import { useWaitlist } from '@/hooks/useWaitlist';

export default function Hero() {
  const { email, setEmail, status, errorMsg, handleSubmit } = useWaitlist();

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '120px',
        paddingBottom: '80px',
        paddingLeft: '24px',
        paddingRight: '24px',
        textAlign: 'center',
        background: 'var(--bg)',
        position: 'relative',
      }}
    >
      {/* Eyebrow — plain mono text, no pill */}
      <p
        className="reveal"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--text-faint)',
          marginBottom: '28px',
          letterSpacing: '0.02em',
        }}
      >
        The company brain for engineering teams.
      </p>

      {/* Headline */}
      <h1
        className="reveal"
        data-delay="1"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(52px, 7vw, 88px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.0,
          color: 'var(--white)',
          maxWidth: '900px',
          marginBottom: '28px',
        }}
      >
        The institutional memory
        <br />
        of your company.
      </h1>

      {/* Subheadline */}
      <p
        className="reveal"
        data-delay="2"
        style={{
          fontSize: '18px',
          color: 'var(--text-muted)',
          maxWidth: '500px',
          lineHeight: 1.6,
          marginBottom: '40px',
        }}
      >
        Lucyn turns scattered company knowledge into a living,
        connected map of how your company actually works.
      </p>

      {/* CTA */}
      <div className="reveal" data-delay="3" style={{ width: '100%', maxWidth: '420px' }}>
        {status === 'success' ? (
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', padding: '12px 0' }}>
            You&apos;re on the list. We&apos;ll reach out soon.
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
              <label htmlFor="hero-email" className="sr-only">Email address</label>
              <input
                id="hero-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@company.com"
                required
                disabled={status === 'loading'}
                style={{
                  flex: 1,
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-mid)',
                  color: 'var(--text)',
                  fontSize: '14px',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-sm)',
                  outline: 'none',
                  transition: 'border-color 150ms ease',
                  minWidth: 0,
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-mid)')}
              />
              <HeroSubmitButton loading={status === 'loading'} />
            </form>
            {status === 'error' && (
              <p role="alert" style={{ fontSize: '12px', color: 'var(--red)', marginTop: '8px', textAlign: 'left' }}>
                {errorMsg}
              </p>
            )}
            <p style={{ fontSize: '12px', color: 'var(--text-faint)', marginTop: '12px' }}>
              No spam. We&apos;ll reach out when you&apos;re up next.
            </p>
          </>
        )}
      </div>

      {/* Dashboard mockup */}
      <div style={{ width: '100%', maxWidth: '900px', marginTop: '64px', position: 'relative' }}>
        <DashboardMockup />
        {/* Subtle glow beneath */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(600px, 90vw)',
            height: '200px',
            background: 'radial-gradient(ellipse at center, rgba(35,131,226,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}

function HeroSubmitButton({ loading }: { loading: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="submit"
      disabled={loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      style={{
        background: hovered && !loading ? '#e8e8e8' : 'var(--white)',
        color: '#000',
        fontWeight: 500,
        fontSize: '14px',
        padding: '11px 18px',
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap' as const,
        transition: 'background 120ms ease, transform 100ms ease',
        opacity: loading ? 0.7 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
      }}
    >
      {loading && <span className="spinner" />}
      {loading ? 'Joining...' : 'Get early access'}
    </button>
  );
}
