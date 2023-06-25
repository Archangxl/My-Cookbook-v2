import {useState, useEffect} from 'react';
import axios from 'axios';

const usePostRecipe = (recipePostObject) => {

    const [informationBeingSentFromThisHook, setInformationBeingSentFromThisHook] = useState(null);

    useEffect( async() => {
        try {
            await axios.post('http://localhost:8000/api/createRecipe', 
                recipePostObject,
                {withCredentials: true})
                
        }
        catch(err) {
            console.log(err);
        }
    })


}

export default usePostRecipe;