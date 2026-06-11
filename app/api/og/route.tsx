import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Transformation Numérique · Grand-Congo';
  const sub = searchParams.get('sub') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f1117 0%, #141820 60%, #1e2535 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top gold bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #fbbf24, #f59e0b)' }} />

        {/* JDFP wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 88, fontWeight: 900, color: '#ffffff', letterSpacing: 20, lineHeight: 1 }}>JDFP</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fbbf24', letterSpacing: 10, textTransform: 'uppercase', marginTop: 4 }}>Communication</div>
        </div>

        {/* Title */}
        <div style={{ fontSize: 30, fontWeight: 700, color: '#ffffff', textAlign: 'center', maxWidth: 860, lineHeight: 1.3, paddingLeft: 40, paddingRight: 40 }}>
          {title}
        </div>

        {sub && (
          <div style={{ marginTop: 16, fontSize: 20, color: 'rgba(255,255,255,0.55)', textAlign: 'center', maxWidth: 700, lineHeight: 1.4 }}>
            {sub}
          </div>
        )}

        {/* Service pills */}
        <div style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap', justifyContent: 'center', paddingLeft: 40, paddingRight: 40 }}>
          {['Services IT', 'Visas', 'Véhicules VIP', 'Régie Pub', 'IA'].map((s) => (
            <div
              key={s}
              style={{
                padding: '8px 18px',
                background: 'rgba(251,191,36,0.08)',
                border: '1px solid rgba(251,191,36,0.25)',
                borderRadius: 8,
                color: '#fbbf24',
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Bottom domain */}
        <div style={{ position: 'absolute', bottom: 28, fontSize: 16, color: 'rgba(255,255,255,0.25)', letterSpacing: 2 }}>
          jdfp-communication.com
        </div>

        {/* Bottom gold bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
