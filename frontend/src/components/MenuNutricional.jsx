import "../styles/themes.css";

export default function MenuNutricional({ calorias, menu }) {
  const sections = menu.split(/###\s+/).filter(Boolean);

  return (
    <div className="menu-wrapper">
      <div className="menu-card">
        <h1 className="menu-title">Tu menú personalizado</h1>
        <p className="menu-subtitle">
          Calorías objetivo: <strong>{Math.round(calorias)} kcal</strong>
        </p>

        {sections.map((sec, idx) => {
          const [title, ...rest] = sec.split("\n");
          const items = rest
            .filter((line) => line.trim().startsWith("-"))
            .map((line) => line.replace(/^-\s*/, ""));
          const notes = rest.filter(
            (line) => !line.trim().startsWith("-") && line.trim()
          );

          return (
            <div key={idx}>
              <h2 className="menu-section-title">{title}</h2>

              {items.length > 0 && (
                <ul className="menu-list">
                  {items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              )}

              {notes.map((n, i) => (
                <p key={i} className="menu-subtitle">
                  {n}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
