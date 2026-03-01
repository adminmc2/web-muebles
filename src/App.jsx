import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './i18n';
import { products } from './data/products';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';

function Home() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const soldCount = products.filter((p) => p.sold).length;

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header totalProducts={products.length} soldCount={soldCount} />
      <CategoryBar active={activeCategory} onChange={setActiveCategory} />
      <main id="products">
        <h2 className="section-title">{t.sectionTitle}</h2>
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
