import LoggedInNavbar from "../Components/NavsAndHeaders/LoggedInNavbar";
import ViewRecipeTemplate from "../Components/Mains/ViewRecipeTemplate";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const ViewRecipe = () => {

    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(
            'http://localhost:8000/api/grabSpecifiedRecipe/' + recipeId,
            {withCredentials: true})
            .then(response => {
                console.log(response.data.recipe);
                setRecipe(response.data.recipe);
                setLoaded(true);
            })
            .catch(error => {
                console.log(error);
                // eslint-disable-next-line
            })
    }, [recipeId])

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

    return (
        <>
            {
            loaded === true && 
                <>
                    <LoggedInNavbar 
                        headerName={"View " + recipe.name + " Recipe"}  
                        navType="Recipe Create/Update/View"
                    />
                    <ViewRecipeTemplate
                        recipe={recipe}
                        deleteRecipe={deleteRecipe}
                        navigateToUpdateRecipe={navigateToUpdateRecipe}
                        recipeId={recipeId}
                    />
                </>
            }       
        </>
    );
}
export default ViewRecipe;