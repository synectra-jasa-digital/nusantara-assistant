function levelFor(aqi) {
  if (aqi <= 50) return { label: 'Baik', dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-500/10' }
  if (aqi <= 150) return { label: 'Sedang', dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-500/10' }
  return { label: 'Berbahaya', dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-500/10' }
}

export default function AqiCard({ data }) {
  const level = levelFor(data.aqi)

  return (
    <div className="mt-3 flex w-full items-center gap-4 rounded-xl border border-outline-variant bg-surface-bright p-md">
      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${level.bg}`}>
        <span className={`text-2xl font-bold ${level.text}`}>{data.aqi}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${level.dot}`} />
          <span className={`font-label-md text-label-md font-semibold ${level.text}`}>{level.label}</span>
        </div>
        <p className="mt-1 font-body-md text-body-md text-on-surface">
          {data.city}, {data.state}
        </p>
        {data.main_pollutant && (
          <p className="font-label-sm text-label-sm text-on-surface-variant">Polutan utama: {data.main_pollutant}</p>
        )}
      </div>
    </div>
  )
}
