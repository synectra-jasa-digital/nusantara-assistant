import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'

export default function ChatInput({ onSend, disabled }) {
  const { t } = useLanguage()
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto flex w-full max-w-4xl items-center">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('chat_placeholder')}
        disabled={disabled}
        className="h-[56px] w-full rounded-full border border-outline-variant bg-surface-container-lowest pl-6 pr-16 font-body-md text-body-md text-on-surface shadow-[0px_4px_20px_rgba(0,0,0,0.04)] transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label={t('chat_send')}
        className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Icon name="send" className="text-[20px]" />
      </button>
    </form>
  )
}
