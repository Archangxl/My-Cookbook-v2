const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please provide your recipe name']
    },

    userId: {
        type: String,
        required: [true, 'If this error is popping up, the back end is having issues with setting the userId']
    },

    ingredientList: [{
        measurement: {
            type: String,
            required: [true, 'Please provide a measurement']
        },
    
        item: {
            type: String,
            required: [true, 'Please provide an item']
        }
    }],

    stepList: [{
        description: {
            type: String,
            required: [true, 'Please provide your step description']
        }
    }]

}, {timestamps: true});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;