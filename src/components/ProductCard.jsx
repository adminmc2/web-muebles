import { useState } from 'react';
import { WhatsappLogo, Eye, ArrowRight, Tag } from '@phosphor-icons/react';
import { PHONE_NUMBER } from '../data/products';
import { useLanguage } from '../i18n';
import ProductModal from './ProductModal';
import ComboModal from './ComboModal';

export default function ProductCard({ product }) {
  const { lang, t } = useLanguage();
  const [modalImg, setModalImg] = useState(null);
  const [activeCombo, setActiveCombo] = useState(null);
  const { name, name_en, price, img, imgs, sold } = product;
  const contextImg = imgs && imgs.length > 1 ? imgs[1] : null;

  const displayName = lang === 'en' ? name_en : name;
  const displayDesc = lang === 'en' ? product.desc_en : product.desc;

  function handleWhatsApp(e) {
    e.stopPropagation();
    const text = lang === 'en'
      ? `Hi! I'm interested in: ${name_en} (${price} €). Is it still available?`
      : `¡Hola! Me interesa el producto: ${name} (${price} €). ¿Sigue disponible?`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }

  return (
    <>
      <div className={`card${sold ? ' sold' : ''}`} onClick={() => setModalImg(img)}>
        <div className="card-img-wrap" style={{ backgroundColor: product.bgColor || '#F6F8FB' }}>
          <span className="card-see-more">
            <Eye size={14} weight="bold" />
            {t.seeMore}
          </span>
          <img src={img} alt={displayName} loading="lazy" style={product.imgScale ? { transform: `scale(${product.imgScale})`, transformOrigin: product.imgPosition || 'center' } : undefined} />
          {sold && <span className="badge badge-sold">{t.statusSold}</span>}
        </div>
        {contextImg && (
          <div className="card-context-hint" onClick={(e) => { e.stopPropagation(); setModalImg(contextImg); }} style={{ background: `linear-gradient(to bottom, ${product.bgColor || '#F6F8FB'}, #fff)` }}>
            <span className="card-context-hint-text">{t.seeItLive}</span>
            <ArrowRight size={14} weight="bold" className="card-context-arrow" />
            <img src={contextImg} alt="" className="card-context-thumb" />
          </div>
        )}
        <div className="card-body">
          <h3>{displayName}</h3>
          <p className="price">
            <Tag size={18} weight="fill" />{price} €
            {product.originalPrice && <span className="price-original">{product.originalPrice} €</span>}
          </p>
          <p className="desc">{displayDesc}</p>
          <div className="card-specs">
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
          <div className="actions">
            {!sold && (
              <button className="btn btn-whatsapp" onClick={handleWhatsApp}>
                <WhatsappLogo size={18} weight="fill" />
                {t.whatsapp}
              </button>
            )}
            {product.wallapopUrl && (
              <a className="btn btn-wallapop" href={product.wallapopUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <img src="/img/wallapop.svg" alt="" width="18" height="18" />
                {t.wallapop}
              </a>
            )}
          </div>
        </div>
      </div>
      {modalImg && (
        <ProductModal
          product={product}
          displayImg={modalImg}
          onClose={() => setModalImg(null)}
          onOpenCombo={(combo) => { setModalImg(null); setActiveCombo(combo); }}
        />
      )}
      {activeCombo && <ComboModal combo={activeCombo} onClose={() => setActiveCombo(null)} />}
    </>
  );
}
