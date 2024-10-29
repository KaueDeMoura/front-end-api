import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      navigate('/login');
      return;
    }

    if (role !== 'Admin') {
      alert('Somente admins podem acessar esta pagina');
      navigate('/sobre');
    }
  }, [navigate]);

  return children; 
};

export default AdminRoute;
