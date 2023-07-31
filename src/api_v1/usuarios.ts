import express from 'express';
import bcrypt from 'bcrypt';
import { apagarUsuarioPeloId, atualizarUsuarioPeloId, selecionarUsuarioPeloId, selecionarUsuarios } from '../modelos/Usuario';

const selecionarUsuario = async (pedido: express.Request, resposta: express.Response) => {
    const usuarioId = pedido.params.id as string;
    try {
        const usuario = await selecionarUsuarioPeloId(usuarioId)
        const { senha, updatedAt, ...outrosDados } = usuario._doc;
        resposta.status(200).json(outrosDados);
    } catch (erro) {
        console.log(erro);
        resposta.sendStatus(400);
    }
}

const atualizarUsuario = async (pedido: express.Request, resposta: express.Response) => {

    if (pedido.body.usuario_id === pedido.params.id || pedido.body.admin) {
        
        if (pedido.body.senha) {
            try {
                const salt = await bcrypt.genSalt(10);
                pedido.body.senha = await bcrypt.hash(pedido.body.senha, salt);
            } catch (err) {
                return resposta.status(500).json(err);
            }
        }

        try {
            const usuario = await atualizarUsuarioPeloId(pedido.params.id, pedido.body);
            resposta.status(200).json(usuario);
        } catch (err) {
            resposta.status(500).json(err);
        }
      } else {
        resposta.status(403).json("você só pode atualizar a sua conta");
      }
}

const apagarUsuario = async (pedido: express.Request, resposta: express.Response) => {

    if (pedido.body.usuario_id === pedido.params.id || pedido.body.admin) {
        try {
          await apagarUsuarioPeloId(pedido.params.id);
          resposta.status(200).json("a conta foi apagada");
        } catch (erro) {
          return resposta.status(500).json(erro);
        }
      } else {
        return resposta.status(403).json("você só pode apagar a sua conta");
      }
}

const seguirUsuario = async (pedido: express.Request, resposta: express.Response) => {
    if (pedido.body.usuario_id !== pedido.params.id) {
        try {
            // usuário a ser seguido
            const usuario = await selecionarUsuarioPeloId(pedido.params.id);
            // usuário seguindo
            const usuarioAtual = await selecionarUsuarioPeloId(pedido.body.usuario_id);
            
            if (!usuario.seguidores.includes(pedido.body.usuario_id)) {
                await usuario.updateOne({ $push: { seguidores: pedido.body.usuario_id } });
                await usuarioAtual.updateOne({ $push: { seguindo: pedido.params.id } });
                resposta.status(200).json("você seguiu o usuário");
            } else {
                resposta.status(403).json("você já segue este usuário");
            }
        } catch (erro) {
            console.log(erro)
            resposta.status(500).json(erro);
        }
    } else {
        resposta.status(403).json("você não pode seguir a si mesmo");
    }
}

const cancelarSeguirUsuario = async (pedido: express.Request, resposta: express.Response) => {
    if (pedido.body.usuario_id !== pedido.params.id) {
        try {
            // usuário a não ser seguido
            const usuario = await selecionarUsuarioPeloId(pedido.params.id);
            // usuário deixando de seguindo
            const usuarioAtual = await selecionarUsuarioPeloId(pedido.body.usuario_id);
            
            if (usuario.seguidores.includes(pedido.body.usuario_id)) {
                await usuario.updateOne({ $pull: { seguidores: pedido.body.usuario_id } });
                await usuarioAtual.updateOne({ $pull: { seguindo: pedido.params.id } });
                resposta.status(200).json("você deixou de seguir o usuário");
            } else {
                resposta.status(403).json("você não segue este usuário");
            }
        } catch (erro) {
            console.log(erro)
            resposta.status(500).json(erro);
        }
    } else {
        resposta.status(403).json("você não pode deixar de seguir a si mesmo");
    }
}

export default (rotas: express.Router) => {
    rotas.get('/usuarios/:id', selecionarUsuario);
    rotas.delete('/usuarios/:id', apagarUsuario);
    rotas.put('/usuarios/:id', atualizarUsuario);
    rotas.put('/usuarios/:id/seguir', seguirUsuario);
    rotas.put('/usuarios/:id/naoseguir', cancelarSeguirUsuario);
};