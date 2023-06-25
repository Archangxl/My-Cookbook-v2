import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import LoggedInNavbar from "../Components/NavsAndHeaders/LoggedInNavbar";
import CreateRecipeForm from "../Components/Mains/CreateUpdateRecipeForm";
import usePostRecipe from '../Tools/useTest';

const CreateOrUpdateRecipe = ({formType}) => {

    const {data, error, setUrlForPost, setRecipeObject} = usePostRecipe();

    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState([{measurement: '', item: ''}]);
    const [instructions, setInstructions] = useState([{description: ''}]);
    
    const [recipeNameError, setRecipeNameError] = useState(null);
    const [ingredientError, setIngredientError] = useState(null);
    const [instructionError, setInstructionError] = useState(null);

    const navigate = useNavigate();

    const handleIngredientAddition = useCallback((e) => {
        e.preventDefault();
        setIngredients(ingredients => [...ingredients, {measurement: '', item: ''}]);
    },[]);

    const handleIngredientSubtraction = useCallback((e) => {
        e.preventDefault();
        let copyOfIngredientsArray = [...ingredients];
        copyOfIngredientsArray.pop();
        setIngredients(copyOfIngredientsArray)
    }, [ingredients]);

    const handleInstructionAddition = useCallback((e) => {
        e.preventDefault();
        setInstructions(instructions => [...instructions, {description: ''}]);
        
    },[]);

    const handleInstructionSubstraction = useCallback((e) => {
        e.preventDefault();
        let copyOfInstructionArray = [...instructions];
        copyOfInstructionArray.pop();
        setInstructions(copyOfInstructionArray);
    }, [instructions]);

    const checkForInstructionErrors = () => {
        let errorTicker = false;
        instructions.forEach((instruction) => {
            if (instruction.description === '') {
                errorTicker = true;
                setInstructionError(<span style={{color: 'red'}}>Please delete any empty fields</span>);
            } else {
                if (!errorTicker === true) {
                    setInstructionError(null);
                }
            }
        })
    }

    const checkForIngredientErrors = () => {
        let errorTicker = false;
        ingredients.forEach((ingredient) => {

            if (ingredient.item === '') {
                errorTicker = true;
                setIngredientError(<span style={{color: 'red'}}>Please delete any empty fields</span>);
            } else {
                if (!errorTicker === true) {
                    setIngredientError(null);
                }
            }

            if (ingredient.measurement === '') {
                errorTicker = true;
                setIngredientError(<span style={{color: 'red'}}>Please delete any empty fields</span>);
            } else {
                if (!errorTicker === true) {
                    setIngredientError(null);
                }
            }
        })
    }

    const handleSetRecipeNameError = (error) => {
        setRecipeNameError(error === undefined ? null : <span style={{color: 'red'}}>{error.message}</span>);
    }

    const handleCreateRecipeSubmit = (e) => {
        e.preventDefault(); 
        setRecipeObject({recipeName: recipeName, ingredientList: ingredients, stepList: instructions});
        setUrlForPost('http://localhost:8000/api/createRecipe');

        /*
        try {
            setPostInfo(setRecipeObject);
            /*
            await axios.post('http://localhost:8000/api/createRecipe', 
            {recipeName: recipeName, ingredientList: ingredients, stepList: instructions},
                {withCredentials: true})
            navigate('/cookbook')
            
        }
        

        catch(error) {

            checkForIngredientErrors();

            checkForInstructionErrors();

            handleSetRecipeNameError(error.response.data.errors.name);
        }
        */
    }

    const {recipeId} = useParams();

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

    return(
        <>
        {console.log({data: data, error: error})}
            {
                formType === "Login" &&
                <>
                    <LoggedInNavbar 
                        headerName="Add Recipe to Cookbook"  
                        navType="Recipe Create/Update/View"
                    />
                    <CreateRecipeForm 
                        recipeName={recipeName} setRecipeName={setRecipeName}
                        ingredients={ingredients} setIngredients={setIngredients}
                        instructions={instructions} setInstructions={setInstructions}
                        handleIngredientAddition={handleIngredientAddition}
                        handleIngredientSubtraction={handleIngredientSubtraction}
                        handleInstructionAddition={handleInstructionAddition}
                        handleInstructionSubstraction={handleInstructionSubstraction}
                        handleSubmit={handleCreateRecipeSubmit}
                        recipeNameError={recipeNameError} 
                        ingredientError={ingredientError}
                        instructionError={instructionError}
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
                        recipeName={recipeName} setRecipeName={setRecipeName}
                        ingredients={ingredients} setIngredients={setIngredients}
                        instructions={instructions} setInstructions={setInstructions}
                        handleIngredientAddition={handleIngredientAddition}
                        handleIngredientSubtraction={handleIngredientSubtraction}
                        handleInstructionAddition={handleInstructionAddition}
                        handleInstructionSubstraction={handleInstructionSubstraction}
                        handleSubmit={handleUpdateRecipeSubmit}
                        recipeNameError={recipeNameError} 
                        ingredientError={ingredientError}
                        instructionError={instructionError}
                    />
                </>
            }
        </>
    );

}
export default CreateOrUpdateRecipe;