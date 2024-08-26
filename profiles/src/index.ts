import "reflect-metadata"
import { AppDataSource } from "./data-source"
import app from "./routes"
import config from "../config"

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.listen(config.APP_PORT, () => console.log("App rodando na porta 3333"))
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })