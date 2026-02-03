import fondoInicio from "../styles/multimedia/fondoInicio.png";
import "../styles/home.css";
import "../styles/animations.css";

export default function Home({ onComenzar }) {
  return (
    <section
      className="hero fade-in"
      style={{ backgroundImage: `url(${fondoInicio})` }}
    >
      <div className="hero-overlay">
        <h1>NutriHeal</h1>
        <p>Nutrición inteligente para tu bienestar</p>

        <button onClick={onComenzar}>Clic para empezar</button>
      </div>
    </section>
  );
}
