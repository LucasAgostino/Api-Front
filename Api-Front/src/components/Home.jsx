import React from 'react';
import '../components/styles/Home.css'; 
import FeaturedProducts from './FeaturedProducts';
import LearnWithUs from './LearnWithUs';
import BrandCarousel from './BrandCarousel';
import Ubicacion from './Ubicacion';

const Home = () => {
  return (
    <body>
      <div className="firstContainer">
        <div className="textIntro">
          <h1 className="introText__head">
            Equipate con el <span>mejor</span> hardware <span>&</span> gadgets.
          </h1>
          <p className="introText__link">
                <a href="/catalogo">
                  Mirá nuestros productos<i className="linkProductos"></i>
                </a>
              </p>
        </div>
      </div>
      <div>
        <FeaturedProducts />
      </div> 
      <div>
        <LearnWithUs />
      </div>
      <div>
        <Ubicacion />
      </div>
      <div>
        <BrandCarousel />
      </div>
      
    </body>
  );
};

export default Home;
