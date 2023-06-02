const mongoose = require('mongoose');

const SharedRecipeSchema = mongoose.Schema({
    userId: {
        type: String
    },

    recipeId: {
        type: String
    }
})

const SharedRecipe = mongoose.model('SharedRecipe', SharedRecipeSchema);
module.exports = SharedRecipe; 