'use client';

const cards = [
  {
    symbol: '//',
    symbolColor: 'var(--blue)',
    title: 'Fragmented data',
    bold: 'GitHub. Discord. Jira. Meetings.',
    body: 'No single source of truth. Every tool knows part of the story. Nobody knows all of it.',
  },
  {
    symbol: '∅',
    symbolColor: 'var(--text-muted)',
    title: 'Invisible work',
    bold: 'Senior contributions go unrecognized.',
    body: 'Managers see output, not impact. The developer who unblocks three teammates produces no metric anyone can see.',
  },
  {
    symbol: '?',
    symbolColor: 'var(--red)',
    title: 'Decisions forgotten',
    bold: 'Decisions made in standups vanish.',
    body: 'Six months later nobody knows why something was built a certain way. The Slack thread is gone. The engineer has left.',
  },
];

export default function Problem() {
  return (
    <section style={{ padding: '160px 0', background: 'var(--bg)' }}>
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
          The Problem
        </p>

        <h2
          className="reveal"
          data-delay="1"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            color: 'var(--white)',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '64px',
          }}
        >
          Engineering teams are flying blind.
        </h2>

        <div
          className="problem-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {cards.map((card, i) => (
            <ProblemCard key={card.title} {...card} delay={i + 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .problem-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProblemCard({
  symbol,
  symbolColor,
  title,
  bold,
  body,
  delay,
}: {
  symbol: string;
  symbolColor: string;
  title: string;
  bold: string;
  body: string;
  delay: number;
}) {
  return (
    <div
      className="reveal"
      data-delay={`${delay}`}
      style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '28px',
        transition: 'border-color 200ms ease, transform 200ms ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-strong)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '20px',
          color: symbolColor,
          marginBottom: '16px',
          lineHeight: 1,
        }}
      >
        {symbol}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: '10px',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--text)',
          marginBottom: '6px',
        }}
      >
        {bold}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
        }}
      >
        {body}
      </p>
    </div>
  );
}
