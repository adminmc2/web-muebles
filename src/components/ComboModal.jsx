import { useEffect } from 'react';
import { XIcon, WhatsappLogoIcon, PlusIcon, GiftIcon } from '@phosphor-icons/react';
import { products, PHONE_NUMBER } from '../data/products';
import { useLanguage } from '../i18n';

export default function ComboModal({ combo, onClose }) {
  const { lang, t } = useLanguage();
  const giftIds = combo.giftProductIds || [];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const comboProducts = combo.productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const totalPrice = comboProducts.reduce((sum, p) => sum + p.price, 0);
  const savings = totalPrice - combo.comboPrice;
  const displayName = lang === 'en' ? combo.name_en : combo.name;
  const displayDesc = lang === 'en' ? combo.desc_en : combo.desc;

  function handleWhatsApp() {
    const productNames = comboProducts.map((p) => lang === 'en' ? p.name_en : p.name).join(' + ');
    const text = lang === 'en'
      ? `Hi! I'm interested in the combo: ${productNames} (${combo.comboPrice} €). Is it still available?`
      : `¡Hola! Me interesa el combo: ${productNames} (${combo.comboPrice} €). ¿Sigue disponible?`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content combo-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <XIcon size={20} weight="bold" />
        </button>

        <div className="combo-modal-products">
          {comboProducts.map((p, i) => {
            const pName = lang === 'en' ? p.name_en : p.name;
            const isGift = giftIds.includes(p.id);
            return (
              <div key={`${p.id}-${i}`} className="combo-modal-product-wrap">
                <div className="combo-modal-product">
                  <div className="combo-modal-img">
                    <img src={p.img} alt={pName} />
                  </div>
                  <span className="combo-modal-product-label">{pName}</span>
                  {isGift
                    ? <span className="combo-modal-product-label-gift"><GiftIcon size={12} weight="bold" /> {lang === 'en' ? 'Free' : 'Regalo'}</span>
                    : <span className="combo-modal-product-label-price">{p.price} €</span>
                  }
                </div>
                {i < comboProducts.length - 1 && (
                  <span className="combo-modal-plus"><PlusIcon size={24} weight="bold" /></span>
                )}
              </div>
            );
          })}
        </div>

        <div className="combo-modal-body">
          <span className="combo-modal-title-pill">{displayName}</span>
          <div className="combo-modal-pricing">
            <span className="combo-modal-combo-price">{combo.comboPrice} €</span>
            <span className="combo-modal-original-price">{totalPrice} €</span>
            <span className="combo-modal-savings">
              {lang === 'en' ? `Save ${savings} €` : `Ahorras ${savings} €`}
            </span>
          </div>
          <p className="modal-desc">{displayDesc}</p>
          <div className="modal-actions">
            <button className="btn btn-whatsapp modal-wa-btn" onClick={handleWhatsApp}>
              <WhatsappLogoIcon size={20} weight="fill" />
              {t.contactWhatsapp}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
