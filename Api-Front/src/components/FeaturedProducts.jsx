// src/components/FeaturedProducts.jsx
import React from 'react';

const products = [
  { id: 1, name: 'Laptop XYZ', price: '$999', image: '/images/laptop.jpg' },
  { id: 2, name: 'Smartphone ABC', price: '$699', image: '/images/smartphone.jpg' },
  { id: 3, name: 'Smart TV 4K', price: '$1199', image: '/images/smarttv.jpg' },
];

const FeaturedProducts = () => {
  return (
    <section id="products" className="featured-products">
      <div className="container">
        <h2>Productos Destacados</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button>Ver más</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
