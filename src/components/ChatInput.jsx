import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'

export default function ChatInput({ onSend, onStop, loading }) {
  const { t } = useLanguage()
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || loading) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto flex w-full max-w-4xl items-center">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('chat_placeholder')}
        disabled={loading}
        className="h-14 w-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest pl-5 pr-14 text-sm text-on-surface shadow-sm transition-all placeholder:text-outline/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {loading ? (
        <button
          type="button"
          onClick={onStop}
          aria-label={t('chat_stop')}
          className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-error text-on-error shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <Icon name="stop" className="text-base" filled />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!value.trim()}
          aria-label={t('chat_send')}
          className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-gradient-badge text-on-primary shadow-md shadow-primary/20 transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <Icon name="send" className="text-base" />
        </button>
      )}
    </form>
  )
}
