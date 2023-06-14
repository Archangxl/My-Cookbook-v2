import {useEffect, useState} from 'react';
import React from 'react';
import axios from 'axios';
import Recipe from '../../UniversalComponents/Recipe';

const UserLoggedInCookbook = () => {

    const [usersRecipes, setUsersRecipes] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/grabAllRecipesForLoggedInUser', {withCredentials: true})
            .then(recipes => {
                setUsersRecipes(recipes.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    const mainStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        minWidth: '300px',
        margin: '10px'
    }

    return (
        <>
            {loaded === true 
            
            && 
            
            (<main style={mainStyle}>
                {usersRecipes.map((recipe, index) => {
                    return (
                        <Recipe recipeName={recipe.name} key={index} />
                    );
                })}
            </main>)}
        </>
    );

}

export default UserLoggedInCookbook;