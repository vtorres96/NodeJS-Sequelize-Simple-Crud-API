const { User } = require('../models/');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const authConfig = require("../../config/auth"); 

module.exports = {
	async index(req, res) {
		await User.findAll()
		.then(users => {
			return res.status(200).json({
				users,
				loggedUser: req.userId
			});
		})
		.catch(error => {
			return res.status(404).json(error)
		});
	},

	async searchById(req, res){

		let id = req.params.id;

        await User.findByPk(id)
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
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
			user.password_hash = undefined;

			const token = jwt.sign({ id: user.id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn
			});
	
			res.status(200).json({ user, token });
		})
		.catch(error => {
			return res.status(400).json('Falha ao processar requisição. ' + error);
		});
	},

	async authenticate(req, res) {
		const { email, password_hash } = req.body;
		
		const user = await User.findOne({ where: { email: email } });

		if (!user) {
			res.status(400).json({ error: 'Usuário não encontrado' });
		}

		if (!await bcrypt.compareSync(password_hash, user.password_hash)) {
			res.status(400).json({ error: 'Usuário ou senha inválidos' });
		} 

		user.password_hash = undefined;

		const token = jwt.sign({ id: user.id }, authConfig.secret, {
			expiresIn: authConfig.expiresIn
		})

		res.status(200).json({ user, token })
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
