

const Recipe = ({recipeName, userWhoPostedRecipe = false}) => {

    const cardStyle = {
        color: 'white', 
        width: '75%',
        backgroundColor: '#F1C376',
        borderRadius: '5px',
        display: 'grid',
        padding: '10px',
        margin: '5px'
    }

    return(
        <div style={cardStyle}>
            {userWhoPostedRecipe !== false ? <p>Shared by: {userWhoPostedRecipe} </p> : null}
            <p>Recipe name: {recipeName}</p>
        </div>
    );

}
export default Recipe;