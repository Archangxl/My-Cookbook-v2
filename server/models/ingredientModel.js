const mongoose = require('mongoose');

const IngredientModel = mongoose.Schema({

    recipeId: {
        type: String,
        required: [true, 'If this error is popping up the backend is having an issue getting the recipeId']
    },

    measurement: {
        type: String,
        required: [true, 'Please provide a measurement']
    },

    item: {
        type: String,
        required: [true, 'Please provide an item']
    }

});

const Ingredient = mongoose.model('Ingredient', IngredientModel);
module.exports = Ingredient;