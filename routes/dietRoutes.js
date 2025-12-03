import express from "express";
import { calcularTMB } from "../controllers/dietController.js";
import { obtenerAlimentosPorCalorias } from "../controllers/alimentoController.js";
import { generarMenuIA } from "../controllers/deepseekController.js";

const router = express.Router();

router.post("/plan-dieta", async (req, res) => {
  try {
    const { peso, altura, edad, sexo, actividad, patologia, presupuesto } =
      req.body;
    const calorias = calcularTMB(peso, altura, edad, sexo, actividad);

    const alimentos = await obtenerAlimentosPorCalorias(calorias);

    const menu = await generarMenuIA(
      { peso, altura, edad, sexo, patologia, calorias, presupuesto },
      alimentos
    );

    res.json({ calorias, menu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al generar el plan de dieta" });
  }
});

export default router;
