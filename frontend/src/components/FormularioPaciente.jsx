import { useState } from "react";
import axios from "axios";
import "../styles/themes.css";

// ICONOS
import nombreIcon from "../styles/multimedia/Nombre.png";
import edadIcon from "../styles/multimedia/Edad.png";
import pesoIcon from "../styles/multimedia/Peso.png";
import alturaIcon from "../styles/multimedia/Altura.png";
import sexoIcon from "../styles/multimedia/Sexo.png";
import actividadIcon from "../styles/multimedia/Actividad.png";
import saludIcon from "../styles/multimedia/Patologia.png";
import dineroIcon from "../styles/multimedia/Presupuesto.png";

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
        perfil,
      );
      console.log("MENÚ RECIBIDO:", response.data);
      onMenuGenerado(response.data);
    } catch {
      setError("No se pudo generar el plan. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1 className="title">Planificador de Dieta Inteligente</h1>

      <form onSubmit={handleSubmit}>
        {/* NOMBRE */}
        <label className="label label-with-icon">
          <img src={nombreIcon} alt="Nombre" />
          Nombre
        </label>
        <input
          className="input"
          name="nombre"
          value={perfil.nombre}
          onChange={handleChange}
        />

        {/* EDAD */}
        <label className="label label-with-icon">
          <img src={edadIcon} alt="Edad" />
          Edad
        </label>
        <input
          className="input"
          type="number"
          name="edad"
          value={perfil.edad}
          onChange={handleChange}
        />

        {/* PESO */}
        <label className="label label-with-icon">
          <img src={pesoIcon} alt="Peso" />
          Peso (kg)
        </label>
        <input
          className="input"
          type="number"
          name="peso"
          value={perfil.peso}
          onChange={handleChange}
        />

        {/* ALTURA */}
        <label className="label label-with-icon">
          <img src={alturaIcon} alt="Altura" />
          Altura (cm)
        </label>
        <input
          className="input"
          type="number"
          name="altura"
          value={perfil.altura}
          onChange={handleChange}
        />

        {/* SEXO */}
        <label className="label label-with-icon">
          <img src={sexoIcon} alt="Sexo" />
          Sexo
        </label>
        <select
          className="select"
          name="sexo"
          value={perfil.sexo}
          onChange={handleChange}
        >
          <option value="">Selecciona…</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        {/* ACTIVIDAD */}
        <label className="label label-with-icon">
          <img src={actividadIcon} alt="Actividad" />
          Nivel de actividad
        </label>
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

        {/* INFO ACTIVIDAD */}
        <div className="actividad-info">
          {perfil.actividad === "sedentario" && (
            <p>
              <b>Sedentario:</b> Poco o nada de ejercicio.
            </p>
          )}
          {perfil.actividad === "ligero" && (
            <p>
              <b>Ligero:</b> Actividad suave 1–3 veces/semana.
            </p>
          )}
          {perfil.actividad === "moderado" && (
            <p>
              <b>Moderado:</b> Ejercicio regular 3–5 veces/semana.
            </p>
          )}
          {perfil.actividad === "intenso" && (
            <p>
              <b>Intenso:</b> Entrenamiento vigoroso frecuente.
            </p>
          )}
        </div>

        {/* PATOLOGÍA */}
        <label className="label label-with-icon">
          <img src={saludIcon} alt="Salud" />
          Patologías / Medicamentos
        </label>
        <input
          className="input"
          name="patologia"
          value={perfil.patologia}
          onChange={handleChange}
        />

        {/* PRESUPUESTO */}
        <label className="label label-with-icon">
          <img src={dineroIcon} alt="Presupuesto" />
          Presupuesto (MXN)
        </label>
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
