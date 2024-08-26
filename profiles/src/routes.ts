import express from "express";
import UsersControllers from "./controllers/UsersControllers";

const app = express();
app.use(express.json());

// CRUD de Users
app.get("/users", UsersControllers.index);
app.get("/users/:cpf", UsersControllers.show);
app.post("/users", UsersControllers.create);
app.put("/users/:cpf", UsersControllers.update);
app.delete("/users/:cpf", UsersControllers.delete);

export default app;