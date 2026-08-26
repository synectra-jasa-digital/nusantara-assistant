import Icon from './Icon.jsx'

export default function SuggestionChip({ label, icon = 'chat_bubble', onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className="group flex items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-3 text-left shadow-xs transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface-container-low hover:shadow-sm"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
        <Icon name={icon} className="text-base" />
      </div>
      <span className="flex-1 text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">
        {label}
      </span>
      <Icon name="arrow_forward" className="text-xs text-outline opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-primary" />
    </button>
  )
}

