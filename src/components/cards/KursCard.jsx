import Icon from '../Icon.jsx'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function KursCard({ data }) {
  const { t } = useLanguage()

  return (
    <div className="mt-3 w-full overflow-hidden rounded-xl border border-outline-variant">
      <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-md py-3">
        <div className="flex items-center gap-2">
          <Icon name="attach_money" className="text-primary" />
          <span className="font-label-md text-label-md text-on-surface">{data.currency}/IDR</span>
        </div>
        <span className="rounded bg-surface-container px-2 py-1 font-label-sm text-label-sm text-on-surface-variant">
          {data.source ?? 'JISDOR'}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-6 bg-surface-bright p-md">
        <div>
          <span className="mb-1 block font-label-sm text-label-sm uppercase tracking-wider text-outline">
            {t('card_buy')}
          </span>
          <span className="block font-headline-lg text-headline-lg text-on-surface">{data.buy ?? '-'}</span>
        </div>
        <div className="border-l border-outline-variant pl-6">
          <span className="mb-1 block font-label-sm text-label-sm uppercase tracking-wider text-outline">
            {t('card_sell')}
          </span>
          <span className="block font-headline-lg text-headline-lg text-on-surface">{data.sell ?? '-'}</span>
        </div>
      </div>
      {data.date && (
        <p className="border-t border-outline-variant bg-surface-bright px-md pb-3 font-label-sm text-label-sm text-outline">
          {data.date}
        </p>
      )}
    </div>
  )
}
