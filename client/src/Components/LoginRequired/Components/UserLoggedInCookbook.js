import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import Recipe from '../../UniversalComponents/Recipe';
import { useNavigate } from 'react-router-dom';

const UserLoggedInCookbook = () => {

    const [usersRecipes, setUsersRecipes] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/grabAllRecipesForLoggedInUser', {withCredentials: true})
            .then(recipes => {
                setUsersRecipes(recipes.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [usersRecipes]);

    const mainStyle = {
        minWidth: '320px',
        padding: '0px 10px',
        display: 'grid',
        justifyItems: 'center'
    }

    const navigate = useNavigate();

    const deleteRecipe = async(recipeId) => {
        await axios.delete(
            'http://localhost:8000/api/deleteRecipe/' + recipeId,
            {withCredentials: true}
        );
        navigate('/cookbook');
    }

    const navigateToUpdateRecipe = (recipeId) => {
        navigate('/updateRecipe/' + recipeId);
    }

    return (
        <>
            {loaded === true 
            
            && 
            
            (<main style={mainStyle}>
                {usersRecipes.map((recipe, index) => {
                    return (
                        <Recipe 
                            recipeName={recipe.name} 
                            key={index} 
                            recipeId={recipe._id}
                            deleteRecipe={deleteRecipe}
                            navigateToUpdateRecipe={navigateToUpdateRecipe}
                        />
                    );
                })}
            </main>)}
        </>
    );

}

export default UserLoggedInCookbook;