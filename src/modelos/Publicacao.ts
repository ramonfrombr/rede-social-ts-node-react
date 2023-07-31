import mongoose from "mongoose";

const PublicacaoSchema = new mongoose.Schema(
  {
    usuario_id: {
        type: String,
        required: true,
    },
    texto: {
        type: String,
        max: 500,
        required: true,
    },
    imagem: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
  },
  { timestamps: true },
);

export const PublicacaoModelo = mongoose.model("Publicacao", PublicacaoSchema);


export const criarPublicacao = (dados: Record<string, any>) => new PublicacaoModelo(dados).save().then((publicacao) => publicacao.toObject());
export const selecionarPublicacoes = () => PublicacaoModelo.find();
export const selecionarPublicacaoPeloId = (id: string) => PublicacaoModelo.findById(id);
export const selecionarPublicacoesPeloUsuarioId = (usuario_id: string) => PublicacaoModelo.find({usuario_id});
export const apagarPublicacaoPeloId = (id: string) => PublicacaoModelo.findOneAndDelete({_id: id});
export const atualizarPublicacaoPeloId = (id: string, dados: Record<string, any>) => PublicacaoModelo.findByIdAndUpdate(id, dados)