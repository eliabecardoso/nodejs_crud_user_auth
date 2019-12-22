const express = require("express");
const routes = express.Router();
const auth = require("./middlewares/auth");

const UserCtrl = require("./controller/UserController");
const ChatSupportCtrl = require("./controller/ChatSupportController");

//Criação e Login de Usuário
routes.post("/register", UserCtrl.register);
routes.post("/authenticate", UserCtrl.authenticate);

//Suporte
routes.post("/chatcontact", ChatSupportCtrl.store);

//Rotas autenticadas
routes.use(auth);
routes.get("/users", UserCtrl.index);
routes.get("/users/:id", UserCtrl.detail);
routes.put("/users/:id", UserCtrl.update);


module.exports = routes;