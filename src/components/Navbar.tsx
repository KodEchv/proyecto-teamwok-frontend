import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

interface NavbarProps {
  activeLink?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeLink = '' }) => {
  const navigate = useNavigate();
  const { logout, token, role } = useAuthStore();

  const isAuthenticated = !!token;

  // Determinar qué pestañas puede ver según el rol
  const canSeeTab = (requiredRole: string): boolean => {
    if (!isAuthenticated) return false;
    if (role === 'ADMIN') return true; // Admin ve todo
    return role === requiredRole; // Otros roles solo ven su pestaña
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* LOGO */}
        <a className="navbar-brand text-info fw-bold" href="/" onClick={() => navigate('/')}>
          TEMWOK
        </a>

        {/* BOTÓN DE MENÚ (hamburguesa) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS DE NAVEGACIÓN */}
        <div className="collapse navbar-collapse justify-content-end" id="navMenu">
          <ul className="navbar-nav">
            {/* Perfil - Todos los usuarios autenticados */}
            {isAuthenticated && (
              <li className="nav-item">
                <a
                  className={`nav-link ${activeLink === 'profile' ? 'active' : ''}`}
                  href="#profile"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/profile');
                  }}
                >
                  PERFIL
                </a>
              </li>
            )}

            {/* Agregar Usuario - Solo ADMIN */}
            {isAuthenticated && role === 'ADMIN' && (
              <li className="nav-item">
                <a
                  className={`nav-link ${activeLink === 'register' ? 'active' : ''}`}
                  href="#register"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/register');
                  }}
                >
                 NUEVO USUARIO
                </a>
              </li>
            )}

            {/* Auditor - ADMIN y AUDITOR */}
            {isAuthenticated && canSeeTab('AUDITOR') && (
              <li className="nav-item">
                <a
                  className={`nav-link ${activeLink === 'auditor' ? 'active' : ''}`}
                  href="#auditor"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/auditor');
                  }}
                >
                  AUDITOR DE VIDEOS
                </a>
              </li>
            )}

            {/* Documentador - ADMIN y DOCUMENTADOR */}
            {isAuthenticated && canSeeTab('DOCUMENTADOR') && (
              <li className="nav-item">
                <a
                  className={`nav-link ${activeLink === 'documentador' ? 'active' : ''}`}
                  href="#documentador"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/documentador');
                  }}
                >
                  DOCUMENTADOR
                </a>
              </li>
            )}

            {/* Líder - ADMIN y LIDER */}
            {isAuthenticated && canSeeTab('LIDER') && (
              <li className="nav-item">
                <a
                  className={`nav-link ${activeLink === 'lider' ? 'active' : ''}`}
                  href="#lider"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/lider');
                  }}
                >
                  LÍDER DE CUADRILLA
                </a>
              </li>
            )}

            {/* Planeación - ADMIN y PLANEACION */}
            {isAuthenticated && canSeeTab('PLANEACION') && (
              <li className="nav-item">
                <a
                  className={`nav-link ${activeLink === 'planeacion' ? 'active' : ''}`}
                  href="#planeacion"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/planeacion');
                  }}
                >
                  PLANEACIÓN
                </a>
              </li>
            )}

            {/* Salir - Todos los usuarios autenticados */}
            {isAuthenticated && (
              <li className="nav-item">
                <a
                  className="nav-link text-danger fw-bold d-flex align-items-center"
                  href="#logout"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Salir
                </a>
              </li>
            )}

            {/* Login - Usuarios no autenticados */}
            {!isAuthenticated && (
              <li className="nav-item">
                <a
                  className={`nav-link ${activeLink === 'login' ? 'active' : ''}`}
                  href="#login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                >
                  LOGIN
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
