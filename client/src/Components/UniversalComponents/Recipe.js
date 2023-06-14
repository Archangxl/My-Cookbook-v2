

const Recipe = ({recipe}) => {

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

    return(
        <main style={mainStyle}>
            <div style={cardStyle}>
                <p>Created by: {recipe.user}</p>
                <p>Recipe name: {recipe.recipe.name}</p>
            </div>
        </main>
    );

}
export default Recipe;