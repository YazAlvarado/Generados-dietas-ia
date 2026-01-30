import "../styles/themes.css";

export default function MenuNutricional({ data }) {
  console.log("DATA RECIBIDA EN MENU:", data);

  if (!data) return null;

  // data = { calorias, menu }
  const raw = typeof data === "string" ? JSON.parse(data) : data;

  const caloriasObjetivo = raw.calorias ?? 0;

  // 🔥 TODO lo que genera la IA viene dentro de raw.menu
  const ia = raw.menu || {};

  const menu = ia.menu || {};
  const hidratacion = ia.hidratacion || {};
  const resumen = ia.resumen || {};
  const justificacion_nutricional = ia.justificacion_nutricional || "";

  const renderComida = (titulo, comida) => {
    if (!comida || !comida.platillo) return null;

    return (
      <div className="menu-section">
        <h2 className="menu-section-title">{titulo}</h2>

        <p>
          <strong>Platillo:</strong> {comida.platillo}
        </p>

        <h4>Ingredientes:</h4>
        <ul className="menu-list">
          {comida.ingredientes?.map((ing, i) => (
            <li key={i}>
              {ing.nombre} — {ing.cantidad} (${ing.costo_mxn ?? 0} MXN)
            </li>
          ))}
        </ul>

        <p>
          <strong>Preparación:</strong> {comida.preparacion}
        </p>
        <p>
          <strong>Calorías:</strong> {comida.calorias_kcal ?? 0} kcal
        </p>
        <p>
          <strong>Líquidos:</strong> {comida.liquidos || "—"}
        </p>
        <p>
          <strong>Costo total:</strong> ${comida.costo_total_mxn ?? 0} MXN
        </p>
      </div>
    );
  };

  return (
    <div className="menu-wrapper">
      <div className="menu-card print-area">
        <h1 className="menu-title">Tu menú personalizado</h1>
        <p className="menu-subtitle">
          Calorías objetivo:{" "}
          <strong>{Math.round(caloriasObjetivo)} kcal</strong>
        </p>

        {renderComida("Desayuno", menu.desayuno)}
        {renderComida("Comida", menu.comida)}
        {renderComida("Cena", menu.cena)}

        {/* HIDRATACIÓN */}
        {Object.keys(hidratacion).length > 0 && (
          <div className="menu-section">
            <h2 className="menu-section-title">Hidratación</h2>
            <p>Total diario: {hidratacion.total_ml ?? 0} ml</p>
            <p>
              Gasto hídrico estimado:{" "}
              {hidratacion.gasto_hidrico_estimado_ml ?? 0} ml
            </p>
            <p>{hidratacion.justificacion || ""}</p>
          </div>
        )}

        {/* RESUMEN */}
        {Object.keys(resumen).length > 0 && (
          <div className="menu-section">
            <h2 className="menu-section-title">Resumen nutricional</h2>
            <p>Calorías totales: {resumen.total_calorias_dia_kcal ?? 0} kcal</p>
            <p>Costo total del día: ${resumen.costo_total_dia_mxn ?? 0} MXN</p>
          </div>
        )}

        {/* JUSTIFICACIÓN */}
        {justificacion_nutricional && (
          <div className="menu-section">
            <h2 className="menu-section-title">Justificación nutricional</h2>
            <p>{justificacion_nutricional}</p>
          </div>
        )}
      </div>

      <div className="menu-actions">
        <button className="btn print-btn" onClick={() => window.print()}>
          Imprimir / Exportar a PDF
        </button>
      </div>
    </div>
  );
}
