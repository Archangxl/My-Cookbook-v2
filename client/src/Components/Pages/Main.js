import {useEffect, useState} from 'react';
import React from 'react';
import axios from 'axios';

const Main = () => {
    const [sharedRecipes, setSharedRecipes] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/grabbingAllSharedRecipes')
            .then(recipes => {
                console.log(recipes)
                setSharedRecipes(recipes.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    const recipeCardStyle = {
        margin: '10px',
        padding: '10px',
        border: '1px solid black'
    }

    return (
        <>
            {loaded === true 
            
            && (
                <>
                    {sharedRecipes.map((recipe, index) => {
                        return (
                            <div key={index} style={recipeCardStyle}>
                                <p>Created by: {recipe.user}</p>
                                <p>Recipe name: {recipe.recipe.name}</p>
                            </div>
                        );
                    })}
                </>
            )}
        </>
    );
} 

export default Main;