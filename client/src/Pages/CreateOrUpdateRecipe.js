import React, { useCallback, useState } from 'react';
import { useParams } from "react-router-dom";
import LoggedInNavbar from "../Components/NavsAndHeaders/LoggedInNavbar";
import CreateRecipeForm from "../Components/Mains/CreateUpdateRecipeForm";
import usePostRecipe from '../Tools/useTest';

const CreateOrUpdateRecipe = ({formType}) => {

    const [loaded, setLoaded] = useState(true);

    const {
        setUrlForPost, 
        recipeObject, setRecipeObject,
        errorObject,
    } = usePostRecipe();

    //const navigate = useNavigate();

    const handleIngredientAddition = (e) => {
        e.preventDefault();
        setLoaded(false);
        let r = recipeObject;
        r.ingredientList[r.ingredientList.length] = {measurement: '', item: ''};
        console.log(r);
        setRecipeObject(r);
        setLoaded(true);
        //ingredientAdditionList.push({measurement: '', item: ''});
    };

    const handleIngredientSubtraction = useCallback((e) => {
        e.preventDefault();

        let copyOfRecipeObject = recipeObject;
        copyOfRecipeObject.ingredientList.pop();
        setRecipeObject(copyOfRecipeObject)
        
    }, [recipeObject.ingredientList]);

    const handleInstructionAddition = useCallback((e) => {
        e.preventDefault();

        let copyOfRecipeObject = recipeObject;
        copyOfRecipeObject.stepList.push({description: ''});
        setRecipeObject(copyOfRecipeObject);
        
    },[]);

    const handleInstructionSubstraction = useCallback((e) => {
        e.preventDefault();

        let copyOfRecipeObject = recipeObject;
        copyOfRecipeObject.stepList.pop();
        setRecipeObject(copyOfRecipeObject);

    }, [recipeObject.stepList]);


    const handleCreateRecipeSubmit = (e) => {
        e.preventDefault(); 
        setUrlForPost('http://localhost:8000/api/createRecipe');
    }

    const {recipeId} = useParams();
/*
    const ifFormTypeIsUpdateThenUpdateRecipeNameIngredientsAndInstructions = async () => {
        try {
            const recipe = await axios.get(
                'http://localhost:8000/api/grabSpecifiedRecipe/' + recipeId,
                {withCredentials: true}
            )
            setRecipeName(recipe.data.recipe.name);
            setIngredients(recipe.data.recipe.ingredientList);
            setInstructions(recipe.data.recipe.stepList)            
        }
        catch(error) {
            console.log(error);
        }
    }

    const doesFormTypeEqualUpdate = () => {
        if (formType === 'Update') {
            ifFormTypeIsUpdateThenUpdateRecipeNameIngredientsAndInstructions();
        }
    }

    useEffect(() => {
        doesFormTypeEqualUpdate();
    })

    const handleUpdateRecipeSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                'http://localhost:8000/api/updateRecipe/' + recipeId, 
                {recipeName: recipeName, ingredientList: ingredients, stepList: instructions},
                {withCredentials: true}
            )
            navigate('/cookbook')
        }
        
        catch(error) {
            checkForIngredientErrors();

            checkForInstructionErrors();

            handleSetRecipeNameError(error.response.data.errors.name);
        }
    }
*/
    return(
        <>
            {
                loaded && formType === "Login" &&
                <>
                    <LoggedInNavbar 
                        headerName="Add Recipe to Cookbook"  
                        navType="Recipe Create/Update/View"
                    />
                    <CreateRecipeForm 
                        handleIngredientAddition={handleIngredientAddition}
                        handleIngredientSubtraction={handleIngredientSubtraction}
                        handleInstructionAddition={handleInstructionAddition}
                        handleInstructionSubstraction={handleInstructionSubstraction}
                        handleSubmit={handleCreateRecipeSubmit}
                        recipeObject={recipeObject}
                        setRecipeObject={setRecipeObject}
                        errorObject={errorObject}
                    />
                </>
            }

            {
                formType === "Update" && 
                <>
                    <LoggedInNavbar 
                        headerName="Update Recipe"  
                        navType="Recipe Create/Update/View"
                    />
                    <CreateRecipeForm 
                        recipeObject={recipeObject} setRecipeObject={setRecipeObject}
                        handleIngredientAddition={handleIngredientAddition}
                        handleIngredientSubtraction={handleIngredientSubtraction}
                        handleInstructionAddition={handleInstructionAddition}
                        handleInstructionSubstraction={handleInstructionSubstraction}
                        errorObject={errorObject}
                    />
                </>
            }
        </>
    );

}
export default CreateOrUpdateRecipe;