import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { userService } from '../../services/user.service';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import type { User, UserProfile } from '../../models/auth.model';
import './ProfileView.css';

export const ProfileView: React.FC = () => {
  const navigate = useNavigate();
  const { userId, role, token } = useAuthStore();
  const [userData, setUserData] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          setError('Usuario no identificado');
          return;
        }

        const user = await userService.getUserById(userId);
        setUserData(user);

        // Obtener perfil del usuario
        const profile = await userService.getUserProfile(userId);
        setUserProfile(profile);
      } catch (err: any) {
        setError(err.message || 'Error al cargar la información del usuario');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [userId, token]);

  if (loading) {
    return (
      <>
        <Navbar activeLink="profile" />
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar activeLink="profile" />

      <div className="container mt-5 mb-5" style={{ minHeight: '70vh' }}>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Mi Perfil</h2>
              </div>

              {error && <div className="alert alert-danger m-3">{error}</div>}

              <div className="card-body">
                {userData && (
                  <div className="profile-info">
                    {/* Información de autenticación */}
                    <div className="section mb-4">
                      <h4 className="text-primary mb-3">Información de Cuenta</h4>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-muted">Rol</label>
                          <p className="form-control-static fw-bold">
                            <span className={`badge bg-${role === 'ADMIN' ? 'danger' : 'info'}`}>
                              {role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : 'N/A'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Información de perfil */}
                    {userProfile ? (
                      <div className="section mb-4">
                        <h4 className="text-primary mb-3">Información Personal</h4>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Nombres</label>
                            <p className="form-control-static fw-bold">{userProfile.firstName}</p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Apellidos</label>
                            <p className="form-control-static fw-bold">{userProfile.lastName}</p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Cédula</label>
                            <p className="form-control-static fw-bold">{userProfile.cedula}</p>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label text-muted">Teléfono</label>
                            <p className="form-control-static fw-bold">{userProfile.phone || 'No registrado'}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="alert alert-info">No hay información de perfil disponible</div>
                    )}

                    {/* Fechas */}
                    <div className="section mb-4">
                      <h4 className="text-primary mb-3">Información de Sistema</h4>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-muted">Creado en</label>
                          <p className="form-control-static">
                            {new Date(userData.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-muted">Actualizado en</label>
                          <p className="form-control-static">
                            {new Date(userData.updatedAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="section mt-5 pt-4 border-top">
                      <button className="btn btn-success" onClick={() => navigate('/')}>
                        ← Volver al Inicio
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
