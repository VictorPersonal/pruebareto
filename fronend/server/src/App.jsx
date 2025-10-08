import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Ingreso from "./pages/Ingreso";
import Salida from "./pages/Salida";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "20px", padding: "10px", background: "#ccc" }}>
        <Link to="/">Ingreso</Link>
        <Link to="/salida">Salida</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Ingreso />} />
        <Route path="/salida" element={<Salida />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
