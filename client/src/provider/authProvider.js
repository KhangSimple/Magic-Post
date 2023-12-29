import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem('token'));
  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    console.log('Call verify token in auth');
    if (token) {
      var status;
      axios
        .get(`http://localhost:1510/verify-token`, {
          params: {
            token: token,
          },
        })
        .then(function (response) {
          status = response.data.status;
          if (status === 'success') {
            console.log('Okeee');
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            localStorage.setItem('token', token);
          } else {
            console.log('vllll');
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);
  // Memoized value  the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token],
  );
  // Provide the authentication context to the children components
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
