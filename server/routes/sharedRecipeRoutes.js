const controller = require('../controllers/sharedRecipeController');
const {verifyCookie} = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/userSharingRecipe/:recipeId', verifyCookie, controller.userSharingRecipe);
    app.get('/api/grabbingAllSharedRecipes', controller.grabAllSharedRecipes);
    app.get('/api/grabSpecifiedSharedRecipe/:sharedRecipeId', controller.grabSpecifiedSharedRecipe);
    app.delete('/api/deleteSharedRecipe/:sharedRecipeId', verifyCookie, controller.deleteSharedRecipe);
}