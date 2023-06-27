import {useState, useEffect} from 'react';
import axios from 'axios';

const usePostRecipe = () => {

    const [urlForPost, setUrlForPost] = useState(null);

    const [recipeObject, setRecipeObject] = useState({
        recipeName: "", 
        ingredientList: [{_id: 0, measurement: '', item: ''}], 
        stepList: [{_id: 0, description: ''}]
    });
    
    const [errorObject, setErrorObject] = useState({
        recipeNameError: null, 
        ingredientError: null,
        instructionError: null
    })

    //Checks for ingredient Errors
    const checkForErrors = (recipeObject, error) => {
        setErrorObject(() => {
            let errorTickerForIngredients = false;
            let errorTickerForInstructions = false;
            return ({
                recipeNameError: (error === undefined ? null :  <span style={{color: 'red'}}>{error.message}</span>),
                ingredientError: (recipeObject.ingredientList.map((ingredient) => {
                    if (ingredient.measurement === '' || ingredient.item === '' ) {
                        errorTickerForIngredients = true;
                        return <span key={ingredient._id} style={{color: 'red'}}>Please delete any empty fields</span>;
                    } else {
                        if (errorTickerForIngredients !== true) {
                            return null;
                        }
                    }
                })),
                instructionError: (recipeObject.stepList.map((instuction) => {
                    if (instuction.description === '') {
                        errorTickerForInstructions = true;
                        return <span key={instuction._id} style={{color: 'red'}}>Please delete any empty fields</span>;
                    } else {
                        if (errorTickerForInstructions !== true) {
                            return null;
                        }
                    }
                }))
            })
        })
    }


    //axios call
    useEffect(() => {
        if (urlForPost !== null) {
            axios.post(urlForPost, 
                recipeObject,
                {withCredentials: true}
            )
                .then(res => console.log(res))
                .catch(err => {
                    checkForErrors(recipeObject, err.response.data.errors.name);
                    setUrlForPost(null);
                });
        }
        // eslint-disable-next-line
    }, [urlForPost])

    //spot where data is transferred 
    return {
        setUrlForPost, 
        recipeObject, setRecipeObject,
        errorObject, setErrorObject,
    };
}
export default usePostRecipe;