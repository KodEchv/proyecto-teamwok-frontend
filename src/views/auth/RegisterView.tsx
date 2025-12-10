import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import type { RegisterData } from '../../models/auth.model';
import './Auth.css';
import { UsersTable } from '../../components/UsersTable';

export const RegisterView: React.FC = () => {
    const navigate = useNavigate();
    const { register, isLoading, error } = useAuthStore();
    const [formData, setFormData] = useState<RegisterData>({
        email: '',
        password: '',
        role: 'USUARIO',
        cedula: '',
        firstName: '',
        lastName: '',
        phone: '',
    });
    const [localError, setLocalError] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        try {
            await register(formData);
            navigate('/dashboard');
        } catch {
            setLocalError('Error al registrarse');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Registrarse</h2>
                {error && <div className="error-message">{error}</div>}
                {localError && <div className="error-message">{localError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Cédula:</label>
                        <input
                            type="text"
                            name="cedula"
                            value={formData.cedula}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellido:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Rol:</label>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="USUARIO">Usuario</option>
                            <option value="DOCUMENTADOR">Documentador</option>
                            <option value="AUDITOR">Auditor</option>
                            <option value="LIDER">Líder</option>
                            <option value="ADMIN">Administrador</option>
                        </select>
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Cargando...' : 'Registrarse'}
                    </button>
                </form>
                <p>
                    ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
                </p>
            </div>

            {/* Tabla de usuarios */}
            <section className="container">
                <UsersTable />
            </section>
        </div>
    );
};
