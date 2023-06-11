import {useEffect, useState} from 'react';
import React from 'react';
import axios from 'axios';

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
                {usersRecipes.map((recipe, index) => {
                    return (
                        <div key={index} style={cardStyle}>
                            <p>Recipe Name: {recipe.name}</p>
                        </div>
                    );
                })}
            </main>
            )}
        </>
    );

}

export default UserLoggedInCookbook;