const TONES = {
  sky: 'bg-primary/10 text-primary ring-primary/20',
  sun: 'bg-amber-500/10 text-amber-600 ring-amber-500/20',
  mint: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20',
  violet: 'bg-purple-500/10 text-purple-600 ring-purple-500/20',
}

export default function CategoryCard({ icon, title, description, tone = 'sky', style }) {
  return (
    <div
      style={style}
      className="group flex flex-col items-start rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-primary/40"
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ring-1 transition-all duration-300 group-hover:scale-110 ${TONES[tone]}`}
      >
        <span className="material-symbols-outlined text-[26px]">{icon}</span>
      </div>
      <h3 className="mb-2 text-base font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-xs leading-relaxed text-on-surface-variant">{description}</p>
    </div>
  )
}

