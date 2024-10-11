import React, { useState, useEffect } from 'react';
import '../components/styles/Products.css';
import { useNavigate } from 'react-router-dom';
import ProductCarousel from './ProductCarousel';
import BrandCarousel from './BrandCarousel';
import HeroCarousel from './HeroCarousel';
import { fetchProductos, filterProducts } from '../api/Product';
import { fetchCategories } from '../api/Category';
import { fetchTags } from '../api/Product';

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);
  const [errorTags, setErrorTags] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const navigate = useNavigate();

  // Guarda la posición actual del scroll
  const saveScrollPosition = () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  };

  // Restaura la posición del scroll
  const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  };

  // Obtiene todos los productos, categorías y etiquetas al cargar el componente
  useEffect(() => {
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

    const getTags = async () => {
      try {
        const data = await fetchTags();
        setTags(data);
      } catch (error) {
        setErrorTags('Error al cargar las etiquetas');
      } finally {
        setLoadingTags(false);
      }
    };

    getProducts();
    getCategories();
    getTags();
  }, []);

  const handleViewMore = (productId) => {
    saveScrollPosition(); // Guarda la posición antes de cambiar de página
    navigate(`/product-details/${productId}`);
  };

  // Función para manejar el filtro por precio, categoría y etiquetas
  const handleFilter = async (categoryId = selectedCategory, tags = selectedTags) => {
    // Guarda la posición del scroll
    saveScrollPosition();

    setLoadingProducts(true);
    try {
      const filteredProducts = await filterProducts(minPrice, maxPrice, categoryId, tags);
      setProducts(filteredProducts);
    } catch (error) {
      setErrorProducts('Error al filtrar los productos');
    } finally {
      setLoadingProducts(false);
      setTimeout(() => {
        restoreScrollPosition(); // Restaurar la posición después del filtrado
      }, 100); // Añadir un ligero retraso para asegurarse de que la página se haya renderizado
    }
  };

  // Función para manejar la selección de etiquetas
  const handleTagClick = (tag) => {
    const newSelectedTags = new Set(selectedTags);

    if (newSelectedTags.has(tag)) {
      newSelectedTags.delete(tag); // Deseleccionar si ya está
    } else {
      newSelectedTags.add(tag); // Seleccionar nueva etiqueta
    }

    setSelectedTags(newSelectedTags); // Actualiza el estado de etiquetas seleccionadas

    // Filtrar automáticamente con todas las etiquetas seleccionadas
    handleFilter(selectedCategory, newSelectedTags);
  };

  // Función para manejar el click en categorías
  const handleCategoryClick = (categoryId) => {
    const newSelectedCategory = categoryId === selectedCategory ? null : categoryId; // Cambiar categoría

    // Actualizar el estado de categoría
    setSelectedCategory(newSelectedCategory);

    // Filtrar automáticamente con la nueva categoría
    handleFilter(newSelectedCategory, selectedTags); // Aplicar el filtro inmediatamente
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleTags = () => {
    setIsTagsOpen(!isTagsOpen);
  };

  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - price * discountPercentage;
  };

  if (loadingProducts || loadingCategories || loadingTags) return <p>Cargando...</p>;
  if (errorProducts) return <p>{errorProducts}</p>;
  if (errorCategories) return <p>{errorCategories}</p>;
  if (errorTags) return <p>{errorTags}</p>;

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

      <div className="content-wrapper">
        <aside className="sidebar">
          {/* Filtro por precio */}
          <div className="price-filter">
            <h2>Filtrar por precio</h2>
            <div className="price-inputs">
              <label>
                Min:
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                />
              </label>
              <label>
                Max:
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                />
              </label>
            </div>
            <button onClick={() => handleFilter()} className="filter-btn">
              Filtrar
            </button>
          </div>

          {/* Categorías */}
          <h2 onClick={toggleCategories} style={{ cursor: 'pointer', fontSize: '1.2rem' }}>
            Categorías <span style={{ fontSize: '0.8rem' }}>{isCategoriesOpen ? '▲' : '▼'}</span>
          </h2>
          {isCategoriesOpen && (
            <div className="categories-container">
              {categories.map((category) => (
                <div
                  key={category.categoryId}
                  className={`category-item ${selectedCategory === category.categoryId ? 'selected' : ''}`}
                  onClick={() => handleCategoryClick(category.categoryId)}
                >
                  {category.categoryName}
                </div>
              ))}
            </div>
          )}

          {/* Etiquetas */}
          <h2 onClick={toggleTags} style={{ cursor: 'pointer', fontSize: '1.2rem' }}>
            Etiquetas <span style={{ fontSize: '0.8rem' }}>{isTagsOpen ? '▲' : '▼'}</span>
          </h2>
          {isTagsOpen && (
            <div className="tags-container">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className={`tag-item ${selectedTags.has(tag) ? 'selected' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </aside>

        <div className="products-content">
          <div className="products-grid">
            {products.map((product) => {
              const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);

              return (
                <div key={product.productId} className="product-card1">
                  <img
                    src={`data:image/jpeg;base64,${product.imageBase64s[0]}`}
                    alt={product.productName}
                    className="product-image"
                  />
                  <h3>{product.productName}</h3>
                  <p className="price">
                    {product.discountPercentage > 0 ? (
                      <>
                        <span className="original-price">${product.price.toFixed(2)}</span>{' '}
                        <span className="discounted-price">${discountedPrice.toFixed(2)}</span>{' '}
                        <span className="discount-percentage">({product.discountPercentage * 100}% OFF)</span>
                      </>
                    ) : (
                      <>${product.price.toFixed(2)}</>
                    )}
                  </p>
                  <button className="view-more-btn" onClick={() => handleViewMore(product.productId)}>
                    Ver más
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
