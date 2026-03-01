import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './i18n';
import { products, combos } from './data/products';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import ComboCard from './components/ComboCard';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';

function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { t } = useLanguage();
  const visibleProducts = products.filter((p) => !p.hidden);
  const soldCount = visibleProducts.filter((p) => p.sold).length;

  const filtered =
    activeCategory === 'all'
      ? visibleProducts
      : activeCategory === 'offers'
        ? visibleProducts.filter((p) => p.discount && combos.some((c) => c.productIds.includes(p.id)))
        : visibleProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header totalProducts={visibleProducts.length} soldCount={soldCount} />
      <CategoryBar active={activeCategory} onChange={setActiveCategory} />
      <main id="products">
        {activeCategory === 'offers' && (
          <>
            <h2 className="offers-title">{t.offersTitle}</h2>
            <h3 className="offers-subtitle">{t.offersCombos}</h3>
            <section className="product-grid">
              {combos.map((combo) => (
                <ComboCard key={combo.id} combo={combo} />
              ))}
            </section>
            <h3 className="offers-subtitle">{t.offersProducts}</h3>
          </>
        )}
        <section className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
