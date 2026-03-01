import { Tag, MapPin, ArrowDown, Globe } from '@phosphor-icons/react';
import { useLanguage } from '../i18n';

export default function Header({ totalProducts, soldCount }) {
  const { lang, toggleLang, t } = useLanguage();
  const available = totalProducts - soldCount;

  return (
    <header className="hero">
      <button className="lang-toggle" onClick={toggleLang} aria-label="Change language">
        <Globe size={16} weight="bold" />
        {lang === 'es' ? 'EN' : 'ES'}
      </button>

      <div className="hero-inner">
        <div className="hero-text">
          <span className="hero-label">{t.heroLabel}</span>
          <h1 className="hero-title">
            {t.heroTitle1}<br />
            <span>{t.heroTitle2}</span>
          </h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>

          <div className="hero-info">
            <div className="hero-stat">
              <Tag size={18} weight="fill" />
              <div>
                <strong>{available}</strong>
                <span>{t.available}</span>
              </div>
            </div>
            {soldCount > 0 && (
              <div className="hero-stat hero-stat--sold">
                <div>
                  <strong>{soldCount}</strong>
                  <span>{t.sold}</span>
                </div>
              </div>
            )}
            <div className="hero-stat">
              <MapPin size={18} weight="fill" />
              <div>
                <strong>Madrid</strong>
                <span>{t.pickup}</span>
              </div>
            </div>
          </div>

          <a href="#products" className="hero-cta">
            <ArrowDown size={16} weight="bold" />
            {t.scrollCta}
          </a>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=600&fit=crop"
            alt="Modern sofa"
            loading="eager"
          />
        </div>
      </div>
    </header>
  );
}
