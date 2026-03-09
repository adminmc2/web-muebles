import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, WhatsappLogo, MapPin, Tag, SealPercentIcon, LinkSimpleIcon, CheckIcon } from '@phosphor-icons/react';
import { products, combos, PHONE_NUMBER } from '../data/products';
import { useLanguage } from '../i18n';

export default function ProductDetail() {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [activeImg, setActiveImg] = useState(null);
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
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

  const displayName = lang === 'en' ? product.name_en : product.name;
  const displayDesc = lang === 'en' ? product.desc_en : product.desc;
  const currentImg = activeImg || product.img;

  function handleWhatsApp() {
    const text = lang === 'en'
      ? `Hi! I'm interested in: ${product.name_en} (${product.price} €). Is it still available?`
      : `¡Hola! Me interesa el producto: ${product.name} (${product.price} €). ¿Sigue disponible?`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }

  function handleShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const productCombos = combos.filter((c) => c.productIds.includes(product.id));

  return (
    <div className="product-detail">
      <div className="detail-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} weight="bold" />
          {t.back}
        </Link>
      </div>

      <div className="detail-img-wrap" style={{ backgroundColor: product.bgColor || '#F6F8FB' }}>
        <img src={currentImg} alt={displayName} />
        {product.sold && <span className="badge badge-sold">{t.statusSold}</span>}
      </div>

      {product.imgs && product.imgs.length > 1 && (
        <div className="detail-thumbs">
          {product.imgs.map((imgSrc, i) => (
            <button
              key={i}
              className={`detail-thumb${currentImg === imgSrc ? ' active' : ''}`}
              onClick={() => setActiveImg(imgSrc)}
            >
              <img src={imgSrc} alt="" />
            </button>
          ))}
        </div>
      )}

      <div className="detail-body">
        <div className="detail-top">
          <h1>{displayName}</h1>
          <p className="detail-price">
            {product.price} €
            {product.originalPrice && <span className="price-original">{product.originalPrice} €</span>}
          </p>
          {product.unitPrice && (
            <p className="unit-price">{t.unitPriceLabel}: {product.unitPrice} €{t.unitPriceSuffix}</p>
          )}
        </div>

        <div className="detail-meta">
          <span className="meta-item">
            <Tag size={14} weight="bold" />
            {product.sold ? t.statusSold : t.statusAvailable}
          </span>
          <a className="meta-item meta-link" href="https://www.google.com/maps/search/?api=1&query=28005+Madrid" target="_blank" rel="noopener noreferrer">
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

        <p className="detail-desc">{displayDesc}</p>

        <div className="detail-specs">
          {product.dimensions && (
            <div className="card-spec">
              <span className="card-spec-label">{t.dimensionsLabel}</span>
              <span className="card-spec-value">{lang === 'en' ? product.dimensions_en : product.dimensions}</span>
            </div>
          )}
          {product.condition && (
            <div className="card-spec">
              <span className="card-spec-label">{t.conditionLabel}</span>
              <span className="card-spec-value">{product.condition === 'new' ? t.conditionNew : product.condition === 'good' ? t.conditionGood : t.conditionUsed}</span>
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
          {product.includes && product.includes !== '-' && (
            <div className="card-spec">
              <span className="card-spec-label">{t.includesLabel}</span>
              <span className="card-spec-value">
                {(() => {
                  const val = lang === 'en' ? product.includes_en : product.includes;
                  const parts = val.split(' · ');
                  if (parts.length <= 2) return val;
                  return parts.map((p, i) => <span key={i} className="includes-item">{p}</span>);
                })()}
              </span>
            </div>
          )}
        </div>

        <div className="detail-actions">
          {!product.sold && (
            <button className="btn btn-whatsapp" onClick={handleWhatsApp}>
              <WhatsappLogo size={20} weight="fill" />
              {t.contactWhatsapp}
            </button>
          )}
          {product.wallapopUrl && (
            <a className="btn btn-wallapop" href={product.wallapopUrl} target="_blank" rel="noopener noreferrer">
              <img src="/img/wallapop.svg" alt="" width="20" height="20" />
              {t.wallapop}
            </a>
          )}
          <button className="btn btn-share" onClick={handleShare}>
            {copied ? <CheckIcon size={20} weight="bold" /> : <LinkSimpleIcon size={20} weight="bold" />}
            {copied ? t.linkCopied : t.shareLink}
          </button>
        </div>
      </div>
    </div>
  );
}
