import { ContentSection, ContentBlock } from '../data/lessons';

interface ContentRendererProps {
  content: ContentSection;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div>
      <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
        {content.subtitle}
      </p>
      {content.blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'table':
      return (
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <table className="lesson-table">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>
                      {ci === 0 ? <strong style={{ color: '#1E293B' }}>{cell}</strong> :
                       ci === 1 ? <span className="font-mono" style={{ fontSize: '12px', color: '#E65100', fontWeight: 500 }}>{cell}</span> :
                       <span style={{ color: '#64748B', fontStyle: 'italic', fontSize: '13px' }}>{cell}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'callout':
      return (
        <div
          className={`callout callout-${block.variant}`}
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );

    case 'scale':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '16px 0' }}>
          {block.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="font-space" style={{ fontSize: '13px', fontWeight: 600, minWidth: '120px', color: item.color }}>
                {item.label}
              </span>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.5)', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{ height: '100%', borderRadius: '999px', transition: 'width 0.7s ease', width: `${item.value}%`, background: item.color }}
                />
              </div>
              <span style={{ fontSize: '12px', color: '#64748B', minWidth: '40px', textAlign: 'right' }}>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      );

    case 'text':
      return <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.7, margin: '12px 0' }}>{block.content}</p>;

    case 'comparison':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '16px 0' }}>
          {block.items.map((item, i) => (
            <div key={i} className="card" style={{ padding: '16px' }}>
              <div className="font-space" style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                {item.label}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{
                  fontSize: '14px',
                  color: '#ef4444',
                  background: 'rgba(239,68,68,0.06)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  border: '1px solid rgba(239,68,68,0.15)',
                }}>
                  {item.left}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#10b981',
                  background: 'rgba(16,185,129,0.06)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  border: '1px solid rgba(16,185,129,0.15)',
                }}>
                  {item.right}
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
