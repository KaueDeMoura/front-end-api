import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Login/register';
import Home from './pages/Home';
import Pokedex from './pages/poke';


function App() {
  return (
    <Routes>
  <Route path="/login" element={<Login/>} />
  <Route path="/registrar" element={<Register/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/pokedex" element={<Pokedex/>} />
    </Routes>
  );
}

export default App;
