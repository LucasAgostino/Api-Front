import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import '../components/styles/FeaturedProducts.css';
import { fetchCategories } from '../api/Category'; // Asegúrate de importar fetchCategories

const FeaturedProducts = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Inicializamos useNavigate

  // Efecto para cargar las categorías al montar el componente
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data); // Guardamos las categorías obtenidas
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    getCategories();
  }, []);

  const handleViewMore = (categoryId) => {
    console.log('View more', categoryId);
    navigate('/products', { state: { category: categoryId } }); // Pasamos el categoryId en lugar del nombre
  };

  // Función para obtener el categoryId por el nombre de la categoría
  const getCategoryIdByName = (categoryName) => {
    const category = categories.find(cat => cat.categoryName === categoryName);
    return category ? category.categoryId : null;
  };

  return (
    <div>
      <h2 className="featured-title">PRODUCTOS DESTACADOS</h2>
      <div className="product-container">
        <div className="product-card">
          <img src="/inicio/notebookHome.png" alt="Notebook" className="product-image" style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
          <h3 className="product-title">Notebooks</h3>
          <p className="product-description">
            Encontrá la mejor selección de notebooks, ideales para estudiantes, profesionales y gamers. Nuestras notebooks combinan potencia y portabilidad,
            con procesadores de última generación, pantallas nítidas y un diseño elegante. Perfectas para trabajar, estudiar o disfrutar de tu contenido favorito en cualquier lugar.
          </p>
          <div className="btn-container">
            <button className="btn-view-more" onClick={() => handleViewMore(getCategoryIdByName('notebook'))}>
              Ver más
            </button>
          </div>
        </div>
        <div className="product-card">
          <img src="/inicio/placadevideoHome.jpeg" alt="Placa de Video" className="product-image" style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
          <h3 className="product-title">Placas de Video</h3>
          <p className="product-description">
            Potenciá tu experiencia de juego y creatividad con nuestras placas de video de alto rendimiento. 
            Ya sea que busques jugar a los últimos títulos en máxima resolución o trabajar con edición de video y diseño gráfico, nuestras placas de video están diseñadas
            para ofrecer gráficos nítidos, fluidez y capacidad multitarea sin igual.
          </p>
          <div className="btn-container">
            <button className="btn-view-more" onClick={() => handleViewMore(getCategoryIdByName('Placas de Video'))}>
              Ver más
            </button>
          </div>
        </div>
        <div className="product-card">
          <img src="/inicio/aurisHome.jpg" alt="Periféricos" className="product-image" style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
          <h3 className="product-title">Periféricos</h3>
          <p className="product-description">
            Complementá tu setup con nuestra variedad de periféricos de alta calidad. Desde teclados mecánicos retroiluminados hasta mouses ergonómicos y auriculares de sonido 
            envolvente, tenemos todo lo que necesitas para mejorar tu productividad y experiencia de juego. Perfectos para quienes buscan comodidad, precisión y estilo.
          </p>
          <div className="btn-container">
            <button className="btn-view-more" onClick={() => handleViewMore(getCategoryIdByName('perifericos'))}>
              Ver más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
