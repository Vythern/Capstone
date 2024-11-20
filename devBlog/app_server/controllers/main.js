const index = (req, res) => 
{
    res.render('index', { title: "Vythern's devBlog"});
};
//index is a method which recieves both a request and a response object
//the request comes from the user, and is recieved by our router.  
//the response, once handled by the router, is sent back to the user to direct them where they need to go.  


module.exports = { index }