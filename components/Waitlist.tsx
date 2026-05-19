'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      });
      const data = (await res.json()) as { error?: string; success?: boolean };
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section
      id="waitlist"
      className="py-24 px-6"
      style={{
        background: 'var(--bg-subtle)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
          >
            Be among the first.
          </h2>
          <p
            className="text-base mb-10 leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            We're onboarding engineering teams one at a time. Early access
            teams get white-glove setup and direct input into the roadmap.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-lg p-8"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border-mid)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {status === 'success' ? (
            <div className="py-4">
              <div
                className="text-lg font-medium mb-1"
                style={{ color: 'var(--success)' }}
              >
                You're on the list.
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                We'll be in touch.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@company.com"
                required
                className="w-full px-4 py-2.5 rounded text-sm outline-none transition-all duration-150"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-mid)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-geist-sans)',
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--accent-blue)')
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--border-mid)')
                }
              />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name (optional)"
                className="w-full px-4 py-2.5 rounded text-sm outline-none transition-all duration-150"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-mid)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-geist-sans)',
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--accent-blue)')
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--border-mid)')
                }
              />
              {status === 'error' && (
                <p className="text-xs" style={{ color: 'var(--danger)' }}>
                  {errorMsg}
                </p>
              )}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 rounded text-sm font-medium"
                style={{
                  background: 'var(--accent)',
                  color: '#0a0a0a',
                  opacity: status === 'loading' ? 0.65 : 1,
                  transition: 'opacity 150ms ease',
                }}
              >
                {status === 'loading' ? 'Joining...' : 'Join waitlist →'}
              </motion.button>
              <p className="text-xs text-center" style={{ color: 'var(--text-faint)' }}>
                We read every submission. No automated responses.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
