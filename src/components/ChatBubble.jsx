import { useLanguage } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'
import WeatherCard from './cards/WeatherCard.jsx'
import EarthquakeCard from './cards/EarthquakeCard.jsx'
import KursCard from './cards/KursCard.jsx'
import WilayahCard from './cards/WilayahCard.jsx'
import StatistikCard from './cards/StatistikCard.jsx'

const CARD_COMPONENTS = {
  weather: WeatherCard,
  earthquake: EarthquakeCard,
  kurs: KursCard,
  wilayah: WilayahCard,
  statistik: StatistikCard,
}

export default function ChatBubble({ role, content, cards = [] }) {
  const { t } = useLanguage()
  const isUser = role === 'user'

  if (isUser) {
    return (
      <div className="flex w-full animate-fade-in-up flex-col items-end gap-2">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-primary p-sm font-body-md text-body-md text-on-primary shadow-sm md:max-w-[70%] md:p-md">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full animate-fade-in-up flex-col items-start gap-2">
      <div className="ml-1 mb-1 flex items-center gap-2">
        <Icon name="smart_toy" filled className="text-sm text-primary" />
        <span className="font-label-sm text-label-sm text-on-surface-variant">{t('appName')}</span>
      </div>
      <div className="max-w-[95%] whitespace-pre-wrap rounded-2xl rounded-tl-sm border border-outline-variant bg-surface-container-lowest p-sm font-body-md text-body-md text-on-surface shadow-[0px_4px_20px_rgba(0,0,0,0.04)] md:max-w-[80%] md:p-md">
        {content}
        {cards.map((card, i) => {
          const CardComponent = CARD_COMPONENTS[card.type]
          if (!CardComponent) return null
          return <CardComponent key={i} data={card.data} />
        })}
      </div>
    </div>
  )
}
