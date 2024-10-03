// components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/Auth'; // Importa la función de registro

const Register = () => {
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
      const response = await registerUser({ email, password }); // Usar la función de registro
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
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmar Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
