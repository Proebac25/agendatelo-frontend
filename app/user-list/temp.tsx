'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  location_city: string;
  bio_description: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar usuarios');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Usuarios</h1>
      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
              <strong>{user.full_name}</strong> ({user.email})<br />
              📍 {user.location_city || 'Sin ciudad'}<br />
              📞 {user.phone || 'Sin teléfono'}<br />
              📝 {user.bio_description || 'Sin descripción'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}