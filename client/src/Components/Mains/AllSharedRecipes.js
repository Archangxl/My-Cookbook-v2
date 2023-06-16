import {useEffect, useState} from 'react';
import React from 'react';
import axios from 'axios';
import Recipe from './TemplateForRecipes';

const Main = () => {
    const [sharedRecipes, setSharedRecipes] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/grabbingAllSharedRecipes')
            .then(recipes => {
                setSharedRecipes(recipes.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    const mainStyle = {
        minWidth: '320px',
        padding:'0px 10px',
        display: 'grid',
        justifyItems: 'center'
    }

    return (
        <>
            {loaded === true 
            
            && 
            
            (<main style={mainStyle}>
                {sharedRecipes.map((recipe, index) => {
                    return (
                        <Recipe recipeName={recipe.recipe.name} userWhoPostedRecipe={recipe.user} key={index} />
                    );
                })}
            </main>
            )}
        </>
    );
} 

export default Main;