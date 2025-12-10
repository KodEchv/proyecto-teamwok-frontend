import { useNavigate } from 'react-router-dom';
import './Unauthorized.css';

export const UnauthorizedView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <h1>403</h1>
        <h2>No Autorizado</h2>
        <p>No tienes permisos para acceder a este recurso.</p>
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
};
