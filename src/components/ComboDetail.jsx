import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, WhatsappLogo, MapPin, TagIcon, PlusIcon, GiftIcon, LinkSimpleIcon, CheckIcon } from '@phosphor-icons/react';
import { products, combos, PHONE_NUMBER } from '../data/products';
import { useLanguage } from '../i18n';

export default function ComboDetail() {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const combo = combos.find((c) => c.id === id);

  if (!combo) {
    return (
      <div className="detail-not-found">
        <h2>{t.notFound}</h2>
        <Link to="/" className="btn btn-back">
          <ArrowLeft size={18} weight="bold" />
          {t.backToList}
        </Link>
      </div>
    );
  }

  const giftIds = combo.giftProductIds || [];
  const comboProducts = combo.productIds.map((pid) => products.find((p) => p.id === pid)).filter(Boolean);
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

  function handleShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="product-detail">
      <div className="detail-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} weight="bold" />
          {t.back}
        </Link>
      </div>

      <div className="combo-detail-products" style={{ backgroundColor: combo.bgColor || '#FFF0E0' }}>
        {comboProducts.map((p, i) => {
          const pName = lang === 'en' ? p.name_en : p.name;
          const isGift = giftIds.includes(p.id);
          return (
            <div key={p.id} className="combo-detail-product-wrap">
              <Link to={`/producto/${p.id}`} className="combo-detail-product" onClick={(e) => e.stopPropagation()}>
                <div className="combo-detail-img">
                  <img src={p.img} alt={pName} />
                </div>
                <span className="combo-modal-product-label">{pName}</span>
                {isGift
                  ? <span className="combo-modal-product-label-gift"><GiftIcon size={12} weight="bold" /> {lang === 'en' ? 'Free' : 'Regalo'}</span>
                  : <span className="combo-modal-product-label-price">{p.price} €</span>
                }
              </Link>
              {i < comboProducts.length - 1 && (
                <span className="combo-modal-plus"><PlusIcon size={24} weight="bold" /></span>
              )}
            </div>
          );
        })}
      </div>

      <div className="detail-body">
        <div className="detail-top">
          <span className="combo-card-title-pill">{t.comboLabel}</span>
          <h1>{displayName}</h1>
          <div className="combo-modal-pricing">
            <span className="combo-modal-combo-price">{combo.comboPrice} €</span>
            <span className="combo-modal-original-price">{totalPrice} €</span>
            <span className="combo-modal-savings">
              {lang === 'en' ? `Save ${savings} €` : `Ahorras ${savings} €`}
            </span>
          </div>
        </div>

        <div className="detail-meta">
          <a className="meta-item meta-link" href="https://www.google.com/maps/search/?api=1&query=28005+Madrid" target="_blank" rel="noopener noreferrer">
            <MapPin size={14} weight="bold" />
            {t.locationZone}
          </a>
        </div>

        <p className="detail-desc">{displayDesc}</p>

        <div className="detail-actions">
          <button className="btn btn-whatsapp" onClick={handleWhatsApp}>
            <WhatsappLogo size={20} weight="fill" />
            {t.contactWhatsapp}
          </button>
          <button className="btn btn-share" onClick={handleShare}>
            {copied ? <CheckIcon size={20} weight="bold" /> : <LinkSimpleIcon size={20} weight="bold" />}
            {copied ? t.linkCopied : t.shareLink}
          </button>
        </div>
      </div>
    </div>
  );
}
