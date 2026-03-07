import { Tag, MapPin, ArrowDown, Globe, Armchair, Lamp, Table, Stack, CoatHanger, Fan, TShirt, Sneaker, Stool, Couch, CookingPot, Chair, Monitor, Television, Lockers, ForkKnife, Rug, Robot, Plug } from '@phosphor-icons/react';
import { useLanguage } from '../i18n';

const heroCategories = [
  { icon: Armchair, labelKey: 'catArmchairs' },
  { icon: Table, labelKey: 'catTables' },
  { icon: Lamp, labelKey: 'catLamp' },
  { icon: Stack, labelKey: 'catShelves' },
  { icon: CoatHanger, labelKey: 'catCoatracks' },
  { icon: Fan, labelKey: 'catFans' },
  { icon: TShirt, labelKey: 'catGarmentCare' },
  { icon: Sneaker, labelKey: 'catShoeCabinets' },
  { icon: Stool, labelKey: 'catPufs' },
  { icon: Couch, labelKey: 'catSofas' },
  { icon: CookingPot, labelKey: 'catKitchen' },
  { icon: ForkKnife, labelKey: 'catDining' },
  { icon: Chair, labelKey: 'catChairs' },
  { icon: Monitor, labelKey: 'catTv' },
  { icon: Television, labelKey: 'catTelevision' },
  { icon: Lockers, labelKey: 'catStorage' },
  { icon: Rug, labelKey: 'catRugs' },
  { icon: Robot, labelKey: 'catAppliances' },
  { icon: Plug, labelKey: 'catAccessories' },
];

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
            <a className="hero-stat hero-stat-link" href="https://www.google.com/maps/search/?api=1&query=28005+Madrid" target="_blank" rel="noopener noreferrer">
              <MapPin size={18} weight="fill" />
              <div>
                <strong>Madrid</strong>
              </div>
            </a>
          </div>

          <div className="hero-categories">
            {heroCategories.map(({ icon: Icon, labelKey }) => (
              <span key={labelKey} className="hero-cat-pill">
                <Icon size={14} weight="fill" />
                {t[labelKey]}
              </span>
            ))}
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
