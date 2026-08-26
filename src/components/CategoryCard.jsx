const TONES = {
  sky: 'bg-primary-fixed text-primary',
  sun: 'bg-secondary-fixed text-secondary',
  mint: 'bg-primary-container/20 text-primary-container',
  violet: 'bg-tertiary-fixed text-tertiary',
}

export default function CategoryCard({ icon, title, description, tone = 'sky', style }) {
  return (
    <div
      style={style}
      className="group flex animate-fade-in-up flex-col items-start rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
    >
      <div
        className={`mb-sm flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110 ${TONES[tone]}`}
      >
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
      </div>
      <h3 className="mb-xs font-headline-md text-headline-md text-on-background">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant">{description}</p>
    </div>
  )
}
