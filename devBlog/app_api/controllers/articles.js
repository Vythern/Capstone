const mongoose = require('mongoose');
const Article = require('../models/devBlog'); //Register model
const Model = mongoose.model('articles');

const articlesList = async(req, res) => 
{
    const q = await Model.find({ }).exec();

    if(!q) { return res.status(404).json(err);} 
    else   { return res.status(200).json(q);  }
};

const articlesFindByCode = async(req, res) => 
{
    const q = await Model.find({'code' : req.params.articleCode }).exec();
    //return one record

    if(!q) { return res.status(404).json(err); }
    else   { return res.status(200).json(q);   }
}

const articlesAddArticle = async(req, res) =>
{
    const newArticle = new Article
    ({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newArticle.save();

    if(!q) { return res.status(400).json(err); }
    else   { return res.status(201).json(q); }
}

const articlesUpdateArticle = async (req, res) => {
    // Uncomment for debugging
    // console.log(req.params);
    // console.log(req.body);

    const q = await Model.findOneAndUpdate(
    { 'code': req.params.articleCode },
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }
    ).exec();

    if (!q) { return res.status(400).json({ message: 'Update failed or article code not found' }); }
    else    { return res.status(201).json(q); }
};

const articlesDeleteArticle = async (req, res) => {
    try
    {
        //Get by code from request
        const articleCode = req.params.articleCode;
        
        //find and delete
        const deletedArticle = await Model.findOneAndDelete({ 'code': articleCode }).exec();

        if (!deletedArticle) { return res.status(404).json({ message: 'Article not found' }); }

        return res.status(200).json({ message: 'Article deleted', article: deletedArticle }); //success

    } catch (err) { return res.status(500).json({ message: 'Error deleting article', error: err }); }
};


module.exports = 
{
    articlesList, 
    articlesFindByCode, 
    articlesAddArticle, 
    articlesUpdateArticle,
    articlesDeleteArticle
};


