import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Importa useDispatch para gestionar el estado
import { registerUserThunk } from '../../api/SliceUser'; // Importa el thunk de registro
import '../styles/Login.css'; // Reutiliza el estilo de login

const Register = () => {
  const [firstname, setFirstname] = useState(''); // Estado para el nombre
  const [lastname, setLastname] = useState(''); // Estado para el apellido
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Obtén la función dispatch

  const handleRegister = async (e) => {
    e.preventDefault();

    // Asegúrate de que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      // Llamar a la función de registro utilizando el thunk
      const response = await dispatch(registerUserThunk({
        firstname,
        lastname,
        email,
        password,
      })).unwrap(); // Unwrap para manejar errores de la promesa

      // Guardar el token y el rol en el estado de Redux
      const { token, role } = response; // Asumiendo que la respuesta incluye el token y el rol

      console.log('Registro exitoso:', response);
      // Si el registro es exitoso, redirigir al usuario
      navigate('/login');
    } catch (error) {
      console.error('Error al registrarse:', error);
      setErrorMessage("Error al registrarse. Por favor, intenta nuevamente.");
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
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Muestra el mensaje de error */}
        <p className="login-prompt">
          ¿Ya tenés cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
      <div className="no-footer"></div>
    </div>
  );
};

export default Register;
