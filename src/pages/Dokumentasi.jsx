import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { useAutoTranslate } from '../i18n/useAutoTranslate.js'
import { docsSections } from '../data/docsContent.js'
import DocsSidebar from '../components/docs/DocsSidebar.jsx'
import CodeBlock from '../components/docs/CodeBlock.jsx'
import ParamTable from '../components/docs/ParamTable.jsx'
import Icon from '../components/Icon.jsx'

export default function Dokumentasi() {
  const { t } = useLanguage()
  const [activeId, setActiveId] = useState(docsSections[0].id)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [query, setQuery] = useState('')

  const active = docsSections.find((s) => s.id === activeId) ?? docsSections[0]
  const filtered = query
    ? docsSections.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()))
    : docsSections

  const paramDescs = active.params?.map((p) => p.desc) ?? []
  const sourceTexts = [active.title, ...active.body, ...paramDescs]
  const translated = useAutoTranslate(sourceTexts)
  const [title, ...rest] = translated
  const body = rest.slice(0, active.body.length)
  const params = active.params?.map((p, i) => ({ ...p, desc: rest[active.body.length + i] }))

  function selectSection(id) {
    setActiveId(id)
    setMobileNavOpen(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-container-max flex-col">
      <div className="sticky top-16 z-30 flex items-center justify-between border-b border-outline-variant/40 bg-surface/90 px-base py-2.5 backdrop-blur-md md:hidden">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all active:scale-95"
        >
          <Icon name="topic" className="text-base" />
          <span>{title}</span>
          <Icon name="unfold_more" className="text-sm opacity-70" />
        </button>

        <Link
          to="/chat"
          className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:underline"
        >
          <span>{t('docs_back_chat')}</span>
          <Icon name="arrow_forward" className="text-sm" />
        </Link>
      </div>

      <div className="flex flex-1">
        {mobileNavOpen && (
          <div
            className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-xs transition-opacity md:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-80 flex-col bg-surface p-4 shadow-2xl transition-transform duration-300 md:sticky md:top-16 md:z-0 md:h-[calc(100vh-64px)] md:w-72 md:translate-x-0 md:border-r md:border-outline-variant/40 md:bg-surface-container-low/50 md:shadow-none ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-4 flex items-center justify-between px-2">
            <div>
              <h2 className="text-lg font-bold text-primary">{t('docs_title')}</h2>
              <p className="text-xs text-on-surface-variant">{t('docs_subtitle')}</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant md:hidden"
            >
              <Icon name="close" className="text-lg" />
            </button>
          </div>

          <div className="relative mb-4">
            <Icon name="search" className="absolute left-3 top-2.5 text-lg text-outline" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('docs_search_placeholder')}
              className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest py-2 pl-9 pr-3 text-xs outline-none transition-all placeholder:text-outline/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-2.5 text-xs text-outline hover:text-on-surface"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto pr-1">
            <DocsSidebar sections={filtered} activeId={activeId} onSelect={selectSection} />
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-base sm:p-md md:p-lg lg:p-xl">
          <div className="mb-4 flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="font-medium text-outline">{t('docs_title')}</span>
            <Icon name="chevron_right" className="text-xs" />
            <span className="font-semibold text-primary">{title}</span>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-on-surface sm:text-3xl lg:text-4xl">
              {title}
            </h1>
            {active.badge && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-primary/20">
                {active.badge}
              </span>
            )}
          </div>

          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-on-surface-variant sm:text-base">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {params && (
            <section className="mt-10">
              <h2 className="mb-3 flex items-center gap-2 border-b border-outline-variant/40 pb-2 text-lg font-bold text-primary">
                <Icon name="tune" className="text-lg" />
                <span>{t('docs_params_heading')}</span>
              </h2>
              <ParamTable params={params} />
            </section>
          )}

          {active.code && (
            <section className="mt-10">
              <h2 className="mb-3 flex items-center gap-2 border-b border-outline-variant/40 pb-2 text-lg font-bold text-primary">
                <Icon name="code" className="text-lg" />
                <span>{t('docs_example_heading')}</span>
              </h2>
              <CodeBlock code={active.code} />
            </section>
          )}

          {active.response && (
            <section className="mt-10">
              <h2 className="mb-3 flex items-center gap-2 border-b border-outline-variant/40 pb-2 text-lg font-bold text-primary">
                <Icon name="output" className="text-lg" />
                <span>{t('docs_response_heading')}</span>
              </h2>
              <CodeBlock code={active.response} label="Response JSON" />
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

