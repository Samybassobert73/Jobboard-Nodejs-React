const express = require('express');
const Router = express.Router();
const annonceCtl = require('../controllers/annoncectrl');
const auth = require('../middleware/auth');

//DELETE
Router.delete('/:id',annonceCtl.deleteAnnonce);

//PUT
Router.put('/admin/',auth,annonceCtl.updateAnnonce);


//POST
Router.post('/annonce/',annonceCtl.AddAnnonce);


//GET
Router.get('/annonce/',annonceCtl.annonce);

module.exports = Router;