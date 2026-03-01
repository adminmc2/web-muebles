import { useState } from 'react';
import { TagIcon, PlusIcon } from '@phosphor-icons/react';
import { products } from '../data/products';
import { useLanguage } from '../i18n';
import ComboModal from './ComboModal';

export default function ComboCard({ combo }) {
  const { lang, t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const comboProducts = combo.productIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const totalPrice = comboProducts.reduce((sum, p) => sum + p.price, 0);
  const savings = totalPrice - combo.comboPrice;
  const displayName = lang === 'en' ? combo.name_en : combo.name;
  const displayDesc = lang === 'en' ? combo.desc_en : combo.desc;

  return (
    <>
      <div className="card combo-card" onClick={() => setShowModal(true)}>
        <div className="combo-imgs" style={{ backgroundColor: combo.bgColor || '#FFF0E0' }}>
          <span className="badge badge-combo">
            <TagIcon size={12} weight="bold" />
            {t.comboLabel}
          </span>
          {comboProducts.map((p, i) => (
            <div key={p.id} className="combo-img-wrap">
              <div className="combo-img-item">
                <img src={p.img} alt={lang === 'en' ? p.name_en : p.name} loading="lazy" />
                <span className="combo-img-label">{lang === 'en' ? p.name_en : p.name}</span>
                <span className="combo-img-label-price">{p.price} €</span>
              </div>
              {i < comboProducts.length - 1 && (
                <span className="combo-plus"><PlusIcon size={18} weight="bold" /></span>
              )}
            </div>
          ))}
        </div>
        <div className="card-body">
          <span className="combo-card-title-pill">{displayName}</span>
          <p className="price combo-price">
            <TagIcon size={18} weight="fill" />{combo.comboPrice} €
            <span className="price-original">{totalPrice} €</span>
          </p>
          <p className="combo-savings">
            {lang === 'en' ? `You save ${savings} €` : `Ahorras ${savings} €`}
          </p>
          <p className="desc">{displayDesc}</p>
        </div>
      </div>
      {showModal && <ComboModal combo={combo} onClose={() => setShowModal(false)} />}
    </>
  );
}
