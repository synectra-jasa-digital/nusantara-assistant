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
    <nav className={`flex flex-col gap-4 text-xs font-medium ${className}`}>
      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-outline">
            {group}
          </p>
          <div className="flex flex-col gap-1">
            {items.map((item) => {
              const isActive = activeId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 font-bold text-primary shadow-xs ring-1 ring-primary/20'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <Icon
                    name={SECTION_ICONS[item.id] ?? 'description'}
                    className={`text-base transition-transform group-hover:scale-110 ${
                      isActive ? 'text-primary' : 'text-outline'
                    }`}
                  />
                  <span className="flex-1 truncate">{item.title}</span>
                  {item.badge && (
                    <span className="shrink-0 rounded-full bg-secondary-fixed/50 px-1.5 py-0.5 text-[10px] font-bold text-secondary">
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}

