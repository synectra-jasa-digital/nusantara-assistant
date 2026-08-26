import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Icon from '../components/Icon.jsx'

function NavItem({ to, children, icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
          isActive
            ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20'
            : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
        }`
      }
    >
      {icon && <Icon name={icon} className="text-lg" />}
      <span>{children}</span>
    </NavLink>
  )
}

export default function Header() {
  const { t, lang, setLanguage } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/40 glass-header shadow-glass transition-all duration-300">
      <div className="mx-auto flex h-16 w-full max-w-container-max items-center justify-between px-base md:px-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low text-primary transition-all hover:bg-surface-container active:scale-95 md:hidden"
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} className="text-xl" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-badge text-on-primary shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
              <Icon name="data_usage" filled className="text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-base font-bold tracking-tight text-on-surface sm:text-lg">
                Nusantara<span className="text-primary">.AI</span>
              </span>
              <span className="hidden text-[10px] font-medium tracking-wider text-outline uppercase sm:inline-block">
                Data Assistant
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1.5 md:flex">
          <NavItem to="/" icon="home">{t('nav_home')}</NavItem>
          <NavItem to="/chat" icon="chat">{t('nav_chat')}</NavItem>
          <NavItem to="/docs" icon="description">{t('nav_docs')}</NavItem>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-outline-variant/60 bg-surface-container-low p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setLanguage('id')}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                lang === 'id'
                  ? 'bg-primary text-on-primary shadow-md shadow-primary/30 scale-105'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                lang === 'en'
                  ? 'bg-primary text-on-primary shadow-md shadow-primary/30 scale-105'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="animate-slide-down border-t border-outline-variant/40 bg-surface/95 px-base py-3 backdrop-blur-xl shadow-lg md:hidden">
          <div className="flex flex-col gap-1.5">
            <NavItem to="/" icon="home" onClick={() => setMobileOpen(false)}>
              {t('nav_home')}
            </NavItem>
            <NavItem to="/chat" icon="chat" onClick={() => setMobileOpen(false)}>
              {t('nav_chat')}
            </NavItem>
            <NavItem to="/docs" icon="description" onClick={() => setMobileOpen(false)}>
              {t('nav_docs')}
            </NavItem>
          </div>
        </nav>
      )}
    </header>
  )
}

