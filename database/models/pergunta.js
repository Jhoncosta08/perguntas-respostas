const sequelize = require('sequelize');
const connection = require('../database');

const pergunta = connection.define('pergunta', {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

pergunta.sync({force: false}).then(() => {
    console.log('Tabela pergunta criada com sucesso.');
}).catch((error => {
    console.log(error);
}));


module.exports = pergunta;
