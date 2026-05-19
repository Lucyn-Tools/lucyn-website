const sparklineData = [40, 55, 48, 62, 58, 71, 65, 78, 72, 84];

function Sparkline({ data }: { data: number[] }) {
  const width = 80;
  const height = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - 2 - ((v - min) / range) * (height - 4),
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={pathD}
        stroke="#2383e2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MiniBar({ value, max }: { value: number; max: number }) {
  return (
    <div className="flex items-center gap-2 mt-1">
      <div
        className="h-0.5 rounded-full"
        style={{
          width: `${(value / max) * 56}px`,
          backgroundColor: 'var(--accent-blue)',
          opacity: 0.6,
        }}
      />
      <span
        style={{
          color: 'var(--text-faint)',
          fontSize: '10px',
          fontFamily: 'var(--font-geist-mono)',
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function DashboardMockup() {
  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-xl blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(35,131,226,0.14) 0%, transparent 65%)',
          transform: 'scale(1.15)',
          zIndex: 0,
        }}
      />

      {/* Tilted card wrapper */}
      <div
        className="relative"
        style={{
          transform: 'perspective(1200px) rotateX(3deg) rotateY(-2deg)',
          zIndex: 1,
        }}
      >
        <div
          className="rounded-lg overflow-hidden w-full"
          style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-mid)',
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.5)',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--accent-blue)' }}
              />
              <span
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '11px',
                  fontFamily: 'var(--font-geist-mono)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                lucyn
              </span>
            </div>
            <span
              style={{
                color: 'var(--text-faint)',
                fontSize: '10px',
                fontFamily: 'var(--font-geist-mono)',
              }}
            >
              engineering health
            </span>
          </div>

          {/* Metrics */}
          <div className="p-4 flex flex-col gap-3">
            {/* Delivery confidence */}
            <div
              className="flex items-center justify-between p-3 rounded"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
              }}
            >
              <div>
                <div
                  style={{
                    color: 'var(--text-faint)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-geist-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '4px',
                  }}
                >
                  Delivery Confidence
                </div>
                <div
                  style={{
                    color: 'var(--text)',
                    fontSize: '22px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  84%
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Sparkline data={sparklineData} />
                <span
                  style={{
                    color: 'var(--success)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-geist-mono)',
                  }}
                >
                  ↑ +3% this week
                </span>
              </div>
            </div>

            {/* Two-column metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className="p-3 rounded"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    color: 'var(--text-faint)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-geist-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '4px',
                  }}
                >
                  Open PRs
                </div>
                <div
                  style={{ color: 'var(--text)', fontSize: '18px', fontWeight: 700 }}
                >
                  12
                </div>
                <MiniBar value={12} max={20} />
              </div>
              <div
                className="p-3 rounded"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    color: 'var(--text-faint)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-geist-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '4px',
                  }}
                >
                  Risk Signals
                </div>
                <div
                  style={{ color: 'var(--danger)', fontSize: '18px', fontWeight: 700 }}
                >
                  2
                </div>
                <MiniBar value={2} max={10} />
              </div>
            </div>

            {/* Activity log */}
            <div
              className="p-3 rounded"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  color: 'var(--text-faint)',
                  fontSize: '10px',
                  fontFamily: 'var(--font-geist-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '8px',
                }}
              >
                Recent activity
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: 'auth-service merged', time: '12m ago', dot: 'var(--success)' },
                  { label: 'sprint goal updated', time: '1h ago', dot: 'var(--accent-blue)' },
                  { label: 'blocker flagged', time: '3h ago', dot: 'var(--danger)' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.dot }}
                      />
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                        {item.label}
                      </span>
                    </div>
                    <span
                      style={{
                        color: 'var(--text-faint)',
                        fontSize: '10px',
                        fontFamily: 'var(--font-geist-mono)',
                      }}
                    >
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
