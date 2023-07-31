import mongoose from "mongoose";

interface DocumentResult<T> {
    _doc: T & {
        _id: mongoose.Types.ObjectId;
        createdAt: Date;
        updatedAt: Date;
    };
}

export interface IUsuario extends DocumentResult<IUsuario> {
    nome_usuario: string;
    email: string;
    senha: string;
    fotoPerfil: number;
    seguidores: string[];
    seguindo: string[];
    admin: boolean;
    descricao: string;
    localizacao: string;
}