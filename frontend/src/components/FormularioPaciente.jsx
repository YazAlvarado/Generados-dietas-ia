import { useState } from "react";
import axios from "axios";
import "../styles/themes.css";

export default function FormularioPaciente({ onMenuGenerado }) {
  const [perfil, setPerfil] = useState({
    nombre: "",
    edad: "",
    peso: "",
    altura: "",
    sexo: "",
    actividad: "moderado",
    patologia: "",
    presupuesto: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/plan-dieta",
        perfil
      );
      console.log("Respuesta del backend:", response.data);
      onMenuGenerado(response.data);
    } catch (err) {
      console.error("Error en frontend:", err);
      setError("No se pudo generar el plan. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1 className="title">Planificador de Dieta Inteligente</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="nombre"
          placeholder="Nombre"
          value={perfil.nombre}
          onChange={handleChange}
        />
        <input
          className="input"
          type="number"
          name="edad"
          placeholder="Edad"
          value={perfil.edad}
          onChange={handleChange}
        />
        <input
          className="input"
          type="number"
          name="peso"
          placeholder="Peso (kg)"
          value={perfil.peso}
          onChange={handleChange}
        />
        <input
          className="input"
          type="number"
          name="altura"
          placeholder="Altura (cm)"
          value={perfil.altura}
          onChange={handleChange}
        />
        <select
          className="select"
          name="sexo"
          value={perfil.sexo}
          onChange={handleChange}
        >
          <option value="">Sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
        <select
          className="select"
          name="actividad"
          value={perfil.actividad}
          onChange={handleChange}
        >
          <option value="sedentario">Sedentario</option>
          <option value="ligero">Ligero</option>
          <option value="moderado">Moderado</option>
          <option value="intenso">Intenso</option>
        </select>
        <input
          className="input"
          name="patologia"
          placeholder="Patología o condición"
          value={perfil.patologia}
          onChange={handleChange}
        />
        <input
          className="input"
          type="number"
          name="presupuesto"
          placeholder="Presupuesto (MXN)"
          value={perfil.presupuesto}
          onChange={handleChange}
        />

        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Generando menú..." : "Generar menú"}
        </button>
      </form>
    </div>
  );
}
