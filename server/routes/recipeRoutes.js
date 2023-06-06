const controller = require('../controllers/recipeController');
const {verifyCookie} = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/createRecipe', verifyCookie, controller.createRecipe);
    app.get('/api/grabAllRecipesForLoggedInUser', verifyCookie, controller.grabAllUserRecipes);
    app.get('/api/grabSpecifiedRecipe/:recipeId', verifyCookie, controller.grabSpecifiedRecipe);
    app.put('/api/updateRecipe/:recipeId', verifyCookie, controller.updateRecipe);
    app.delete('/api/deleteRecipe/:recipeId', verifyCookie, controller.deleteRecipe);
}