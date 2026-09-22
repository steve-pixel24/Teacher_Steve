import { ContentSection, ContentBlock } from '../data/lessons';

interface ContentRendererProps {
  content: ContentSection;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
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
        <div className="overflow-x-auto my-4">
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
                      {ci === 0 ? <strong>{cell}</strong> :
                       ci === 1 ? <span className="font-mono text-xs text-[var(--blue-light)]">{cell}</span> :
                       <span className="text-[var(--text-muted)] italic text-[13px]">{cell}</span>}
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
        <div className="flex flex-col gap-3 my-4">
          {block.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="font-space text-sm font-semibold min-w-[120px]" style={{ color: item.color }}>
                {item.label}
              </span>
              <div className="flex-1 h-2 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${item.value}%`, background: item.color }}
                />
              </div>
              <span className="text-xs text-[var(--text-muted)] min-w-[40px] text-right">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      );

    case 'text':
      return <p className="text-sm text-[var(--text-muted)] leading-relaxed my-3">{block.content}</p>;

    case 'comparison':
      return (
        <div className="flex flex-col gap-3 my-4">
          {block.items.map((item, i) => (
            <div key={i} className="card p-4">
              <div className="text-xs font-space font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                {item.label}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="text-sm text-[#f87171] bg-[rgba(239,68,68,0.06)] rounded-lg px-3 py-2">
                  {item.left}
                </div>
                <div className="text-sm text-[var(--green-light)] bg-[rgba(16,185,129,0.06)] rounded-lg px-3 py-2">
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
