import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import Icon from '../components/Icon.jsx'

export default function Beranda() {
  const { t } = useLanguage()

  const categories = [
    { icon: 'cloud', tone: 'sky', title: t('category_weather_title'), description: t('category_weather_desc') },
    { icon: 'payments', tone: 'sun', title: t('category_kurs_title'), description: t('category_kurs_desc') },
    { icon: 'map', tone: 'mint', title: t('category_wilayah_title'), description: t('category_wilayah_desc') },
    { icon: 'bar_chart', tone: 'violet', title: t('category_statistik_title'), description: t('category_statistik_desc') },
  ]

  return (
    <main className="mx-auto flex w-full max-w-container-max flex-col items-center px-base py-lg md:px-md">
      <section className="flex w-full flex-col items-center py-xl text-center">
        <h1 className="mb-sm font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-xl md:text-headline-xl">
          {t('hero_title')}
        </h1>
        <p className="mb-lg max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          {t('hero_subtitle')}
        </p>
        <Link
          to="/chat"
          className="flex items-center gap-xs rounded-lg bg-primary px-lg py-sm font-label-md text-label-md text-on-primary shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-200 hover:bg-primary-container"
        >
          {t('hero_cta')}
          <Icon name="chat" filled />
        </Link>
      </section>

      <section className="w-full py-md">
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.title} {...c} />
          ))}
        </div>
      </section>
    </main>
  )
}
