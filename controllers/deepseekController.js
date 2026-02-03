import axios from "axios";
import "dotenv/config";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Modelos en orden de prioridad (más barato → más potente)
const modelosFallback = [
  "openai/gpt-4o-mini",
  "anthropic/claude-3.5-sonnet",
  "deepseek/deepseek-chat",
];

export const generarMenuIA = async (perfilPaciente, alimentos) => {
  const listaAlimentos = alimentos
    .map((a) => `- ${a.Alimento} (${a.Energia} kcal)`)
    .join("\n");

  const prompt = `
Eres un nutriólogo clínico profesional.

Devuelve EXCLUSIVAMENTE un JSON válido.
NO incluyas texto fuera del JSON.
NO uses markdown.
NO agregues comentarios.

### Datos del paciente
Edad: ${perfilPaciente.edad}
Peso: ${perfilPaciente.peso} kg
Altura: ${perfilPaciente.altura} cm
Sexo: ${perfilPaciente.sexo}
Patología: ${perfilPaciente.patologia}
Calorías objetivo: ${perfilPaciente.calorias}
Presupuesto máximo diario: ${perfilPaciente.presupuesto} MXN

### Contexto económico
El menú debe adaptarse al Estado de México (Ixtapaluca),
usando alimentos económicos, locales y de temporada.

### Alimentos permitidos (usar SOLO estos)
${listaAlimentos}

### Reglas obligatorias
- Ajusta el número de comidas según la patología
- No excedas el presupuesto
- No inventes alimentos
- Calcula calorías y costos aproximados
- Usa métodos de cocción saludables

### FORMATO JSON OBLIGATORIO
Devuelve exactamente esta estructura:

{
  "menu": {
    "desayuno": {
      "platillo": "",
      "ingredientes": [
        { "nombre": "", "cantidad": "", "costo_mxn": 0 }
      ],
      "preparacion": "",
      "calorias_kcal": 0,
      "liquidos": "",
      "costo_total_mxn": 0
    },
    "comida": {},
    "cena": {}
  },
  "hidratacion": {
    "total_ml": 0,
    "gasto_hidrico_estimado_ml": 0,
    "justificacion": ""
  },
  "alimentos_restringidos": [],
  "resumen": {
    "total_calorias_dia_kcal": 0,
    "costo_total_dia_mxn": 0
  },
  "justificacion_nutricional": ""
}
`;

  for (const modelo of modelosFallback) {
    try {
      console.log(`Intentando modelo: ${modelo}`);

      const response = await axios.post(
        OPENROUTER_API_URL,
        {
          model: modelo,
          messages: [
            {
              role: "system",
              content: "Eres un experto en nutrición clínica.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.4,
          max_tokens: 1600,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      const contenido = response.data.choices[0].message.content;

      const jsonMatch = contenido.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("La IA no devolvió JSON válido");

      const resultado = JSON.parse(jsonMatch[0]);

      console.log(`Respuesta válida obtenida con ${modelo}`);
      return resultado;
    } catch (error) {
      console.error(`Error con modelo ${modelo}`);
      console.error("Status:", error.response?.status);
      console.error(
        "Detalle:",
        error.response?.data?.error || error.response?.data || error.message,
      );
    }
  }

  // Si todos los modelos fallan
  throw new Error("Ningún modelo de IA pudo generar el menú correctamente.");
};
