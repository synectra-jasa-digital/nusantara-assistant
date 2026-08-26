import Icon from '../Icon.jsx'

export default function WilayahCard({ data }) {
  return (
    <div className="mt-3 w-full rounded-xl border border-outline-variant bg-surface-bright p-sm">
      {data.breadcrumb?.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {data.breadcrumb.map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-2">
              {i > 0 && <Icon name="chevron_right" className="text-outline" />}
              <span
                className={`rounded-lg border px-3 py-1.5 font-label-md text-label-md ${
                  i === data.breadcrumb.length - 1
                    ? 'border-primary-container/30 bg-primary-container/20 text-on-primary-container'
                    : 'border-outline-variant/50 bg-surface-container text-on-surface-variant'
                }`}
              >
                {crumb}
              </span>
            </span>
          ))}
        </div>
      )}
      <p className="font-body-md text-body-md text-on-surface-variant">
        {data.level} <strong className="text-on-surface">{data.name}</strong>
      </p>
      <p className="mt-2 inline-block rounded-md bg-primary-container/10 px-2 py-1 font-mono text-[11px] text-primary">
        {data.code}
      </p>
    </div>
  )
}
