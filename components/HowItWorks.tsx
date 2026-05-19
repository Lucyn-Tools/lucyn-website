'use client';

import { motion } from 'framer-motion';
import { Monitor, MessageCircle, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Surface {
  icon: LucideIcon;
  label: string;
  title: string;
  body: string;
}

const surfaces: Surface[] = [
  {
    icon: Monitor,
    label: 'LEADERSHIP',
    title: 'Engineering health, in plain English.',
    body: 'Ask Lucyn anything about your org. Delivery risk, workload balance, who owns what — answered in seconds, not sprint reviews.',
  },
  {
    icon: MessageCircle,
    label: 'DEVELOPERS',
    title: 'Understands what each developer actually does.',
    body: 'Lucyn quietly learns from GitHub and Discord activity. Builds private, non-punitive profiles. Helps leadership assign the right work to the right people.',
  },
  {
    icon: Video,
    label: 'FULL TEAM',
    title: 'Meetings that actually produce output.',
    body: 'Lucyn joins your SCRUM calls, extracts goals and blockers, and posts structured summaries back to the dashboard. Nothing gets lost.',
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background: 'var(--bg-subtle)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
          >
            One agent. Three surfaces.
          </h2>
          <p className="text-base" style={{ color: 'var(--text-muted)' }}>
            Lucyn embeds directly into the tools your team already uses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {surfaces.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="p-6 rounded flex flex-col gap-3 card-border-mid"
              style={{ background: 'var(--bg)' }}
            >
              <card.icon size={20} style={{ color: 'var(--accent-blue)' }} />
              <span
                style={{
                  color: 'var(--text-faint)',
                  fontSize: '10px',
                  fontFamily: 'var(--font-geist-mono)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {card.label}
              </span>
              <h3
                className="font-semibold text-base leading-snug"
                style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
