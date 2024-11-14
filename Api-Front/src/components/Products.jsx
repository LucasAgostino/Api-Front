import React, { useState, useEffect } from 'react';
import '../components/styles/Products.css';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductCarousel from './ProductCarousel';
import BrandCarousel from './BrandCarousel';
import HeroCarousel from './HeroCarousel';
import { fetchProductos, filterProducts } from '../api/Product';
import { fetchTags } from '../api/Product';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '../api/SliceCategory';

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorTags, setErrorTags] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const initialCategory = location.state?.category || null;
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.items);
  const loadingCategories = useSelector((state) => state.category.loading);
  const errorCategories = useSelector((state) => state.category.error);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProductos();
        setProducts(data);
        handleFilter();
      } catch (error) {
        setErrorProducts('Error al cargar los productos');
      } finally {
        setLoadingProducts(false);
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
    dispatch(loadCategories());
    getTags();
  }, [dispatch]);

  useEffect(() => {
    if (initialCategory) {
      handleFilter(initialCategory, selectedTags);
    }
  }, [initialCategory]);

  const handleFilter = async (categoryId = selectedCategory, tags = selectedTags) => {
    setLoadingProducts(true);
    try {
      const filteredProducts = await filterProducts(minPrice, maxPrice, categoryId, tags);
      setProducts(filteredProducts);
    } catch (error) {
      setErrorProducts('Error al filtrar los productos');
    } finally {
      setLoadingProducts(false);
    }
  };
  const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - price * discountPercentage;
  };
  const handleTagClick = (tag) => {
    const newSelectedTags = new Set(selectedTags);

    if (newSelectedTags.has(tag)) {
      newSelectedTags.delete(tag);
    } else {
      newSelectedTags.add(tag);
    }

    setSelectedTags(newSelectedTags);
    handleFilter(selectedCategory, newSelectedTags);
  };

  const handleCategoryClick = (categoryId) => {
    const newSelectedCategory = categoryId === selectedCategory ? null : categoryId;
    setSelectedCategory(newSelectedCategory);
    handleFilter(newSelectedCategory, selectedTags);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleTags = () => {
    setIsTagsOpen(!isTagsOpen);
  };

  const handleViewMore = (productId) => {
    navigate(`/product-details/${productId}`);
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
