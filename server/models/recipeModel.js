const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please provide your recipe name']
    },

    userId: {
        type: String,
        required: [true, 'If this error is popping up, the back end is having issues with setting the userId']
    }

}, {timestamps: true});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;