import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';

const useRecipe = () => {

    const navigate = useNavigate();

    const [url, setUrl] = useState(null);
    const [axiosMethod, setAxiosMethod] = useState(null);
    const [recipeIdBeindUpdated, setRecipeIdBeingUpdated] = useState(null);

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

    //Checks for Errors
    const checkForErrors = (recipeObject, error) => {
        setErrorObject(() => {
            let errorTickerForIngredients = false;
            let errorTickerForInstructions = false;
            return ({
                recipeNameError: (error === undefined ? null :  <span style={{color: 'red'}}>{error.message}</span>),
                // eslint-disable-next-line
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
                // eslint-disable-next-line
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

    // checks to see if the form is update or create so recipeObject can be updated
    useEffect(() => {
        if (axiosMethod === 'Update') {
            axios.get('http://localhost:8000/api/grabSpecifiedRecipe/' + recipeIdBeindUpdated, {withCredentials: true})
                .then(res => {
                    setRecipeObject(() => {
                        return ({
                            recipeName: res.data.recipe.name, 
                            ingredientList: res.data.recipe.ingredientList, 
                            stepList: res.data.recipe.stepList
                        })
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [axiosMethod, recipeIdBeindUpdated])


    //axios call
    useEffect(() => {
        if (url !== null) {
            if (axiosMethod === "Create") {
            axios.post(url, 
                recipeObject,
                {withCredentials: true}
            )
                .then(res => navigate('/cookbook'))
                .catch(err => {
                    console.log(err);
                    checkForErrors(recipeObject, err.response.data.errors.name);
                    setUrl(null);
                });
            } else if (axiosMethod === "Update") {
                axios.put(url, 
                    recipeObject,
                    {withCredentials: true}
                )
                    .then(res => navigate('/cookbook'))
                    .catch(err => {
                        console.log(err);
                        checkForErrors(recipeObject, err.response.data.errors.name);
                        setUrl(null);
                    });
            }
        }
        // eslint-disable-next-line
    }, [url])

    //spot where data is transferred 
    return {
        setUrl, 
        recipeObject, setRecipeObject,
        errorObject, setErrorObject,
        setAxiosMethod,
        setRecipeIdBeingUpdated
    };
}
export default useRecipe;