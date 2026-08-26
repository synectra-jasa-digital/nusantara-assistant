import { Suspense, lazy } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'
import WeatherCard from './cards/WeatherCard.jsx'
import EarthquakeCard from './cards/EarthquakeCard.jsx'
import KursCard from './cards/KursCard.jsx'
import WilayahCard from './cards/WilayahCard.jsx'
import StatistikCard from './cards/StatistikCard.jsx'

const ChartCard = lazy(() => import('./cards/ChartCard.jsx'))

const CARD_COMPONENTS = {
  weather: WeatherCard,
  earthquake: EarthquakeCard,
  kurs: KursCard,
  wilayah: WilayahCard,
  statistik: StatistikCard,
  chart: ChartCard,
}

export default function ChatBubble({ role, content, cards = [] }) {
  const { t } = useLanguage()
  const isUser = role === 'user'

  if (isUser) {
    return (
      <div className="flex w-full animate-fade-in-up flex-col items-end gap-1.5 my-2">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-xs bg-gradient-badge px-4 py-3 text-sm text-on-primary shadow-md shadow-primary/15 sm:max-w-[70%] sm:px-5 sm:py-3.5">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full animate-fade-in-up flex-col items-start gap-1.5 my-2">
      <div className="ml-1 flex items-center gap-2 text-xs font-semibold text-primary">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon name="smart_toy" filled className="text-sm" />
        </div>
        <span>{t('appName')}</span>
      </div>
      <div className="max-w-[95%] whitespace-pre-wrap rounded-2xl rounded-tl-xs border border-outline-variant/60 bg-surface-container-lowest p-4 text-sm text-on-surface shadow-sm sm:max-w-[80%] sm:p-5">
        <div className="leading-relaxed">{content}</div>
        {cards.map((card, i) => {
          const CardComponent = CARD_COMPONENTS[card.type]
          if (!CardComponent) return null
          return (
            <div key={i} className="mt-3">
              <Suspense fallback={null}>
                <CardComponent data={card.data} />
              </Suspense>
            </div>
          )
        })}
      </div>
    </div>
  )
}

