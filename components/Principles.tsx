const items = [
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
          Built Different
        </p>

        <h2
          className="reveal"
          data-delay="1"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            color: 'var(--white)',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            maxWidth: '640px',
            margin: '0 auto 80px',
          }}
        >
          The tools you use measure output. Lucyn measures understanding.
        </h2>

        <div
          className="principles-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            columnGap: '64px',
            rowGap: '48px',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              className="reveal"
              data-delay={`${(i % 2) + 1}`}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--white)',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

    <style>{`
      @media (max-width: 600px) {
        .principles-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
    </section>
  );
}
