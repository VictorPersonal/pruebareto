import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const { Pool } = pg;

// Configurar conexión a PostgreSQL con variables del .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Verificar conexión a la base de datos
pool.connect()
  .then(() => console.log("✅ Conexión exitosa a PostgreSQL"))
  .catch(err => console.error("❌ Error al conectar a PostgreSQL:", err));

// =====================
// RUTAS DEL BACKEND
// =====================

// Método GET: obtener todos los vehículos
app.get("/vehiculos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vehiculos ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los vehículos" });
  }
});

// Método POST: agregar un vehículo nuevo
app.post("/vehiculos", async (req, res) => {
  try {
    const { placa, marca, color, hora_ingreso } = req.body;
    const query = "INSERT INTO vehiculos (placa, marca, color, hora_ingreso) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [placa, marca, color, hora_ingreso];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al registrar el vehículo" });
  }
});

// Método PUT: actualizar datos de un vehículo
app.put("/vehiculos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { placa, marca, color, hora_salida } = req.body;
    const query = `
      UPDATE vehiculos 
      SET placa = $1, marca = $2, color = $3, hora_salida = $4 
      WHERE id = $5 RETURNING *`;
    const values = [placa, marca, color, hora_salida, id];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el vehículo" });
  }
});

// Método DELETE: eliminar un vehículo
app.delete("/vehiculos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM vehiculos WHERE id = $1", [id]);
    res.json({ message: "Vehículo eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el vehículo" });
  }
});

// =====================
// INICIAR SERVIDOR
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend ejecutándose en el puerto ${PORT}`);
});
