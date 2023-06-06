const Recipe = require('../models/recipeModel');
const SharedRecipe = require('../models/sharedRecipeModel');
const JsonWebToken = require('jsonwebtoken');

module.exports = {

    createRecipe: async (request, response) => {
        const activeUserToken = JsonWebToken.decode(request.cookies.userToken);

        /*
        Test run provider
        */
        const ingredientList = [{measurement: '1 cup', item: 'flour'}];
        const stepList = [{description: 'put in bowl'}];
        

        const recipeCreation = await Recipe.create({userId: activeUserToken.userId, name: request.body.name, ingredientList: /*request.body.*/ingredientList, stepList: /*request.body.*/stepList}).catch(error => response.status(400).json(error));

        if (recipeCreation.name === undefined) {
            return null;
        }
        
        response
            .status(200)
            .json({recipe: recipeCreation});
    },


    grabAllUserRecipes: async (request, response) => {
        const activeUserToken = JsonWebToken.decode(request.cookies.userToken);

        const grabbingAllRecipesThatHaveUserLoggedInId = await Recipe.find({userId: activeUserToken.userId});

        response
            .status(200)
            .json(grabbingAllRecipesThatHaveUserLoggedInId); 
    },

    
    grabSpecifiedRecipe: async (request, response) => {
        const grabbingRecipe = await Recipe.findOne({_id: request.params.recipeId});

        response
            .status(200)
            .json({recipe: grabbingRecipe});
    },


    updateRecipe: async (request, response) => {
        /*
        Test run provider
        const ingredients = [{measurement: '1 cup', item: 'flour'}];
        const steps = [{description: 'put in bowl'}];
        */
        const willTheRecipeUpdate = await Recipe.findOneAndUpdate({_id: request.params.recipeId}, {name: request.body.name, ingredientList: request.body.ingredients, stepList: request.body.stepList} ,{new: true, runValidators: true}).catch(err => response.status(400).json(err));
        
        if (willTheRecipeUpdate.name === undefined) {
            return null;
        }

        response
            .status(200)
            .json({recipe: willTheRecipeUpdate});
    },


    deleteRecipe: async (request, response) => {
        await Recipe.deleteOne({_id: request.params.recipeId}).catch(err => response.status(400).json(err));
        await SharedRecipe.deleteOne({recipeId: request.params.recipeId}).catch(err => response.status(400).json(err));

        response 
            .status(200)
            .json("recipe deleted");
    }
}