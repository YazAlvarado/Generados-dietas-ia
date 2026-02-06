# Generados-dietas-ia
Planificador de Dieta Inteligente

Generación automática de dietas personalizadas con IA

Este proyecto combina React + Node.js + Express + MongoDB y modelos de IA para generar planes alimenticios personalizados basados en datos clínicos y objetivos del usuario.

Características principales

Formularios interactivos para evaluación nutricional.

Generación automática de dietas mediante API de IA.

Panel para visualizar menús, calorías y macros.

Backend modular con controladores y rutas.

Base de datos MongoDB para historial y usuarios.

Totalmente escalable y listo para producción.

Instalación de Dependencias:

Carpeta raiz:

npm install @google/generative-ai@^0.24.1 axios@^1.13.2 body-parser@^1.20.2 cors@^2.8.5 dotenv@^16.6.1 express@^4.18.2 jspdf@^3.0.4 jspdf-autotable@^5.0.2 markdown-pdf@^11.0.0 mongoose@^7.6.0 openai@^4.0.0 pdfkit@^0.17.2

Frontend

Instala las dependencias principales del frontend:

cd frontend

npm install axios@^1.13.2 react@^19.2.0 react-dom@^19.2.0

Crea un archivo .env dentro de la carpeta backend con:

OPENROUTER_API_KEY=tu_api_key
MONGO_URI=mongodb://localhost:27017/smae
PORT=4000

Cómo Ejecutar el Proyecto
iniciar el backend
npm start

Iniciar el frontend
cd frontend
npm run dev


El frontend estará disponible generalmente en:

http://localhost:5173

Estructura del Proyecto
/
├── frontend/        # Aplicación en React + Vite
├── backend/         # API con Node.js + Express
└── README.md

Documentación de API
POST /api/generate-menu

Genera un menú nutricional personalizado según los datos del paciente.

Body (JSON)

{
  "edad": 30,
  "peso": 70,
  "altura": 170,
  "sexo": "F",
  "actividad": "moderada",
  "patologia": "ninguna",
  "presupuesto": 150
}


Respuesta

{
  "calorias": 2100,
  "menu": {
    "desayuno": "...",
    "comida": "...",
    "cena": "...",
    "snacks": "..."
  }
}

POST /api/save-menu

Guarda el menú generado para consulta futura.

Body:

{
  "pacienteId": "66a21f...",
  "menu": { ... }
}


Respuesta:

{
  "status": "ok",
  "message": "Menú guardado correctamente"
}

GET /api/menus/:pacienteId

Obtiene el historial de menús generados por un paciente.

Tecnologías utilizadas

React

Vite

Express

MongoDB + Mongoose

Axios

OpenRouter AI API

Node.js
