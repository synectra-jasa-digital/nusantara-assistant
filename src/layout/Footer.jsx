import { useLanguage } from '../i18n/LanguageContext.jsx'

const SOURCES = [
  { name: 'BMKG', url: 'https://data.bmkg.go.id/' },
  { name: 'Bank Indonesia (wsKursBI)', url: 'https://www.bi.go.id/biwebservice/wskursbi.asmx' },
  { name: 'wilayah.id', url: 'https://wilayah.id/' },
  { name: 'BPS WebAPI', url: 'https://webapi.bps.go.id/developer/' },
]

const LINKS = [
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'Documentation', url: '/docs' },
  { name: 'Privacy Policy', url: '#' },
  { name: 'Terms', url: '#' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="mt-auto w-full border-t border-outline-variant bg-surface-container py-md">
      <div className="mx-auto flex max-w-container-max flex-col items-center gap-sm px-base md:flex-row md:justify-between md:px-md">
        <div className="font-label-sm text-label-sm text-on-surface-variant">
          <span className="font-semibold text-on-surface">{t('footer_source')}: </span>
          {SOURCES.map((s, i) => (
            <span key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="text-primary underline hover:opacity-80">
                {s.name}
              </a>
              {i < SOURCES.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>

        <nav className="flex flex-wrap justify-center gap-md font-label-sm text-label-sm">
          {LINKS.map((l) => (
            <a
              key={l.name}
              href={l.url}
              target={l.url.startsWith('http') ? '_blank' : undefined}
              rel={l.url.startsWith('http') ? 'noreferrer' : undefined}
              className="text-on-surface-variant underline transition-opacity duration-200 hover:text-primary"
            >
              {l.name}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
