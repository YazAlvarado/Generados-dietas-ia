import mongoose from "mongoose";

const alimentoSchema = new mongoose.Schema(
  {
    Alimento: String,
    Categoria: String,
    Cantidad: Number,
    Unidad: String,
    Energia: Number,
    Proteinas: Number,
    Lipidos: Number,
    Carbohidratos: Number,
    Azucar: Number,
    Sodio: Number,
  },
  { collection: "SMAE" }
);

export default mongoose.model("Alimento", alimentoSchema);
