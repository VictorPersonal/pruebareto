import { useState } from "react";
import axios from "axios";

const Ingreso = () => {
  const [form, setForm] = useState({ placa: "", marca: "", color: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/vehiculos", {
      ...form,
      hora_ingreso: new Date(),
    });
    alert("Vehículo registrado con éxito");
    setForm({ placa: "", marca: "", color: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registrar Ingreso</h2>
      <form onSubmit={handleSubmit}>
        <input name="placa" placeholder="Placa" value={form.placa} onChange={handleChange} />
        <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} />
        <input name="color" placeholder="Color" value={form.color} onChange={handleChange} />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Ingreso;
