'use client';

import { motion } from 'framer-motion';
import { GitBranch, EyeOff, MessageSquareOff } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProblemCard {
  icon: LucideIcon;
  title: string;
  statement: string;
  sentence: string;
}

const problems: ProblemCard[] = [
  {
    icon: GitBranch,
    title: 'Fragmented data',
    statement: 'GitHub. Discord. Jira. Meetings.',
    sentence: 'No single source of truth.',
  },
  {
    icon: EyeOff,
    title: 'Invisible work',
    statement: 'Senior contributions go unrecognized.',
    sentence: 'Managers see output, not impact.',
  },
  {
    icon: MessageSquareOff,
    title: 'Meetings forgotten',
    statement: 'Decisions made in standups vanish.',
    sentence: 'Nobody follows up. Nothing ships.',
  },
];

export default function Problem() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-16 text-center"
          style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
        >
          Engineering teams are flying blind.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="p-6 rounded card-border"
              style={{ background: 'var(--bg-subtle)' }}
            >
              <item.icon
                size={20}
                className="mb-4"
                style={{ color: 'var(--accent-blue)' }}
              />
              <h3
                className="font-semibold mb-2 text-base"
                style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
              >
                {item.title}
              </h3>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                {item.statement}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.sentence}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
