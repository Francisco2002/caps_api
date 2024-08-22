import "reflect-metadata"
import { AppDataSource } from "./data-source";
import app from "./routes";
import config from "../config";

AppDataSource.initialize().then(() => {
    console.log("Conexão iniciada com sucesso");
    app.listen(config.APP_PORT, () => console.log(`Aplicação rodando em ${config.APP_URL}:${config.APP_PORT}`))
}).catch(() => {
    console.log("Erro ao criar conexão");
});
