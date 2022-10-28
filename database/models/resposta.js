const sequelize = require('sequelize');
const connection = require('../database');

const resposta = connection.define('respostas', {
    corpo: {
       type: sequelize.TEXT,
       allowNull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});


resposta.sync({force: false}).then(() => {
    console.log('tabela resposta ok');
}).catch((error) => {
    console.log(error);
});

module.exports = resposta;
