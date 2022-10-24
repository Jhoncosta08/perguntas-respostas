const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const pergunta = require('./database/models/pergunta');

connection.authenticate().then(() => {
    console.log('database connected with api');
}).catch((error) => {
    console.log(error);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    pergunta.findAll({ raw: true }).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        });
    }).catch((error) => {
        console.log(error);
    });
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    let body = {
        titulo: titulo,
        descricao: descricao
    };
    pergunta.create(body).then(() => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error);
    });
});


app.listen(3000, () => {
    console.log('App running');
});
