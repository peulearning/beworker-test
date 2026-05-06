import express from 'express'; // Importando o framework Express para criar o servidor web
import cors from 'cors'; // Importando o middleware CORS para permitir requisições de diferentes origens
import authRoutes from './modules/users/routes/auth.routes'; // Importando as rotas de autenticação

const app = express(); // Criando uma instância do aplicativo Express

app.use(cors()); // Habilitando o CORS para todas as rotas
app.use(express.json()); // Habilitando o middleware para parsear JSON nas requisições

app.get('/', (req, res)=> {
  res.send('API Beworker Funcionando ! 🚀');
});

app.use('/auth', authRoutes); // Registrando as rotas de autenticação

export default app;

