import { useEffect } from 'react';
import { X, WhatsappLogo, MapPin, Tag, SealPercentIcon } from '@phosphor-icons/react';
import { PHONE_NUMBER } from '../data/products';
import { useLanguage } from '../i18n';

export default function ProductModal({ product, displayImg, onClose }) {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const displayName = lang === 'en' ? product.name_en : product.name;
  const displayDesc = lang === 'en' ? product.desc_en : product.desc;
  const isContextImg = displayImg !== product.img;

  function handleWhatsApp() {
    const text = lang === 'en'
      ? `Hi! I'm interested in: ${product.name_en} (${product.price} €). Is it still available?`
      : `¡Hola! Me interesa el producto: ${product.name} (${product.price} €). ¿Sigue disponible?`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} weight="bold" />
        </button>

        <div className="modal-left">
          <div className={`modal-img-wrap${isContextImg ? ' modal-img-context' : ''}`} style={isContextImg ? {} : { backgroundColor: product.bgColor || '#F6F8FB' }}>
            <img src={displayImg} alt={displayName} />
            {product.sold && <span className="badge badge-sold">{t.statusSold}</span>}
          </div>
        </div>

        <div className="modal-body">
          <h2>{displayName}</h2>
          <p className="modal-price">
            <Tag size={20} weight="fill" />{product.price} €
            {product.originalPrice && <span className="price-original">{product.originalPrice} €</span>}
          </p>

          <div className="modal-meta">
            <span className="meta-item">
              <Tag size={14} weight="bold" />
              {product.sold ? t.statusSold : t.statusAvailable}
            </span>
            <a className="meta-item meta-link" href="https://www.google.com/maps/search/?api=1&query=28005+Madrid" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <MapPin size={14} weight="bold" />
              {t.locationZone}
            </a>
            {!product.sold && (
              <span className="meta-item meta-discount">
                <SealPercentIcon size={14} weight="bold" />
                {t.pickupDiscount}
              </span>
            )}
          </div>

          <p className="modal-desc">{displayDesc}</p>

          <div className="modal-specs">
            {product.dimensions && (
              <div className="card-spec">
                <span className="card-spec-label">{t.dimensionsLabel}</span>
                <span className="card-spec-value">{lang === 'en' ? product.dimensions_en : product.dimensions}</span>
              </div>
            )}
            {product.condition && (
              <div className="card-spec">
                <span className="card-spec-label">{t.conditionLabel}</span>
                <span className="card-spec-value">{product.condition === 'new' ? t.conditionNew : t.conditionUsed}</span>
              </div>
            )}
            {product.usage && (
              <div className="card-spec">
                <span className="card-spec-label">{t.usageLabel}</span>
                <span className="card-spec-value">{lang === 'en' ? product.usage_en : product.usage}</span>
              </div>
            )}
            {product.includes && (
              <div className="card-spec">
                <span className="card-spec-label">{t.includesLabel}</span>
                <span className="card-spec-value">{lang === 'en' ? product.includes_en : product.includes}</span>
              </div>
            )}
          </div>

          <div className="modal-actions">
            {!product.sold && (
              <button className="btn btn-whatsapp modal-wa-btn" onClick={handleWhatsApp}>
                <WhatsappLogo size={20} weight="fill" />
                {t.contactWhatsapp}
              </button>
            )}
            {product.wallapopUrl && (
              <a className="btn btn-wallapop modal-wa-btn" href={product.wallapopUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <img src="/img/wallapop.svg" alt="" width="20" height="20" />
                {t.wallapop}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
