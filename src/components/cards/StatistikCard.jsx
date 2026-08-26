import Icon from '../Icon.jsx'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function StatistikCard({ data }) {
  const { t } = useLanguage()

  return (
    <div className="relative mt-3 w-full overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#00658d 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      />
      <div className="relative z-10 flex flex-col">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-lg bg-primary-container/20 p-2 text-primary">
            <Icon name="analytics" />
          </span>
          <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
            {data.indicator}
          </span>
        </div>
        <span className="mb-1 font-headline-xl text-headline-xl font-bold text-primary">{data.value}</span>
        {data.unit && <span className="font-body-lg text-body-lg text-on-surface-variant">{data.unit}</span>}
        <div className="mt-6 flex w-full items-center justify-between border-t border-outline-variant pt-4">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-outline">{t('card_region')}</span>
            <span className="font-label-md text-label-md text-on-surface">{data.region ?? 'Indonesia'}</span>
          </div>
          {data.period && (
            <div className="flex flex-col text-right">
              <span className="font-label-sm text-label-sm text-outline">{t('card_period')}</span>
              <span className="font-label-md text-label-md text-on-surface">{data.period}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
