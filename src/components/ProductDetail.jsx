import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, WhatsappLogo, MapPin, Tag, Info } from '@phosphor-icons/react';
import { products, PHONE_NUMBER } from '../data/products';
import { useLanguage } from '../i18n';

export default function ProductDetail() {
  const { id } = useParams();
  const { lang, t } = useLanguage();
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

  function handleWhatsApp() {
    if (!PHONE_NUMBER || PHONE_NUMBER.includes('TU_NUMERO')) {
      alert('Configura tu número de teléfono en src/data/products.js');
      return;
    }
    const text = `Hola, me interesa: ${product.name} (${product.price} €). ¿Sigue disponible?`;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  }

  return (
    <div className="product-detail">
      <div className="detail-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} weight="bold" />
          {t.back}
        </Link>
      </div>

      <div className="detail-img-wrap">
        <img src={product.img} alt={displayName} />
        {product.sold && <span className="badge badge-sold">{t.statusSold}</span>}
      </div>

      <div className="detail-body">
        <div className="detail-top">
          <h1>{displayName}</h1>
          <p className="detail-price">{product.price} €</p>
        </div>

        <div className="detail-meta">
          <span className="meta-item">
            <Tag size={16} weight="bold" />
            {product.sold ? t.statusSold : t.statusAvailable}
          </span>
          <span className="meta-item">
            <MapPin size={16} weight="bold" />
            {t.pickupInPerson}
          </span>
        </div>

        <div className="detail-section">
          <h3>
            <Info size={18} weight="bold" />
            {t.description}
          </h3>
          <p>{displayDesc}</p>
        </div>

        {!product.sold && (
          <div className="detail-actions">
            <button className="btn btn-whatsapp btn-lg" onClick={handleWhatsApp}>
              <WhatsappLogo size={22} weight="fill" />
              {t.contactWhatsapp}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
