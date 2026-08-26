import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import Icon from '../components/Icon.jsx'

export default function Beranda() {
  const { t } = useLanguage()

  const categories = [
    { icon: 'cloudy_snowing', tone: 'sky', title: t('category_weather_title'), description: t('category_weather_desc') },
    { icon: 'payments', tone: 'sun', title: t('category_kurs_title'), description: t('category_kurs_desc') },
    { icon: 'map', tone: 'mint', title: t('category_wilayah_title'), description: t('category_wilayah_desc') },
    { icon: 'bar_chart', tone: 'violet', title: t('category_statistik_title'), description: t('category_statistik_desc') },
  ]

  return (
    <main className="relative mx-auto flex w-full max-w-container-max flex-col items-center px-base py-8 md:px-md md:py-16">
      {/* Background Decorative Glow */}
      <div className="absolute top-10 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-container/20 blur-3xl" />

      {/* Hero Section */}
      <section className="flex w-full max-w-4xl flex-col items-center text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary shadow-xs">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span>Asisten Data Publik Indonesia</span>
        </div>

        <h1 className="mb-6 font-sans text-3xl font-extrabold tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
          Akses Informasi Nusantara{' '}
          <span className="text-gradient">Secara Cerdas & Cepat</span>
        </h1>

        <p className="mb-8 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
          {t('hero_subtitle')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/chat"
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-badge px-6 py-3.5 text-sm font-bold text-on-primary shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/35 active:scale-95"
          >
            <span>{t('hero_cta')}</span>
            <Icon name="chat" filled className="text-lg transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-6 py-3.5 text-sm font-bold text-on-surface transition-all duration-200 hover:border-primary hover:bg-surface-container-low"
          >
            <Icon name="description" className="text-lg text-primary" />
            <span>Dokumentasi API</span>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mt-16 w-full">
        <div className="mb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-wider text-outline">Sumber Data Terintegrasi</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.title} {...c} />
          ))}
        </div>
      </section>
    </main>
  )
}

