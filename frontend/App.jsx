import { Routes, Route } from 'react-router-dom';
import Login from './src/components/Login';
import Registrar from './src/components/register';
import Sobre from './src/pages/sobre';
import Pokedex from './src/pages/poke';
import Itens from './src/pages/itens';
import SobreNos from './src/pages/sobreNos';
import AdminRoute from './src/components/AdminRoute';
import AdminCrudPage from './src/components/AdminCrudPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="/itens" element={<Itens />} />
      <Route path="/sobrenos" element={<SobreNos />} /> 
      <Route path="/admin/crud" element={<AdminRoute><AdminCrudPage /></AdminRoute>} />
    </Routes>
  );
}

export default App;
