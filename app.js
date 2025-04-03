import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import './config/db.js';
import './config/dbSetup.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes.router);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
