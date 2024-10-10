import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/Auth'; // Importa la función de registro
import '../styles/Login.css'; // Reutiliza el estilo de login

const Register = () => {
  const [firstname, setFirstname] = useState(''); // Estado para el nombre
  const [lastname, setLastname] = useState(''); // Estado para el apellido
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Asegúrate de que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // Llamar a la función de registro con todos los datos requeridos
      const response = await registerUser({
        firstname,
        lastname,
        email,
        password
      });
      const token = response.token; // Asumiendo que el token viene en la respuesta

      // Guardar el token y el rol en el localStorage
      const role = 'USER'; // Establecer el rol como USER
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      console.log('Registro exitoso:', response);
      // Si el registro es exitoso, redirigir al usuario
      navigate('/');
    } catch (error) {
      console.error('Error al registrarse:', error);
      alert("Error al registrarse. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <img className="login-image" src="/login.png" alt="Register Banner" /> 
      {/* Imagen a la izquierda */}
      <div className="login-form">
        <h2>¡Registrate!</h2>
        <p>Crea tu cuenta</p>
        <form onSubmit={handleRegister}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>
        <p className="login-prompt">
          ¿Ya tenes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
      <div className="no-footer"></div>
    </div>
  );
};

export default Register;
