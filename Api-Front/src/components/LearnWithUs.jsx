import React from 'react';
import '../components/styles/LearnWithUs.css'; // Importamos el archivo CSS

const LearnWithUs = () => {
  return (
    <div className="learn-with-us-section">
      <div className="text-container">
        <h2 className="learn-title">Aprende con Nosotros</h2>
        <p className="learn-description">
        Si estás buscando la notebook perfecta para tus necesidades, ¡llegaste al lugar correcto! En este video te presentamos una comparativa detallada de las 
        5 mejores notebooks disponibles en Argentina. Ya seas estudiante, profesional o gamer, te ayudamos a elegir la opción ideal según rendimiento, portabilidad y 
        relación calidad-precio. No te pierdas esta guía esencial para tomar la mejor decisión en tu próxima compra.
        </p>
      </div>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/6Y0rnMbZzzk"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default LearnWithUs;
