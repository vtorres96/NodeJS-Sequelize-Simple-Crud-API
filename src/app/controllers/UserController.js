const { User } = require('../models/');
const bcrypt = require('bcrypt');

module.exports = {
	async index(req, res) {
		await User.findAll()
		.then(users => {
			return res.json(users)
		})
		.catch(error => {
			return res.status(404).json(error)
		});
	},

	async create(req, res) {
		const {
			email,
			password_hash
		} = req.body;

		await User.create({
			email: email,
			password_hash: bcrypt.hashSync(password_hash, 10)
		})
		.then(user => {
			return res.status(200).json(user);
		})
		.catch(error => {
			return res.status(400).json('Falha ao processar requisição. ' + error);
		});
	},

	async update(req, res) {
		 
		const id = req.params.id;

		const {
			email,
			password_hash
		} = req.body;

		await User.update(
			{
				email: email,
				password_hash: password_hash
			},
			{ where: { id: id } }
		)
		.then(user => {
			return res.status(200).json('Alterado com sucesso');
		})
		.catch(error => {
			return res.status(400).json('Falha ao processar requisição. ' + error);
		});
	},

	async delete(req, res) {

		const id = req.params.id;

		await User.destroy({ where: { id: id } })
		.then(() => {
			return res.status(200).json('Excluído com sucesso');
		})
		.catch(error => {
			return res.status(400).json('Falha ao processar requisição. ' + error);
		});
	}
};
