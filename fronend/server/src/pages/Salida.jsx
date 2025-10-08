import { useEffect, useState } from "react";
import axios from "axios";

const Salida = () => {
  const [vehiculos, setVehiculos] = useState([]);

  const cargarVehiculos = async () => {
    const res = await axios.get("http://localhost:5000/vehiculos");
    setVehiculos(res.data);
  };

  const eliminarVehiculo = async (id) => {
    await axios.delete(`http://localhost:5000/vehiculos/${id}`);
    cargarVehiculos();
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vehículos Registrados</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Color</th>
            <th>Ingreso</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.placa}</td>
              <td>{v.marca}</td>
              <td>{v.color}</td>
              <td>{v.hora_ingreso}</td>
              <td>
                <button onClick={() => eliminarVehiculo(v.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Salida;
