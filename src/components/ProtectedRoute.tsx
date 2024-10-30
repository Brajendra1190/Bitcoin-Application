import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireKYC?: boolean;
}

export function ProtectedRoute({ children, requireKYC = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Add KYC check if required
  if (requireKYC) {
    // Implement KYC check logic here
  }

  return <>{children}</>;
}