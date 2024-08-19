import axios from "axios";
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  const value = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated, loading }),
    [isAuthenticated, loading]
  );

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/checkAuth`);
      setIsAuthenticated(response.data);
    } catch (err) {
      setIsAuthenticated(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
  // const value = useMemo(
  //   () => ({ isAuthenticated, setIsAuthenticated }),
  //   [isAuthenticated]
  // );
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await axios
//           .get(`http://localhost:5000/checkAuth`)
//           .then((response) => {
//             setIsAuthenticated(response.data);
//             console.log("checkAuth", response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } catch (error) {
//         console.log("Request error:", error);
//         setIsAuthenticated({});
//       }
//     };

//     checkAuth();
//   }, []);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
