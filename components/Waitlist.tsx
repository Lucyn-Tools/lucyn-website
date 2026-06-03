'use client';

import { useState } from 'react';
import { useWaitlist } from '@/hooks/useWaitlist';

export default function Waitlist() {
  const { email, setEmail, company, setCompany, status, errorMsg, handleSubmit } =
    useWaitlist({ includeCompany: true });

  return (
    <section id="waitlist" style={{ padding: '160px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 700,
            color: 'var(--white)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            marginBottom: '20px',
          }}
        >
          Be among the first.
        </h2>

        <p
          className="reveal"
          data-delay="1"
          style={{
            fontSize: '16px',
            color: 'var(--text-muted)',
            maxWidth: '460px',
            margin: '0 auto 48px',
            lineHeight: 1.6,
          }}
        >
          We&apos;re onboarding engineering teams one at a time. Early access teams get
          white-glove setup and direct input into the roadmap.
        </p>

        <div
          className="reveal"
          data-delay="2"
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            textAlign: 'left',
          }}
        >
          {status === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              style={{
                textAlign: 'center',
                padding: '16px 0',
                animation: 'fadeInSuccess 400ms ease forwards',
              }}
            >
              <p style={{ fontSize: '18px', color: 'var(--white)', marginBottom: '8px', fontWeight: 500 }}>
                You&apos;re on the list.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                We&apos;ll be in touch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@company.com"
                  required
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: `1px solid ${status === 'error' ? 'var(--red)' : 'var(--border-mid)'}`,
                    color: 'var(--text)',
                    fontSize: '14px',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                    transition: 'border-color 150ms ease',
                    opacity: status === 'loading' ? 0.6 : 1,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                  onBlur={e => (e.currentTarget.style.borderColor = status === 'error' ? 'var(--red)' : 'var(--border-mid)')}
                />
              </div>

              <div>
                <label htmlFor="waitlist-company" className="sr-only">Company name</label>
                <input
                  id="waitlist-company"
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Company name (optional)"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-mid)',
                    color: 'var(--text)',
                    fontSize: '14px',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                    transition: 'border-color 150ms ease',
                    opacity: status === 'loading' ? 0.6 : 1,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-mid)')}
                />
              </div>

              {status === 'error' && (
                <p role="alert" aria-live="assertive" style={{ fontSize: '12px', color: 'var(--red)' }}>
                  {errorMsg}
                </p>
              )}

              <WaitlistSubmitButton loading={status === 'loading'} />

              <p style={{ fontSize: '12px', color: 'var(--text-faint)', textAlign: 'center' }}>
                We read every submission. No automated responses.
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInSuccess {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function WaitlistSubmitButton({ loading }: { loading: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="submit"
      disabled={loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        background: hovered && !loading ? '#e8e8e8' : 'var(--white)',
        color: '#000',
        fontWeight: 600,
        fontSize: '15px',
        padding: '13px',
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background 120ms ease',
        opacity: loading ? 0.7 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
    >
      {loading && <span className="spinner" />}
      {loading ? 'Joining...' : 'Request early access'}
    </button>
  );
}
