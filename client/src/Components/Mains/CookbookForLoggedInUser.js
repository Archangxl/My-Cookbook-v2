import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import Recipe from './TemplateForRecipes';
import { useNavigate } from 'react-router-dom';

const UserLoggedInCookbook = () => {

    const [usersRecipes, setUsersRecipes] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

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

    const deleteRecipe = async(recipeId) => {
        axios.delete(
            'http://localhost:8000/api/deleteRecipe/' + recipeId,
            {withCredentials: true}
        )
            .then(res =>  navigate('/cookbook'))
            .catch(err => console.log(err));
    }

    const navigateToUpdateRecipe = (recipeId) => {
        navigate('/updateRecipe/' + recipeId);
    }

    const navigateToViewRecipe = (recipeId) => {
        navigate('/viewRecipe/' + recipeId);
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
                            navigateToViewRecipe={navigateToViewRecipe}
                        />
                    );
                })}
            </main>)}
        </>
    );

}

export default UserLoggedInCookbook;