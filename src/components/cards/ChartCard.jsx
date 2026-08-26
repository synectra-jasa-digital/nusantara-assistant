import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function ChartCard({ data }) {
  const series = data.series ?? []

  return (
    <div className="mt-3 w-full rounded-xl border border-outline-variant bg-surface-bright p-md">
      <p className="mb-3 font-label-md text-label-md font-semibold text-on-surface">
        {data.title}
        {data.unit ? ` (${data.unit})` : ''}
      </p>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e5" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#3d4850' }} />
            <YAxis tick={{ fontSize: 12, fill: '#3d4850' }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, borderColor: '#bdc8d2', fontSize: 12 }}
              formatter={(value) => [`${value}${data.unit ? ` ${data.unit}` : ''}`, data.title]}
            />
            <Bar dataKey="value" fill="#00658d" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
