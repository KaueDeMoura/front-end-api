import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ViewerRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      alert('Somente usuários com permissões podem acessar esta página, por favor faça login ou crie sua conta');
      navigate('/login');
      return;
    }

    if (role !== 'Admin' && role !== 'Viewer') {
      alert('Somente usuários com permissões podem acessar esta página, por favor faça login ou crie sua conta');
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

export default ViewerRoute;
