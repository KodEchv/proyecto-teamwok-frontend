import { useEffect, useState } from 'react';
import { userService } from '../services/user.service';
import type { User } from '../models/auth.model';
import './UsersTable.css';

export const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await userService.getAllUsers();
        
        if (!Array.isArray(data)) {
          throw new Error('El servidor devolvió datos inválidos');
        }
        
        setUsers(data);
        setFilteredUsers(data);
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError(err.message || 'Error al cargar usuarios. Intenta recargar la página.');
        setUsers([]);
        setFilteredUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filtrar por búsqueda (email)
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rol
    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  if (error) {
    return (
      <div className="users-table-container">
        <h3 className="text-primary fw-bold mb-4">Usuarios Registrados</h3>
        <div className="alert alert-danger d-flex align-items-center">
          <span className="me-2">⚠️</span>
          <div>
            <strong>Error al cargar usuarios:</strong>
            <p className="mb-0">{error}</p>
          </div>
        </div>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          🔄 Recargar página
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="users-table-container">
        <h3 className="text-primary fw-bold mb-4">Usuarios Registrados</h3>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  const roles = Array.from(new Set(users.map((u) => u.role)));

  return (
    <div className="users-table-container">
      <h3 className="text-primary fw-bold mb-4">Usuarios Registrados</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Buscar por email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <select
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">📋 Todos los roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>📧 Email</th>
              <th>👤 Rol</th>
              <th>📅 Creado</th>
              <th>🔄 Actualizado</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.email}</strong>
                  </td>
                  <td>
                    <span
                      className={`badge bg-${
                        user.role === 'ADMIN'
                          ? 'danger'
                          : user.role === 'DOCUMENTADOR'
                            ? 'success'
                            : user.role === 'AUDITOR'
                              ? 'info'
                              : user.role === 'LIDER'
                                ? 'warning'
                                : 'secondary'
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td>
                    {new Date(user.updatedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-muted py-4">
                  No hay usuarios que coincidan con los filtros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="alert alert-info mt-3">
        📊 Total de usuarios: <strong>{filteredUsers.length}</strong> de{' '}
        <strong>{users.length}</strong>
      </div>
    </div>
  );
};
