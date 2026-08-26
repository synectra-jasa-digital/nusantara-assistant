import Icon from '../Icon.jsx'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

// Expects `data` shaped like the parsed BMKG prakiraan-cuaca payload:
// { location, datetime, weather_desc, temperature, humidity, wind_speed }
export default function WeatherCard({ data }) {
  const { t } = useLanguage()

  return (
    <div className="mt-3 flex w-full flex-col items-center gap-6 rounded-xl border border-outline-variant bg-surface-bright p-md md:flex-row">
      <div className="flex flex-col items-center justify-center border-outline-variant pr-0 md:border-r md:pr-6">
        <Icon name="sunny" filled className="mb-2 text-5xl text-secondary" />
        <span className="font-headline-xl text-headline-xl text-on-surface">
          {data.temperature != null ? `${data.temperature}°` : '-'}
        </span>
        <span className="font-label-md text-label-md text-on-surface-variant">{data.weather_desc}</span>
      </div>
      <div className="grid w-full flex-1 grid-cols-2 gap-4">
        <div>
          <span className="mb-1 block font-label-sm text-label-sm text-outline">{t('card_humidity')}</span>
          <span className="flex items-center gap-1 font-body-md text-body-md text-on-surface">
            <Icon name="water_drop" className="text-sm text-primary" />
            {data.humidity ?? '-'}%
          </span>
        </div>
        <div>
          <span className="mb-1 block font-label-sm text-label-sm text-outline">{t('card_wind')}</span>
          <span className="flex items-center gap-1 font-body-md text-body-md text-on-surface">
            <Icon name="air" className="text-sm text-primary" />
            {data.wind_speed ?? '-'} km/h
          </span>
        </div>
        {data.location && (
          <div className="col-span-2">
            <span className="mb-1 block font-label-sm text-label-sm text-outline">{t('card_location')}</span>
            <span className="font-body-md text-body-md text-on-surface">{data.location}</span>
          </div>
        )}
        {data.datetime && (
          <div className="col-span-2">
            <span className="mb-1 block font-label-sm text-label-sm text-outline">{t('card_updated')}</span>
            <span className="font-body-md text-body-md text-on-surface">{data.datetime}</span>
          </div>
        )}
      </div>
    </div>
  )
}
