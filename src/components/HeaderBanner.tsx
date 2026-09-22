interface HeaderBannerProps {
  subtitle?: string;
  rightContent?: React.ReactNode;
  compact?: boolean;
}

export default function HeaderBanner({ subtitle, rightContent, compact }: HeaderBannerProps) {
  return (
    <header
      className="header-banner"
      style={{ height: compact ? '56px' : '72px' }}
    >
      {/* Geometric layers - clean overlapping diagonal blocks at 45° */}
      <div className="header-geo-1" />
      <div className="header-geo-2" />
      <div className="header-geo-3" />
      <div className="header-geo-4" />
      <div className="header-geo-5" />

      {/* Bottom accent line */}
      <div className="header-banner-line" />

      {/* Centered content */}
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
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            🎓
          </div>
          <h1
            className="font-space"
            style={{
              fontSize: compact ? '20px' : '26px',
              fontWeight: 700,
              color: '#1E293B',
              margin: 0,
              lineHeight: 1.2,
              textShadow: '0 1px 2px rgba(255,255,255,0.5)',
              letterSpacing: '-0.02em',
            }}
          >
            Teacher Steve's
          </h1>
          {subtitle && (
            <span
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#64748B',
                letterSpacing: '0.02em',
                marginLeft: '8px',
              }}
            >
              {subtitle}
            </span>
          )}
        </div>

        {/* Right content - absolutely positioned */}
        {rightContent && (
          <div style={{
            position: 'absolute',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
}
