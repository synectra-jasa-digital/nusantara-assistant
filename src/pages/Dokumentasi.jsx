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

  // docsContent.js is Indonesian-only source content - auto-translate the
  // human-facing copy (title, body paragraphs, param descriptions) to
  // English on the fly. Code/response samples stay as-is (mostly JSON/shell).
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
      <div className="mb-2 flex items-center gap-3 border-b border-outline-variant px-base py-sm md:hidden">
        <button
          type="button"
          onClick={() => setMobileNavOpen((v) => !v)}
          className="flex items-center gap-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 font-label-md text-label-md text-on-surface-variant"
        >
          <Icon name="menu" />
          {t('docs_title')}
        </button>
        <Link to="/chat" className="font-label-md text-label-md font-semibold text-primary">
          {t('docs_back_chat')} →
        </Link>
      </div>

      <div className="flex flex-1">
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 bg-inverse-surface/40 md:hidden" onClick={() => setMobileNavOpen(false)} />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-surface p-sm shadow-xl transition-transform md:sticky md:top-16 md:z-0 md:h-[calc(100vh-64px)] md:w-64 md:translate-x-0 md:border-r md:border-outline-variant md:bg-surface-container-low md:shadow-none ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-lg px-sm">
            <h2 className="font-headline-md text-headline-md font-bold text-primary">{t('docs_title')}</h2>
            <p className="mt-xs font-label-md text-label-md text-on-surface-variant">{t('docs_subtitle')}</p>
          </div>
          <div className="mb-md flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-sm py-xs focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <Icon name="search" className="text-[20px] text-on-surface-variant" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('docs_search_placeholder')}
              className="w-full border-none bg-transparent font-body-md text-body-md placeholder-on-surface-variant/50 outline-none focus:ring-0"
            />
          </div>
          <DocsSidebar sections={filtered} activeId={activeId} onSelect={selectSection} />
        </aside>

        <main className="min-w-0 flex-1 p-md md:p-lg lg:p-xl">
          <div className="mb-md flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
            <span>{t('docs_title')}</span>
            <Icon name="chevron_right" className="text-[14px]" />
            <span className="font-bold text-primary">{title}</span>
          </div>

          <div className="mb-md flex items-center gap-2">
            <h1 className="font-headline-xl text-headline-xl text-on-background">{title}</h1>
            {active.badge && (
              <span className="rounded-full bg-tertiary-container px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-on-tertiary-container">
                {active.badge}
              </span>
            )}
          </div>

          <div className="max-w-2xl space-y-3 font-body-lg text-body-lg text-on-surface-variant">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {params && (
            <section className="mt-xl">
              <h2 className="mb-sm border-b border-surface-variant pb-xs font-headline-md text-headline-md text-primary">
                {t('docs_params_heading')}
              </h2>
              <ParamTable params={params} />
            </section>
          )}

          {active.code && (
            <section className="mt-xl">
              <h2 className="mb-sm border-b border-surface-variant pb-xs font-headline-md text-headline-md text-primary">
                {t('docs_example_heading')}
              </h2>
              <CodeBlock code={active.code} />
            </section>
          )}

          {active.response && (
            <section className="mt-xl">
              <h2 className="mb-sm border-b border-surface-variant pb-xs font-headline-md text-headline-md text-primary">
                {t('docs_response_heading')}
              </h2>
              <CodeBlock code={active.response} label="Response" />
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
