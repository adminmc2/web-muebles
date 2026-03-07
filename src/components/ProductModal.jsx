import { useEffect } from 'react';
import { X, WhatsappLogo, MapPin, Tag, SealPercentIcon, TagIcon, PlusIcon, GiftIcon } from '@phosphor-icons/react';
import { PHONE_NUMBER, products, combos } from '../data/products';
import { useLanguage } from '../i18n';

export default function ProductModal({ product, displayImg, onClose, onOpenCombo }) {
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

  const productCombos = combos.filter((c) => c.productIds.includes(product.id));

  function handleWhatsApp() {
    const text = lang === 'en'
      ? `Hi! I'm interested in: ${product.name_en} (${product.price} €). Is it still available?`
      : `¡Hola! Me interesa el producto: ${product.name} (${product.price} €). ¿Sigue disponible?`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            <X size={20} weight="bold" />
          </button>

          <div className="modal-left">
            <div className={`modal-img-wrap${isContextImg ? ' modal-img-context' : ''}${product.category === 'sofas' ? ' modal-img-large' : ''}`} style={isContextImg ? {} : { backgroundColor: product.bgColor || '#F6F8FB' }}>
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
              {!product.sold && product.discount && (
                <span className="meta-item meta-discount">
                  <SealPercentIcon size={14} weight="bold" />
                  {lang === 'en' ? `${product.discount}% off for in-person pickup` : `${product.discount} % dto. recogida en persona`}
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
              {product.brand && (
                <div className="card-spec">
                  <span className="card-spec-label">{t.brandLabel}</span>
                  <span className="card-spec-value">{product.brand}</span>
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

            {productCombos.length > 0 && (
              <div className="modal-combo-section">
                {productCombos.map((combo) => {
                  const giftIds = combo.giftProductIds || [];
                  const totalPrice = combo.productIds.reduce((sum, id) => {
                    const p = products.find((pr) => pr.id === id);
                    return sum + (p ? p.price : 0);
                  }, 0);
                  const savings = totalPrice - combo.comboPrice;

                  const allComboProducts = combo.productIds
                    .map((id) => products.find((p) => p.id === id))
                    .filter(Boolean);

                  return (
                    <div key={combo.id} className="modal-combo-card" onClick={() => onOpenCombo(combo)}>
                      <h4 className="modal-combo-title">
                        <TagIcon size={10} weight="bold" />
                        {lang === 'en' ? 'Special combo' : 'Combo especial'}
                      </h4>
                      <div className="modal-combo-products">
                        {allComboProducts.map((cp, i) => {
                          const isGift = giftIds.includes(cp.id);
                          return (
                            <div key={`${cp.id}-${i}`} className="modal-combo-product-wrap">
                              <div className="modal-combo-product-item">
                                <div className="modal-combo-img">
                                  <img src={cp.img} alt={lang === 'en' ? cp.name_en : cp.name} />
                                </div>
                                <span className="modal-combo-label">{lang === 'en' ? cp.name_en : cp.name}</span>
                                {isGift
                                  ? <span className="modal-combo-label-gift"><GiftIcon size={9} weight="bold" /> {lang === 'en' ? 'Free' : 'Regalo'}</span>
                                  : <span className="modal-combo-label-price">{cp.price} €</span>
                                }
                              </div>
                              {i < allComboProducts.length - 1 && (
                                <span className="modal-combo-plus"><PlusIcon size={12} weight="bold" /></span>
                              )}
                            </div>
                          );
                        })}
                        <span className="modal-combo-equals">=</span>
                        <div className="modal-combo-result">
                          <span className="modal-combo-price">{combo.comboPrice} €</span>
                          <span className="modal-combo-original">{totalPrice} €</span>
                          <span className="modal-combo-save">
                            {lang === 'en' ? `Save ${savings} €` : `Ahorras ${savings} €`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
