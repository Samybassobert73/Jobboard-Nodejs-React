
const models = require('../models');
var bcrypt    = require('bcrypt');
var jwtUtils  = require('../utils/jwt.utils');
var asyncLib  = require('async');

// Routes
module.exports = {
    apply: function(req, res) {

        // Params
        var nom_societe = req.body.Nom_societe ;
        var nom_postulant  = req.body.Nom_postulant;
        var message = req.body.Message;
    
        console.log(nom_societe);
        console.log(nom_postulant);
        console.log(message);
        
        asyncLib.waterfall([
         
         
          function(done) {
            var newUser = models.Anhistorique.create({
              nom_societe: nom_societe,
              nom_postulant: nom_postulant,
              message: message,
            })
            .then(function(newUser) {
              done(newUser);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': err });
            });
          }
        ], function(newUser) {
          if (newUser) {
            return res.status(201).json({
              'userId': newUser.id,
              'message':"vous avez bien postuler" 
            });
          } else {
            return res.status(500).json({ 'error': 'cannot add user' });
          }
        });
       },
       historique: async function(req, res) {
 
    const historique = await models.Anhistorique.findAll();
    console.log(this.historique);
    return res.status(201).json({historique});
    
  },
  AddHistorique: function(req, res) {

    // Params
    var nom_societe = req.body.nom_societe ;
    var nom_postulant  = req.body.nom_postulant;
    var message = req.body.message;

    console.log(nom_societe);
    console.log(nom_postulant);
    console.log(message);
    
    asyncLib.waterfall([
     
     
      function(done) {
        var newHistorique = models.Anhistorique.create({
          nom_societe: nom_societe,
          nom_postulant: nom_postulant,
          message: message
        })
        .then(function(newHistorique) {
          done(newHistorique);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': err });
        });
      }
    ], function(newHistorique) {
      if (newHistorique) {
        return res.status(201).json({
          'message': "new historique create"
          
        });
       
      
      } else {
        return res.status(500).json({ 'error': 'cannot add historique' });
      }
    });
},
deleteApply: async function(req, res) {

  var id = req.params.id;
  console.log(id);

  const Anhistorique = await models.Anhistorique;
  await Anhistorique.destroy({where: { id: id  }});
  
  return res.status(201).json({ message:'succes'});
},
updateApply: function(req, res) {
  // Getting auth header
  var headerAuth  = req.headers['authorization'];
  var userId      = jwtUtils.getUserId(headerAuth);

  // Params
  
  var message = req.body.message;
  var historiqueId = req.body.historiqueId;

  

  asyncLib.waterfall([
    function(done) {
      models.Anhistorique.findOne({
        attributes: ['id', 'message', ],
        where: { id: historiqueId }
      }).then(function (historiqueFound) {
        done(null, historiqueFound);
      })
      .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user' });
      });
    },
    function(historiqueFound, done) {
      if(historiqueFound) {
        historiqueFound.update({
          message: (message ? message : historiqueFound.message),
          
        }).then(function() {
          done(historiqueFound);
        }).catch(function(err) {
          res.status(500).json({ 'error': 'cannot update apply' });
        });
      } else {
        res.status(404).json({ 'error': 'apply not found' });
      }
    },
  ], function(historiqueFound) {
    if (historiqueFound) {
      return res.status(201).json(historiqueFound);
    } else {
      return res.status(500).json({ 'error': 'cannot update apply' });
    }
  });
}
}