const express = require('express');
const Router = express.Router();
const userCtl = require('../controllers/userctrl');
const auth = require('../middleware/auth');

Router.get('/',function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>requette user</h1>');
});


//DELETE
Router.delete('/:id',userCtl.deleteUser);

//PUT
Router.put('/me/',auth,userCtl.updateUserProfile);


//POST
Router.post('/register/',userCtl.register);
Router.post('/login/',userCtl.login);



//GET
Router.get('/test/',auth,userCtl.test);
Router.get('/me',auth,userCtl.getUserProfile);
Router.get('/user/',userCtl.user);

    
module.exports = Router;