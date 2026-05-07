import app from './app';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor Iniciado com Sucesso ! ✨');
});
