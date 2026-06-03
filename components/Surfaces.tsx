'use client';

import { type ReactNode } from 'react';

export default function Surfaces() {
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
          Where Lucyn Lives
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
            marginBottom: '12px',
          }}
        >
          One brain. Three surfaces.
        </h2>

        <p
          className="reveal"
          data-delay="2"
          style={{
            fontSize: '16px',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          Lucyn embeds directly into the tools your team already uses.
        </p>

        <div
          className="surfaces-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          <LeadershipCard />
          <DeveloperCard />
          <FullTeamCard />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .surfaces-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function SurfaceCard({
  tag,
  title,
  body,
  children,
  slideFrom,
  delay,
}: {
  tag: string;
  title: string;
  body: string;
  children: ReactNode;
  slideFrom: 'left' | 'center' | 'right';
  delay?: number;
}) {
  const revealClass =
    slideFrom === 'left' ? 'reveal-left' : slideFrom === 'right' ? 'reveal-right' : 'reveal';

  return (
    <div
      className={revealClass}
      data-delay={delay ? `${delay}` : undefined}
      style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '32px',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 200ms ease, transform 200ms ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-strong)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-faint)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}
      >
        {tag}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text)',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          marginBottom: '10px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
          marginBottom: '24px',
          flex: 1,
        }}
      >
        {body}
      </p>
      {children}
    </div>
  );
}

function LeadershipCard() {
  return (
    <SurfaceCard
      tag="Leadership"
      title="Engineering health, in plain English."
      body="Ask Lucyn anything about your org. Delivery risk, workload balance, who owns what — answered in seconds, not sprint reviews."
      slideFrom="left"
    >
      {/* Mini metric cards at 60% scale */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          transform: 'scale(0.88)',
          transformOrigin: 'top left',
          marginTop: '4px',
        }}
      >
        {[
          { label: 'DELIVERY', value: '84%', color: 'var(--white)' },
          { label: 'OPEN PRS', value: '12', color: 'var(--white)' },
          { label: 'RISK', value: '2', color: 'var(--red)' },
        ].map(m => (
          <div
            key={m.label}
            style={{
              flex: 1,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '8px 10px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '8px',
                color: 'var(--text-faint)',
                letterSpacing: '0.06em',
                marginBottom: '4px',
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '18px',
                fontWeight: 600,
                color: m.color,
                lineHeight: 1,
              }}
            >
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}

function DeveloperCard() {
  return (
    <SurfaceCard
      tag="Developers"
      title="Understands what each developer actually does."
      body="Lucyn quietly learns from GitHub and Discord. Builds private, non-punitive knowledge profiles. Helps leadership assign the right work to the right people."
      slideFrom="center"
      delay={1}
    >
      {/* Discord DM mockup */}
      <div
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            L
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--purple)',
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              Lucyn
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                color: 'var(--text)',
                lineHeight: 1.5,
              }}
            >
              Assigned to you: review auth refactor PR. Matches your expertise in the auth module.
            </p>
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

function FullTeamCard() {
  const tree = [
    { indent: 0, name: 'company-brain/', isDir: true },
    { indent: 1, name: 'repos/', isDir: true },
    { indent: 2, name: 'lucyn.md', isDir: false },
    { indent: 1, name: 'developers/', isDir: true },
    { indent: 2, name: 'sarah.md', isDir: false },
    { indent: 1, name: 'sprints/', isDir: true },
    { indent: 2, name: '2026-W22.md', isDir: false },
  ];

  return (
    <SurfaceCard
      tag="Full Team"
      title="The company brain, made visible."
      body="Every decision, every repo, every developer — recorded as structured Markdown. Human-readable, editable, and continuously updated."
      slideFrom="right"
      delay={2}
    >
      <div
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
        }}
      >
        {tree.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '2px 0',
              paddingLeft: `${item.indent * 14}px`,
              color: item.isDir ? 'var(--text-muted)' : 'var(--text)',
            }}
          >
            {!item.isDir && (
              <span style={{ color: 'var(--green)', fontSize: '7px', lineHeight: 1 }}>●</span>
            )}
            {item.isDir && <span style={{ opacity: 0, fontSize: '7px' }}>●</span>}
            {item.name}
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}
