export default function Pill({ children, className = '' }) {
  return (
    <span
      className={`inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 backdrop-blur-sm ${className}`}
    >
      {children}
    </span>
  )
}
