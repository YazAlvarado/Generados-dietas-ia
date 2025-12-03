import Alimento from "../models/alimento.js";

export const obtenerAlimentosPorCalorias = async (caloriasObjetivo) => {
  const rangoInferior = caloriasObjetivo * 0.05; // 5% de las calorías
  const rangoSuperior = caloriasObjetivo * 0.15; // 15% de las calorías

  const query = { Energia: { $gte: rangoInferior, $lte: rangoSuperior } };

  let alimentos = await Alimento.find(query).limit(50);

  if (alimentos.length === 0) {
    alimentos = await Alimento.find().limit(10); // fallback
  }

  return alimentos;
};
