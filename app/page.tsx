'use client';
export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://agendatelo-backend-production.up.railway.app/api/users');
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Error al conectar con el backend');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>AgendaTelo PWA</h1>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      {!loading && !error && (
        users.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <strong>{user.full_name}</strong> ({user.email}) – {user.location_city}
              </li>
            ))}
          </ul>
        )
      )}

      <hr style={{ margin: '2rem 0' }} />

      <p><small>Backend: Railway | DB: Supabase | Frontend: Vercel</small></p>
    </main>
  );
}
