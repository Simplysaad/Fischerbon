import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axios.util';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // start with loading
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data: response } = await axiosInstance.get('/auth/status');
        if (response.success) setUser(response.data);
        else setUser(null);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async ({ email, password }) => {
    const { data: response } = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    if (response.success) {
      setUser(response.data);
      // Navigate back to the original page or default to home
      const fallbackUrl = user.role === 'admin' ? '/admin/' : '/dashboard';
      const from = location.state?.from?.pathname || fallbackUrl;
      setTimeout(() => navigate(from, { replace: true }), 1500);
    }
    return response;
  };

  const logout = async () => {
    await axiosInstance.get('/auth/logout');
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
