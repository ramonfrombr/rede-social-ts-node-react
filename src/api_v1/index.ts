import express from 'express';
import autenticacao from './autenticacao';

const rotas = express.Router();

export default (): express.Router => {
    autenticacao(rotas);
    return rotas;
}