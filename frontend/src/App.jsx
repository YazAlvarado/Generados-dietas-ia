import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import FormularioPaciente from "./components/FormularioPaciente";
import MenuNutricional from "./components/MenuNutricional";

export default function App() {
  const [pantalla, setPantalla] = useState("home");
  const [menuData, setMenuData] = useState(null);

  const handleMenuGenerado = (data) => {
    setMenuData(data);
    setPantalla("menu");
  };

  if (pantalla === "home") {
    return <Home onComenzar={() => setPantalla("formulario")} />;
  }

  // Las demás pantallas sí usan el Layout normal
  return (
    <Layout>
      {pantalla === "formulario" && (
        <FormularioPaciente onMenuGenerado={handleMenuGenerado} />
      )}

      {pantalla === "menu" && <MenuNutricional data={menuData} />}
    </Layout>
  );
}
