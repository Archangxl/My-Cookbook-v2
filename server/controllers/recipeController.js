const Recipe = require('../models/recipeModel');
const Ingredient = require('../models/ingredientModel');
const Step = require('../models/stepModel');
const SharedRecipe = require('../models/sharedRecipeModel');
const JsonWebToken = require('jsonwebtoken');

module.exports = {

    createRecipe: async (request, response) => {
        const activeUserToken = JsonWebToken.decode(request.cookies.userToken);
        const userId = activeUserToken.userId;
        
        const recipeCreation = await Recipe.create({userId: userId, name: request.body.name}).catch(error => response.status(400).json(error));

        if (recipeCreation.name === undefined) {
            return null;
        }

        response
            .status(200)
            .json({recipe: recipeCreation});
    },


    grabAllUserRecipes: async (request, response) => {
        const activeUserToken = JsonWebToken.decode(request.cookies.userToken);
        const userId = activeUserToken.userId;

        const grabbingAllRecipesThatHaveUserLoggedInId = await Recipe.find({userId: userId});

        response
            .status(200)
            .json(grabbingAllRecipesThatHaveUserLoggedInId); 
    },

    
    grabSpecifiedRecipe: async (request, response) => {
        const grabbingRecipe = await Recipe.findOne({_id: request.params.recipeId});
        const grabbingRecipesIngredients = await Ingredient.find({recipeId: request.params.recipeId});
        const grabbingRecipesSteps = await Step.find({recipeId: request.params.recipeId}).sort({stepNumber: 'descending'});

        response
            .status(200)
            .json({recipe: grabbingRecipe, ingredients: grabbingRecipesIngredients, steps: grabbingRecipesSteps});
    },


    updateRecipe: async (request, response) => {
        const willTheRecipeUpdate = await Recipe.findOneAndUpdate({_id: request.params.recipeId}, request.body ,{new: true, runValidators: true}).catch(err => response.status(400).json(err));
        
        if (willTheRecipeUpdate.name === undefined) {
            return null;
        }

        response
            .status(200)
            .json({recipe: willTheRecipeUpdate});
    },

    deleteRecipe: async (request, response) => {
        const recipeId = request.params.recipeId;

        const deleteAllIngredientsWithThisRecipeId = await Ingredient.deleteMany({recipeId: recipeId});
        const deleteAllStepsWithThisRecipeId = await Step.deleteMany({recipeId: recipeId});
        const deleteRecipeFromSharedRecipes = await SharedRecipe.deleteOne({recipeId: recipeId});
        const deleteRecipe = await Recipe.deleteOne({_id: recipeId});

        response 
            .status(200)
            .json("recipe deleted");
    }
}