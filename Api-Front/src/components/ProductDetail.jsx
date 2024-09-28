// src/components/ProductDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

// Suponiendo que tienes una lista de productos, puedes simular una base de datos
const products = [
  { id: 1, name: 'Laptop XYZ', price: '$999', description: 'Una laptop potente para todas tus necesidades.', image: '/images/laptop.jpg' },
  { id: 2, name: 'Smartphone ABC', price: '$699', description: 'Un smartphone con las últimas características.', image: '/images/smartphone.jpg' },
  { id: 3, name: 'Smart TV 4K', price: '$1199', description: 'Disfruta de tus programas favoritos en 4K.', image: '/images/smarttv.jpg' },
];

const ProductDetail = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const product = products.find(p => p.id === parseInt(id)); // Busca el producto correspondiente

  if (!product) {
    return <h2>Producto no encontrado</h2>; // Manejo de errores si no se encuentra el producto
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Precio: {product.price}</p>
      <button>Añadir al carrito</button>
    </div>
  );
};

export default ProductDetail;
