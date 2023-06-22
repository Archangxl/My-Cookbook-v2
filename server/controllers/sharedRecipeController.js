const SharedRecipe = require('../models/sharedRecipeModel');
const User = require('../models/userModel');
const Recipe = require('../models/recipeModel');
const JsonWebToken = require('jsonwebtoken');

module.exports = {
    userSharingRecipe: async (request, response) => {
        const activeUserToken = JsonWebToken.decode(request.cookies.userToken);

        const sharedRecipeCreation = await SharedRecipe.create({userId: activeUserToken.userId, recipeId: request.params.recipeId}).catch(err => response.status(400).json(err));

        response
            .status(200)
            .json({added: sharedRecipeCreation})
    },


    grabAllSharedRecipes: async (request, response) => {
        const grabbingAllSharedRecipes = await SharedRecipe.find();
        
        const formatForFrontEnd = [];

        for (let sharedRecipeIndex = 0; sharedRecipeIndex < grabbingAllSharedRecipes.length; sharedRecipeIndex++) {
            const recipe =  grabbingAllSharedRecipes[sharedRecipeIndex].recipeId;

            const recipeInformation = await Recipe.find({_id: recipe});

            const recipePackage = {name: recipeInformation[0].name};

            const user = grabbingAllSharedRecipes[sharedRecipeIndex].userId;
            const userInformation = await User.findById({_id: user});

            formatForFrontEnd.push({recipe: recipePackage ,user: userInformation.fullName, sharedRecipeId: grabbingAllSharedRecipes[sharedRecipeIndex]._id});
        }

        response
            .status(200)
            .json(formatForFrontEnd);
    },

    
    grabSpecifiedSharedRecipe: async (request, response) => {
        const grabbingAllSharedRecipes = await SharedRecipe.findOne({recipeId: request.params.sharedRecipeId}).catch(err => res.status(400).json("error"));
        if (grabbingAllSharedRecipes === null) {
            response.status(200).json({isRecipeASharedRecipe: false});
            return null;
        }

        const userInformation = await User.findById({_id: grabbingAllSharedRecipes.userId});
        const userPackage = {name: userInformation.fullName};

        const recipeInformation = await Recipe.findById({_id: grabbingAllSharedRecipes.recipeId});
        const recipePackage = {name: recipeInformation.name, ingredientList: recipeInformation.ingredientList, stepList: recipeInformation.stepList};

        response 
            .status(200)
            .json({user: userPackage, recipe: recipePackage, isRecipeASharedRecipe: true});
    },


    deleteSharedRecipe: async (request, response) => {
        await SharedRecipe.deleteOne({recipeId: request.params.sharedRecipeId});

        response
            .status(200)
            .json('Recipe Unshared')
    }
}