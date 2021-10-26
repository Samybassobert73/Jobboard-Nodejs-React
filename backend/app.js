const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { Sequelize } = require('sequelize');
const userroute = require('./routes/user');
const app = express();


//sequelize
const sequelize = new Sequelize("database_development_job", "samy", "coolman300", {
  dialect: "mysql",
  host: "localhost"
});
try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} 
catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Body Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure routes
app.get('/api/', function(req, res) {
    res.status(200).send('<h1>requette user</h1>');
});

app.use('/api/user', userroute);

module.exports = app;