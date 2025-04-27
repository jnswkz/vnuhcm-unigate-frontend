import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getCookie("access_token");
        if (!token) {
          setIsLoggedIn(false);
          setUser(null);
          setIsLoadingAuth(false); 
          return;
        }
        const res = await api.get("/api/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsLoggedIn(true);
        setUser(res.data);
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoadingAuth(false); 
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}
