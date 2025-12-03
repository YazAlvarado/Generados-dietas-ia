import { useState } from "react";
import Layout from "./components/Layout";
import FormularioPaciente from "./components/FormularioPaciente";
import MenuNutricional from "./components/MenuNutricional";

export default function App() {
  const [menuData, setMenuData] = useState(null);

  return (
    <Layout>
      {!menuData ? (
        <FormularioPaciente onMenuGenerado={setMenuData} />
      ) : (
        <MenuNutricional calorias={menuData.calorias} menu={menuData.menu} />
      )}
    </Layout>
  );
}
