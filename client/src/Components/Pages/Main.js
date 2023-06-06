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
                
                setSharedRecipes(recipes.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);



    return (
        <>
            {loaded === true 
            
            && (
                <div>
                    {sharedRecipes.map((recipe, index) => {
                        return (
                            <div key={index}>
                                <p>Recipe</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
} 

export default Main;