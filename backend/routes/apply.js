const express = require('express');
const Router = express.Router();
const applyCtl = require('../controllers/applyctrl');
const auth = require('../middleware/auth');


//DELETE
Router.delete('/:id',applyCtl.deleteApply);

//PUT
Router.put('/admin/',auth,applyCtl.updateApply);

//POST
Router.post('/apply/',applyCtl.apply);
Router.post('/historique/',applyCtl.AddHistorique);
//GET
Router.get('/historique',applyCtl.historique);

module.exports = Router;