const express = require('express');
const UserController = require('../app/controllers/UserController');

const routes = express.Router();

routes.get('/users/', UserController.index);
routes.post('/user/create', UserController.create);
routes.put('/user/update/:id', UserController.update);
routes.delete('/user/delete/:id', UserController.delete);

module.exports = routes;