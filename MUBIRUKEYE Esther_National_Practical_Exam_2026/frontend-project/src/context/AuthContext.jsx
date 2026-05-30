import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem('username') || null
  );

  const login = async (username, password) => {
    const res = await api.post('/auth/login', {
      username,
      password,
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('username', res.data.username);

    setUser(res.data.username);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);