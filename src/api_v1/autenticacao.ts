import express from 'express';
import bcrypt from 'bcrypt'
import { criarUsuario } from '../modelos/Usuario';

const registrar = async (pedido: express.Request, resposta: express.Response) => {
    try {
        // Gera uma nova senha
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(pedido.body.senha, salt);

        // Cria um usuário
        const usuario = await criarUsuario({
            email: pedido.body.email,
            nome_usuario: pedido.body.nome_usuario,
            senha: senhaHash
        });

        // Retorna a resposta
        return resposta.status(200).json(usuario).end();
    } catch (erro) {
        console.log(erro);
        return resposta.sendStatus(400);
    }
}

export default (rotas: express.Router) => {
    rotas.post('/autenticacao/registrar', registrar)
};