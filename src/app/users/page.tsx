import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  businessName?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://agendatelo-backend.up.railway.app/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Usuarios del Sistema</h1>
      {users.length === 0 ? (
        <p>No hay usuarios aún.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.fullName}</strong> ({user.email})
              {user.businessName && ` - ${user.businessName}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}