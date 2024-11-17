const tripsEndpoint = 'http://localhost:300/api/trips';
const options =
{
    method: 'GET',
    headers: 
    {
        'Accept': 'application/json'
    }
}

const travel = async function(req, res, next)
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
            res.render('travel', {title: 'devBlog Getaways', trips: json, message});
        })
        .catch(err => res.status(500).send(e.message));
};

module.exports = 
{
    travel
};







//old travel.js
/*var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

const travel = (req, res) => 
{
    res.render('travel', { title: 'devBlog Getaways', trips});
};

module.exports = { travel };
*/