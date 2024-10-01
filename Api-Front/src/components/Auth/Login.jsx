import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; 
import { authenticateUser } from '../../api/Auth'; // Importar la función de autenticación

const Login = () => {
  const [username, setUsername] = useState(''); // Cambiado a username
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authData = { username, password }; // Utilizando username
      const response = await authenticateUser(authData);
      
      // Aquí puedes manejar el token o la respuesta recibida, por ejemplo, guardarlo en localStorage
      localStorage.setItem('token', response.token); // Si la respuesta tiene un token JWT
      console.log('Autenticación exitosa:', response);

      // Redirigir al usuario después de una autenticación exitosa
      navigate('/');
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Error en la autenticación:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Bienvenido!</h2>
        <p>Inicia sesión</p>
        <form onSubmit={handleLogin}>
          <div>
            <label>Nombre de Usuario</label>
            <input
              type="text" // Cambiado a text
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Cambiado a setUsername
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          ¿Todavía no tienes cuenta?{' '}
          <Link to="/register">Regístrate acá</Link>
        </p>
      </div>
      <img className="login-image" src="/login.png" alt="Login Banner" />
      <div className="no-footer"></div>
    </div>
  );
};

export default Login;
