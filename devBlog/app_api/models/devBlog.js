const mongoose = require('mongoose');

// Define the article schema
const articleSchema = new mongoose.Schema
({
    code: { type: String, required: true, index: true },
    title: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});

const Article = mongoose.model('articles', articleSchema);
module.exports = Article;