const express = require('express');
const authMiddleware = require("../app/middlewares/auth");
const UserController = require('../app/controllers/UserController');

const routes = express.Router();

routes.post('/user/create', UserController.create);

routes.post('/user/authenticate', UserController.authenticate);

routes.use(authMiddleware);

routes.get('/users/', UserController.index);
routes.get("/user/:id", UserController.searchById);

routes.put('/user/update/:id', UserController.update);

routes.delete('/user/delete/:id', UserController.delete);

module.exports = routes;