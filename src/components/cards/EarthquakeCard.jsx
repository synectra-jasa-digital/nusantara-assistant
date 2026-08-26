import Icon from '../Icon.jsx'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

// Expects the shape returned by BMKG's autogempa/gempaterkini JSON:
// { Tanggal, Jam, Magnitude, Kedalaman, Wilayah, Potensi }
export default function EarthquakeCard({ data }) {
  const { t } = useLanguage()

  return (
    <div className="mt-3 w-full overflow-hidden rounded-xl border border-outline-variant">
      <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-low px-md py-3">
        <div className="flex items-center gap-2">
          <Icon name="warning" filled className="text-tertiary" />
          <span className="font-label-md text-label-md text-on-surface">{t('card_earthquake')}</span>
        </div>
        <span className="rounded-full bg-tertiary-container px-2 py-1 font-label-sm text-label-sm text-on-tertiary-container">
          M {data.Magnitude}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-surface-bright p-md">
        <div className="col-span-2">
          <span className="mb-1 block font-label-sm text-label-sm text-outline uppercase tracking-wider">
            {t('card_region')}
          </span>
          <span className="block font-headline-md text-headline-md text-on-surface">{data.Wilayah}</span>
        </div>
        <div>
          <span className="mb-1 block font-label-sm text-label-sm text-outline">{t('card_depth')}</span>
          <span className="font-body-md text-body-md text-on-surface">{data.Kedalaman}</span>
        </div>
        <div>
          <span className="mb-1 block font-label-sm text-label-sm text-outline">{t('card_time')}</span>
          <span className="font-body-md text-body-md text-on-surface">
            {data.Tanggal} {data.Jam}
          </span>
        </div>
        {data.Potensi && (
          <p className="col-span-2 flex items-center gap-1 font-label-sm text-label-sm text-tertiary">
            <Icon name="info" className="text-sm" />
            {data.Potensi}
          </p>
        )}
      </div>
    </div>
  )
}
