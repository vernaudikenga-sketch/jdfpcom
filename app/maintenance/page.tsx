export default function MaintenancePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0d14 0%, #0f1117 50%, #0d1020 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      padding: '24px',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '520px', width: '100%' }}>

        {/* Logo */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '16px',
            padding: '20px 32px',
          }}>
            <span style={{
              fontSize: '28px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '4px',
            }}>JDFP</span>
            <span style={{
              fontSize: '11px',
              color: '#f59e0b',
              fontWeight: 700,
              letterSpacing: '6px',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>Communication</span>
          </div>
        </div>

        {/* Icône */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.25)',
            borderRadius: '50%',
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
        </div>

        {/* Titre */}
        <h1 style={{
          color: '#ffffff',
          fontSize: '32px',
          fontWeight: 800,
          margin: '0 0 12px',
          lineHeight: 1.2,
        }}>
          Site en maintenance
        </h1>

        {/* Barre dorée */}
        <div style={{
          width: '60px',
          height: '3px',
          background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
          borderRadius: '2px',
          margin: '0 auto 24px',
        }} />

        {/* Message */}
        <p style={{
          color: '#9ca3af',
          fontSize: '16px',
          lineHeight: 1.7,
          margin: '0 0 32px',
        }}>
          Notre site est temporairement indisponible pour des raisons de maintenance.
          Nous travaillons à vous offrir une meilleure expérience.
        </p>

        {/* Card contact */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
        }}>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Contactez-nous directement
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="https://wa.me/2438441371O3" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #25d366, #128c7e)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '10px',
              textDecoration: 'none',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp · +243 84 41 37 103
            </a>
            <a href="mailto:infos@pyramide-id.com" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.3)',
              color: '#f59e0b',
              fontWeight: 600,
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '10px',
              textDecoration: 'none',
            }}>
              ✉ infos@pyramide-id.com
            </a>
            <a href="mailto:vernaudikenga@pyramide-id.com" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.3)',
              color: '#f59e0b',
              fontWeight: 600,
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '10px',
              textDecoration: 'none',
            }}>
              ✉ vernaudikenga@pyramide-id.com
            </a>
          </div>
        </div>

        {/* Footer */}
        <p style={{ color: '#374151', fontSize: '12px' }}>
          © 2026 JDFP Communication · Av. Tombalbaye n° A19, Kinshasa/Gombe, RDC
        </p>
      </div>
    </div>
  );
}
