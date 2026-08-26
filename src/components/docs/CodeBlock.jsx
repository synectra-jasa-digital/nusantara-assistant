import { useState } from 'react'
import Icon from '../Icon.jsx'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function CodeBlock({ code, label = 'Terminal' }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard access can be blocked, fail silently
    }
  }

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-outline/20 bg-[#1a1b26] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between border-b border-outline/20 bg-[#24283b] px-sm py-xs">
        <span className="font-mono font-label-sm text-label-sm text-outline-variant">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          title="Copy to clipboard"
          className="flex items-center gap-1 text-outline-variant transition-colors hover:text-white"
        >
          <Icon name={copied ? 'check' : 'content_copy'} className="text-[16px]" />
          <span className="font-label-sm text-label-sm">{copied ? t('docs_copied') : t('docs_copy')}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-sm font-mono text-sm leading-relaxed text-[#a9b1d6]">
        <code>{code}</code>
      </pre>
    </div>
  )
}
