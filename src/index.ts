import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.listen(8080, () => {
    console.log("Servidor backend rodando!")
})