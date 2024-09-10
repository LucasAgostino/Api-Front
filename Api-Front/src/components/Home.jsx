
import React from 'react';
import FeaturedProducts from './FeaturedProducts';

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <h1>Bienvenido a ElectroShop</h1>
        <p>Los mejores productos electrónicos al mejor precio.</p>
        <FeaturedProducts />
      </div>
    </section>
  );
};

export default Home;
