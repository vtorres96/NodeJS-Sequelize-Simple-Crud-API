'use strict';
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('User', 
		{
			email: {
				type: Sequelize.STRING,
			},
			password_hash:{
				type: Sequelize.STRING,
			},
		}, { tableName: 'users' }
	);
	return User;
};
