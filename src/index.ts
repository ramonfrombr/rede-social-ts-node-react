import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiV1 from './api_v1';

dotenv.config();
const app = express();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_CREDENCIAL).then(() => {
  console.log(">>> Conectado ao MongoDB!");
});
mongoose.connection.on("error", (erro: Error) => console.log(erro));

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.listen(8080, () => {
  console.log(">>> Servidor backend rodando!");
});

app.use('/api_v1', apiV1());