// import { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(
//     () => localStorage.getItem('token') || null
//   );
//   const [user, setUser] = useState(
//     () => JSON.parse(localStorage.getItem('user')) || null
//   );
//   [];
//   const login = (token, userData) => {
//     setToken(token);
//     setUser(userData);
//     // localStorage.setItem('token', token);
//     // localStorage.setItem('user', JSON.stringify(userData));
//     const { login } = useContext(AuthContext);
//     login(result.token, result.user);
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   };

//   useEffect(() => {
//     // Optional: validate token with backend here
//   }, []);

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
