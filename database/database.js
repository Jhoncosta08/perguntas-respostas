const sequelize = require('sequelize');
const connection = new sequelize('perguntasrespostas', 'root', '5897', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
