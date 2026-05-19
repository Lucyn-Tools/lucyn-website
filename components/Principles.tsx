'use client';

import { motion } from 'framer-motion';

interface Principle {
  title: string;
  body: string;
}

const principles: Principle[] = [
  {
    title: 'Acts, not reports',
    body: 'Existing tools analyze your data. Lucyn does something with it.',
  },
  {
    title: 'Private by design',
    body: 'Developer data is never shown to managers. Non-punitive. Always.',
  },
  {
    title: 'Human in the loop',
    body: 'Every suggestion needs approval. Lucyn recommends. You decide.',
  },
  {
    title: 'Gets smarter over time',
    body: 'The longer Lucyn runs, the better it understands your org.',
  },
];

export default function Principles() {
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
          Built different.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
          {principles.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3
                className="font-semibold mb-2 text-base"
                style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
