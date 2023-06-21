const ViewRecipeTemplate = ({
    recipe,
    deleteRecipe,
    navigateToUpdateRecipe,
    recipeId,
    isRecipeASharedRecipe,
    shareRecipe,
    unshareRecipe
    }) => {

    const mainStyle = {
        minWidth: '320px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center'
    }

    const cardStyle = {
        color: 'black', 
        maxWidth: '800px',
        width: '80%',
        backgroundColor: '#F1C376',
        borderRadius: '5px',
        padding: '10px',
        gap: '10px',
    }
    const buttonSytle = {
        padding: '6px 10px 5px 10px',
        borderRadius: '5px',
        border: '2px solid #606C5D',
        backgroundColor: 'white',
        color: '#606C5D',
        cursor: 'pointer'
    }

    return (
        <main style={mainStyle}>
            <div style={cardStyle}>
                <p>Recipe name: {recipe.name}</p>
                <p>Ingredients</p>
                <ul>
                    {
                        recipe.ingredientList.map((ingredient, index) => {
                            return(
                                <li key={index}>{ingredient.measurement} {ingredient.item}</li>
                            );
                        })
                    }
                </ul>
                <p>Instructions</p>
                <ol>
                    {
                        recipe.stepList.map((step, index) => {
                            return (
                                <li key={index}>{step.description}</li>
                            );
                        })
                    }
                </ol>
                <div>
                    {
                        isRecipeASharedRecipe === true ?
                        // if the recipe has been shared
                        <button
                        style={buttonSytle}
                        onClick={(e) => {
                            e.preventDefault();
                            unshareRecipe(recipeId);
                        }}
                        >Unshare Recipe</button>
                        
                        : 
                        //if the recipe hasn't been shared
                        <button
                        style={buttonSytle}
                        onClick={(e) => {
                            e.preventDefault();
                            shareRecipe(recipeId);
                        }}
                        >Share Recipe</button>
                    }
                    <button 
                        style={buttonSytle}
                        onClick={(e) => {
                            e.preventDefault();
                            navigateToUpdateRecipe(recipeId)
                        }}
                    >Update Recipe</button>
                    <button
                        style={buttonSytle}
                        onClick={(e) => {
                            e.preventDefault();
                            deleteRecipe(recipeId);
                        }}
                    >Delete Recipe</button>
                </div>
            </div>
        </main>
    );
}

export default ViewRecipeTemplate;