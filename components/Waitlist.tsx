'use client';

import { motion } from 'framer-motion';
import { useWaitlist } from '@/hooks/useWaitlist';

export default function Waitlist() {
  const { email, setEmail, company, setCompany, status, errorMsg, handleSubmit } =
    useWaitlist({ includeCompany: true });

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
            We&apos;re onboarding engineering teams one at a time. Early access
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
            <div role="status" aria-live="polite" aria-atomic="true" className="py-4">
              <div
                className="text-lg font-medium mb-1"
                style={{ color: 'var(--success)' }}
              >
                You&apos;re on the list.
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                We&apos;ll be in touch.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
              <label htmlFor="waitlist-email" className="sr-only">Email address</label>
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@company.com"
                required
                disabled={status === 'loading'}
                className="w-full px-4 py-2.5 rounded text-sm outline-none transition-all duration-150 disabled:opacity-50"
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
              <label htmlFor="waitlist-company" className="sr-only">Company name</label>
              <input
                id="waitlist-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name (optional)"
                disabled={status === 'loading'}
                className="w-full px-4 py-2.5 rounded text-sm outline-none transition-all duration-150 disabled:opacity-50"
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
                <p role="alert" aria-live="assertive" aria-atomic="true" className="text-xs" style={{ color: 'var(--danger)' }}>
                  {errorMsg}
                </p>
              )}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded text-sm font-medium"
                style={{
                  background: 'var(--accent)',
                  color: '#0a0a0a',
                  opacity: status === 'loading' ? 0.65 : 1,
                  transition: 'opacity 150ms ease',
                }}
              >
                {status === 'loading' && (
                  <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                )}
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
