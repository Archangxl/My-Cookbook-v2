//import { useParams } from "react-router-dom";
import LoggedInNavbar from "../Components/NavsAndHeaders/LoggedInNavbar";
import CreateRecipeForm from "../Components/Mains/CreateUpdateRecipeForm";
import usePostRecipe from '../Tools/useTest';

const CreateOrUpdateRecipe = ({formType}) => {

    const {
        setUrlForPost, 
        recipeObject, setRecipeObject,
        errorObject,
    } = usePostRecipe();

    //const navigate = useNavigate();

    const handleIngredientAddition = (e) => {
        e.preventDefault();
        setRecipeObject(prevState => {
            let ingredientListLength = prevState.ingredientList.length
            return ({
                stepList: [...prevState.stepList],
                ingredientList: [...prevState.ingredientList, {id: ingredientListLength, measurement: '', item: ''}],
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
                ingredientList: [...prevState.ingredientList].filter((element) =>  element.id !== removingIndex),
                recipeName: prevState.recipeName,
            });
            
        });   
    };

    const handleInstructionAddition = (e) => {
        e.preventDefault();
        
        setRecipeObject(prevState => {
            let ingredientListLength = prevState.stepList.length;

            return ({
                stepList: [...prevState.stepList, {id: ingredientListLength, description: ''}],
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
                stepList: [...prevState.stepList].filter((element) =>  element.id !== removingIndex),
                ingredientList: [...prevState.ingredientList],
                recipeName: prevState.recipeName,
            });
            
        });  

    };


    const handleCreateRecipeSubmit = (e) => {
        e.preventDefault(); 
        setUrlForPost('http://localhost:8000/api/createRecipe');
    }

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
                    ingredient.id === ingredientObject.id 
                        ? 
                            {id: ingredient.id, measurement: e.target.value, item: ingredient.item} 
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
                    ingredient.id === ingredientObject.id 
                        ? 
                            {id: ingredient.id, measurement: ingredient.measurement, item: e.target.value} 
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
                        instruction.id === instructionObject.id 
                            ?
                                {id: instruction.id, description: e.target.value}
                            :
                                instruction
                    )
                })
            })
        })
    }

    //const {recipeId} = useParams();
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
                formType === "Login" &&
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
                        handleRecipeNameChange={handleRecipeNameChange}
                        handleIngredientMeasurementChange={handleIngredientMeasurementChange}
                        handleIngredientItemChange={handleIngredientItemChange}
                        handleInstructionDescriptionChange={handleInstructionDescriptionChange}
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