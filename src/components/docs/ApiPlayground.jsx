import { Suspense, useState } from 'react'
import Icon from '../Icon.jsx'
import { CARD_COMPONENTS } from '../cardRegistry.js'

export default function ApiPlayground({ toolNames, params = [] }) {
  const [selectedTool, setSelectedTool] = useState(toolNames[0])
  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState(null)
  const [error, setError] = useState(null)

  async function run() {
    setLoading(true)
    setError(null)
    setOutput(null)
    try {
      const res = await fetch('/api/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: selectedTool, input: values }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`)
      setOutput(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const CardComponent = output?.card ? CARD_COMPONENTS[output.card.type] : null

  return (
    <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon name="science" className="text-lg text-primary" />
        <h3 className="text-sm font-bold text-on-surface">Try It Live</h3>
      </div>

      {toolNames.length > 1 && (
        <select
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
          className="mb-3 w-full rounded-xl border border-outline-variant/60 bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        >
          {toolNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      )}

      {params.length > 0 && (
        <div className="space-y-3">
          {params.map((p) => (
            <div key={p.name}>
              <label className="mb-1 block text-xs font-semibold text-on-surface-variant">{p.name}</label>
              <input
                value={values[p.name] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [p.name]: e.target.value }))}
                placeholder={p.desc}
                className="w-full rounded-xl border border-outline-variant/60 bg-surface px-3 py-2 text-sm outline-none transition-all placeholder:text-outline/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={run}
        disabled={loading}
        className="mt-4 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon name="play_arrow" className="text-base" />
        {loading ? 'Menjalankan...' : 'Jalankan Test'}
      </button>

      {error && <div className="mt-4 rounded-xl bg-error/10 p-3 text-xs text-error">{error}</div>}

      {output && (
        <div className="mt-4 space-y-3">
          <pre className="max-h-64 overflow-auto rounded-xl bg-inverse-surface p-3 text-xs text-inverse-on-surface">
            {JSON.stringify(output.result, null, 2)}
          </pre>
          {CardComponent && (
            <Suspense fallback={null}>
              <CardComponent data={output.card.data} />
            </Suspense>
          )}
        </div>
      )}
    </div>
  )
}
