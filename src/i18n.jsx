import { createContext, useContext, useState, useCallback } from 'react';

const translations = {
  es: {
    heroLabel: 'Moving sale',
    heroTitle1: 'Segundo hogar,',
    heroTitle2: 'mismo diseño',
    heroSubtitle: 'Muebles de Kave Home, Sklum y Westwing en perfecto estado.',
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
    footerWallapop: 'Ver perfil en Wallapop',
    catAll: 'Todos',
    catOffers: 'Ofertas',
    catSofa: 'Sofás',
    catChairs: 'Sillas',
    catArmchairs: 'Butacas',
    catDining: 'Mesas comedor',
    catTables: 'Mesitas',
    catBookcase: 'Estanterías',
    catBed: 'Camas',
    catLamp: 'Lámparas',
    catShelves: 'Repisas',
    catCoatracks: 'Percheros',
    catFans: 'Ventiladores',
    catGarmentCare: 'Cuidado de ropa',
    catShoeCabinets: 'Zapateros',
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
    heroTitle1: 'Second home,',
    heroTitle2: 'same design',
    heroSubtitle: 'Furniture from Kave Home, Sklum and Westwing in perfect condition.',
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
    footerWallapop: 'View profile on Wallapop',
    catAll: 'All',
    catOffers: 'Offers',
    catSofa: 'Sofas',
    catChairs: 'Chairs',
    catArmchairs: 'Armchairs',
    catDining: 'Dining tables',
    catTables: 'Side tables',
    catBookcase: 'Bookcases',
    catBed: 'Beds',
    catLamp: 'Lamps',
    catShelves: 'Shelves',
    catCoatracks: 'Coat racks',
    catFans: 'Fans',
    catGarmentCare: 'Garment care',
    catShoeCabinets: 'Shoe cabinets',
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
