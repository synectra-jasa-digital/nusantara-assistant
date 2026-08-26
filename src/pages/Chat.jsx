import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import ChatBubble from '../components/ChatBubble.jsx'
import ChatInput from '../components/ChatInput.jsx'
import SuggestionChip from '../components/SuggestionChip.jsx'
import Icon from '../components/Icon.jsx'

const SUGGESTION_ICONS = ['cloudy_snowing', 'bolt', 'currency_exchange', 'map', 'bar_chart']

export default function Chat() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  async function sendMessage(text) {
    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply, cards: data.cards ?? [] },
      ])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [...prev, { role: 'assistant', content: t('chat_error') }])
    } finally {
      setIsLoading(false)
    }
  }

  const examples = t('chat_examples')

  return (
    <main className="mx-auto flex h-[calc(100vh-64px)] w-full max-w-container-max overflow-hidden">
      {/* Sidebar Suggestions (Desktop) */}
      <aside className="hidden h-full w-80 shrink-0 flex-col overflow-y-auto border-r border-outline-variant/40 bg-surface-container-low/40 p-5 lg:flex">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-primary font-bold text-base">
            <Icon name="explore" className="text-lg" />
            <span>{t('chat_sidebar_title')}</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">{t('chat_sidebar_subtitle')}</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {examples.map((ex, i) => (
            <SuggestionChip key={ex} label={ex} icon={SUGGESTION_ICONS[i % SUGGESTION_ICONS.length]} onClick={sendMessage} />
          ))}
        </div>
        <div className="mt-auto pt-6">
          <div className="flex items-start gap-2.5 rounded-2xl border border-primary/20 bg-primary/5 p-3.5">
            <Icon name="info" className="mt-0.5 text-base text-primary shrink-0" />
            <p className="text-[11px] leading-relaxed text-on-surface-variant">{t('chat_sidebar_note')}</p>
          </div>
        </div>
      </aside>

      {/* Main Chat Feed */}
      <section className="relative flex flex-1 flex-col bg-background">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 && (
            <div className="mb-8 mt-6 flex w-full justify-center">
              <div className="flex max-w-md flex-col items-center rounded-3xl border border-outline-variant/60 bg-surface-container-lowest p-6 text-center shadow-lg shadow-primary/5">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-badge text-on-primary shadow-md shadow-primary/20">
                  <Icon name="smart_toy" filled className="text-3xl" />
                </div>
                <h3 className="mb-2 text-xl font-bold tracking-tight text-on-surface">{t('chat_empty_title')}</h3>
                <p className="text-xs leading-relaxed text-on-surface-variant">{t('chat_empty_subtitle')}</p>
                <div className="mt-6 flex max-w-md flex-wrap justify-center gap-2 lg:hidden">
                  {examples.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => sendMessage(ex)}
                      className="whitespace-nowrap rounded-full border border-outline-variant/60 bg-surface-container-lowest px-3 py-1.5 text-xs font-medium text-on-surface-variant shadow-2xs transition-all hover:border-primary hover:text-primary active:scale-95"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} content={m.content} cards={m.cards} />
          ))}

          {isLoading && <ChatBubble role="assistant" content={t('chat_thinking')} />}
          <div ref={scrollRef} />
        </div>

        {/* Input Bar Container */}
        <div className="z-10 w-full shrink-0 border-t border-outline-variant/40 bg-surface/90 p-3 backdrop-blur-md sm:p-4">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
          <p className="mt-2 text-center text-[11px] text-outline">{t('chat_disclaimer')}</p>
        </div>
      </section>
    </main>
  )
}

