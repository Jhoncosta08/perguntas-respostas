const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const perguntaModel = require('./database/models/pergunta');

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
    res.render('index');
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    res.send(`Formulário recebido, Titulo: ${titulo}, descrição: ${descricao}`);
});


app.listen(3000, () => {
    console.log('App running');
});
