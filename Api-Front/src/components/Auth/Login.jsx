import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; 
import { authenticateUser } from '../../api/Auth'; // Importar la función de autenticación

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const authData = { username, password };
      const response = await authenticateUser(authData);
      
      // Guardar el token y el rol en localStorage
      localStorage.setItem('token', response.access_token); // Guardar el token JWT
      localStorage.setItem('role', response.role); // Guardar el rol del usuario

      console.log('Autenticación exitosa:', response);

          // Redirigir al usuario al home
          navigate('/');

          // Refresca toda la página después de redirigir
          setTimeout(() => {
            window.location.reload();
          }, 100); // Añade un pequeño retraso antes de recargar la página
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
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          ¿Todavía no tenés cuenta?{' '}
          <Link to="/register">Registrate acá</Link>
        </p>
      </div>
      <img className="login-image" src="/login.png" alt="Login Banner" />
      <div className="no-footer"></div>
    </div>
  );
};

export default Login;
