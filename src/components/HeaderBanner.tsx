interface HeaderBannerProps {
  subtitle?: string;
  rightContent?: React.ReactNode;
  compact?: boolean;
}

export default function HeaderBanner({ subtitle, rightContent, compact }: HeaderBannerProps) {
  return (
    <header
      className="header-banner"
      style={{ height: compact ? '56px' : '64px' }}
    >
      {/* Geometric layers */}
      <div className="header-geo-1" />
      <div className="header-geo-2" />
      <div className="header-geo-3" />
      <div className="header-geo-4" />

      {/* Bottom accent line */}
      <div className="header-banner-line" />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          height: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            🎓
          </div>
          <div>
            <h1
              className="font-space"
              style={{
                fontSize: compact ? '16px' : '18px',
                fontWeight: 700,
                color: '#1E293B',
                margin: 0,
                lineHeight: 1.2,
                textShadow: '0 1px 2px rgba(255,255,255,0.5)',
              }}
            >
              Teacher Steve's
            </h1>
            {subtitle && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#64748B',
                  letterSpacing: '0.02em',
                }}
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Right: Custom content */}
        {rightContent && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
}
