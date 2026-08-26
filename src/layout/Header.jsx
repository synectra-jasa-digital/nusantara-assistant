import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Icon from '../components/Icon.jsx'

function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `font-label-md text-label-md flex h-full items-center transition-all duration-200 ${
          isActive
            ? 'border-b-2 border-primary text-primary'
            : 'text-on-surface-variant hover:text-primary hover:opacity-80'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function Header() {
  const { t, lang, setLanguage } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/80 shadow-sm backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-16 w-full max-w-container-max items-center justify-between px-base md:px-md">
        <div className="flex items-center gap-sm">
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="text-primary transition-all duration-200 hover:opacity-80 md:hidden"
          >
            <Icon name="menu" />
          </button>
          <Link to="/" className="flex items-center gap-2 font-headline-md text-headline-md font-bold text-primary">
            <Icon name="data_usage" filled />
            <span>{t('appName')}</span>
          </Link>
        </div>

        <nav className="hidden h-full items-center gap-lg md:flex">
          <NavItem to="/">{t('nav_home')}</NavItem>
          <NavItem to="/chat">{t('nav_chat')}</NavItem>
          <NavItem to="/docs">{t('nav_docs')}</NavItem>
        </nav>

        <div className="flex items-center rounded-full border border-outline-variant bg-surface-container-low p-1">
          <button
            type="button"
            onClick={() => setLanguage('id')}
            className={`rounded-full px-3 py-1 font-label-sm text-label-sm transition-colors ${
              lang === 'id'
                ? 'bg-primary text-on-primary shadow-[0px_4px_20px_rgba(0,0,0,0.04)]'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            ID
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`rounded-full px-3 py-1 font-label-sm text-label-sm transition-colors ${
              lang === 'en'
                ? 'bg-primary text-on-primary shadow-[0px_4px_20px_rgba(0,0,0,0.04)]'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-outline-variant bg-surface px-base py-sm md:hidden">
          <NavItem to="/" onClick={() => setMobileOpen(false)}>
            {t('nav_home')}
          </NavItem>
          <NavItem to="/chat" onClick={() => setMobileOpen(false)}>
            {t('nav_chat')}
          </NavItem>
          <NavItem to="/docs" onClick={() => setMobileOpen(false)}>
            {t('nav_docs')}
          </NavItem>
        </nav>
      )}
    </header>
  )
}
