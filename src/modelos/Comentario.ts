import mongoose from "mongoose";

const ComentarioSchema = new mongoose.Schema(
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
        required: true,
    },
    likes: {
        type: Array,
        default: [],
    },
  },
  { timestamps: true },
);

export const ComentarioModelo = mongoose.model("ComentarioModelo", ComentarioSchema);

export const criarComentario = (dados: Record<string, any>) => new ComentarioModelo(dados).save().then((comentario) => comentario.toObject());
export const selecionarComentariosPeloPublicacaoId = (publicacao_id: string) => ComentarioModelo.find({publicacao_id});
export const apagarComentarioPeloId = (id: string) => ComentarioModelo.findOneAndDelete({_id: id});
export const atualizarComentarioPeloId = (id: string, dados: Record<string, any>) => ComentarioModelo.findByIdAndUpdate(id, dados)