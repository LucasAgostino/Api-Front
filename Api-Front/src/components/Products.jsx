import React, { useEffect, useState } from 'react';
import '../components/styles/Products.css';
import ProductCarousel from './ProductCarousel';
import BrandCarousel from './BrandCarousel';
import HeroCarousel from './HeroCarousel';
import { fetchProductos } from '../api/Product'; 
import { fetchCategories } from '../api/Category'; // Importa la función para obtener las categorías

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    // Obtener productos
    const getProducts = async () => {
      try {
        const data = await fetchProductos();
        setProducts(data);
      } catch (error) {
        setErrorProducts('Error al cargar los productos');
      } finally {
        setLoadingProducts(false);
      }
    };

    // Obtener categorías
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setErrorCategories('Error al cargar las categorías');
      } finally {
        setLoadingCategories(false);
      }
    };

    getProducts();
    getCategories();
  }, []);

  if (loadingProducts || loadingCategories) return <p>Cargando...</p>;
  if (errorProducts) return <p>{errorProducts}</p>;
  if (errorCategories) return <p>{errorCategories}</p>;

  return (
    <div className="main-container">
      <div>
        <HeroCarousel />
      </div>

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
          <li>
            {categories.map((category) => (
              <li key={category.categoryId}>{category.categoryName}</li> // Ajusta según los campos de tu categoría
            ))}
          </li>

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
            {products.map((product) => (
              <div key={product.productId} className="product-card1">
                <img 
                  src={`data:image/jpeg;base64,${product.imageBase64s[0]}`} 
                  alt={product.productName} 
                  className="product-image" 
                />
                <h3>{product.productName}</h3>
                <p>{product.productDescription}</p>
                <p className="precioProductos">${product.price}</p>
                <button className="view-more-btn">Ver más</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductsGrid;
