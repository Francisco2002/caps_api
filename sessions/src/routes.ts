import express from "express";
import SessionController from "./controllers/sessionController";
import RecoverPasswordController from "./controllers/recoverPasswordController";

const app = express();

app.use(express.json())

app.get("/", (req, res) => res.send("Hello world!"));

// login (check)
app.post("/login", SessionController.login);

// recuperação de senha
app.post("/email-recover-password", RecoverPasswordController.sendRecoverEmail);
app.post("/recover-password", RecoverPasswordController.recoverPassword);

// primeiro acesso
app.post("/first-access");

export default app;