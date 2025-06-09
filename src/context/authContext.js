'use client';
import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [accessList, setAccessList] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("Authorization");
    if (storedToken) {
      setToken(storedToken);
      fetchUserAccess(storedToken);
    }
  }, []);

  const fetchUserAccess = async (token) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_AUTHENTICATION_URL}/api/resources/my-access`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();

    // Transform the data to only include resourceId and resourceName
    const filteredAccessList = data.map((item) => ({
      resourceId: item.resourceId,
      resourceName: item.resourceName,
    }));

    setAccessList(filteredAccessList);
  };

  return (
    <AuthContext.Provider value={{ token, accessList }}>
      {children}
    </AuthContext.Provider>
  );
}
