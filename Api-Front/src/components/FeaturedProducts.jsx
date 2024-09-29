import React from 'react';
import '../components/styles/FeaturedProducts.css'; // Importar el archivo CSS

const FeaturedProducts = () => {
  return (
    <div>
      <h2 className="featured-title">PRODUCTOS DESTACADOS</h2> {/* Título agregado */}
      <div className="product-container">
        <div className="product-card">
          <img src="/inicio/notebookHome.png" alt="Notebook" className="product-image" style={{ width: '100%', height: '300px', objectFit: 'contain' }}/>
          <h3 className="product-title">Notebooks</h3>
          <p className="product-description">
            Encontrá la mejor selección de notebooks, ideales para estudiantes, profesionales y gamers. Nuestras notebooks combinan potencia y portabilidad, 
            con procesadores de última generación, pantallas nítidas y un diseño elegante. Perfectas para trabajar, estudiar o disfrutar de tu contenido favorito en cualquier lugar.
          </p>
          <div className="btn-container">
            <button className="btn-view-more">Ver más</button>
          </div>
        </div>
        <div className="product-card">
          <img src="/inicio/placadevideoHome.jpeg" alt="Notebook" className="product-image" style={{ width: '100%', height: '300px', objectFit: 'contain' }}/>
          <h3 className="product-title">Placas de Video</h3>
          <p className="product-description">
            Potenciá tu experiencia de juego y creatividad con nuestras placas de video de alto rendimiento. 
            Ya sea que busques jugar a los últimos títulos en máxima resolución o trabajar con edición de video y diseño gráfico, nuestras placas de video están diseñadas
            para ofrecer gráficos nítidos, fluidez y capacidad multitarea sin igual.
          </p>
          <div className="btn-container">
            <button className="btn-view-more">Ver más</button>
          </div>
        </div>
        <div className="product-card">
          <img src="/inicio/aurisHome.jpg" alt="Notebook" className="product-image" style={{ width: '100%', height: '300px', objectFit: 'contain' }}/>
          <h3 className="product-title">Periféricos</h3>
          <p className="product-description">
            Complementá tu setup con nuestra variedad de periféricos de alta calidad. Desde teclados mecánicos retroiluminados hasta mouses ergonómicos y auriculares de sonido 
            envolvente, tenemos todo lo que necesitas para mejorar tu productividad y experiencia de juego. Perfectos para quienes buscan comodidad, precisión y estilo.
          </p>
          <div className="btn-container">
            <button className="btn-view-more">Ver más</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
