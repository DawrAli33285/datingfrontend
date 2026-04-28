import { Navigate } from 'react-router-dom';

export default function OwnerGuard({ children }) {
  const isPartner = localStorage.getItem('isPartner') === 'true';
  if (!isPartner) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}