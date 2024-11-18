var express = require('express');
var router = express.Router();

var controller = require('../controllers/updates')


router.get('/', controller.updates);
//The old method that was present here would never run, so we remove it.  
//routers direct traffic to our web server; when we get a request, it tells them the response and shows them where to go.  
//these direct website traffic to the right place.  


module.exports = router;
