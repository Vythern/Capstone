const tripsEndpoint = 'http://localhost:300/api/trips';
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
    await fetch(tripsEndpoint, options)
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
                    message = 'No trips exist in our database!'; 
                }
            }
            res.render('updates', {title: 'devBlog Getaways', trips: json, message});
        })
        .catch(err => res.status(500).send(e.message));
};

module.exports = 
{
    updates
};