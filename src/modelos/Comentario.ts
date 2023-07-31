import mongoose from "mongoose";

const PublicacaoSchema = new mongoose.Schema(
  {
    usuario_id: {
        type: String,
        required: true,
    },
    publicacao_id: {
        type: String,
        required: true,
    },
    texto: {
        type: String,
        max: 500,
    },
    likes: {
        type: Array,
        default: [],
    },
  },
  { timestamps: true },
);

export const PublicacaoModelo = mongoose.model("Publicacao", PublicacaoSchema);
