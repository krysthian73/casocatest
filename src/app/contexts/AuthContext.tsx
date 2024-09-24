"use client"
import { createContext, ReactNode, useMemo, useState } from 'react';
import Api from '../services/api'
import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: { email: string, id: number } | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const userCookie = getCookie('user')
  const [isLoading, setIsLoading] = useState(false)
  const user = useMemo(() => {
    if (userCookie) {
      return JSON.parse(userCookie)
    }
    return null

  }, [userCookie]);
  const router = useRouter();
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    Api.post('/auth/signin', {
      email: email,
      password: password
    }).then((response) => {
      setCookie('user', response.data.data.user)
      router.push('/tasks')
    }).catch((error) => {
      console.error(error)
    }).finally(() => setIsLoading(false))
  };

  const logout = () => {
    deleteCookie('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
