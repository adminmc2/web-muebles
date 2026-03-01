import { Link } from 'react-router-dom';
import { WhatsappLogo, Eye, ArrowRight, Tag } from '@phosphor-icons/react';
import { PHONE_NUMBER } from '../data/products';
import { useLanguage } from '../i18n';

export default function ProductCard({ product }) {
  const { lang, t } = useLanguage();
  const { id, name, name_en, price, desc, desc_en, img, imgs, sold } = product;
  const contextImg = imgs && imgs.length > 1 ? imgs[1] : null;

  const displayName = lang === 'en' ? name_en : name;
  const displayDesc = lang === 'en' ? desc_en : desc;

  function handleWhatsApp(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!PHONE_NUMBER || PHONE_NUMBER.includes('TU_NUMERO')) {
      alert('Configura tu número de teléfono en src/data/products.js');
      return;
    }
    const text = `Hola, me interesa: ${name} (${price} €). ¿Sigue disponible?`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }

  return (
    <Link to={`/producto/${id}`} className={`card${sold ? ' sold' : ''}`}>
      <div className="card-img-wrap" style={{ backgroundColor: product.bgColor || '#F6F8FB' }}>
        <span className="card-see-more">
          <Eye size={14} weight="bold" />
          {t.seeMore}
        </span>
        <img src={img} alt={displayName} loading="lazy" />
        {sold && <span className="badge badge-sold">{t.statusSold}</span>}
      </div>
      {contextImg && (
        <div className="card-context-hint" style={{ background: `linear-gradient(to bottom, ${product.bgColor || '#F6F8FB'}, #fff)` }}>
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
        </div>
      </div>
    </Link>
  );
}
