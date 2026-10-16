import { Routes, Route } from 'react-router-dom'
import Categorias from './pages/Categorias'
import Productos from './pages/Productos'
import Reportes from './pages/Reportes'
import Graficas from './pages/Graficas'
import Graficas2 from './pages/Graficas2'

function App() {
  return (
    <Routes>
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/graficas" element={<Graficas />} />
      <Route path="/graficas2" element={<Graficas2 />} />
    </Routes>
  )
}
export default App