import Icon from '../Icon.jsx'

const SECTION_ICONS = {
  pengenalan: 'info',
  instalasi: 'terminal',
  konfigurasi: 'settings',
  'tool-wilayah': 'map',
  'tool-weather': 'cloudy_snowing',
  'tool-earthquake': 'warning',
  'tool-kurs': 'payments',
  'tool-statistik': 'query_stats',
  deploy: 'rocket_launch',
  faq: 'help',
}

export default function DocsSidebar({ sections, activeId, onSelect, className = '' }) {
  const groups = sections.reduce((acc, s) => {
    acc[s.group] = acc[s.group] || []
    acc[s.group].push(s)
    return acc
  }, {})

  return (
    <nav className={`flex flex-col gap-xs font-label-md text-label-md ${className}`}>
      {Object.entries(groups).map(([group, items]) => (
        <div key={group} className="mb-5">
          <p className="mb-1.5 px-sm font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant">
            {group}
          </p>
          <div className="flex flex-col gap-xs">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`flex items-center gap-sm rounded-lg p-sm text-left transition-colors duration-150 ${
                  activeId === item.id
                    ? 'bg-primary-container/20 font-bold text-on-primary-container'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <Icon name={SECTION_ICONS[item.id] ?? 'description'} />
                <span className="flex-1 truncate">{item.title}</span>
                {item.badge && (
                  <span className="shrink-0 rounded-full bg-tertiary-container px-1.5 py-0.5 text-[10px] font-semibold text-on-tertiary-container">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}
