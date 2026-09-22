interface HeaderProps {
  timeDisplay: string;
  progress: number;
}

export default function Header({ timeDisplay, progress }: HeaderProps) {
  return (
    <>
      <header className="bg-[var(--navy2)] border-b border-[var(--border)] px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex flex-col gap-0.5">
          <span className="font-space text-[11px] text-[var(--blue-light)] font-medium tracking-wider uppercase">
            B2 English · 50 min
          </span>
          <span className="font-space text-base sm:text-[17px] font-bold text-[var(--text)]">
            Conditionals, Probability & Modal Verbs
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[var(--blue-glow)] border border-[rgba(59,130,246,0.3)] rounded-full px-3.5 py-1 text-[13px] font-medium text-[var(--blue-light)]">
            Nicolas
          </span>
          <span className="font-space text-[15px] font-semibold text-[var(--text-muted)] min-w-[48px] text-right">
            {timeDisplay}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-[3px] bg-[var(--border)]">
        <div
          className="h-full bg-gradient-to-r from-[var(--blue)] to-[var(--blue-light)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}
