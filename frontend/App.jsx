import { Routes, Route } from 'react-router-dom'; 
import Login from './src/components/Login';
import Registrar from './src/components/register';
import Sobre from './src/pages/sobre';
import Pokedex from './src/pages/poke';
import Itens from './src/pages/itens';
import SobreNos from './src/pages/sobreNos';
import AdminRoute from './src/components/AdminRoute';
import AdminCrudPage from './src/components/AdminCrudPage';
import ViewerRoute from './src/pages/ViewerRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />
      <Route path="/sobre" element={<ViewerRoute> <Sobre/> </ViewerRoute>} />
      <Route path="/pokedex" element={<ViewerRoute> <Pokedex/> </ViewerRoute>} />
      <Route path="/itens" element={<ViewerRoute> <Itens/> </ViewerRoute>} />
      <Route path="/sobrenos" element={<ViewerRoute> <SobreNos/> </ViewerRoute>} />
      
      <Route path="/admin/crud" element={<AdminRoute> <AdminCrudPage /> </AdminRoute>} />
    </Routes>
  );
}

export default App;
