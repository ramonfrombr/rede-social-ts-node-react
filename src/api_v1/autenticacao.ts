import express from 'express';
import bcrypt from 'bcrypt'
import { criarUsuario, selecionarUsuarioPeloEmail } from '../modelos/Usuario';

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

const entrar = async (pedido: express.Request, resposta: express.Response) => {
    try {
        // Checa se usuário existe
        const usuario = await selecionarUsuarioPeloEmail(pedido.body.email)
        if (!usuario) {
            return resposta.status(404).json("usuário não encontrado").end();
        }
        
        // Checa se senha é válida
        const senhaValida = await bcrypt.compare(pedido.body.senha, usuario.senha)
        if (!senhaValida) {
            return resposta.status(404).json("senha incorreta").end();
        }

        return resposta.status(200).json(usuario).end();
    } catch (erro) {
        console.log(erro);
        return resposta.sendStatus(400);
    }
}

export default (rotas: express.Router) => {
    rotas.post('/autenticacao/registrar', registrar)
    rotas.post('/autenticacao/entrar', entrar)
};