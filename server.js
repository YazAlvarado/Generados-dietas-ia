import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dietRoutes from "./routes/dietRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error(err));

// Rutas
app.use("/api", dietRoutes);

// Servidor
app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
