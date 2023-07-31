import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nome_usuario: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
      min: 6,
    },
    fotoPerfil: {
      type: String,
      default: "",
    },
    fotoCapa: {
      type: String,
      default: "",
    },
    seguidores: {
      type: Array,
      default: [],
    },
    seguindo: {
      type: Array,
      default: [],
    },
    admin: {
      type: Boolean,
      default: false,
    },
    descricao: {
      type: String,
      max: 50,
    },
    localizacao: {
      type: String,
      max: 50,
    },
    relacionamento: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true },
);

export const UsuarioModelo = mongoose.model("Usuario", UsuarioSchema);
