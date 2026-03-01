import { createContext, useContext, useState, useCallback } from 'react';

const translations = {
  es: {
    heroLabel: 'Venta por mudanza',
    heroTitle1: 'Tus futuros',
    heroTitle2: 'muebles',
    heroSubtitle: 'Me mudo y no me llevo nada. Muebles en buen estado a precios muy reducidos. Solo recogida en persona.',
    available: 'disponibles',
    sold: 'vendidos',
    pickup: 'recogida',
    scrollCta: 'Ver muebles',
    sectionTitle: 'Muebles disponibles',
    whatsapp: 'WhatsApp',
    seeMore: 'Ver más',
    back: 'Volver',
    description: 'Descripción',
    statusAvailable: 'Disponible',
    statusSold: 'Vendido',
    pickupInPerson: 'Recogida en persona',
    contactWhatsapp: 'Contactar por WhatsApp',
    notFound: 'Producto no encontrado',
    backToList: 'Volver al listado',
    footerContact: 'Contacto directo',
    footerDefault: 'Contacto por WhatsApp en cada producto',
    catAll: 'Todos',
    catOffers: 'Ofertas',
    catSofa: 'Sofás',
    catChairs: 'Sillas',
    catDining: 'Mesas comedor',
    catTables: 'Mesitas',
    catBookcase: 'Estanterías',
    catBed: 'Camas',
    catLamp: 'Lámparas',
    catAccessories: 'Accesorios',
    getSpecialPrice: 'Consigue precio especial',
    priceNegotiable: 'Precio negociable',
    seeItLive: 'Verla en vivo',
    dimensionsLabel: 'Dimensiones',
    conditionLabel: 'Estado',
    conditionNew: 'Como nuevo',
    conditionUsed: 'Usado',
    usageLabel: 'Uso',
    brandLabel: 'Empresa',
    includesLabel: 'Incluye',
    pickupDiscount: '11 % dto. recogida en persona',
    locationZone: '28005 Madrid',
    wallapop: 'Wallapop',
    comboLabel: 'Combo',
    comboSpecial: 'Combo especial',
    offersTitle: 'Ofertas especiales',
    offersCombos: 'Combos',
    offersProducts: 'Productos con descuento',
  },
  en: {
    heroLabel: 'Moving sale',
    heroTitle1: 'Your future',
    heroTitle2: 'furniture',
    heroSubtitle: "I'm moving and taking nothing with me. Quality furniture at very reduced prices. Pickup only.",
    available: 'available',
    sold: 'sold',
    pickup: 'pickup',
    scrollCta: 'Browse furniture',
    sectionTitle: 'Available furniture',
    whatsapp: 'WhatsApp',
    seeMore: 'See more',
    back: 'Back',
    description: 'Description',
    statusAvailable: 'Available',
    statusSold: 'Sold',
    pickupInPerson: 'Pickup in person',
    contactWhatsapp: 'Contact via WhatsApp',
    notFound: 'Product not found',
    backToList: 'Back to listing',
    footerContact: 'Direct contact',
    footerDefault: 'Contact via WhatsApp on each product',
    catAll: 'All',
    catOffers: 'Offers',
    catSofa: 'Sofas',
    catChairs: 'Chairs',
    catDining: 'Dining tables',
    catTables: 'Side tables',
    catBookcase: 'Bookcases',
    catBed: 'Beds',
    catLamp: 'Lamps',
    catAccessories: 'Accessories',
    getSpecialPrice: 'Get special price',
    priceNegotiable: 'Price negotiable',
    seeItLive: 'See it live',
    dimensionsLabel: 'Dimensions',
    conditionLabel: 'Condition',
    conditionNew: 'Like new',
    conditionUsed: 'Used',
    usageLabel: 'Usage',
    brandLabel: 'Brand',
    includesLabel: 'Includes',
    pickupDiscount: '11% off for in-person pickup',
    locationZone: '28005 Madrid',
    wallapop: 'Wallapop',
    comboLabel: 'Combo',
    comboSpecial: 'Special combo',
    offersTitle: 'Special offers',
    offersCombos: 'Combos',
    offersProducts: 'Products with discount',
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') || 'es';
    } catch {
      return 'es';
    }
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'es' ? 'en' : 'es';
      try { localStorage.setItem('lang', next); } catch {}
      return next;
    });
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
