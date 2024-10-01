import React, { useEffect } from 'react';
import '../components/styles/BrandCarousel.css'; // Asegúrate de ajustar la ruta según tu estructura de carpetas.

const BrandCarousel = () => {
  useEffect(() => {
    const timer = 4000;
    let i = 0;
    const items = document.querySelectorAll('#c > li');
    const max = items.length;

    const moveCarousel = () => {
      items.forEach(item => item.classList.remove('active'));

      items[i].style.transitionDelay = '0s';
      items[i + 1].style.transitionDelay = '0.25s';
      items[i + 2].style.transitionDelay = '0.5s';
      items[i + 3].style.transitionDelay = '0.75s';

      if (i < max - 4) {
        i += 4;
      } else {
        i = 0;
      }

      items[i].classList.add('active');
      items[i].style.left = '0';
      items[i + 1].classList.add('active');
      items[i + 1].style.left = '25%';
      items[i + 2].classList.add('active');
      items[i + 2].style.left = '50%';
      items[i + 3].classList.add('active');
      items[i + 3].style.left = '75%';
    };

    const intervalId = setInterval(moveCarousel, timer);

    return () => clearInterval(intervalId); // Limpiar intervalo al desmontar el componente
  }, []);

  return (
    <ul id="c">
      <li><img src="/inicio/Logitech.jpg" alt="Marca 1" /></li>
      <li><img src="/inicio/asus.png" alt="Marca 2" /></li>
      <li><img src="/inicio/hp.png" alt="Marca 3" /></li>
      <li><img src="/inicio/hyperx.png" alt="Marca 4" /></li>

      <li><img src="/inicio/nvidia.png" alt="Marca 5" /></li>
      <li><img src="/inicio/amd.png" alt="Marca 6" /></li>
      <li><img src="/inicio/intel.png" alt="Marca 7" /></li>
      <li><img src="/inicio/gigabyte.png" alt="Marca 8" /></li>

      <li><img src="/inicio/corsair.png" alt="Marca 9" /></li>
      <li><img src="/inicio/dell.png" alt="Marca 10" /></li>
      <li><img src="/inicio/asrock.png" alt="Marca 11" /></li>
      <li><img src="/inicio/samsung.png" alt="Marca 12" /></li>
    </ul>
  );
};

export default BrandCarousel;
