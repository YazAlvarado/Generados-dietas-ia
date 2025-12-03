import axios from "axios";
import "dotenv/config";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export const generarMenuIA = async (perfilPaciente, alimentos) => {
  try {
    const listaAlimentos = alimentos
      .map((a) => `${a.Alimento} (${a.Energia} kcal)`)
      .join(", ");

    const prompt = `
      Genera un menú diario para un paciente con:
      Edad: ${perfilPaciente.edad}, Peso: ${perfilPaciente.peso}kg, Altura: ${perfilPaciente.altura}cm,
      Sexo: ${perfilPaciente.sexo}, Patología: ${perfilPaciente.patologia}.
      Calorías objetivo: ${perfilPaciente.calorias}.
      Presupuesto disponible: $${perfilPaciente.presupuesto} MXN.
      Usa estos alimentos disponibles: ${listaAlimentos}.
      El menú debe incluir desayuno, comida y cena, balanceado, preventivo y ajustado al presupuesto.
    `;

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "openai/gpt-4o",
        messages: [
          { role: "system", content: "Eres un experto en nutrición." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "Error al generar menú IA:",
      error.response?.data || error.message
    );
    throw new Error("No se pudo generar el menú con IA");
  }
};
