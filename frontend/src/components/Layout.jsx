import "../styles/themes.css";

export default function Layout({ children }) {
  return (
    <div className="site-wrapper">
      {/* ENCABEZADO  */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">Generador de Dietas</div>

          <nav className="nav">
            <a href="#">Inicio</a>
            {/* ENCABEZADO  <a href="#">Plan Nutricional</a>
            <a href="#">Sobre Nosotros</a>
            <a href="#">Contacto</a>*/}
          </nav>
        </div>
      </header>

      {/* SECCIÓN PRINCIPAL */}
      <main className="main-section">
        {/* LADO IZQUIERDO — FORMULARIO */}
        <div className="left-panel">
          <div className="panel-card">
            <h2 className="panel-title">Evaluación Nutricional</h2>
            <p className="panel-desc">
              Complete su información para generar un plan nutricional
              clínicamente adaptado a su metabolismo, estilo de vida y
              objetivos.
            </p>

            {/* FORMULARIO */}
            <div className="form-box">{children}</div>
          </div>
        </div>

        {/* LADO DERECHO  */}
        <div className="right-panel">
          <div className="image-glass">
            <img
              src="https://policlinicocontinental.pe/web/wp-content/uploads/2018/07/dieta-balanceada-saludable.jpeg"
              alt="nutiricion"
              className="responsive-image"
            />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        {new Date().getFullYear()} Consulte a su médico nutriológo
      </footer>
    </div>
  );
}
