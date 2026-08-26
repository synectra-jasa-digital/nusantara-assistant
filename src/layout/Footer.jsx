import { useLanguage } from '../i18n/LanguageContext.jsx'

const SOURCES = [
  { name: 'BMKG', url: 'https://data.bmkg.go.id/' },
  { name: 'Bank Indonesia', url: 'https://www.bi.go.id/biwebservice/wskursbi.asmx' },
  { name: 'wilayah.id', url: 'https://wilayah.id/' },
  { name: 'BPS WebAPI', url: 'https://webapi.bps.go.id/developer/' },
]

const LINKS = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Dokumentasi', url: '/docs' },
  { name: 'Privasi', url: '#' },
  { name: 'Syarat', url: '#' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-auto w-full border-t border-outline-variant/40 bg-surface-container-low/70 py-6 text-sm">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-4 px-base md:flex-row md:px-md">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-on-surface-variant md:justify-start">
          <span className="font-semibold text-on-surface">{t('footer_source')}:</span>
          {SOURCES.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-primary shadow-xs ring-1 ring-outline-variant/40 transition-all hover:bg-primary hover:text-on-primary hover:ring-primary"
            >
              {s.name}
            </a>
          ))}
        </div>

        <nav className="flex flex-wrap justify-center gap-4 text-xs font-medium text-on-surface-variant">
          {LINKS.map((l) => (
            <a
              key={l.name}
              href={l.url}
              target={l.url.startsWith('http') ? '_blank' : undefined}
              rel={l.url.startsWith('http') ? 'noreferrer' : undefined}
              className="transition-colors hover:text-primary hover:underline"
            >
              {l.name}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

