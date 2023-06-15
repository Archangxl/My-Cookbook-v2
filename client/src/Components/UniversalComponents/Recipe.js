
const Recipe = ({recipeName, userWhoPostedRecipe = false, recipeId, deleteRecipe, navigateToUpdateRecipe}) => {

    const cardStyle = {
        color: 'black', 
        backgroundColor: '#F1C376',
        borderRadius: '5px',
        display: 'grid',
        padding: '10px',
        margin: '5px',
        width: '80%',
        maxWidth: '800px'
    }
    const buttonSytle = {
        padding: '6px 10px 5px 10px',
        borderRadius: '5px',
        border: '2px solid #606C5D',
        backgroundColor: 'white',
        color: '#606C5D',
        cursor: 'pointer'
    }

    return(
        <div style={cardStyle}>

            {userWhoPostedRecipe !== false ? <p>Shared by: {userWhoPostedRecipe} </p> : null}
            
            <p>Recipe name: {recipeName}</p>

            {
                userWhoPostedRecipe === false 

                ? 

                <div>
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

                : 

                null
            }

        </div>
    );

}
export default Recipe;