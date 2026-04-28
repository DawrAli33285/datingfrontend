import { Navigate } from 'react-router-dom';

export default function PartnerGuard({ children }) {
  const isPartner = localStorage.getItem('isPartner') === 'true';
  if (isPartner) {
    return <Navigate to="/partner-review" replace />;
  }
  return children;
}