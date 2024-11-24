const articlesEndpoint = 'http://localhost:3000/api/articles';
const options =
{
    method: 'GET',
    headers: 
    {
        'Accept': 'application/json'
    }
}

const updates = async function(req, res, next)
{
    await fetch(articlesEndpoint, options)
        .then(res => res.json())
        .then(json => 
        {
            let message = null;
            if(!(json instanceof Array))
            {
                message = 'API lookup error';
                json = [];
            }
            else 
            {
                if(!json.length) 
                {
                    message = 'No articles exist in our database!'; 
                }
            }
            res.render('updates', {title: 'Vythern\'s devBlog', articles: json, message});
        })
        .catch(err => res.status(500).send(e.message));
};

module.exports = 
{
    updates
};