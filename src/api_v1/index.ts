import express from 'express';
import autenticacao from './autenticacao';
import usuarios from './usuarios';

const rotas = express.Router();

export default (): express.Router => {
    autenticacao(rotas);
    usuarios(rotas);
    return rotas;
}