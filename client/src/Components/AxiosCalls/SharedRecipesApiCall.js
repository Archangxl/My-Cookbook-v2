import {useEffect, useState} from 'react';
import axios from 'axios';

const SharedRecipesApiCall = (props) => {
    const {sharedRecipes, setSharedRecipes} = props;

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/grabbingAllSharedRecipes')
            .then(recipes => {
                setSharedRecipes(recipes);
                console.log(recipes);
            })
            .catch(err => console.log(err));
    }, []);
}
export default SharedRecipesApiCall;