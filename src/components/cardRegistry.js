import { lazy } from 'react'
import WeatherCard from './cards/WeatherCard.jsx'
import EarthquakeCard from './cards/EarthquakeCard.jsx'
import KursCard from './cards/KursCard.jsx'
import WilayahCard from './cards/WilayahCard.jsx'
import StatistikCard from './cards/StatistikCard.jsx'
import AqiCard from './cards/AqiCard.jsx'

const ChartCard = lazy(() => import('./cards/ChartCard.jsx'))

export const CARD_COMPONENTS = {
  weather: WeatherCard,
  earthquake: EarthquakeCard,
  kurs: KursCard,
  wilayah: WilayahCard,
  statistik: StatistikCard,
  aqi: AqiCard,
  chart: ChartCard,
}
