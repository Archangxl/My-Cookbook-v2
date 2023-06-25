import {useState, useEffect} from 'react';
import axios from 'axios';

const usePostRecipe = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
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
                .catch(err => setError(err));
        }
    }, [recipeObject, urlForPost])

    return {data, error, setUrlForPost, setRecipeObject};
}
export default usePostRecipe;