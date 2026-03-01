/* Configuración: reemplaza PHONE_NUMBER por tu número con código de país, sin signos ni espacios. Ej: 34123456789 (34 = España)
   Ejemplo: const PHONE_NUMBER = '34123456789'; */
const PHONE_NUMBER = 'TU_NUMERO_AQUI';

const products = [
  { id: 1, name: 'Sofá 3 plazas', price: '80€', desc: 'Buen estado, color gris.', img: 'https://images.unsplash.com/photo-1582582494701-2f0f8b2d7b1a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1' },
  { id: 2, name: 'Mesa de comedor', price: '50€', desc: 'Madera maciza, 120x80cm.', img: 'https://images.unsplash.com/photo-1582582494701-2f0f8b2d7b1a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2' },
  { id: 3, name: 'Silla de escritorio', price: '20€', desc: 'Ergonómica, ruedas nuevas.', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3' }
];

function renderProducts(){
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="price">${p.price}</p>
        <p>${p.desc}</p>
        <div class="actions">
          <a class="btn btn-whatsapp" href="#" onclick="openWhatsApp('${encodeURIComponent(p.name)}');return false;">Contactar por WhatsApp</a>
          <a class="btn btn-details" href="#" onclick="showDetails(${p.id});return false;">Ver detalles</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function openWhatsApp(productNameEncoded){
  if (!PHONE_NUMBER || PHONE_NUMBER.includes('TU_NUMERO')){
    alert('Por favor edicióna el archivo script.js y pon tu número de teléfono en la constante PHONE_NUMBER antes de usar WhatsApp.');
    return;
  }
  const productName = decodeURIComponent(productNameEncoded);
  const pageUrl = window.location.href;
  const text = `Hola, estoy interesado en el producto: ${productName}. Vi la publicación aquí: ${pageUrl}`;
  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function showDetails(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  alert(`${p.name}\n\nPrecio: ${p.price}\n\n${p.desc}`);
}

// Mostrar número en el footer si el usuario configura PHONE_NUMBER
function updatePhoneDisplay(){
  const el = document.getElementById('phone-display');
  if (PHONE_NUMBER && !PHONE_NUMBER.includes('TU_NUMERO')){
    el.textContent = `+${PHONE_NUMBER}`;
  } else {
    el.textContent = '+TU_NUMERO';
  }
}

renderProducts();
updatePhoneDisplay();
