import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Icon from './Icon.jsx'

const SpeechRecognitionClass =
  typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null

export default function ChatInput({ onSend, onStop, loading }) {
  const { t } = useLanguage()
  const [value, setValue] = useState('')
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (!SpeechRecognitionClass) return

    const recognition = new SpeechRecognitionClass()
    recognition.lang = 'id-ID'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setValue((prev) => (prev ? `${prev} ${transcript}` : transcript))
    }
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognitionRef.current = recognition
    return () => recognition.stop()
  }, [])

  function toggleListening() {
    if (!recognitionRef.current) return
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

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
        className={`h-14 w-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest pl-5 text-sm text-on-surface shadow-sm transition-all placeholder:text-outline/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          SpeechRecognitionClass ? 'pr-24' : 'pr-14'
        }`}
      />

      {SpeechRecognitionClass && (
        <button
          type="button"
          onClick={toggleListening}
          disabled={loading}
          aria-label={t('chat_voice_input')}
          className={`absolute right-14 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${
            isListening
              ? 'animate-pulse bg-error text-on-error'
              : 'bg-surface-container text-on-surface-variant hover:text-primary'
          }`}
        >
          <Icon name="mic" className="text-base" filled={isListening} />
        </button>
      )}

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
