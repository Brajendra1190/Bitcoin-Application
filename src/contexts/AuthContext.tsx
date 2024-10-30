import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { getKYCStatus } from '../services/kyc';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  kycVerified: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [kycVerified, setKycVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const kycStatus = await getKYCStatus(user.uid);
        setKycVerified(kycStatus);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, kycVerified, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}