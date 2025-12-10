import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/user.store';
import { useAuthStore } from '../../store/auth.store';
import './UserDetail.css';

export const UserDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedUser, fetchUserById, updateUser, deleteUser, isLoading, error } =
    useUserStore();
  const { role } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (id) {
      fetchUserById(parseInt(id));
    }
  }, [id]);

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      try {
        await updateUser(parseInt(id), formData);
        setIsEditing(false);
      } catch {
        console.error('Error al actualizar usuario');
      }
    }
  };

  const handleDelete = async () => {
    if (id && window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await deleteUser(parseInt(id));
        navigate('/dashboard');
      } catch {
        console.error('Error al eliminar usuario');
      }
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!selectedUser) return <div>Usuario no encontrado</div>;

  return (
    <div className="user-detail-container">
      <button onClick={() => navigate('/dashboard')} className="back-btn">
        ← Volver
      </button>
      <div className="user-detail-card">
        <h2>Detalles del Usuario</h2>
        {error && <div className="error-message">{error}</div>}
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Rol:</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
            <div className="button-group">
              <button type="submit" className="save-btn">
                Guardar
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="user-info">
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Rol:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Creado:</strong>{' '}
              {new Date(selectedUser.createdAt).toLocaleDateString()}
            </p>
            {role === 'ADMIN' && (
              <div className="button-group">
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Editar
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  Eliminar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
