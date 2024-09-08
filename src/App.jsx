import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Registrar from './pages/Login/register';
import Sobre from './pages/sobre';
import Pokedex from './pages/poke';
import Itens from './pages/itens';
import SobreNos from './pages/sobreNos';

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
    </Routes>
  );
}

export default App;
