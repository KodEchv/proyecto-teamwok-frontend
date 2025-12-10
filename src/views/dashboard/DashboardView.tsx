import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useUserStore } from '../../store/user.store';
import './Dashboard.css';

export const DashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { logout, role } = useAuthStore();
  const { users, fetchAllUsers, isLoading, error } = useUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-content">
          <h1>TeamWork</h1>
          <div className="navbar-actions">
            <span>Rol: {role}</span>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <h2>Panel de Control</h2>
        {error && <div className="error-message">{error}</div>}
        {isLoading ? (
          <p>Cargando usuarios...</p>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.email}</h3>
                <p>Rol: {user.role}</p>
                <p>ID: {user.id}</p>
                {role === 'ADMIN' && (
                  <button
                    onClick={() => navigate(`/dashboard/users/${user.id}`)}
                    className="edit-btn"
                  >
                    Ver Detalles
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
