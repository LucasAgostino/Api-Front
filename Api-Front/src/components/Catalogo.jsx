// src/components/Catalogo.jsx
import React from 'react';

const catalogoProductos = [
  {
    categoria: 'Computadoras',
    productos: [
      { id: 1, name: 'Laptop Gaming XYZ', price: '$1500', image: '/images/laptop-gaming.jpg' },
      { id: 2, name: 'PC de Escritorio ABC', price: '$1200', image: '/images/desktop-pc.jpg' },
    ],
  },
  {
    categoria: 'Smartphones',
    productos: [
      { id: 3, name: 'Smartphone ABC', price: '$699', image: '/images/smartphone.jpg' },
      { id: 4, name: 'Smartphone DEF', price: '$799', image: '/images/smartphone2.jpg' },
    ],
  },
  {
    categoria: 'Televisores',
    productos: [
      { id: 5, name: 'Smart TV 4K', price: '$1199', image: '/images/smarttv.jpg' },
      { id: 6, name: 'Televisor LED 32"', price: '$499', image: '/images/tv32.jpg' },
    ],
  },
];

const Catalogo = () => {
  return (
    <section id="catalogo" className="catalogo">
      <div className="container">
        <h2>Catálogo de Productos</h2>
        {catalogoProductos.map((categoria, index) => (
          <div key={index} className="categoria">
            <h3>{categoria.categoria}</h3>
            <div className="product-grid">
              {categoria.productos.map(producto => (
                <div key={producto.id} className="product-card">
                  <img src={producto.image} alt={producto.name} />
                  <h4>{producto.name}</h4>
                  <p>{producto.price}</p>
                  <button>Ver más</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Catalogo;
