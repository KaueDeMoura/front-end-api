import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Pokedex from './pages/poke';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokedex" element={<Pokedex />} />
    </Routes>
  );
}

export default App;
