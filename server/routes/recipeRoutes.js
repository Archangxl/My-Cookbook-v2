const controller = require('../controllers/recipeController');
const {verifyCookie} = require('../config/jwt.config');

const multer = require('multer');

const upload = multer({ dest: "recipePhotos/" });
function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}

module.exports = app => {
    app.post('/api/createRecipe', verifyCookie, controller.createRecipe);
    app.get('/api/grabAllRecipesForLoggedInUser', verifyCookie, controller.grabAllUserRecipes);
    app.get('/api/grabSpecifiedRecipe/:recipeId', verifyCookie, controller.grabSpecifiedRecipe);
    app.put('/api/updateRecipe/:recipeId', verifyCookie, controller.updateRecipe);
    app.delete('/api/deleteRecipe/:recipeId', verifyCookie, controller.deleteRecipe);
}