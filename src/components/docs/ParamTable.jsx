import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function ParamTable({ params }) {
  const { t } = useLanguage()
  if (!params?.length) return null

  return (
    <div className="mt-3 overflow-x-auto rounded-lg border border-outline-variant shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-surface-container-low font-label-md text-label-md text-on-surface">
            <th className="border-b border-outline-variant p-sm font-bold">{t('docs_param_name')}</th>
            <th className="border-b border-outline-variant p-sm font-bold">{t('docs_param_type')}</th>
            <th className="border-b border-outline-variant p-sm font-bold">{t('docs_param_desc')}</th>
          </tr>
        </thead>
        <tbody className="bg-surface-container-lowest font-body-md text-body-md">
          {params.map((p) => (
            <tr key={p.name} className="border-b border-surface-variant last:border-b-0">
              <td className="whitespace-nowrap p-sm font-mono text-sm text-primary">{p.name}</td>
              <td className="whitespace-nowrap p-sm text-sm text-outline">{p.type}</td>
              <td className="p-sm text-sm text-on-surface-variant">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
