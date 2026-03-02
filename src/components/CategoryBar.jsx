import { SquaresFour, Armchair, Lamp, Table, Stack, CoatHanger, Fan, TShirt, TagIcon } from '@phosphor-icons/react';
import { useLanguage } from '../i18n';

const categories = [
  { key: 'all', icon: SquaresFour, labelKey: 'catAll' },
  { key: 'offers', icon: TagIcon, labelKey: 'catOffers' },
  { key: 'armchairs', icon: Armchair, labelKey: 'catArmchairs' },
  { key: 'tables', icon: Table, labelKey: 'catTables' },
  { key: 'lamp', icon: Lamp, labelKey: 'catLamp' },
  { key: 'shelves', icon: Stack, labelKey: 'catShelves' },
  { key: 'coatracks', icon: CoatHanger, labelKey: 'catCoatracks' },
  { key: 'fans', icon: Fan, labelKey: 'catFans' },
  { key: 'garmentcare', icon: TShirt, labelKey: 'catGarmentCare' },
];

export default function CategoryBar({ active, onChange }) {
  const { t } = useLanguage();

  return (
    <nav className="category-bar" aria-label="Categories">
      <div className="category-scroll">
        {categories.map(({ key, icon: Icon, labelKey }) => (
          <button
            key={key}
            className={`category-item${active === key ? ' active' : ''}`}
            data-cat={key}
            onClick={() => onChange(key)}
          >
            <div className="category-icon">
              <Icon size={24} weight={active === key ? 'fill' : 'regular'} />
            </div>
            <span>{t[labelKey]}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
