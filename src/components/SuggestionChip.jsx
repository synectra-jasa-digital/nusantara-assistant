import Icon from './Icon.jsx'

export default function SuggestionChip({ label, icon = 'chat_bubble', onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className="group flex items-center gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-left transition-colors hover:border-primary hover:bg-surface"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container/20 text-primary transition-colors group-hover:bg-primary-container/40">
        <Icon name={icon} />
      </div>
      <span className="flex-1 font-label-md text-label-md text-on-surface">{label}</span>
      <Icon name="arrow_forward" className="text-sm text-outline-variant transition-colors group-hover:text-primary" />
    </button>
  )
}
