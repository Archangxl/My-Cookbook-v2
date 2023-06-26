import {useState, useEffect} from 'react';
import axios from 'axios';

const usePostRecipe = () => {

    const [urlForPost, setUrlForPost] = useState(null);

    const [recipeObject, setRecipeObject] = useState({
        recipeName: "", 
        ingredientList: [{measurement: '', item: ''}], 
        stepList: [{description: ''}]
    });
    
    const [errorObject, setErrorObject] = useState({
        recipeNameError: null, 
        ingredientError: null,
        instructionError: null
    })

    //Checks for recipe name errors
    const checkForRecipeNameErrors = (error) => {
        let copyOfErrorObject = errorObject;
        copyOfErrorObject.recipeNameError = (error === undefined ? null : <span style={{color: 'red'}}>{error.message}</span>);
        setErrorObject(copyOfErrorObject);
    }

    //Checks for ingredient Errors
    const checkForIngredientErrors = (recipeObject) => {
        let errorTicker = false;
        recipeObject.ingredientList.forEach((ingredient) => {

            if (ingredient.item === '') {
                errorTicker = true;

                let copyOfErrorObject = errorObject;
                copyOfErrorObject.ingredientError = <span style={{color: 'red'}}>Please delete any empty fields</span>;
                setErrorObject(copyOfErrorObject);
            } else {
                if (!errorTicker === true) {

                    let copyOfErrorObject = errorObject;
                    copyOfErrorObject.ingredientError = null;
                    setErrorObject(copyOfErrorObject);
                }
            }

            if (ingredient.measurement === '') {
                errorTicker = true;

                let copyOfErrorObject = errorObject;
                copyOfErrorObject.ingredientError = <span style={{color: 'red'}}>Please delete any empty fields</span>;
                setErrorObject(copyOfErrorObject);

            } else {
                if (!errorTicker === true) {
                    let copyOfErrorObject = errorObject;
                    copyOfErrorObject.ingredientError = null;
                    setErrorObject(copyOfErrorObject);
                }
            }
        })
    }

    //checks for instruction Errors
    const checkForInstructionErrors = (recipeObject) => {
        let errorTicker = false;
        recipeObject.stepList.forEach((instruction) => {
            if (instruction.description === '') {
                errorTicker = true;
                let copyOfErrorObject = errorObject;
                    copyOfErrorObject.instructionError = <span style={{color: 'red'}}>Please delete any empty fields</span>;
            } else {
                if (!errorTicker === true) {
                    let copyOfErrorObject = errorObject;
                    copyOfErrorObject.instructionError = null;
                    setErrorObject(copyOfErrorObject);
                }
            }
        })
    }


    //axios call
    useEffect(() => {
        if (urlForPost === null) {

        } else {
            axios.post(urlForPost, 
                recipeObject,
                {withCredentials: true}
            )
                .then(res => console.log(res))
                .catch(err => {
                    checkForInstructionErrors(recipeObject)
                    checkForIngredientErrors(recipeObject);
                    checkForRecipeNameErrors(err.response.data.errors.name);
                });
        }
    }, [urlForPost])

    //spot where data is transferred 
    return {
        setUrlForPost, 
        recipeObject, setRecipeObject,
        errorObject, setErrorObject,
    };
}
export default usePostRecipe;