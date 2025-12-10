import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import './Auth.css';

export const LoginViewNew: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError('');

    try {
      await login({
        email: formData.correo,
        password: formData.password,
      });
      navigate('/');
    } catch (err: any) {
      setLocalError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <>
      <Navbar activeLink="login" />

      {/* Login Form */}
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', marginTop: '80px' }}>
        <div className="card shadow-lg border-0" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-body p-4">
            <h3 className="text-center text-primary mb-4">Iniciar Sesión</h3>
            {(error || localError) && <div className="alert alert-danger">{error || localError}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  name="correo"
                  placeholder="usuario@temwok.com"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
