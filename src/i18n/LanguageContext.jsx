import React, { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'nusantara-assistant-lang'

function getInitialLang() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'id' || stored === 'en') return stored
  } catch {}
  return 'id'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  const setLanguage = useCallback((next) => {
    setLang(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === 'id' ? 'en' : 'id')
  }, [lang, setLanguage])

  const t = useCallback((key) => translations[lang]?.[key] ?? translations.id[key] ?? key, [lang])

  const value = useMemo(
    () => ({ lang, setLanguage, toggleLanguage, t }),
    [lang, setLanguage, toggleLanguage, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
