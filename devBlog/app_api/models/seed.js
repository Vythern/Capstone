
const Mongoose = require('./db');
const Article = require ('./devBlog');


var fs = require('fs');
var articles = JSON.parse(fs.readFileSync('./data/articles.json','utf8'));


const seedDB = async () => 
{
    await Article.deleteMany({});
    await Article.insertMany(articles);
};

seedDB().then(async () => 
{
    await Mongoose.connection.close();
    process.exit(0);
});