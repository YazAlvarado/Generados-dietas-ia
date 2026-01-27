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
        <label className="label">Nombre:</label>
        <input
          className="input"
          name="nombre"
          value={perfil.nombre}
          onChange={handleChange}
        />

        <label className="label">Edad:</label>
        <input
          className="input"
          type="number"
          name="edad"
          value={perfil.edad}
          onChange={handleChange}
        />

        <label className="label">Peso (kg):</label>
        <input
          className="input"
          type="number"
          name="peso"
          value={perfil.peso}
          onChange={handleChange}
        />

        <label className="label">Altura (cm):</label>
        <input
          className="input"
          type="number"
          name="altura"
          value={perfil.altura}
          onChange={handleChange}
        />

        <label className="label">Sexo:</label>
        <select
          className="select"
          name="sexo"
          value={perfil.sexo}
          onChange={handleChange}
        >
          <option value="">Selecciona...</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        <label className="label">Nivel de actividad:</label>
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

        <div className="actividad-info">
          {perfil.actividad === "sedentario" && (
            <p>
              <b>Sedentario:</b> Poco o nada de ejercicio, estilo de vida
              mayormente sentado.
            </p>
          )}
          {perfil.actividad === "ligero" && (
            <p>
              <b>Ligero:</b> Caminatas suaves o actividad física ligera 1-3
              veces por semana.
            </p>
          )}
          {perfil.actividad === "moderado" && (
            <p>
              <b>Moderado:</b> Ejercicio regular (30-60 min, 3-5 veces/semana),
              ritmo cardiaco elevado.
            </p>
          )}
          {perfil.actividad === "intenso" && (
            <p>
              <b>Intenso:</b> Entrenamiento vigoroso o deportes competitivos
              frecuentes.
            </p>
          )}
        </div>

        <label className="label">
          Patología o condiciones a especificar: (mencionar si se consume algún
          medicamento)
        </label>
        <input
          className="input"
          name="patologia"
          value={perfil.patologia}
          onChange={handleChange}
        />

        <label className="label">Presupuesto (MXN):</label>
        <input
          className="input"
          type="number"
          name="presupuesto"
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
