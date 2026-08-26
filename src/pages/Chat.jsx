import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import ChatBubble from '../components/ChatBubble.jsx'
import ChatInput from '../components/ChatInput.jsx'
import SuggestionChip from '../components/SuggestionChip.jsx'
import Icon from '../components/Icon.jsx'

const SUGGESTION_ICONS = ['partly_cloudy_day', 'bolt', 'currency_exchange', 'map', 'groups']

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
        // Only role/content is sent upstream - cards are a client-side
        // rendering detail, not part of the model conversation.
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
      <aside className="hidden h-full w-80 shrink-0 flex-col overflow-y-auto border-r border-outline-variant bg-surface-container-low p-md lg:flex">
        <div className="mb-8">
          <h2 className="mb-2 font-headline-md text-headline-md text-on-surface">{t('chat_sidebar_title')}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t('chat_sidebar_subtitle')}</p>
        </div>
        <div className="flex flex-col gap-sm">
          {examples.map((ex, i) => (
            <SuggestionChip key={ex} label={ex} icon={SUGGESTION_ICONS[i % SUGGESTION_ICONS.length]} onClick={sendMessage} />
          ))}
        </div>
        <div className="mt-auto pt-8">
          <div className="flex items-start gap-3 rounded-lg bg-primary-container/10 p-sm">
            <Icon name="info" className="mt-1 text-primary" />
            <p className="font-label-sm text-label-sm text-on-surface-variant">{t('chat_sidebar_note')}</p>
          </div>
        </div>
      </aside>

      <section className="relative flex flex-1 flex-col bg-background">
        <div className="flex-1 space-y-6 overflow-y-auto p-md">
          {messages.length === 0 && (
            <div className="mb-8 mt-4 flex w-full justify-center">
              <div className="flex max-w-md flex-col items-center rounded-2xl border border-outline-variant bg-surface-container-lowest p-md text-center shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/20 text-primary">
                  <Icon name="smart_toy" filled className="text-3xl" />
                </div>
                <h3 className="mb-2 font-headline-md text-headline-md text-on-surface">{t('chat_empty_title')}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{t('chat_empty_subtitle')}</p>
                <div className="mt-4 flex max-w-md flex-wrap justify-center gap-2 lg:hidden">
                  {examples.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => sendMessage(ex)}
                      className="whitespace-nowrap rounded-full border border-outline-variant bg-surface-container-lowest px-3.5 py-1.5 font-label-sm text-label-sm text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
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

        <div className="z-10 w-full shrink-0 border-t border-outline-variant bg-surface/90 p-4 backdrop-blur-md md:p-md">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
          <p className="mt-2 text-center font-label-sm text-label-sm text-outline">{t('chat_disclaimer')}</p>
        </div>
      </section>
    </main>
  )
}
