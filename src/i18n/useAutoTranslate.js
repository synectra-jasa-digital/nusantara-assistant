import { useEffect, useState } from 'react'
import { useLanguage } from './LanguageContext.jsx'

const CACHE_KEY = 'nusantara-assistant-translate-cache'

function loadCache() {
  try {
    return JSON.parse(window.localStorage.getItem(CACHE_KEY)) ?? {}
  } catch {
    return {}
  }
}

function saveCache(cache) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // storage full or unavailable, cache just won't persist
  }
}

// Auto-translates Indonesian strings to English via /api/translate for
// content that isn't in the static translations.js dictionary (mainly
// docs body copy). Falls back to the original Indonesian text while
// loading or if the request fails, so the page never breaks.
export function useAutoTranslate(texts) {
  const { lang } = useLanguage()
  const [translated, setTranslated] = useState(texts)

  useEffect(() => {
    if (lang !== 'en' || texts.length === 0) {
      setTranslated(texts)
      return
    }

    const cache = loadCache()
    const missing = texts.filter((text) => !(text in cache))

    if (missing.length === 0) {
      setTranslated(texts.map((text) => cache[text]))
      return
    }

    let cancelled = false

    fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts: missing }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`Request failed: ${res.status}`))))
      .then((data) => {
        if (cancelled) return
        missing.forEach((text, i) => {
          cache[text] = data.translated[i] ?? text
        })
        saveCache(cache)
        setTranslated(texts.map((text) => cache[text] ?? text))
      })
      .catch((err) => {
        console.error(err)
        if (!cancelled) setTranslated(texts)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- texts compared by content, not reference
  }, [lang, JSON.stringify(texts)])

  return translated
}
