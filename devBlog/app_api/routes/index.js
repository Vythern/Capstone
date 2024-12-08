const express = require('express');
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens
const router = express.Router();

//import controllers to be routed here
const articlesController = require('../controllers/articles');
const authController = require('../controllers/authentication');

// Method to authenticate our JWT
function authenticateJWT(req, res, next) 
{
    // console.log('In Middleware');
    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);
    if(authHeader == null)
    {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }
    let headers = authHeader.split(' ');
    if(headers.length < 1)
    {
        console.log('Not enough tokens in Auth Header: ' +
        headers.length);
        return res.sendStatus(501);
    }
    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);
    if(token == null)
    {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET, (err,
    verified) =>
    {
        if(err)
        {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth paramto the decoded object
    });
    next(); // We need to continue or this will hang forever
}

//define route for registration endpoint
router
    .route('/register')
    .post(authController.register);

// define route for login endpoint
router
    .route('/login')
    .post(authController.login);

//define the route for articles endpoint
router
    .route('/articles')
    .get(articlesController.articlesList)
    .post(authenticateJWT, articlesController.articlesAddArticle);

router
    .route('/articles/:articleCode')
    .get(articlesController.articlesFindByCode)
    .put(authenticateJWT, articlesController.articlesUpdateArticle);

    //delete route
router
    .route('/articles/:articleCode')
    .get(articlesController.articlesFindByCode)
    .delete(authenticateJWT, articlesController.articlesDeleteArticle); 

module.exports = router;