const models = require('../models');
var bcrypt    = require('bcrypt');
var jwtUtils  = require('../utils/jwt.utils');
var asyncLib  = require('async');


// Routes
module.exports = {
    annonce: async function(req, res) {
 
        const announces = await models.Announces.findAll();
       
        return res.status(201).json({announces});
        
      },
      AddAnnonce: function(req, res) {

        // Params
        var nom_societe = req.body.nom_societe ;
        var skill  = req.body.skill;
        var intitule = req.body.intitule;
        var salaire = req.body.salaire;
        var description = req.body.description;
        var lieu = req.body.lieu;
        var referent = req.body.referent;
        var contrat = req.body.contrat;
    
        
    
        asyncLib.waterfall([
         
         
          function(done) {
            var newAnnonce = models.Announces.create({
              nom_societe: nom_societe,
              skill: skill,
              intitule: intitule,
              salaire: salaire,
              description: description,
              lieu: lieu,
              referent: referent,
              contrat: contrat
            })
            .then(function(newAnnonce) {
              done(newAnnonce);
            })
            .catch(function(err) {
              return res.status(500).json({ 'error': err });
            });
          }
        ], function(newAnnonce) {
          if (newAnnonce) {
            return res.status(201).json({
              'message': "new announces create"
            });
          } else {
            return res.status(500).json({ 'error': 'cannot add announce' });
          }
        });
    },

updateAnnonce: function(req, res) {
  // Getting auth header
  var headerAuth  = req.headers['authorization'];
  var userId      = jwtUtils.getUserId(headerAuth);

  // Params
  
  var description = req.body.description;
  var announceId = req.body.announceId;

  

  asyncLib.waterfall([
    function(done) {
      models.Announces.findOne({
        attributes: ['id', 'description', ],
        where: { id: announceId }
      }).then(function (annonceFound) {
        done(null, annonceFound);
      })
      .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user' });
      });
    },
    function(annonceFound, done) {
      if(annonceFound) {
        annonceFound.update({
          description: (description ? description : annonceFound.description),
          
        }).then(function() {
          done(annonceFound);
        }).catch(function(err) {
          res.status(500).json({ 'error': 'cannot update announce' });
        });
      } else {
        res.status(404).json({ 'error': 'announce not found' });
      }
    },
  ], function(annonceFound) {
    if (annonceFound) {
      return res.status(201).json(annonceFound);
    } else {
      return res.status(500).json({ 'error': 'cannot update announce' });
    }
  });
},
deleteAnnonce: async function(req, res) {

  var id = req.params.id;
  console.log(id);

  const announces = await models.Announces;
  await announces.destroy({where: { id: id  }});
  
  return res.status(201).json({ message:'succes'});
}


}