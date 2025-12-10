import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import './Auth.css';
import { UsersTable } from '../../components/UsersTable';

export const RegisterViewNew: React.FC = () => {
    const navigate = useNavigate();
    const { register, isLoading, error, role, token } = useAuthStore();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        correo: '',
        cedula: '',
        phone: '',
        password: '',
        role: 'DOCUMENTADOR',
    });
    const [localError, setLocalError] = useState('');

    // Verificar si el usuario es admin
    const isAdmin = role === 'ADMIN' && token;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLocalError('');

        // Validaciones
        if (!formData.firstName.trim()) {
            setLocalError('El nombre es obligatorio');
            return;
        }
        if (!formData.correo.trim()) {
            setLocalError('El correo es obligatorio');
            return;
        }
        if (!formData.cedula.trim()) {
            setLocalError('La cédula es obligatoria');
            return;
        }
        if (!formData.password.trim()) {
            setLocalError('La contraseña es obligatoria');
            return;
        }

        try {
            await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.correo,
                cedula: formData.cedula,
                phone: formData.phone,
                password: formData.password,
                role: formData.role,
            });
            navigate('/');
        } catch (err: any) {
            setLocalError(err.message || 'Error al registrar usuario');
        }
    };

    if (!isAdmin) {
        return (
            <>
                <Navbar activeLink="register" />
                <div
                    className="container d-flex justify-content-center align-items-center"
                    style={{ minHeight: '85vh', marginTop: '80px' }}
                >
                    <div className="card shadow-lg border-0" style={{ maxWidth: '450px', width: '100%' }}>
                        <div className="card-body p-5 text-center">
                            <h3 className="text-danger mb-3">⛔ Acceso Denegado</h3>
                            <p className="text-muted mb-4">
                                Solo los administradores pueden registrar nuevos usuarios.
                            </p>
                            <button className="btn btn-primary" onClick={() => navigate('/profile')}>
                                Ver Mi Perfil
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar activeLink="register" />

            {/* Register Form - Scrollable Container */}
            <div
                style={{
                    marginTop: '80px',
                    marginBottom: '80px',
                    minHeight: 'calc(100vh - 160px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: '30px',
                    paddingBottom: '30px',
                    overflowY: 'auto'
                }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 col-sm-12">
                            <div className="card shadow-lg border-0">
                                <div className="card-body p-5">
                                    <h2 className="text-center text-primary mb-1">
                                        ➕ Nuevo Usuario
                                    </h2>
                                    <p className="text-center text-muted small mb-4">
                                        Completa el formulario para registrar un nuevo usuario en el sistema
                                    </p>

                                    {(error || localError) && (
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            <strong>Error:</strong> {error || localError}
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setLocalError('')}
                                            ></button>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        {/* Row: Nombre y Apellido */}
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="firstName" className="form-label">
                                                    <strong>Nombre</strong> <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="Ej: Juan"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="lastName" className="form-label">
                                                    <strong>Apellido</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Ej: Pérez"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="mb-3">
                                            <label htmlFor="correo" className="form-label">
                                                <strong>Correo electrónico</strong> <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                id="correo"
                                                name="correo"
                                                placeholder="usuario@temwok.com"
                                                value={formData.correo}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* Cédula */}
                                        <div className="mb-3">
                                            <label htmlFor="cedula" className="form-label">
                                                <strong>Cédula</strong> <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="cedula"
                                                name="cedula"
                                                placeholder="1234567890"
                                                value={formData.cedula}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        {/* Teléfono */}
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label">
                                                <strong>Teléfono</strong>
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control form-control-lg"
                                                id="phone"
                                                name="phone"
                                                placeholder="+57 300 123 4567"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Rol */}
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label">
                                                <strong>Rol</strong> <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className="form-select form-select-lg"
                                                id="role"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">-- Selecciona un rol --</option>
                                                <option value="DOCUMENTADOR">📄 Documentador</option>
                                                <option value="AUDITOR">🔍 Auditor</option>
                                                <option value="LIDER">👨‍💼 Líder</option>
                                                <option value="ADMIN">📋 ADMIN</option>
                                            </select>
                                        </div>

                                        {/* Contraseña */}
                                        <div className="mb-4">
                                            <label htmlFor="password" className="form-label">
                                                <strong>Contraseña</strong> <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                id="password"
                                                name="password"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <small className="text-muted d-block mt-1">
                                                Mínimo 8 caracteres recomendado
                                            </small>
                                        </div>

                                        {/* Botones de Acción */}
                                        <div className="d-grid gap-2">
                                            <button
                                                type="submit"
                                                className="btn btn-success btn-lg"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                        Registrando...
                                                    </>
                                                ) : (
                                                    '✅ Registrar Usuario'
                                                )}
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-success btn-lg"
                                                onClick={() => navigate('/')}
                                                disabled={isLoading}
                                            >
                                                ❌ Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla de usuarios */}
            <section className="container">
                <UsersTable />
            </section>

            <Footer />
        </>
    );
};
