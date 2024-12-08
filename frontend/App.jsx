import { Routes, Route } from 'react-router-dom'; 
import Login from './src/pages/login/Login';
import Registrar from './src/pages/login/register';
import Sobre from './src/pages/sobre/sobre';
import Pokedex from './src/pages/poke/poke';
import Itens from './src/pages/itens/itens';
import SobreNos from './src/pages/sobrenos/sobreNos';
import AdminRoute from './src/pages/admin/AdminRoute';
import AdminCrudPage from './src/pages/admin/AdminCrudPage';
import ViewerRoute from './src/pages/ViewerRoute';
import AlterarDados from './src/pages/alterar/AlterarDados';
import PokemonCrud from './src/pages/admin/pokemonCrud';

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
      <Route path="/alterarDados" element={<ViewerRoute> <AlterarDados/> </ViewerRoute>} />
      
      <Route path="/admin/crud" element={<AdminRoute> <AdminCrudPage /> </AdminRoute>} />
      <Route path="/admin/pokemonCrud" element={<AdminRoute> <PokemonCrud /> </AdminRoute>} />
    </Routes>
  );
}

export default App;
