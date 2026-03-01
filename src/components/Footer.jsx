import { Phone } from '@phosphor-icons/react';
import { PHONE_NUMBER } from '../data/products';
import { useLanguage } from '../i18n';

export default function Footer() {
  const { t } = useLanguage();
  const hasPhone = PHONE_NUMBER && !PHONE_NUMBER.includes('TU_NUMERO');

  return (
    <footer className="site-footer">
      {hasPhone ? (
        <p>
          <Phone size={16} weight="bold" />
          {t.footerContact}: <strong>+{PHONE_NUMBER}</strong>
        </p>
      ) : (
        <p>{t.footerDefault}</p>
      )}
    </footer>
  );
}
