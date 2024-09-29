import React from 'react';
import '../components/styles/Ubicacion.css'; // Asegúrate de importar el archivo CSS

const Ubicacion = () => {
    return (
        <div className="ubicacion-container">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4904805595847!2d-58.38449352350978!3d-34.6170435582033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaba6ac89b35%3A0x1a2dc24cbca665a7!2sUADE!5e0!3m2!1ses!2sar!4v1727650748734!5m2!1ses!2sar"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="text-container">
            <h2>Dónde nos encontramos</h2>
            <p>
              Estamos ubicados en la Universidad Argentina de la Empresa (UADE),
              en el centro de Buenos Aires. Visítanos para recibir atención
              personalizada o compra en línea con envío directo.
            </p>
          </div>
        </div>
      );
};

export default Ubicacion;
