'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import DashboardMockup from './DashboardMockup';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Hero() {
  const [email, setEmail] = useState('');
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
        body: JSON.stringify({ email }),
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
      className="relative flex flex-col items-center justify-center min-h-screen pt-14 px-6 pb-16"
      style={{ background: 'var(--bg)' }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-sm"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-mid)',
            color: 'var(--text-muted)',
          }}
        >
          <span
            className="pulse-dot w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: 'var(--success)' }}
          />
          Private beta — Join the waitlist
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-bold leading-[1.05] mb-6"
          style={{
            color: 'var(--text)',
            letterSpacing: '-0.03em',
            fontSize: 'clamp(36px, 6vw, 68px)',
          }}
        >
          The AI Product Engineer
          <br />
          that works inside your company.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-lg leading-relaxed mb-10 max-w-130"
          style={{ color: 'var(--text-muted)' }}
        >
          Lucyn understands your codebase, your people, and your product
          direction — then actively participates in execution.
        </motion.p>

        {/* CTA form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="w-full max-w-md"
        >
          {status === 'success' ? (
            <div
              className="py-4 text-base font-medium"
              style={{ color: 'var(--success)' }}
            >
              You&apos;re on the list. We&apos;ll be in touch.
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@company.com"
                  required
                  className="flex-1 px-4 py-2.5 rounded text-sm outline-none transition-all duration-150"
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
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded text-sm font-medium whitespace-nowrap"
                  style={{
                    background: 'var(--accent)',
                    color: '#0a0a0a',
                    opacity: status === 'loading' ? 0.65 : 1,
                    transition: 'opacity 150ms ease',
                  }}
                >
                  {status === 'loading' ? 'Joining...' : 'Join waitlist →'}
                </motion.button>
              </form>
              {status === 'error' && (
                <p className="mt-2 text-xs text-left" style={{ color: 'var(--danger)' }}>
                  {errorMsg}
                </p>
              )}
              <p className="mt-3 text-xs" style={{ color: 'var(--text-faint)' }}>
                No spam. We&apos;ll reach out when you&apos;re up next.
              </p>
            </>
          )}
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 w-full max-w-lg mx-auto"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
