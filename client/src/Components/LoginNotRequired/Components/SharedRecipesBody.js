import {useEffect, useState} from 'react';
import React from 'react';
import axios from 'axios';
import Recipe from '../../UniversalComponents/Recipe';

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
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        minWidth: '300px',
        margin: '10px'
    }

    const cardStyle = {
        color: 'white', 
        flex: '1',
        maxWidth: '600px',
        backgroundColor: '#F1C376',
        borderRadius: '5px',
        display: 'grid',
        padding: '10px',
        margin: '5px'
    }

    return (
        <>
            {loaded === true 
            
            && 
            
            (<main style={mainStyle}>
                {sharedRecipes.map((recipe, index) => {
                    return (
                        <Recipe recipe={recipe} key={index} />
                    );
                })}
                <div style={cardStyle}>
                    <p>Hello</p>
                </div>
            </main>
            )}
        </>
    );
} 

export default Main;