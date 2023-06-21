import LoggedInNavbar from "../Components/NavsAndHeaders/LoggedInNavbar";
import ViewRecipeTemplate from "../Components/Mains/ViewRecipeTemplate";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const ViewRecipe = () => {

    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isRecipeASharedRecipe, setIsRecipeASharedRecipe] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/grabSpecifiedSharedRecipe/' + recipeId)
            .then((res) => {
                setIsRecipeASharedRecipe(res.data.isRecipeASharedRecipe);
            })
            // eslint-disable-next-line
    }, [isRecipeASharedRecipe])

    const validatingRecipeWasShared = async(recipeId) => {
        const validate = await axios.get('http://localhost:8000/api/grabSpecifiedSharedRecipe/' + recipeId).catch(err => console.log(err));
        setIsRecipeASharedRecipe(validate.data.isRecipeASharedRecipe);
    }

    const shareRecipe = async(recipeId) => {
        await axios.post('http://localhost:8000/api/userSharingRecipe/' + recipeId, null, {withCredentials: true}).catch(err=> console.log(err));
        validatingRecipeWasShared(recipeId);
    }

    const unshareRecipe = async(recipeId) => {
        await axios.delete('http://localhost:8000/api/deleteSharedRecipe/' + recipeId, {withCredentials: true}).catch(err => console.log(err));
        validatingRecipeWasShared(recipeId);
    }

    useEffect(() => {
        axios.get(
            'http://localhost:8000/api/grabSpecifiedRecipe/' + recipeId,
            {withCredentials: true})
            .then(response => {
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
                        isRecipeASharedRecipe={isRecipeASharedRecipe}
                        shareRecipe={shareRecipe}
                        unshareRecipe={unshareRecipe}
                    />
                </>
            }       
        </>
    );
}
export default ViewRecipe;