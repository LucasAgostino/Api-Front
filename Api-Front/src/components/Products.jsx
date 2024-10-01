import React from 'react';
import '../components/styles/Products.css';
import ProductCarousel from './ProductCarousel';
import BrandCarousel from './BrandCarousel';

const ProductsGrid = () => {
  return (
    
    <div className="main-container">

        <div>
            <ProductCarousel />
        </div>

        <div>
            <BrandCarousel />
        </div>
      
      {/* Sidebar y Productos dentro del mismo contenedor */}
      <div className="content-wrapper">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Categorías</h2>
          <ul>
            <li>Categoria 1</li>
            <li>Categoria 2</li>
            <li>Categoria 3</li>
          </ul>

          <h2>Etiquetas</h2>
          <ul>
            <li>Etiqueta 1</li>
            <li>Etiqueta 2</li>
            <li>Etiqueta 3</li>
          </ul>
        </aside>

        {/* Productos */}
        <div className="products-content">
          <div className="products-grid">
            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Producto 1" className="product-image" />
              <h3>Producto 1</h3>
              <p>$100</p>
              <p>Descripción del producto 1</p>
              <button className="view-more-btn">Ver más</button>
            </div>

            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Producto 2" className="product-image" />
              <h3>Producto 2</h3>
              <p>$200</p>
              <p>Descripción del producto 2</p>
              <button className="view-more-btn">Ver más</button>
            </div>

            <div className="product-card">
              <img src="https://via.placeholder.com/150" alt="Producto 3" className="product-image" />
              <h3>Producto 3</h3>
              <p>$300</p>
              <p>Descripción del producto 3</p>
              <button className="view-more-btn">Ver más</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductsGrid;
