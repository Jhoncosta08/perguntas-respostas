const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const pergunta = require('./database/models/pergunta');
const resposta = require('./database/models/resposta');

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
    let orderBy = [
        ['createdAt', 'DESC']
    ];
    pergunta.findAll({ raw: true, order: orderBy}).then(perguntas => {
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


app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id;
    pergunta.findOne({
        where: {id: id},
        raw: true
    }).then(pergunta => {
        if(pergunta) {
            resposta.findAll({
                where: {
                    perguntaId: pergunta.id
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then((respostas) => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            }).catch(error => {
                console.log(error);
            });
        }else {
            res.redirect('/');
        }
    }).catch((error) => {
        console.log(error);
    });
});

app.post('/responder', (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('pergunta/'+perguntaId);
    }).catch(error => {
        console.log(error);
    });
});


app.listen(3000, () => {
    console.log('App running');
});
