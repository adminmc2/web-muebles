import { useLanguage } from '../i18n';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <p className="footer-title">{t.heroTitle1} <span>{t.heroTitle2}</span></p>
          <p className="footer-subtitle">{t.heroSubtitle}</p>
        </div>
        <a
          href="https://es.wallapop.com/user/armandoc-113523109"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link-card"
        >
          <img src="/img/wallapop.svg" alt="" width="18" height="18" />
          <span>{t.footerWallapop}</span>
        </a>
      </div>
    </footer>
  );
}
