import {useState, useEffect} from 'react';
import axios from 'axios';

const usePostRecipe = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState({recipeName: null, ingredient: null, instructions: null});
    const [urlForPost, setUrlForPost] = useState(null);
    const [recipeObject, setRecipeObject] = useState({});

    useEffect(() => {
        if (urlForPost === null || recipeObject === {}) {

        } else {
            axios.post(urlForPost, 
                recipeObject,
                {withCredentials: true}
            )
                .then(res => setData(res))
                .catch(err => {
                    checkForIngredientErrors(recipeObject);
                });
        }
    }, [recipeObject, urlForPost])

    const checkForIngredientErrors = () => {
        let errorTicker = false;
        recipeObject.ingredients.forEach((ingredient) => {

            if (ingredient.item === '') {
                errorTicker = true;

                let duplicateIngredients = error;
                duplicateIngredients.ingredient = <span style={{color: 'red'}}>Please delete any empty fields</span>;
                setError(duplicateIngredients);

            } else {
                if (!errorTicker === true) {
                    let duplicateIngredients = error;
                    duplicateIngredients.ingredient = null;
                    setError(duplicateIngredients);
                }
            }

            if (ingredient.measurement === '') {
                errorTicker = true;
                //setIngredientError(<span style={{color: 'red'}}>Please delete any empty fields</span>);
            } else {
                if (!errorTicker === true) {
                    //setIngredientError(null);
                }
            }
        })
    }

    return {data, error, setUrlForPost, setRecipeObject};
}
export default usePostRecipe;