//import { useParams } from "react-router-dom";
import LoggedInNavbar from "../Components/NavsAndHeaders/LoggedInNavbar";
import CreateRecipeForm from "../Components/Mains/CreateUpdateRecipeForm";
import useRecipe from '../Tools/useRecipe';
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const CreateOrUpdateRecipe = ({formType}) => {

    const {
        setUrl, 
        recipeObject, setRecipeObject,
        errorObject,
        setAxiosMethod,
        setRecipeIdBeingUpdated
    } = useRecipe();

    const handleIngredientAddition = (e) => {
        e.preventDefault();
        setRecipeObject(prevState => {
            let ingredientListLength = prevState.ingredientList.length
            return ({
                stepList: [...prevState.stepList],
                ingredientList: [...prevState.ingredientList, {_id: ingredientListLength, measurement: '', item: ''}],
                recipeName: prevState.recipeName,
            });
        });
    };

    const handleIngredientSubtraction = (e) => {
        e.preventDefault();

        setRecipeObject(prevState => {
            let removingIndex = prevState.ingredientList.length - 1
            
            return ({
                stepList: [...prevState.stepList],
                ingredientList: [...prevState.ingredientList].filter((ingredient) =>  ingredient._id !== removingIndex),
                recipeName: prevState.recipeName,
            });
            
        });   
    };

    const handleInstructionAddition = (e) => {
        e.preventDefault();
        
        setRecipeObject(prevState => {
            let ingredientListLength = prevState.stepList.length;

            return ({
                stepList: [...prevState.stepList, {_id: ingredientListLength, description: ''}],
                ingredientList: [...prevState.ingredientList],
                recipeName: prevState.recipeName,
            });
        })
        
    };

    const handleInstructionSubstraction = (e) => {
        e.preventDefault();

        setRecipeObject(prevState => {
            let removingIndex = prevState.stepList.length - 1
            
            return ({
                stepList: [...prevState.stepList].filter((instruction) =>  instruction._id !== removingIndex),
                ingredientList: [...prevState.ingredientList],
                recipeName: prevState.recipeName,
            });
            
        });  

    };

    const handleRecipeNameChange = (e) => {
        setRecipeObject(prevState => {
            return ({
                stepList: [...prevState.stepList],
                ingredientList: [...prevState.ingredientList],
                recipeName: e.target.value
            })
        })
    }

    const handleIngredientMeasurementChange = (e, ingredientObject) => {
        setRecipeObject(prevState => {
            return ({
                stepList: [...prevState.stepList],
                ingredientList: [...prevState.ingredientList].map(ingredient => {
                    return (
                    ingredient._id === ingredientObject._id 
                        ? 
                            {_id: ingredient._id, measurement: e.target.value, item: ingredient.item} 
                        : 
                            ingredient
                    )
                }),
                recipeName: prevState.recipeName
            })
        })
    }

    const handleIngredientItemChange = (e, ingredientObject) => {
        setRecipeObject(prevState => {
            return ({
                stepList: [...prevState.stepList],
                ingredientList: [...prevState.ingredientList].map(ingredient => {
                    return (
                    ingredient._id === ingredientObject._id 
                        ? 
                            {_id: ingredient._id, measurement: ingredient.measurement, item: e.target.value} 
                        : 
                            ingredient
                    )
                }),
                recipeName: prevState.recipeName
            })
        })
    }

    const handleInstructionDescriptionChange = (e, instructionObject) => {
        setRecipeObject(prevState => {
            return({
                recipeName: prevState.recipeName,
                ingredientList: [...prevState.ingredientList],
                stepList: [...prevState.stepList].map(instruction => {
                    return (
                        instruction._id === instructionObject._id 
                            ?
                                {_id: instruction._id, description: e.target.value}
                            :
                                instruction
                    )
                })
            })
        })
    }
    const {recipeId} = useParams();

    const handleSubmitMethod = (e) => {
        e.preventDefault(); 
        if (formType === 'Create') {
            setUrl('http://localhost:8000/api/createRecipe');
        } else if (formType === 'Update') {
            setUrl('http://localhost:8000/api/updateRecipe/' + recipeId);
        }
    }

    useEffect(() => {
        if (formType === 'Create') {
            setAxiosMethod('Create');
        } else if (formType === 'Update') {
            setAxiosMethod('Update');
            setRecipeIdBeingUpdated(recipeId);
        }
    })

    return(
        <>
            {
                formType === "Create" &&
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
                        handleSubmit={handleSubmitMethod}
                        handleRecipeNameChange={handleRecipeNameChange}
                        handleIngredientMeasurementChange={handleIngredientMeasurementChange}
                        handleIngredientItemChange={handleIngredientItemChange}
                        handleInstructionDescriptionChange={handleInstructionDescriptionChange}
                        recipeObject={recipeObject}
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
                        handleIngredientAddition={handleIngredientAddition}
                        handleIngredientSubtraction={handleIngredientSubtraction}
                        handleInstructionAddition={handleInstructionAddition}
                        handleInstructionSubstraction={handleInstructionSubstraction}
                        handleSubmit={handleSubmitMethod}
                        handleRecipeNameChange={handleRecipeNameChange}
                        handleIngredientMeasurementChange={handleIngredientMeasurementChange}
                        handleIngredientItemChange={handleIngredientItemChange}
                        handleInstructionDescriptionChange={handleInstructionDescriptionChange}
                        recipeObject={recipeObject}
                        errorObject={errorObject}
                    />
                </>
            }
        </>
    );

}
export default CreateOrUpdateRecipe;